package com.japanesemaster;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JapaneseMasterApplication {

    public static void main(String[] args) {
        SpringApplication.run(JapaneseMasterApplication.class, args);
        System.out.println("🚀 [Spring Boot Server] Japanese Master AI đang chạy trên cổng http://localhost:5000");
        System.out.println("📌 API Healthcheck: http://localhost:5000/api/health");
    }
}

