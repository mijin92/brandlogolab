package com.brandlogo.java_react.logo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Table(name = "image_example")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ImageExample {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String image_type;
    private String image_url;
}
