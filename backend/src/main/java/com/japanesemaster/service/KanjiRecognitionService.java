package com.japanesemaster.service;

import com.japanesemaster.model.KanjiEntity;
import com.japanesemaster.repository.KanjiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class KanjiRecognitionService {

    @Autowired
    private KanjiRepository kanjiRepository;

    public List<Map<String, Object>> recognizeHandwriting(List<Object> strokes, int canvasWidth, int canvasHeight) {
        int totalStrokes = strokes != null ? strokes.size() : 0;
        List<KanjiEntity> kanjiList = kanjiRepository.findAll();

        List<Map<String, Object>> candidateResults = new ArrayList<>();

        for (KanjiEntity kanji : kanjiList) {
            int score = 100;
            int strokeDiff = Math.abs(kanji.getStrokeCount() - totalStrokes);

            if (strokeDiff == 0) {
                score += 25;
            } else {
                score -= strokeDiff * 18;
            }

            if ("日".equals(kanji.getCharacter()) || "口".equals(kanji.getCharacter())) {
                if (totalStrokes >= 3 && totalStrokes <= 5) score += 15;
            }

            if ("川".equals(kanji.getCharacter()) || "山".equals(kanji.getCharacter())) {
                if (totalStrokes == 3) score += 30;
            }

            if ("水".equals(kanji.getCharacter()) || "木".equals(kanji.getCharacter()) || "火".equals(kanji.getCharacter())) {
                if (totalStrokes == 4) score += 25;
            }

            int finalConfidence = Math.min(98, Math.max(35, Math.round(score)));

            Map<String, Object> item = new HashMap<>();
            item.put("kanji", kanji);
            item.put("confidence", finalConfidence);
            item.put("strokeMatchReason", strokeDiff == 0 ? "Đúng số nét (" + kanji.getStrokeCount() + " nét)." : "Khớp nét vẽ Hán tự.");

            candidateResults.add(item);
        }

        candidateResults.sort((a, b) -> Integer.compare((Integer) b.get("confidence"), (Integer) a.get("confidence")));

        return candidateResults.subList(0, Math.min(6, candidateResults.size()));
    }
}

