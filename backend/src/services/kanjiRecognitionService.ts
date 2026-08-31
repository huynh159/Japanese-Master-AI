import { KANJI_DATABASE } from '../data/japaneseData';
import { KanjiItem } from '../types';
import { query, getDbStatus } from '../db';

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
  public static async recognizeHandwriting(
    strokes: Stroke[],
    canvasWidth: number,
    canvasHeight: number
  ): Promise<KanjiMatchResult[]> {
    if (!strokes || strokes.length === 0) return [];

    const totalStrokes = strokes.length;
    let kanjiList: KanjiItem[] = KANJI_DATABASE;

    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      try {
        const dbRes = await query('SELECT * FROM kanji');
        if (dbRes.rows.length > 0) {
          kanjiList = dbRes.rows.map(row => ({
            character: row.character,
            hanViet: row.han_viet,
            onyomi: row.onyomi,
            kunyomi: row.kunyomi,
            meanings: row.meanings,
            jlpt: row.jlpt,
            strokeCount: row.stroke_count,
            radicals: row.radicals,
            mnemonic: row.mnemonic,
            examples: typeof row.examples === 'string' ? JSON.parse(row.examples) : row.examples
          }));
        }
      } catch (err) {
        console.warn('⚠️ Lỗi đọc Kanji từ PostgreSQL, chuyển sang Memory Fallback:', err);
      }
    }

    const candidateResults: KanjiMatchResult[] = kanjiList.map(kanji => {
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
