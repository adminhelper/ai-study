package com.aistudy.api.application.dto;

import com.aistudy.api.domain.news.NewsArticle;

public record NewsArticleResponse(
        Long id,
        String title,
        String description,
        String link,
        String source,
        String sourceType,
        String imageUrl,
        String publishedAt
) {
    public static NewsArticleResponse from(NewsArticle article) {
        return new NewsArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getDescription(),
                article.getLink(),
                article.getSource(),
                article.getSourceType(),
                article.getImageUrl(),
                article.getPublishedAt().toString()
        );
    }
}
