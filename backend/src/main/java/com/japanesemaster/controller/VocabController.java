package com.japanesemaster.controller;

import com.japanesemaster.model.VocabEntity;
import com.japanesemaster.repository.VocabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/vocab")
public class VocabController {

    @Autowired
    private VocabRepository vocabRepository;

    // 1. READ ALL - GET /api/vocab
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllVocab() {
        List<VocabEntity> list = vocabRepository.findAllByOrderByCreatedAtDesc();
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("total", list.size());
        res.put("data", list);
        return ResponseEntity.ok(res);
    }

    // 2. READ ONE - GET /api/vocab/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getVocabById(@PathVariable String id) {
        Optional<VocabEntity> found = vocabRepository.findById(id);
        Map<String, Object> res = new HashMap<>();
        if (found.isPresent()) {
            res.put("success", true);
            res.put("data", found.get());
            return ResponseEntity.ok(res);
        } else {
            res.put("success", false);
            res.put("message", "Không tìm thấy từ vựng!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    // 3. CREATE - POST /api/vocab
    @PostMapping
    public ResponseEntity<Map<String, Object>> createVocab(@RequestBody VocabEntity vocab) {
        if (vocab.getId() == null || vocab.getId().trim().isEmpty()) {
            vocab.setId("vocab-" + System.currentTimeMillis());
        }
        VocabEntity saved = vocabRepository.save(vocab);
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("message", "Thêm từ vựng mới thành công!");
        res.put("data", saved);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    // 4. UPDATE - PUT /api/vocab/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateVocab(@PathVariable String id, @RequestBody VocabEntity updated) {
        Optional<VocabEntity> existingOpt = vocabRepository.findById(id);
        Map<String, Object> res = new HashMap<>();
        if (existingOpt.isPresent()) {
            VocabEntity existing = existingOpt.get();
            if (updated.getWord() != null) existing.setWord(updated.getWord());
            if (updated.getReading() != null) existing.setReading(updated.getReading());
            if (updated.getRomaji() != null) existing.setRomaji(updated.getRomaji());
            if (updated.getHanViet() != null) existing.setHanViet(updated.getHanViet());
            if (updated.getMeanings() != null) existing.setMeanings(updated.getMeanings());
            if (updated.getJlpt() != null) existing.setJlpt(updated.getJlpt());
            if (updated.getType() != null) existing.setType(updated.getType());

            VocabEntity saved = vocabRepository.save(existing);
            res.put("success", true);
            res.put("message", "Cập nhật từ vựng thành công!");
            res.put("data", saved);
            return ResponseEntity.ok(res);
        } else {
            res.put("success", false);
            res.put("message", "Từ vựng không tồn tại để sửa!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    // 5. DELETE - DELETE /api/vocab/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteVocab(@PathVariable String id) {
        Optional<VocabEntity> existingOpt = vocabRepository.findById(id);
        Map<String, Object> res = new HashMap<>();
        if (existingOpt.isPresent()) {
            vocabRepository.deleteById(id);
            res.put("success", true);
            res.put("message", "Đã xóa từ vựng thành công!");
            return ResponseEntity.ok(res);
        } else {
            res.put("success", false);
            res.put("message", "Từ vựng không tồn tại để xóa!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }
}

