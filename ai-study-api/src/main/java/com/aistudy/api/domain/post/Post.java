package com.aistudy.api.domain.post;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PostType postType;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private String author;

    private String tags;

    /** Showcase 전용 필드 */
    private String category;
    private String summary;

    @Column(nullable = false)
    private LocalDate createdAt;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Attachment> attachments = new ArrayList<>();

    public Post(PostType postType, String title, String content, String author,
                String tags, String category, String summary) {
        this.postType = postType;
        this.title = title;
        this.content = content;
        this.author = (author == null || author.isBlank()) ? "익명" : author;
        this.tags = tags;
        this.category = category;
        this.summary = summary;
        this.createdAt = LocalDate.now();
    }

    public void update(String title, String content, String author,
                       String tags, String category, String summary) {
        this.title = title;
        this.content = content;
        this.author = (author == null || author.isBlank()) ? "익명" : author;
        this.tags = tags;
        this.category = category;
        this.summary = summary;
    }

    public void addAttachment(Attachment attachment) {
        this.attachments.add(attachment);
    }

    public void removeAttachment(Attachment attachment) {
        this.attachments.remove(attachment);
    }
}
