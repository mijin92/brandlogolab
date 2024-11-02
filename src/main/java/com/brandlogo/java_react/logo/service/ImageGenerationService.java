package com.brandlogo.java_react.logo.service;

import com.brandlogo.java_react.logo.model.ImageGeneration;
import com.brandlogo.java_react.logo.repository.ImageGenerationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@AllArgsConstructor
@Service
public class ImageGenerationService {
    private ImageGenerationRepository imageGenerationRepository;

    public List<ImageGeneration> getGeneratedImageList(String apiKey) {
        // api_key가 없을 경우 빈 리스트 반환
        if (apiKey == null || apiKey.isEmpty()) {
            return Collections.emptyList();
        }

        // api_key가 있을 경우 데이터를 가져옴
        return imageGenerationRepository.findByApiKey(apiKey);
    }
}
