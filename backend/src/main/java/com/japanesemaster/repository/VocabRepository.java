package com.japanesemaster.repository;

import com.japanesemaster.model.VocabEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VocabRepository extends JpaRepository<VocabEntity, String> {

    List<VocabEntity> findAllByOrderByCreatedAtDesc();

    @Query("SELECT DISTINCT v FROM VocabEntity v LEFT JOIN v.meanings m WHERE " +
           "(:jlpt = 'ALL' OR v.jlpt = :jlpt) AND " +
           "(:q IS NULL OR :q = '' OR LOWER(v.word) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(v.reading) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(v.romaji) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(v.hanViet) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(m) LIKE LOWER(CONCAT('%', :q, '%')))")
    List<VocabEntity> searchVocab(@Param("q") String q, @Param("jlpt") String jlpt);
}

