package com.aistudy.api.application.dto;

import com.aistudy.api.domain.post.Post;

import java.util.Arrays;
import java.util.List;

public record PostResponse(
        Long id,
        String postType,
        String title,
        String content,
        String author,
        List<String> tags,
        String category,
        String summary,
        String createdAt,
        List<AttachmentResponse> attachments
) {
    public static PostResponse from(Post post) {
        List<String> tagList = (post.getTags() == null || post.getTags().isBlank())
                ? List.of()
                : Arrays.stream(post.getTags().split(",")).map(String::trim).filter(s -> !s.isEmpty()).toList();

        return new PostResponse(
                post.getId(),
                post.getPostType().name(),
                post.getTitle(),
                post.getContent(),
                post.getAuthor(),
                tagList,
                post.getCategory(),
                post.getSummary(),
                post.getCreatedAt().toString(),
                post.getAttachments().stream().map(AttachmentResponse::from).toList()
        );
    }
}
