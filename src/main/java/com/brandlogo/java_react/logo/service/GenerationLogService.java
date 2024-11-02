package com.brandlogo.java_react.logo.service;

import com.brandlogo.java_react.logo.model.GenerationLog;
import com.brandlogo.java_react.logo.repository.GenerationLogRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class GenerationLogService {
    private GenerationLogRepository generationLogRepository;

    // 데이터 저장 메서드
    public GenerationLog postData(GenerationLog generationLog) {
        return generationLogRepository.save(generationLog); // 데이터 저장
    }
}
