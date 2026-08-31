package com.japanesemaster.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "kanji")
public class KanjiEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 10)
    private String character;

    @Column(name = "han_viet", nullable = false, length = 50)
    private String hanViet;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "kanji_onyomi", joinColumns = @JoinColumn(name = "kanji_id"))
    @Column(name = "reading")
    private List<String> onyomi;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "kanji_kunyomi", joinColumns = @JoinColumn(name = "kanji_id"))
    @Column(name = "reading")
    private List<String> kunyomi;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "kanji_meanings", joinColumns = @JoinColumn(name = "kanji_id"))
    @Column(name = "meaning")
    private List<String> meanings;

    @Column(nullable = false, length = 10)
    private String jlpt = "N5";

    @Column(name = "stroke_count", nullable = false)
    private int strokeCount = 1;

    @Column(length = 50)
    private String radicals;

    @Column(columnDefinition = "TEXT")
    private String mnemonic;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public KanjiEntity() {}

    public KanjiEntity(String character, String hanViet, List<String> onyomi, List<String> kunyomi, List<String> meanings, String jlpt, int strokeCount, String radicals, String mnemonic) {
        this.character = character;
        this.hanViet = hanViet;
        this.onyomi = onyomi;
        this.kunyomi = kunyomi;
        this.meanings = meanings;
        this.jlpt = jlpt;
        this.strokeCount = strokeCount;
        this.radicals = radicals;
        this.mnemonic = mnemonic;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCharacter() { return character; }
    public void setCharacter(String character) { this.character = character; }

    public String getHanViet() { return hanViet; }
    public void setHanViet(String hanViet) { this.hanViet = hanViet; }

    public List<String> getOnyomi() { return onyomi; }
    public void setOnyomi(List<String> onyomi) { this.onyomi = onyomi; }

    public List<String> getKunyomi() { return kunyomi; }
    public void setKunyomi(List<String> kunyomi) { this.kunyomi = kunyomi; }

    public List<String> getMeanings() { return meanings; }
    public void setMeanings(List<String> meanings) { this.meanings = meanings; }

    public String getJlpt() { return jlpt; }
    public void setJlpt(String jlpt) { this.jlpt = jlpt; }

    public int getStrokeCount() { return strokeCount; }
    public void setStrokeCount(int strokeCount) { this.strokeCount = strokeCount; }

    public String getRadicals() { return radicals; }
    public void setRadicals(String radicals) { this.radicals = radicals; }

    public String getMnemonic() { return mnemonic; }
    public void setMnemonic(String mnemonic) { this.mnemonic = mnemonic; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

