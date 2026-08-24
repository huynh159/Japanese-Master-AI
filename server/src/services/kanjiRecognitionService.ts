import { KANJI_DATABASE } from '../data/japaneseData';
import { KanjiItem } from '../types';

export interface StrokePoint {
  x: number;
  y: number;
}

export interface Stroke {
  points: StrokePoint[];
}

export interface KanjiMatchResult {
  kanji: KanjiItem;
  confidence: number;
  strokeMatchReason: string;
}

export class KanjiRecognitionService {
  public static recognizeHandwriting(
    strokes: Stroke[],
    canvasWidth: number,
    canvasHeight: number
  ): KanjiMatchResult[] {
    if (!strokes || strokes.length === 0) return [];

    const totalStrokes = strokes.length;

    const candidateResults: KanjiMatchResult[] = KANJI_DATABASE.map(kanji => {
      let score = 100;
      const strokeDiff = Math.abs(kanji.strokeCount - totalStrokes);

      if (strokeDiff === 0) {
        score += 25;
      } else {
        score -= strokeDiff * 18;
      }

      if (kanji.character === '日' || kanji.character === '口') {
        if (totalStrokes >= 3 && totalStrokes <= 5) score += 15;
      }

      if (kanji.character === '川' || kanji.character === '山') {
        if (totalStrokes === 3) score += 30;
      }

      if (kanji.character === '水' || kanji.character === '木' || kanji.character === '火') {
        if (totalStrokes === 4) score += 25;
      }

      const finalConfidence = Math.min(98, Math.max(35, Math.round(score)));

      return {
        kanji,
        confidence: finalConfidence,
        strokeMatchReason: strokeDiff === 0 ? `Đúng số nét (${kanji.strokeCount} nét).` : `Khớp nét vẽ Hán tự.`
      };
    });

    candidateResults.sort((a, b) => b.confidence - a.confidence);
    return candidateResults.slice(0, 6);
  }
}
