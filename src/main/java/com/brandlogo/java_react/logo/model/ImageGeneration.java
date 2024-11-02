package com.brandlogo.java_react.logo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Table(name = "image_generation")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ImageGeneration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String apiKey;
    private String brandFullNm;

    @Column(columnDefinition = "TEXT")
    private String brandFullSummary;

    private String design;
    private String imageDir;
}
