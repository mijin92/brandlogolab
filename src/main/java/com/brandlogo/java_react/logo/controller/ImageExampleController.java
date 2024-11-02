package com.brandlogo.java_react.logo.controller;

import com.brandlogo.java_react.logo.service.ImageExampleService;
import com.brandlogo.java_react.logo.model.ImageExample;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class ImageExampleController {
    private final ImageExampleService imageExampleService;

    @GetMapping(value = "/getExampleImage")
    public List<ImageExample> getExampleImageList() {
        return imageExampleService.getExampleImageList();
    }
}
