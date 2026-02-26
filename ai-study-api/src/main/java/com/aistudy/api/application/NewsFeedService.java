package com.aistudy.api.application;

import com.aistudy.api.domain.news.NewsArticle;
import com.aistudy.api.domain.news.NewsArticleRepository;
import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.io.ByteArrayInputStream;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NewsFeedService {

    private final NewsArticleRepository repository;

    private static final HttpClient HTTP = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();

    /** RSS 피드 소스 목록 */
    record FeedSource(String url, String name, String type) {}

    private static final List<FeedSource> FEEDS = List.of(
            new FeedSource("https://www.anthropic.com/rss.xml", "Anthropic", "official"),
            new FeedSource("https://blog.openai.com/rss/", "OpenAI", "official"),
            new FeedSource("https://feeds.feedburner.com/blogspot/gJZg", "Google AI", "official"),
            new FeedSource("https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", "The Verge AI", "media"),
            new FeedSource("https://feeds.arstechnica.com/arstechnica/technology-lab", "Ars Technica", "media"),
            new FeedSource("https://news.hada.io/rss/topics/ai", "GeekNews AI", "aggregator"),
            new FeedSource("https://hnrss.org/newest?q=AI+OR+LLM+OR+GPT+OR+Claude&points=50", "Hacker News AI", "aggregator"),
            new FeedSource("https://huggingface.co/blog/feed.xml", "Hugging Face", "research")
    );

    /** 30분마다 RSS 수집 (앱 시작 10초 후 첫 실행) */
    @Scheduled(fixedRate = 1800000, initialDelay = 10000)
    public void fetchAllFeeds() {
        log.info("RSS 피드 수집 시작 ({} 소스)", FEEDS.size());
        int total = 0;
        for (FeedSource source : FEEDS) {
            try {
                int count = fetchFeed(source);
                total += count;
            } catch (Exception e) {
                log.warn("RSS 수집 실패: {} - {}", source.name(), e.getMessage());
            }
        }
        log.info("RSS 수집 완료: {}개 새 기사", total);
    }

    @Transactional
    public int fetchFeed(FeedSource source) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(source.url()))
                .header("User-Agent", "AI-Study-Bot/1.0")
                .timeout(Duration.ofSeconds(15))
                .GET()
                .build();

        HttpResponse<byte[]> response = HTTP.send(request, HttpResponse.BodyHandlers.ofByteArray());
        if (response.statusCode() != 200) {
            log.warn("{}: HTTP {}", source.name(), response.statusCode());
            return 0;
        }

        SyndFeedInput input = new SyndFeedInput();
        SyndFeed feed = input.build(new XmlReader(new ByteArrayInputStream(response.body())));

        int saved = 0;
        for (SyndEntry entry : feed.getEntries()) {
            String link = entry.getLink();
            if (link == null || link.isBlank() || repository.existsByLink(link)) continue;

            String desc = entry.getDescription() != null ? entry.getDescription().getValue() : "";
            // HTML 태그 간단 제거
            desc = desc.replaceAll("<[^>]+>", "").trim();
            if (desc.length() > 500) desc = desc.substring(0, 500) + "...";

            String imageUrl = extractImage(entry);

            LocalDateTime published = entry.getPublishedDate() != null
                    ? toLocalDateTime(entry.getPublishedDate())
                    : (entry.getUpdatedDate() != null ? toLocalDateTime(entry.getUpdatedDate()) : LocalDateTime.now());

            NewsArticle article = new NewsArticle(
                    entry.getTitle(),
                    desc,
                    link,
                    source.name(),
                    source.type(),
                    imageUrl,
                    published
            );
            repository.save(article);
            saved++;
        }
        if (saved > 0) log.debug("{}: {}개 저장", source.name(), saved);
        return saved;
    }

    @Transactional(readOnly = true)
    public Page<NewsArticle> getArticles(String sourceType, int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);
        if (sourceType == null || sourceType.isBlank() || "all".equals(sourceType)) {
            return repository.findAllByOrderByPublishedAtDesc(pageable);
        }
        return repository.findBySourceTypeOrderByPublishedAtDesc(sourceType, pageable);
    }

    /** 수동 새로고침 */
    @Transactional
    public int refreshNow() {
        int total = 0;
        for (FeedSource source : FEEDS) {
            try { total += fetchFeed(source); } catch (Exception e) { /* skip */ }
        }
        return total;
    }

    private static LocalDateTime toLocalDateTime(Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

    private String extractImage(SyndEntry entry) {
        // enclosure에서 이미지 추출
        if (entry.getEnclosures() != null) {
            for (var enc : entry.getEnclosures()) {
                if (enc.getType() != null && enc.getType().startsWith("image/")) {
                    return enc.getUrl();
                }
            }
        }
        return null;
    }
}
