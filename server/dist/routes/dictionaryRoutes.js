"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const japaneseData_1 = require("../data/japaneseData");
const router = (0, express_1.Router)();
// GET /api/dictionary/search?q=...&jlpt=N5
router.get('/search', (req, res) => {
    const q = (req.query.q || '').toLowerCase().trim();
    const jlpt = req.query.jlpt || 'ALL';
    const filtered = japaneseData_1.VOCAB_DATABASE.filter(item => {
        const matchesJlpt = jlpt === 'ALL' || item.jlpt === jlpt;
        if (!q)
            return matchesJlpt;
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
exports.default = router;
