package com.brandlogo.java_react.logo.controller;

import com.brandlogo.java_react.logo.model.ImageGeneration;
import com.brandlogo.java_react.logo.service.ImageGenerationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class ImageGenerationController {
    private final ImageGenerationService imageGenerationService;

    @GetMapping(value = "/getGeneratedImage")
    public List<ImageGeneration> getGeneratedImageList(@RequestParam("api_key") String apiKey) {
        return imageGenerationService.getGeneratedImageList(apiKey);
    }
}
