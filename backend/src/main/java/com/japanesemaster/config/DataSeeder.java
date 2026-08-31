package com.japanesemaster.config;

import com.japanesemaster.model.JlptQuestionEntity;
import com.japanesemaster.model.KanjiEntity;
import com.japanesemaster.model.UserStatsEntity;
import com.japanesemaster.model.VocabEntity;
import com.japanesemaster.repository.JlptQuestionRepository;
import com.japanesemaster.repository.KanjiRepository;
import com.japanesemaster.repository.UserStatsRepository;
import com.japanesemaster.repository.VocabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private KanjiRepository kanjiRepository;

    @Autowired
    private VocabRepository vocabRepository;

    @Autowired
    private JlptQuestionRepository jlptQuestionRepository;

    @Autowired
    private UserStatsRepository userStatsRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("🌱 [Spring Boot Seeder] Đang kiểm tra & khởi tạo dữ liệu ban đầu cho PostgreSQL DB...");

        // 1. Seed Kanji
        if (kanjiRepository.count() == 0) {
            kanjiRepository.save(new KanjiEntity("日", "NHẬT", Arrays.asList("ニチ", "ジツ"), Arrays.asList("ひ", "か"), Arrays.asList("Mặt trời", "Ngày", "Nhật Bản"), "N5", 4, "日 (Nhật)", "Hình ảnh khung cửa sổ rọi ánh nắng mặt trời rực rỡ buổi sáng."));
            kanjiRepository.save(new KanjiEntity("月", "NGUYỆT", Arrays.asList("ゲツ", "ガツ"), Arrays.asList("つき"), Arrays.asList("Mặt trăng", "Tháng"), "N5", 4, "月 (Nguyệt)", "Hình dáng lưỡi liềm mỏng manh của mặt trăng trên bầu trời đêm."));
            kanjiRepository.save(new KanjiEntity("水", "THỦY", Arrays.asList("スイ"), Arrays.asList("みず"), Arrays.asList("Nước"), "N5", 4, "水 (Thủy)", "Dòng nước suối chảy xiết vượt qua các gờ đá ở giữa núi."));
            kanjiRepository.save(new KanjiEntity("火", "HỎA", Arrays.asList("カ"), Arrays.asList("ひ"), Arrays.asList("Lửa"), "N5", 4, "火 (Hỏa)", "Ngọn lửa trại bùng cháy với hai tia lửa bắn ra xung quanh."));
            kanjiRepository.save(new KanjiEntity("木", "MỘC", Arrays.asList("モク", "ボク"), Arrays.asList("き"), Arrays.asList("Cây", "Gỗ"), "N5", 4, "木 (Mộc)", "Cây xanh đứng thẳng với cành lá tán rộng 2 bên và rễ đâm sâu vào đất."));
            kanjiRepository.save(new KanjiEntity("山", "SƠN", Arrays.asList("サン", "セン"), Arrays.asList("やま"), Arrays.asList("Núi"), "N5", 3, "山 (Sơn)", "Ba đỉnh núi trùng điệp vươn cao lên bầu trời."));
            kanjiRepository.save(new KanjiEntity("川", "XUYÊN", Arrays.asList("セン"), Arrays.asList("かわ"), Arrays.asList("Sông"), "N5", 3, "川 (Xuyên)", "Ba dòng sông chảy song song qua thung lũng."));
            System.out.println("✅ [Spring Boot Seeder] Đã khởi tạo dữ liệu Kanji mẫu thành công.");
        }

        // 2. Seed Vocab
        if (vocabRepository.count() == 0) {
            vocabRepository.save(new VocabEntity("v-n5-1", "日本語", "にほんご", "nihongo", "NHẬT BẢN NGỮ", Arrays.asList("Tiếng Nhật"), "N5", "Danh từ", "0 (Heiban)"));
            vocabRepository.save(new VocabEntity("v-n5-2", "勉強", "べんきょう", "benkyou", "MIỄN CƯỜNG", Arrays.asList("Học tập", "Nghiên cứu"), "N5", "Danh từ / Động từ Suru", "0 (Heiban)"));
            vocabRepository.save(new VocabEntity("v-n5-3", "食べる", "たべる", "taberu", "THỰC", Arrays.asList("Ăn"), "N5", "Động từ nhóm 2", "2 (Nakadaka)"));
            vocabRepository.save(new VocabEntity("v-n5-4", "友達", "ともだち", "tomodachi", "HỮU ĐẠT", Arrays.asList("Bạn bè"), "N5", "Danh từ", "0 (Heiban)"));
            System.out.println("✅ [Spring Boot Seeder] Đã khởi tạo dữ liệu Từ vựng mẫu thành công.");
        }

        // 3. Seed JLPT Questions
        if (jlptQuestionRepository.count() == 0) {
            jlptQuestionRepository.save(new JlptQuestionEntity("q-n5-1", "N5", "vocab", "「毎朝、パンを（　　）コーヒーを飲みます。」に入る最もよいものを一つ選びなさい。", null, null, Arrays.asList("食べて", "食て", "飲んで", "行きて"), 0, "Dùng thể Te (て) của động từ 食べる (たべる -> 食べて) để nối hai hành động liên tiếp.", "Động từ thể Te (Vて) nối hành động."));
            jlptQuestionRepository.save(new JlptQuestionEntity("q-n5-2", "N5", "grammar", "「昨日、図書館（　　）本を三冊借りました。」に入る trợ từ thích hợp:", null, null, Arrays.asList("で", "に", "へ", "を"), 0, "Trợ từ で đi sau địa điểm diễn ra hành động (mượn sách ở thư viện).", "Trợ từ で chỉ địa điểm hành động."));
            jlptQuestionRepository.save(new JlptQuestionEntity("q-n5-3", "N5", "reading", "Đoạn văn: 「田中さんは毎朝7時に起きます。日曜日には会社へ行きません。」\nHỏi: 田中さんは日曜日に何時に会社へ行きますか。", null, null, Arrays.asList("行きません", "7時に行きます", "8時に行きます", "わかりません"), 0, "Đoạn văn ghi rõ: 「日曜日には会社へ行きません」 (Chủ nhật không đến công ty).", "Đọc hiểu cơ bản N5."));
            jlptQuestionRepository.save(new JlptQuestionEntity("q-n5-4", "N5", "listening", "🔊 Audio bài nghe đàm thoại:\nNam: 「すみません、この時計はいくらですか。」\nNữ: 「それは三千円です。」\nHỏi: 時計はいくらですか。", null, null, Arrays.asList("3000円", "300円", "30000円", "3500円"), 0, "三千円 (さんぜんえん) = 3000 Yên.", "Đếm số tiền tiếng Nhật."));
            System.out.println("✅ [Spring Boot Seeder] Đã khởi tạo dữ liệu Đề thi JLPT mẫu thành công.");
        }

        // 4. Seed User Stats
        if (userStatsRepository.count() == 0) {
            userStatsRepository.save(new UserStatsEntity());
            System.out.println("✅ [Spring Boot Seeder] Đã khởi tạo bảng User Stats ban đầu.");
        }
    }
}

