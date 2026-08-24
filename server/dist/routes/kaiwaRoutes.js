"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aiService_1 = require("../services/aiService");
const router = (0, express_1.Router)();
// POST /api/ai/kaiwa
router.post('/kaiwa', (req, res) => {
    const { userText, tone } = req.body;
    const reply = aiService_1.AiService.generateKaiwaResponse(userText || '', tone || 'sensei');
    res.json({
        success: true,
        message: reply
    });
});
// POST /api/ai/deconstruct
router.post('/deconstruct', (req, res) => {
    const { sentence } = req.body;
    const analysis = aiService_1.AiService.deconstructSentence(sentence || '');
    res.json({
        success: true,
        analysis
    });
});
exports.default = router;
