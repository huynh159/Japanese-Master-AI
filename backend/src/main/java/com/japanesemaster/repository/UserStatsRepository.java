package com.japanesemaster.repository;

import com.japanesemaster.model.UserStatsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStatsRepository extends JpaRepository<UserStatsEntity, Integer> {
}

