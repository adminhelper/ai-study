package com.aistudy.api.application.dto;

import com.aistudy.api.domain.post.Attachment;

public record AttachmentResponse(
        Long id,
        String originalName,
        String contentType,
        long fileSize
) {
    public static AttachmentResponse from(Attachment attachment) {
        return new AttachmentResponse(
                attachment.getId(),
                attachment.getOriginalName(),
                attachment.getContentType(),
                attachment.getFileSize()
        );
    }
}
