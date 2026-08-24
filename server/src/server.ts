import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import jlptRoutes from './routes/jlptRoutes';
import kanjiRoutes from './routes/kanjiRoutes';
import ocrRoutes from './routes/ocrRoutes';
import dictionaryRoutes from './routes/dictionaryRoutes';
import kaiwaRoutes from './routes/kaiwaRoutes';

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// RESTful API Routes
app.use('/api/jlpt', jlptRoutes);
app.use('/api/kanji', kanjiRoutes);
app.use('/api/ocr', ocrRoutes);
app.use('/api/dictionary', dictionaryRoutes);
app.use('/api/ai', kaiwaRoutes);

// Healthcheck Route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    server: 'Vua Tiếng Nhật AI - Node.js TypeScript RESTful API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 [RESTful API Server] Node.js đang chạy trên cổng http://localhost:${PORT}`);
  console.log(`📌 API Healthcheck: http://localhost:${PORT}/api/health`);
});
