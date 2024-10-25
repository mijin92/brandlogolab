package com.brandlogo.java_react.logo.controller;

import com.brandlogo.java_react.logo.service.ImageExampleService;
import com.brandlogo.java_react.logo.model.ImageExample;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://ec2-3-39-64-137.ap-northeast-2.compute.amazonaws.com:3000")
@RestController
@AllArgsConstructor
public class ImageExampleController {
    private final ImageExampleService imageExampleService;

    @GetMapping(value = "/exampleImage")
    public List<ImageExample> getExampleImageList() {
        return imageExampleService.getExampleImageList();
    }
}
