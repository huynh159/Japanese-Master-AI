package com.japanesemaster.controller;

import com.japanesemaster.service.OcrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ocr")
public class OcrController {

    @Autowired
    private OcrService ocrService;

    @PostMapping("/scan")
    public ResponseEntity<Map<String, Object>> scanOcrImage(@RequestBody Map<String, String> payload) {
        String imageDataUrl = payload.get("imageDataUrl");
        Map<String, Object> result = ocrService.processImage(imageDataUrl);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("result", result);

        return ResponseEntity.ok(response);
    }
}

