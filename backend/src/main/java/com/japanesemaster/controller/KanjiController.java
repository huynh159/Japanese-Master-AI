package com.japanesemaster.controller;

import com.japanesemaster.service.KanjiRecognitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/kanji")
public class KanjiController {

    @Autowired
    private KanjiRecognitionService kanjiRecognitionService;

    @PostMapping("/recognize")
    public ResponseEntity<Map<String, Object>> recognizeHandwriting(@RequestBody Map<String, Object> payload) {
        List<Object> strokes = (List<Object>) payload.get("strokes");
        Integer canvasWidth = (Integer) payload.getOrDefault("canvasWidth", 288);
        Integer canvasHeight = (Integer) payload.getOrDefault("canvasHeight", 288);

        List<Map<String, Object>> matches = kanjiRecognitionService.recognizeHandwriting(strokes, canvasWidth, canvasHeight);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("total", matches.size());
        response.put("matches", matches);

        return ResponseEntity.ok(response);
    }
}

