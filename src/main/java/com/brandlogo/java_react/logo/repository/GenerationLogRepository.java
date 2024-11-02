package com.brandlogo.java_react.logo.repository;

import com.brandlogo.java_react.logo.model.GenerationLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenerationLogRepository extends JpaRepository<GenerationLog,Long> {
}
