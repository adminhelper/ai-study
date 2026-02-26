package com.aistudy.api.domain.news;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "news_articles", indexes = {
        @Index(name = "idx_published", columnList = "publishedAt DESC"),
        @Index(name = "idx_link", columnList = "link", unique = true)
})
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NewsArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, unique = true, length = 1024)
    private String link;

    private String source;

    private String sourceType;

    private String imageUrl;

    @Column(nullable = false)
    private LocalDateTime publishedAt;

    @Column(nullable = false)
    private LocalDateTime fetchedAt;

    public NewsArticle(String title, String description, String link,
                       String source, String sourceType, String imageUrl,
                       LocalDateTime publishedAt) {
        this.title = title;
        this.description = description;
        this.link = link;
        this.source = source;
        this.sourceType = sourceType;
        this.imageUrl = imageUrl;
        this.publishedAt = publishedAt;
        this.fetchedAt = LocalDateTime.now();
    }
}
