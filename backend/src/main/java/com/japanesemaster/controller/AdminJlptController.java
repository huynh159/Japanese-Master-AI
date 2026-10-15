package com.japanesemaster.controller;

import com.japanesemaster.model.JlptQuestionEntity;
import com.japanesemaster.repository.JlptQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/admin/jlpt")
@PreAuthorize("hasRole('ADMIN')")
public class AdminJlptController {

    @Autowired
    private JlptQuestionRepository jlptQuestionRepository;

    @GetMapping("/questions")
    public ResponseEntity<Map<String, Object>> getAllQuestions(
            @RequestParam(name = "level", required = false) String level,
            @RequestParam(name = "category", required = false) String category) {

        List<JlptQuestionEntity> questions;
        if (level != null && !level.isEmpty() && !"ALL".equalsIgnoreCase(level)) {
            if (category != null && !category.isEmpty() && !"ALL".equalsIgnoreCase(category)) {
                questions = jlptQuestionRepository.findByJlptAndCategory(level, category);
            } else {
                questions = jlptQuestionRepository.findByJlpt(level);
            }
        } else {
            questions = jlptQuestionRepository.findAll();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("total", questions.size());
        response.put("questions", questions);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/questions")
    public ResponseEntity<Map<String, Object>> createQuestion(@RequestBody JlptQuestionEntity question) {
        if (question.getId() == null || question.getId().trim().isEmpty()) {
            question.setId("q-" + (question.getJlpt() != null ? question.getJlpt().toLowerCase() : "n5") + "-" + System.currentTimeMillis());
        }

        JlptQuestionEntity saved = jlptQuestionRepository.save(question);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Thêm câu hỏi mới thành công (Java Spring Boot)!");
        response.put("question", saved);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/questions/bulk")
    public ResponseEntity<Map<String, Object>> bulkCreateQuestions(@RequestBody Map<String, Object> payload) {
        List<Map<String, Object>> questionsList = (List<Map<String, Object>>) payload.get("questions");
        List<JlptQuestionEntity> savedList = new ArrayList<>();

        if (questionsList != null) {
            for (int i = 0; i < questionsList.size(); i++) {
                Map<String, Object> item = questionsList.get(i);
                String jlpt = item.get("jlpt") != null ? item.get("jlpt").toString() : "N5";
                String category = item.get("category") != null ? item.get("category").toString() : "vocab";
                String questionText = item.get("question") != null ? item.get("question").toString() : "Câu hỏi mới";
                String readingContext = item.get("readingContext") != null ? item.get("readingContext").toString() : "";
                String audioPromptUrl = item.get("audioPromptUrl") != null ? item.get("audioPromptUrl").toString() : "";
                List<String> options = item.get("options") instanceof List ? (List<String>) item.get("options") : Arrays.asList("A", "B", "C", "D");
                int correctAnswer = item.get("correctAnswer") != null ? Integer.parseInt(item.get("correctAnswer").toString()) : 0;
                String explanation = item.get("explanation") != null ? item.get("explanation").toString() : "";
                String grammarPoint = item.get("grammarPoint") != null ? item.get("grammarPoint").toString() : "";

                String id = item.get("id") != null ? item.get("id").toString() : "q-" + jlpt.toLowerCase() + "-" + System.currentTimeMillis() + "-" + i;

                JlptQuestionEntity qEntity = new JlptQuestionEntity(id, jlpt, category, questionText, readingContext, audioPromptUrl, options, correctAnswer, explanation, grammarPoint);
                savedList.add(jlptQuestionRepository.save(qEntity));
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Đã nạp thành công " + savedList.size() + " câu hỏi đề thi (Java Spring Boot)!");
        response.put("count", savedList.size());
        response.put("questions", savedList);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/questions/{id}")
    public ResponseEntity<Map<String, Object>> deleteQuestion(@PathVariable String id) {
        if (jlptQuestionRepository.existsById(id)) {
            jlptQuestionRepository.deleteById(id);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Đã xóa câu hỏi đề thi thành công!");
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Không tìm thấy câu hỏi để xóa!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
