package com.japanesemaster.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class OcrService {

    public Map<String, Object> processImage(String imageDataUrl) {
        Map<String, Object> result = new HashMap<>();
        result.put("rawText", "日本語の勉強はとても面白いです。毎日新しい言葉を覚えます。");
        result.put("extractedTitle", "Đoạn văn tiếng Nhật mẫu từ OCR");
        result.put("confidence", 96.5);

        List<Map<String, Object>> detectedVocab = new ArrayList<>();
        
        Map<String, Object> v1 = new HashMap<>();
        v1.put("word", "日本語");
        v1.put("reading", "にほんご");
        v1.put("meaning", "Tiếng Nhật");
        v1.put("jlpt", "N5");
        detectedVocab.add(v1);

        Map<String, Object> v2 = new HashMap<>();
        v2.put("word", "勉強");
        v2.put("reading", "べんきょう");
        v2.put("meaning", "Học tập");
        v2.put("jlpt", "N5");
        detectedVocab.add(v2);

        Map<String, Object> v3 = new HashMap<>();
        v3.put("word", "面白い");
        v3.put("reading", "おもしろい");
        v3.put("meaning", "Thú vị");
        v3.put("jlpt", "N5");
        detectedVocab.add(v3);

        result.put("detectedVocab", detectedVocab);
        return result;
    }
}

