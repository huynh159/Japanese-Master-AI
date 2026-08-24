"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const kanjiRecognitionService_1 = require("../services/kanjiRecognitionService");
const router = (0, express_1.Router)();
// POST /api/kanji/recognize
router.post('/recognize', (req, res) => {
    const { strokes, canvasWidth, canvasHeight } = req.body;
    const matches = kanjiRecognitionService_1.KanjiRecognitionService.recognizeHandwriting(strokes || [], canvasWidth || 288, canvasHeight || 288);
    res.json({
        success: true,
        total: matches.length,
        matches
    });
});
exports.default = router;
