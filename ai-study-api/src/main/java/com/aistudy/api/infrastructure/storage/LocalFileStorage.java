package com.aistudy.api.infrastructure.storage;

import com.aistudy.api.application.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Component
public class LocalFileStorage implements FileStorageService {

    @Value("${app.file.upload-dir:./uploads}")
    private String uploadDir;

    private Path rootPath;

    @PostConstruct
    public void init() {
        rootPath = Path.of(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(rootPath);
        } catch (IOException e) {
            throw new RuntimeException("업로드 디렉토리를 생성할 수 없습니다: " + rootPath, e);
        }
    }

    @Override
    public String store(MultipartFile file) {
        String ext = extractExtension(file.getOriginalFilename());
        String storedName = UUID.randomUUID() + ext;
        try {
            Path target = rootPath.resolve(storedName).normalize();
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            return storedName;
        } catch (IOException e) {
            throw new RuntimeException("파일 저장 실패: " + file.getOriginalFilename(), e);
        }
    }

    @Override
    public Resource load(String storedName) {
        try {
            Path file = rootPath.resolve(storedName).normalize();
            Resource resource = new UrlResource(file.toUri());
            if (!resource.exists()) {
                throw new RuntimeException("파일을 찾을 수 없습니다: " + storedName);
            }
            return resource;
        } catch (MalformedURLException e) {
            throw new RuntimeException("파일 로드 실패: " + storedName, e);
        }
    }

    @Override
    public void delete(String storedName) {
        try {
            Path file = rootPath.resolve(storedName).normalize();
            Files.deleteIfExists(file);
        } catch (IOException e) {
            // 삭제 실패는 로그만 남기고 진행
        }
    }

    private String extractExtension(String filename) {
        if (filename == null) return "";
        int dot = filename.lastIndexOf('.');
        return dot >= 0 ? filename.substring(dot) : "";
    }
}
