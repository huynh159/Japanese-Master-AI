export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export interface KanjiItem {
  character: string;
  hanViet: string;
  onyomi: string[];
  kunyomi: string[];
  meanings: string[];
  jlpt: JlptLevel;
  strokeCount: number;
  radicals: string;
  examples: { word: string; reading: string; meaning: string }[];
  mnemonic: string;
  strokeOrderHints?: string[];
}

export interface VocabItem {
  id: string;
  word: string;
  reading: string;
  romaji: string;
  hanViet?: string;
  meanings: string[];
  jlpt: JlptLevel;
  type: string;
  exampleSentence?: {
    japanese: string;
    reading: string;
    vietnamese: string;
  };
  pitchAccent?: string;
}

export interface KaiwaMessage {
  id: string;
  sender: 'user' | 'ai';
  japanese: string;
  reading?: string;
  vietnamese: string;
  grammarCorrection?: {
    hasError: boolean;
    original: string;
    corrected: string;
    explanation: string;
  };
  timestamp: string;
}

export type KaiwaTone = 'sensei' | 'anime' | 'business' | 'friend';

export interface ExamQuestion {
  id: string;
  jlpt: JlptLevel;
  category: 'vocab' | 'grammar' | 'reading' | 'listening';
  question: string;
  readingContext?: string;
  audioPromptUrl?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  grammarPoint?: string;
}

export interface ExamResult {
  jlpt: JlptLevel;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  categoryScores: {
    vocab: number;
    grammar: number;
    reading: number;
    listening: number;
  };
  timeSpentSeconds: number;
  date: string;
}

export interface OcrWordMatch {
  word: string;
  reading: string;
  meaning: string;
  jlpt: JlptLevel;
  foundInText: boolean;
}

export interface OcrResult {
  rawText: string;
  annotatedText: { text: string; reading?: string; isWord: boolean }[];
  extractedVocab: OcrWordMatch[];
  detectedLevel?: JlptLevel;
}
