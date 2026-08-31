package com.japanesemaster.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "vocab")
public class VocabEntity {

    @Id
    private String id;

    @Column(nullable = false)
    private String word;

    @Column(nullable = false)
    private String reading;

    @Column(nullable = false)
    private String romaji;

    @Column(name = "han_viet")
    private String hanViet;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "vocab_meanings", joinColumns = @JoinColumn(name = "vocab_id"))
    @Column(name = "meaning")
    private List<String> meanings;

    @Column(nullable = false, length = 10)
    private String jlpt = "N5";

    @Column(nullable = false, length = 50)
    private String type = "Noun";

    @Column(name = "pitch_accent")
    private String pitchAccent;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public VocabEntity() {}

    public VocabEntity(String id, String word, String reading, String romaji, String hanViet, List<String> meanings, String jlpt, String type, String pitchAccent) {
        this.id = id;
        this.word = word;
        this.reading = reading;
        this.romaji = romaji;
        this.hanViet = hanViet;
        this.meanings = meanings;
        this.jlpt = jlpt;
        this.type = type;
        this.pitchAccent = pitchAccent;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getWord() { return word; }
    public void setWord(String word) { this.word = word; }

    public String getReading() { return reading; }
    public void setReading(String reading) { this.reading = reading; }

    public String getRomaji() { return romaji; }
    public void setRomaji(String romaji) { this.romaji = romaji; }

    public String getHanViet() { return hanViet; }
    public void setHanViet(String hanViet) { this.hanViet = hanViet; }

    public List<String> getMeanings() { return meanings; }
    public void setMeanings(List<String> meanings) { this.meanings = meanings; }

    public String getJlpt() { return jlpt; }
    public void setJlpt(String jlpt) { this.jlpt = jlpt; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getPitchAccent() { return pitchAccent; }
    public void setPitchAccent(String pitchAccent) { this.pitchAccent = pitchAccent; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

