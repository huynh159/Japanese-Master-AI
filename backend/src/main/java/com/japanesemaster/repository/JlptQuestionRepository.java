package com.japanesemaster.repository;

import com.japanesemaster.model.JlptQuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JlptQuestionRepository extends JpaRepository<JlptQuestionEntity, String> {
    List<JlptQuestionEntity> findByJlpt(String jlpt);
    List<JlptQuestionEntity> findByJlptAndCategory(String jlpt, String category);
}

