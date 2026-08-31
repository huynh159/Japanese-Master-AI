package com.japanesemaster.service;

import org.springframework.stereotype.Service;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class AiService {

    public Map<String, Object> generateKaiwaResponse(String userText, String tone) {
        String japanese;
        String reading;
        String vietnamese;

        if ("sensei".equalsIgnoreCase(tone)) {
            japanese = "素晴らしいですね！日本語の発音がとても上手です。今日も一緒に頑張りましょう！";
            reading = "すばらしいですね！にほんごのはつおんがとてもじょうずです。きょうもいっしょにがんばりましょう！";
            vietnamese = "Tuyệt vời lắm! Phát âm tiếng Nhật của em rất tốt. Hôm nay chúng ta cũng hãy cùng nhau cố gắng nhé!";
        } else if ("anime".equalsIgnoreCase(tone)) {
            japanese = "よーし、その意気だぞ！オレと一緒に日本語の王様を目指そうぜ！";
            reading = "よーし、そのいきだぞ！おれといっしょににほんごのおうさまをめざそうぜ！";
            vietnamese = "Được lắm, tinh thần tốt đấy! Cùng tớ tiến tới mục tiêu trở thành Vua Tiếng Nhật nào!";
        } else if ("business".equalsIgnoreCase(tone)) {
            japanese = "承知いたしました。本日もビジネス日本語の習得に向けてサポートさせていただきます。";
            reading = "しょうちいたしました。ほんじつもびじねすにほんごのしゅうとくにむけてさぽーとさせていただきます。";
            vietnamese = "Tôi đã rõ. Hôm nay tôi xin phép tiếp tục hỗ trợ quý vị rèn luyện tiếng Nhật thương mại.";
        } else {
            japanese = "へえ、そうなんだ！最近日本語の勉強はどう？何が一番難しい？";
            reading = "へえ、そうなんだ！さいきんにほんごのべんきょうはどう？なにがいちばんむずかしい？";
            vietnamese = "Ồ ra vậy sao! Dạo này học tiếng Nhật thế nào rồi? Cái gì là khó nhất vậy?";
        }

        boolean hasError = false;
        String original = userText != null ? userText : "";
        String corrected = original;
        String explanation = "";

        if (original.contains("私行く") || original.contains("私たべます")) {
            hasError = true;
            corrected = original.replace("私行く", "私が行きます").replace("私たべます", " meが食べます");
            explanation = "Thiếu trợ từ 「が」 hoặc 「は」 sau chủ ngữ 「私」 và nên chia động từ sang thể lịch sự (-masu).";
        }

        Map<String, Object> grammarCorrection = new HashMap<>();
        grammarCorrection.put("hasError", hasError);
        grammarCorrection.put("original", original);
        grammarCorrection.put("corrected", corrected);
        grammarCorrection.put("explanation", explanation);

        Map<String, Object> response = new HashMap<>();
        response.put("id", "ai-msg-" + System.currentTimeMillis());
        response.put("sender", "ai");
        response.put("japanese", japanese);
        response.put("reading", reading);
        response.put("vietnamese", vietnamese);
        response.put("grammarCorrection", grammarCorrection);
        response.put("timestamp", LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm")));

        return response;
    }

    public Map<String, Object> deconstructSentence(String sentence) {
        String cleanSentence = sentence != null ? sentence.trim() : "";

        List<Map<String, String>> tokens = new ArrayList<>();
        
        Map<String, String> t1 = new HashMap<>();
        t1.put("word", "私");
        t1.put("reading", "わたし");
        t1.put("role", "Chủ ngữ");
        t1.put("meaning", "Tôi");
        t1.put("particleInfo", "Trợ từ は (Wa)");
        tokens.add(t1);

        Map<String, String> t2 = new HashMap<>();
        t2.put("word", "毎日");
        t2.put("reading", "まいにち");
        t2.put("role", "Trạng từ");
        t2.put("meaning", "Mỗi ngày");
        tokens.add(t2);

        Map<String, String> t3 = new HashMap<>();
        t3.put("word", "日本語");
        t3.put("reading", "にほんご");
        t3.put("role", "Tân ngữ");
        t3.put("meaning", "Tiếng Nhật");
        t3.put("particleInfo", "Trợ từ を (O)");
        tokens.add(t3);

        Map<String, String> t4 = new HashMap<>();
        t4.put("word", "勉強します");
        t4.put("reading", "べんきょうします");
        t4.put("role", "Động từ chính");
        t4.put("meaning", "Học tập");
        tokens.add(t4);

        Map<String, Object> analysis = new HashMap<>();
        analysis.put("originalSentence", cleanSentence);
        analysis.put("fullFurigana", "わたし は まいにち にほんご を べんきょう します。");
        analysis.put("vietnameseTranslation", "Tôi học tiếng Nhật mỗi ngày.");
        analysis.put("pitchAccentType", "Nhấn âm Heiban (0) ở cuối câu.");
        analysis.put("tokens", tokens);

        return analysis;
    }
}

