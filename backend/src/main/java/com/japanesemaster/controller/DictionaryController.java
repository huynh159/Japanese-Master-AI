package com.japanesemaster.controller;

import com.japanesemaster.model.VocabEntity;
import com.japanesemaster.repository.VocabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dictionary")
public class DictionaryController {

    @Autowired
    private VocabRepository vocabRepository;

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchDictionary(
            @RequestParam(name = "q", defaultValue = "") String q,
            @RequestParam(name = "jlpt", defaultValue = "ALL") String jlpt) {

        String searchQuery = q.trim();
        List<VocabEntity> results = vocabRepository.searchVocab(searchQuery, jlpt);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("source", "PostgreSQL Database (Java Spring Boot)");
        response.put("total", results.size());
        response.put("vocab", results);

        return ResponseEntity.ok(response);
    }
}

