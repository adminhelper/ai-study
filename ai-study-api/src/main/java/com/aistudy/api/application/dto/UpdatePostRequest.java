package com.aistudy.api.application.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdatePostRequest(
        @NotBlank String title,
        String content,
        String author,
        String tags,
        String category,
        String summary
) {}
