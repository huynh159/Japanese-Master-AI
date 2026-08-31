package com.japanesemaster.controller;

import com.japanesemaster.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    @Autowired
    private AiService aiService;

    @PostMapping("/kaiwa")
    public ResponseEntity<Map<String, Object>> generateKaiwa(@RequestBody Map<String, String> payload) {
        String userText = payload.get("userText");
        String tone = payload.get("tone");

        Map<String, Object> message = aiService.generateKaiwaResponse(userText, tone);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/deconstruct")
    public ResponseEntity<Map<String, Object>> deconstructSentence(@RequestBody Map<String, String> payload) {
        String sentence = payload.get("sentence");
        Map<String, Object> analysis = aiService.deconstructSentence(sentence);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("analysis", analysis);

        return ResponseEntity.ok(response);
    }
}

