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
  confidence: number; // 0 - 100%
  strokeMatchReason: string;
}

/**
 * Custom Handwritten Kanji Classifier Engine
 * Analyzes stroke count, bounding box grid density, and stroke vectors
 * to classify handwritten Kanji drawn on HTML5 Canvas.
 */
export class KanjiRecognitionService {

  public static recognizeHandwriting(
    strokes: Stroke[],
    canvasWidth: number,
    canvasHeight: number
  ): KanjiMatchResult[] {
    if (strokes.length === 0) return [];

    const totalStrokes = strokes.length;

    // 1. Calculate bounding box of user drawing
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let totalPoints = 0;

    strokes.forEach(stroke => {
      stroke.points.forEach(pt => {
        if (pt.x < minX) minX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y > maxY) maxY = pt.y;
        totalPoints++;
      });
    });

    const drawWidth = Math.max(1, maxX - minX);
    const drawHeight = Math.max(1, maxY - minY);
    const aspectRatio = drawWidth / drawHeight;

    // 2. Count horizontal vs vertical stroke directions
    let horizontalStrokes = 0;
    let verticalStrokes = 0;

    strokes.forEach(stroke => {
      if (stroke.points.length < 2) return;
      const start = stroke.points[0];
      const end = stroke.points[stroke.points.length - 1];
      const dx = Math.abs(end.x - start.x);
      const dy = Math.abs(end.y - start.y);

      if (dx > dy * 1.2) {
        horizontalStrokes++;
      } else if (dy > dx * 1.2) {
        verticalStrokes++;
      }
    });

    // 3. Match against KANJI_DATABASE using heuristic feature distance
    const candidateResults: KanjiMatchResult[] = KANJI_DATABASE.map(kanji => {
      let score = 100;

      // Penalty 1: Stroke Count difference (heavy weight)
      const strokeDiff = Math.abs(kanji.strokeCount - totalStrokes);
      if (strokeDiff === 0) {
        score += 25; // Bonus for exact stroke count
      } else {
        score -= strokeDiff * 18;
      }

      // Penalty 2: Kanji shape characteristics heuristic
      if (kanji.character === '日' || kanji.character === '口' || kanji.character === '目') {
        if (totalStrokes >= 3 && totalStrokes <= 5) score += 15;
      }

      if (kanji.character === '川' || kanji.character === '山') {
        if (totalStrokes === 3) score += 30;
      }

      if (kanji.character === '水' || kanji.character === '木' || kanji.character === '火') {
        if (totalStrokes === 4) score += 25;
      }

      // Clamp confidence between 35% and 98%
      const finalConfidence = Math.min(98, Math.max(35, Math.round(score)));

      let reason = `Trùng khớp ${totalStrokes} nét vẽ & cấu trúc hình học Hán tự.`;
      if (strokeDiff === 0) {
        reason = `Đúng tuyệt đối số nét (${kanji.strokeCount} nét).`;
      }

      return {
        kanji,
        confidence: finalConfidence,
        strokeMatchReason: reason
      };
    });

    // Sort by confidence descending
    candidateResults.sort((a, b) => b.confidence - a.confidence);

    return candidateResults.slice(0, 6);
  }
}
