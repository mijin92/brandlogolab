package com.brandlogo.java_react.logo.service;

import com.brandlogo.java_react.logo.model.ImageExample;
import com.brandlogo.java_react.logo.repository.ImageExampleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ImageExampleService {
    private ImageExampleRepository imageExampleRepository;

    public List<ImageExample> getExampleImageList() {
        return imageExampleRepository.findAll();
    }
}
