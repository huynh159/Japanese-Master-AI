import { Router, Request, Response } from 'express';
import { JLPT_EXAM_QUESTIONS } from '../data/japaneseData';
import { query, getDbStatus } from '../db';

const router = Router();

// GET /api/jlpt/questions?level=N5&category=all
router.get('/questions', async (req: Request, res: Response) => {
  const level = req.query.level as string || 'N5';
  const category = req.query.category as string || 'all';

  const dbStatus = getDbStatus();

  if (dbStatus.connected) {
    try {
      let sql = 'SELECT * FROM jlpt_questions WHERE jlpt = $1';
      const params: any[] = [level];

      if (category !== 'all') {
        params.push(category);
        sql += ' AND category = $2';
      }

      const dbRes = await query(sql, params);

      if (dbRes.rows.length > 0) {
        const questionsList = dbRes.rows.map(row => ({
          id: row.id,
          jlpt: row.jlpt,
          category: row.category,
          question: row.question,
          readingContext: row.reading_context,
          audioPromptUrl: row.audio_prompt_url,
          options: typeof row.options === 'string' ? JSON.parse(row.options) : row.options,
          correctAnswer: row.correct_answer,
          explanation: row.explanation,
          grammarPoint: row.grammar_point
        }));

        return res.json({
          success: true,
          source: 'PostgreSQL Database',
          total: questionsList.length,
          questions: questionsList
        });
      }
    } catch (err) {
      console.warn('⚠️ Lỗi truy vấn câu hỏi JLPT từ PostgreSQL, dùng fallback memory:', err);
    }
  }

  // Fallback Memory Data
  let filtered = JLPT_EXAM_QUESTIONS.filter(q => q.jlpt === level);
  if (category !== 'all') {
    filtered = filtered.filter(q => q.category === category);
  }
  if (filtered.length === 0) {
    filtered = JLPT_EXAM_QUESTIONS.filter(q => q.jlpt === 'N5');
  }

  return res.json({
    success: true,
    source: 'Memory Database (Fallback)',
    total: filtered.length,
    questions: filtered
  });
});

// POST /api/jlpt/submit
router.post('/submit', async (req: Request, res: Response) => {
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
  const passed = percentage >= 60;
  const targetLevel = level || 'N5';
  const timeSpent = timeSpentSeconds || 0;

  const dbStatus = getDbStatus();
  if (dbStatus.connected) {
    try {
      await query(
        `INSERT INTO exam_results (jlpt, score, total_questions, percentage, passed, time_spent_seconds)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [targetLevel, correctCount, total, percentage, passed, timeSpent]
      );
    } catch (err) {
      console.warn('⚠️ Không thể ghi kết quả thi vào PostgreSQL:', err);
    }
  }

  return res.json({
    success: true,
    result: {
      jlpt: targetLevel,
      score: correctCount,
      totalQuestions: total,
      percentage,
      passed,
      timeSpentSeconds: timeSpent,
      date: new Date().toLocaleDateString('vi-VN')
    }
  });
});

export default router;
