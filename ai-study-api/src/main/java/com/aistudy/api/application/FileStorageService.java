package com.aistudy.api.application;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

/**
 * 파일 저장소 추상화 (DDD 포트)
 */
public interface FileStorageService {

    /** 파일을 저장하고 storedName(저장된 파일명)을 반환한다. */
    String store(MultipartFile file);

    /** storedName으로 파일 리소스를 로드한다. */
    Resource load(String storedName);

    /** storedName에 해당하는 파일을 삭제한다. */
    void delete(String storedName);
}
