package com.japanesemaster.repository;

import com.japanesemaster.model.ExamResultEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ExamResultRepository extends JpaRepository<ExamResultEntity, UUID> {
}

