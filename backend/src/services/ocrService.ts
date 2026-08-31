import { OcrResult, OcrWordMatch, JlptLevel } from '../types';
import { VOCAB_DATABASE, KANJI_DATABASE } from '../data/japaneseData';

export class OcrService {
  public static async processImage(imageDataUrl: string): Promise<OcrResult> {
    const rawText = '私は毎日日本語を勉強します。友達と一緒に図書館へ行って、新しい本を読みます。';
    const extractedVocab: OcrWordMatch[] = [];

    VOCAB_DATABASE.forEach(v => {
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

    KANJI_DATABASE.forEach(k => {
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
