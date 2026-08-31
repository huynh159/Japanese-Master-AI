import { Router, Request, Response } from 'express';
import { OcrService } from '../services/ocrService';

const router = Router();

// POST /api/ocr/scan
router.post('/scan', async (req: Request, res: Response) => {
  const { imageDataUrl } = req.body;

  try {
    const result = await OcrService.processImage(imageDataUrl || '');
    res.json({
      success: true,
      result
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi xử lý OCR trên Server' });
  }
});

export default router;
