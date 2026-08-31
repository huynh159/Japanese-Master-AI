package com.japanesemaster.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getHealthStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "ok");
        response.put("architecture", "3-Tier Client-Server (React Frontend + Java Spring Boot Backend + PostgreSQL Database)");
        response.put("server", "Japanese Master AI - Java Spring Boot RESTful API Server");
        response.put("version", "1.0.0");

        Map<String, Object> dbStatus = new HashMap<>();
        dbStatus.put("type", "PostgreSQL");

        try (Connection connection = dataSource.getConnection()) {
            dbStatus.put("connected", true);
            dbStatus.put("catalog", connection.getCatalog());
            dbStatus.put("mode", "Active PostgreSQL Mode");
        } catch (Exception e) {
            dbStatus.put("connected", false);
            dbStatus.put("error", e.getMessage());
            dbStatus.put("mode", "Fallback Memory Mode");
        }

        response.put("database", dbStatus);
        response.put("timestamp", Instant.now().toString());

        return ResponseEntity.ok(response);
    }
}

