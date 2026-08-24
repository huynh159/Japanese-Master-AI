import { Router, Request, Response } from 'express';
import { VOCAB_DATABASE } from '../data/japaneseData';

const router = Router();

// GET /api/dictionary/search?q=...&jlpt=N5
router.get('/search', (req: Request, res: Response) => {
  const q = (req.query.q as string || '').toLowerCase().trim();
  const jlpt = req.query.jlpt as string || 'ALL';

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

  res.json({
    success: true,
    total: filtered.length,
    vocab: filtered
  });
});

export default router;
