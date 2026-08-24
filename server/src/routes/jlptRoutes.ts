import { Router, Request, Response } from 'express';
import { JLPT_EXAM_QUESTIONS } from '../data/japaneseData';

const router = Router();

// GET /api/jlpt/questions?level=N5&category=all
router.get('/questions', (req: Request, res: Response) => {
  const level = req.query.level as string || 'N5';
  const category = req.query.category as string || 'all';

  let filtered = JLPT_EXAM_QUESTIONS.filter(q => q.jlpt === level);
  if (category !== 'all') {
    filtered = filtered.filter(q => q.category === category);
  }
  if (filtered.length === 0) {
    filtered = JLPT_EXAM_QUESTIONS.filter(q => q.jlpt === 'N5');
  }

  res.json({
    success: true,
    total: filtered.length,
    questions: filtered
  });
});

// POST /api/jlpt/submit
router.post('/submit', (req: Request, res: Response) => {
  const { questions, userAnswers, timeSpentSeconds, level } = req.body;
  let correctCount = 0;

  if (Array.isArray(questions)) {
    questions.forEach((q: any) => {
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

export default router;
