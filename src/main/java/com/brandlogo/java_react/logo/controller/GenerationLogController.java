package com.brandlogo.java_react.logo.controller;

import com.brandlogo.java_react.logo.model.GenerationLog;
import com.brandlogo.java_react.logo.service.GenerationLogService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class GenerationLogController {
    private final GenerationLogService generationLogService;

    @PostMapping(value = "/postData")
    public GenerationLog postData(@RequestBody GenerationLog generationLog) {
        return generationLogService.postData(generationLog); // 데이터를 저장하고 반환
    }
}
