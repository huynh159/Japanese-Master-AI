package com.japanesemaster.repository;

import com.japanesemaster.model.KanjiEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KanjiRepository extends JpaRepository<KanjiEntity, Long> {
    List<KanjiEntity> findByJlpt(String jlpt);
    Optional<KanjiEntity> findByCharacter(String character);
}

