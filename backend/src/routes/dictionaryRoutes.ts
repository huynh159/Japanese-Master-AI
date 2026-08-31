import { Router, Request, Response } from 'express';
import { VOCAB_DATABASE } from '../data/japaneseData';
import { query, getDbStatus } from '../db';

const router = Router();

// GET /api/dictionary/search?q=...&jlpt=N5
router.get('/search', async (req: Request, res: Response) => {
  const q = (req.query.q as string || '').toLowerCase().trim();
  const jlpt = req.query.jlpt as string || 'ALL';

  const dbStatus = getDbStatus();

  if (dbStatus.connected) {
    try {
      let sql = 'SELECT * FROM vocab WHERE 1=1';
      const params: any[] = [];

      if (jlpt !== 'ALL') {
        params.push(jlpt);
        sql += ` AND jlpt = $${params.length}`;
      }

      if (q) {
        params.push(`%${q}%`);
        const qIdx = params.length;
        sql += ` AND (word ILIKE $${qIdx} OR reading ILIKE $${qIdx} OR romaji ILIKE $${qIdx} OR han_viet ILIKE $${qIdx} OR array_to_string(meanings, ' ') ILIKE $${qIdx})`;
      }

      sql += ' ORDER BY id ASC';

      const dbRes = await query(sql, params);

      const vocabList = dbRes.rows.map(row => ({
        id: row.id,
        word: row.word,
        reading: row.reading,
        romaji: row.romaji,
        hanViet: row.han_viet,
        meanings: row.meanings,
        jlpt: row.jlpt,
        type: row.type,
        pitchAccent: row.pitch_accent,
        exampleSentence: row.example_sentence
      }));

      return res.json({
        success: true,
        source: 'PostgreSQL Database',
        total: vocabList.length,
        vocab: vocabList
      });
    } catch (err) {
      console.warn('⚠️ Lỗi truy vấn PostgreSQL dictionary search, dùng fallback memory:', err);
    }
  }

  // Fallback to Memory Data
  const filtered = VOCAB_DATABASE.filter(item => {
    const matchesJlpt = jlpt === 'ALL' || item.jlpt === jlpt;
    if (!q) return matchesJlpt;

    const matchesWord = item.word.includes(q);
    const matchesReading = item.reading.includes(q);
    const matchesRomaji = item.romaji.toLowerCase().includes(q);
    const matchesHanViet = item.hanViet?.toLowerCase().includes(q) || false;
    const matchesMeaning = item.meanings.some(m => m.toLowerCase().includes(q));

    return matchesJlpt && (matchesWord || matchesReading || matchesRomaji || matchesHanViet || matchesMeaning);
  });

  return res.json({
    success: true,
    source: 'Memory Database (Fallback)',
    total: filtered.length,
    vocab: filtered
  });
});

export default router;
