package com.japanesemaster.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "jlpt_questions")
public class JlptQuestionEntity {

    @Id
    private String id;

    @Column(nullable = false, length = 10)
    private String jlpt = "N5";

    @Column(nullable = false, length = 50)
    private String category = "vocab";

    @Column(columnDefinition = "TEXT", nullable = false)
    private String question;

    @Column(name = "reading_context", columnDefinition = "TEXT")
    private String readingContext;

    @Column(name = "audio_prompt_url")
    private String audioPromptUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "jlpt_question_options", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "option_text")
    private List<String> options;

    @Column(name = "correct_answer", nullable = false)
    private int correctAnswer = 0;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @Column(name = "grammar_point")
    private String grammarPoint;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public JlptQuestionEntity() {}

    public JlptQuestionEntity(String id, String jlpt, String category, String question, String readingContext, String audioPromptUrl, List<String> options, int correctAnswer, String explanation, String grammarPoint) {
        this.id = id;
        this.jlpt = jlpt;
        this.category = category;
        this.question = question;
        this.readingContext = readingContext;
        this.audioPromptUrl = audioPromptUrl;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.explanation = explanation;
        this.grammarPoint = grammarPoint;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getJlpt() { return jlpt; }
    public void setJlpt(String jlpt) { this.jlpt = jlpt; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getReadingContext() { return readingContext; }
    public void setReadingContext(String readingContext) { this.readingContext = readingContext; }

    public String getAudioPromptUrl() { return audioPromptUrl; }
    public void setAudioPromptUrl(String audioPromptUrl) { this.audioPromptUrl = audioPromptUrl; }

    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }

    public int getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(int correctAnswer) { this.correctAnswer = correctAnswer; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getGrammarPoint() { return grammarPoint; }
    public void setGrammarPoint(String grammarPoint) { this.grammarPoint = grammarPoint; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

