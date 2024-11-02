package com.brandlogo.java_react.logo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Table(name = "generation_log")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class GenerationLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String api_key;
    private String brand_nm;
    private String brand_summary;
    private String business;
    private String logo_style;
    private String logo_type;
}
