package com.brandlogo.java_react.logo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${image.saved.path}")
    private String imageDownloadPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 외부 디렉토리 경로를 URL 경로로 매핑
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:" + imageDownloadPath + "/");
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://ec2-3-39-64-137.ap-northeast-2.compute.amazonaws.com")
                        //.allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
}