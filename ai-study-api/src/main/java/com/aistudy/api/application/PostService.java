package com.aistudy.api.application;

import com.aistudy.api.application.dto.*;
import com.aistudy.api.domain.post.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;
    private final AttachmentRepository attachmentRepository;
    private final FileStorageService fileStorageService;

    public List<PostResponse> findByType(PostType postType) {
        return postRepository.findByPostTypeOrderByCreatedAtDesc(postType)
                .stream()
                .map(PostResponse::from)
                .toList();
    }

    public PostResponse findById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다: " + id));
        return PostResponse.from(post);
    }

    @Transactional
    public PostResponse create(CreatePostRequest request, List<MultipartFile> files) {
        PostType type = PostType.valueOf(request.postType());
        Post post = new Post(
                type,
                request.title(),
                request.content(),
                request.author(),
                request.tags(),
                request.category(),
                request.summary()
        );
        postRepository.save(post);
        attachFiles(post, files);
        return PostResponse.from(post);
    }

    @Transactional
    public PostResponse update(Long id, UpdatePostRequest request, List<MultipartFile> files) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다: " + id));
        post.update(
                request.title(),
                request.content(),
                request.author(),
                request.tags(),
                request.category(),
                request.summary()
        );
        attachFiles(post, files);
        return PostResponse.from(post);
    }

    @Transactional
    public void delete(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다: " + id));
        // 첨부파일 스토리지 삭제
        post.getAttachments().forEach(a -> fileStorageService.delete(a.getStoredName()));
        postRepository.delete(post);
    }

    @Transactional
    public void deleteAttachment(Long attachmentId) {
        Attachment attachment = attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new IllegalArgumentException("첨부파일을 찾을 수 없습니다: " + attachmentId));
        fileStorageService.delete(attachment.getStoredName());
        attachment.getPost().removeAttachment(attachment);
        attachmentRepository.delete(attachment);
    }

    private void attachFiles(Post post, List<MultipartFile> files) {
        if (files == null) return;
        for (MultipartFile file : files) {
            if (file.isEmpty()) continue;
            String storedName = fileStorageService.store(file);
            Attachment attachment = new Attachment(
                    file.getOriginalFilename(),
                    storedName,
                    file.getContentType(),
                    file.getSize(),
                    post
            );
            post.addAttachment(attachment);
            attachmentRepository.save(attachment);
        }
    }
}
