import { Router, Request, Response } from 'express';
import { AiService } from '../services/aiService';

const router = Router();

// POST /api/ai/kaiwa
router.post('/kaiwa', (req: Request, res: Response) => {
  const { userText, tone } = req.body;
  const reply = AiService.generateKaiwaResponse(userText || '', tone || 'sensei');
  res.json({
    success: true,
    message: reply
  });
});

// POST /api/ai/deconstruct
router.post('/deconstruct', (req: Request, res: Response) => {
  const { sentence } = req.body;
  const analysis = AiService.deconstructSentence(sentence || '');
  res.json({
    success: true,
    analysis
  });
});

export default router;
