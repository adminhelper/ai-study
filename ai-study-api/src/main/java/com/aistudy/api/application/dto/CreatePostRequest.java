package com.aistudy.api.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreatePostRequest(
        @NotNull String postType,
        @NotBlank String title,
        String content,
        String author,
        String tags,
        String category,
        String summary
) {}
