import { Router, Request, Response } from 'express';
import { KanjiRecognitionService } from '../services/kanjiRecognitionService';

const router = Router();

// POST /api/kanji/recognize
router.post('/recognize', async (req: Request, res: Response) => {
  const { strokes, canvasWidth, canvasHeight } = req.body;
  
  const matches = await KanjiRecognitionService.recognizeHandwriting(
    strokes || [],
    canvasWidth || 288,
    canvasHeight || 288
  );

  res.json({
    success: true,
    total: matches.length,
    matches
  });
});

export default router;
