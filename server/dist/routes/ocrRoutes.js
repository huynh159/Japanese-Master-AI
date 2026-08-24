"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ocrService_1 = require("../services/ocrService");
const router = (0, express_1.Router)();
// POST /api/ocr/scan
router.post('/scan', async (req, res) => {
    const { imageDataUrl } = req.body;
    try {
        const result = await ocrService_1.OcrService.processImage(imageDataUrl || '');
        res.json({
            success: true,
            result
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Lỗi xử lý OCR trên Server' });
    }
});
exports.default = router;
