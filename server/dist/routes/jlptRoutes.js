"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const japaneseData_1 = require("../data/japaneseData");
const router = (0, express_1.Router)();
// GET /api/jlpt/questions?level=N5&category=all
router.get('/questions', (req, res) => {
    const level = req.query.level || 'N5';
    const category = req.query.category || 'all';
    let filtered = japaneseData_1.JLPT_EXAM_QUESTIONS.filter(q => q.jlpt === level);
    if (category !== 'all') {
        filtered = filtered.filter(q => q.category === category);
    }
    if (filtered.length === 0) {
        filtered = japaneseData_1.JLPT_EXAM_QUESTIONS.filter(q => q.jlpt === 'N5');
    }
    res.json({
        success: true,
        total: filtered.length,
        questions: filtered
    });
});
// POST /api/jlpt/submit
router.post('/submit', (req, res) => {
    const { questions, userAnswers, timeSpentSeconds, level } = req.body;
    let correctCount = 0;
    if (Array.isArray(questions)) {
        questions.forEach((q) => {
            if (userAnswers && userAnswers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });
    }
    const total = questions ? questions.length : 1;
    const percentage = Math.round((correctCount / total) * 100);
    res.json({
        success: true,
        result: {
            jlpt: level || 'N5',
            score: correctCount,
            totalQuestions: total,
            percentage,
            passed: percentage >= 60,
            timeSpentSeconds: timeSpentSeconds || 0,
            date: new Date().toLocaleDateString('vi-VN')
        }
    });
});
exports.default = router;
