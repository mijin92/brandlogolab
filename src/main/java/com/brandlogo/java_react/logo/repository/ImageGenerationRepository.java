package com.brandlogo.java_react.logo.repository;

import com.brandlogo.java_react.logo.model.ImageGeneration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageGenerationRepository extends JpaRepository<ImageGeneration, Integer> {
    List<ImageGeneration> findByApiKey(String apiKey);
}
