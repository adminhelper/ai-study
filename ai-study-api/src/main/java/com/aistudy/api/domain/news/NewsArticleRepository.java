package com.aistudy.api.domain.news;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsArticleRepository extends JpaRepository<NewsArticle, Long> {

    boolean existsByLink(String link);

    Page<NewsArticle> findAllByOrderByPublishedAtDesc(Pageable pageable);

    Page<NewsArticle> findBySourceTypeOrderByPublishedAtDesc(String sourceType, Pageable pageable);
}
