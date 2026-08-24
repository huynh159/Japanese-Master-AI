"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcrService = void 0;
const japaneseData_1 = require("../data/japaneseData");
class OcrService {
    static async processImage(imageDataUrl) {
        const rawText = '私は毎日日本語を勉強します。友達と一緒に図書館へ行って、新しい本を読みます。';
        const extractedVocab = [];
        japaneseData_1.VOCAB_DATABASE.forEach(v => {
            if (rawText.includes(v.word) || rawText.includes(v.reading)) {
                extractedVocab.push({
                    word: v.word,
                    reading: v.reading,
                    meaning: v.meanings.join(', '),
                    jlpt: v.jlpt,
                    foundInText: true
                });
            }
        });
        japaneseData_1.KANJI_DATABASE.forEach(k => {
            if (rawText.includes(k.character) && !extractedVocab.some(ev => ev.word === k.character)) {
                extractedVocab.push({
                    word: k.character,
                    reading: k.onyomi[0] || k.kunyomi[0] || '',
                    meaning: `${k.hanViet} (${k.meanings.join(', ')})`,
                    jlpt: k.jlpt,
                    foundInText: true
                });
            }
        });
        const annotatedText = rawText.split('').map(char => ({
            text: char,
            isWord: /[\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff]/.test(char)
        }));
        return {
            rawText,
            annotatedText,
            extractedVocab,
            detectedLevel: 'N5'
        };
    }
}
exports.OcrService = OcrService;
