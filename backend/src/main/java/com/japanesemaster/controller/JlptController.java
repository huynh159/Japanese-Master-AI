package com.japanesemaster.controller;

import com.japanesemaster.model.ExamResultEntity;
import com.japanesemaster.model.JlptQuestionEntity;
import com.japanesemaster.repository.ExamResultRepository;
import com.japanesemaster.repository.JlptQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/jlpt")
public class JlptController {

    @Autowired
    private JlptQuestionRepository jlptQuestionRepository;

    @Autowired
    private ExamResultRepository examResultRepository;

    @GetMapping("/questions")
    public ResponseEntity<Map<String, Object>> getQuestions(
            @RequestParam(name = "level", defaultValue = "N5") String level,
            @RequestParam(name = "category", defaultValue = "all") String category) {

        List<JlptQuestionEntity> questions;
        if ("all".equalsIgnoreCase(category)) {
            questions = jlptQuestionRepository.findByJlpt(level);
        } else {
            questions = jlptQuestionRepository.findByJlptAndCategory(level, category);
        }

        if (questions.isEmpty()) {
            questions = jlptQuestionRepository.findByJlpt("N5");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("source", "PostgreSQL Database (Java Spring Boot)");
        response.put("total", questions.size());
        response.put("questions", questions);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitExam(@RequestBody Map<String, Object> payload) {
        List<Map<String, Object>> questions = (List<Map<String, Object>>) payload.get("questions");
        Map<String, Integer> userAnswers = (Map<String, Integer>) payload.get("userAnswers");
        Integer timeSpentSeconds = (Integer) payload.get("timeSpentSeconds");
        String level = (String) payload.get("level");

        int correctCount = 0;
        if (questions != null) {
            for (Map<String, Object> q : questions) {
                String qId = (String) q.get("id");
                Integer correctAns = (Integer) q.get("correctAnswer");
                if (userAnswers != null && userAnswers.containsKey(qId) && userAnswers.get(qId).equals(correctAns)) {
                    correctCount++;
                }
            }
        }

        int total = questions != null && !questions.isEmpty() ? questions.size() : 1;
        int percentage = Math.round(((float) correctCount / total) * 100);
        boolean passed = percentage >= 60;
        String targetLevel = level != null ? level : "N5";
        int timeSpent = timeSpentSeconds != null ? timeSpentSeconds : 0;

        // Save into PostgreSQL exam_results table
        ExamResultEntity resultEntity = new ExamResultEntity(targetLevel, correctCount, total, percentage, passed, timeSpent);
        examResultRepository.save(resultEntity);

        Map<String, Object> resultData = new HashMap<>();
        resultData.put("jlpt", targetLevel);
        resultData.put("score", correctCount);
        resultData.put("totalQuestions", total);
        resultData.put("percentage", percentage);
        resultData.put("passed", passed);
        resultData.put("timeSpentSeconds", timeSpent);
        resultData.put("date", LocalDate.now().toString());

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("result", resultData);

        return ResponseEntity.ok(response);
    }
}

