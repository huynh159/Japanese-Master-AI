-- ===================================================
-- Vua Tiếng Nhật AI - PostgreSQL Database Schema
-- ===================================================

-- Create Extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: kanji (Quản lý từ điển Hán tự)
CREATE TABLE IF NOT EXISTS kanji (
  id SERIAL PRIMARY KEY,
  character VARCHAR(10) NOT NULL UNIQUE,
  han_viet VARCHAR(50) NOT NULL,
  onyomi TEXT[] DEFAULT '{}',
  kunyomi TEXT[] DEFAULT '{}',
  meanings TEXT[] DEFAULT '{}',
  jlpt VARCHAR(10) NOT NULL DEFAULT 'N5',
  stroke_count INT NOT NULL DEFAULT 1,
  radicals VARCHAR(50),
  mnemonic TEXT,
  examples JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table: vocab (Quản lý từ vựng tiếng Nhật)
CREATE TABLE IF NOT EXISTS vocab (
  id VARCHAR(50) PRIMARY KEY,
  word VARCHAR(100) NOT NULL,
  reading VARCHAR(100) NOT NULL,
  romaji VARCHAR(100) NOT NULL,
  han_viet VARCHAR(100),
  meanings TEXT[] NOT NULL DEFAULT '{}',
  jlpt VARCHAR(10) NOT NULL DEFAULT 'N5',
  type VARCHAR(50) NOT NULL DEFAULT 'Noun',
  pitch_accent VARCHAR(50),
  example_sentence JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table: jlpt_questions (Ngân hàng câu hỏi đề thi JLPT N5 - N1)
CREATE TABLE IF NOT EXISTS jlpt_questions (
  id VARCHAR(50) PRIMARY KEY,
  jlpt VARCHAR(10) NOT NULL DEFAULT 'N5',
  category VARCHAR(50) NOT NULL DEFAULT 'vocab', -- 'vocab' | 'grammar' | 'reading' | 'listening'
  question TEXT NOT NULL,
  reading_context TEXT,
  audio_prompt_url TEXT,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_answer INT NOT NULL DEFAULT 0,
  explanation TEXT,
  grammar_point TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table: exam_results (Lưu kết quả bài thi JLPT)
CREATE TABLE IF NOT EXISTS exam_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  jlpt VARCHAR(10) NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  percentage INT NOT NULL,
  passed BOOLEAN NOT NULL,
  time_spent_seconds INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Table: user_stats (Thống kê tiến trình học viên)
CREATE TABLE IF NOT EXISTS user_stats (
  id INT PRIMARY KEY DEFAULT 1,
  xp INT NOT NULL DEFAULT 1250,
  streak_days INT NOT NULL DEFAULT 5,
  current_level_title VARCHAR(100) DEFAULT 'Vua Tiếng Nhật (Tập Sự)',
  cards_mastered INT DEFAULT 48,
  kanji_mastered INT DEFAULT 18,
  exams_completed INT DEFAULT 3,
  target_level VARCHAR(10) DEFAULT 'N3',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for high-performance searching
CREATE INDEX IF NOT EXISTS idx_kanji_jlpt ON kanji(jlpt);
CREATE INDEX IF NOT EXISTS idx_vocab_jlpt ON vocab(jlpt);
CREATE INDEX IF NOT EXISTS idx_vocab_word ON vocab(word);
CREATE INDEX IF NOT EXISTS idx_vocab_reading ON vocab(reading);
CREATE INDEX IF NOT EXISTS idx_jlpt_questions_level_category ON jlpt_questions(jlpt, category);
