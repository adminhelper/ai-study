package com.aistudy.api.interfaces.rest;

import com.aistudy.api.application.PostService;
import com.aistudy.api.application.dto.*;
import com.aistudy.api.domain.post.PostType;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping
    public List<PostResponse> list(@RequestParam String type) {
        PostType postType = PostType.valueOf(type.toUpperCase());
        return postService.findByType(postType);
    }

    @GetMapping("/{id}")
    public PostResponse get(@PathVariable Long id) {
        return postService.findById(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public PostResponse create(
            @Valid @RequestPart("post") CreatePostRequest request,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) {
        return postService.create(request, files);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PostResponse update(
            @PathVariable Long id,
            @Valid @RequestPart("post") UpdatePostRequest request,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) {
        return postService.update(id, request, files);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        postService.delete(id);
    }

    @DeleteMapping("/attachments/{attachmentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAttachment(@PathVariable Long attachmentId) {
        postService.deleteAttachment(attachmentId);
    }
}
