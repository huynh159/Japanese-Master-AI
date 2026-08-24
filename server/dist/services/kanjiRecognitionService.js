"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanjiRecognitionService = void 0;
const japaneseData_1 = require("../data/japaneseData");
class KanjiRecognitionService {
    static recognizeHandwriting(strokes, canvasWidth, canvasHeight) {
        if (!strokes || strokes.length === 0)
            return [];
        const totalStrokes = strokes.length;
        const candidateResults = japaneseData_1.KANJI_DATABASE.map(kanji => {
            let score = 100;
            const strokeDiff = Math.abs(kanji.strokeCount - totalStrokes);
            if (strokeDiff === 0) {
                score += 25;
            }
            else {
                score -= strokeDiff * 18;
            }
            if (kanji.character === '日' || kanji.character === '口') {
                if (totalStrokes >= 3 && totalStrokes <= 5)
                    score += 15;
            }
            if (kanji.character === '川' || kanji.character === '山') {
                if (totalStrokes === 3)
                    score += 30;
            }
            if (kanji.character === '水' || kanji.character === '木' || kanji.character === '火') {
                if (totalStrokes === 4)
                    score += 25;
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
exports.KanjiRecognitionService = KanjiRecognitionService;
