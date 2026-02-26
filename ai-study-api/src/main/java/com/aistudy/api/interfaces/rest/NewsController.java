package com.aistudy.api.interfaces.rest;

import com.aistudy.api.application.NewsFeedService;
import com.aistudy.api.application.dto.NewsArticleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsFeedService newsFeedService;

    @GetMapping
    public Page<NewsArticleResponse> list(
            @RequestParam(defaultValue = "all") String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size
    ) {
        return newsFeedService.getArticles(type, page, size)
                .map(NewsArticleResponse::from);
    }

    @PostMapping("/refresh")
    public Map<String, Object> refresh() {
        int count = newsFeedService.refreshNow();
        return Map.of("newArticles", count);
    }
}
