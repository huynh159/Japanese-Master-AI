package com.japanesemaster.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_stats")
public class UserStatsEntity {

    @Id
    private Integer id = 1;

    private int xp = 1250;

    @Column(name = "streak_days")
    private int streakDays = 5;

    @Column(name = "current_level_title")
    private String currentLevelTitle = "Vua Tiếng Nhật (Tập Sự)";

    @Column(name = "cards_mastered")
    private int cardsMastered = 48;

    @Column(name = "kanji_mastered")
    private int kanjiMastered = 18;

    @Column(name = "exams_completed")
    private int examsCompleted = 3;

    @Column(name = "target_level")
    private String targetLevel = "N3";

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public UserStatsEntity() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public int getXp() { return xp; }
    public void setXp(int xp) { this.xp = xp; }

    public int getStreakDays() { return streakDays; }
    public void setStreakDays(int streakDays) { this.streakDays = streakDays; }

    public String getCurrentLevelTitle() { return currentLevelTitle; }
    public void setCurrentLevelTitle(String currentLevelTitle) { this.currentLevelTitle = currentLevelTitle; }

    public int getCardsMastered() { return cardsMastered; }
    public void setCardsMastered(int cardsMastered) { this.cardsMastered = cardsMastered; }

    public int getKanjiMastered() { return kanjiMastered; }
    public void setKanjiMastered(int kanjiMastered) { this.kanjiMastered = kanjiMastered; }

    public int getExamsCompleted() { return examsCompleted; }
    public void setExamsCompleted(int examsCompleted) { this.examsCompleted = examsCompleted; }

    public String getTargetLevel() { return targetLevel; }
    public void setTargetLevel(String targetLevel) { this.targetLevel = targetLevel; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

