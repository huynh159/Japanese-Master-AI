/**
 * =========================================================================
 * ⚙️ BACKEND (Node.js Express RESTful API Server)
 * File: server/src/server.ts
 * Vai trò: Entrypoint máy chủ Backend xử lý API & kết nối PostgreSQL DB
 * =========================================================================
 */

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import jlptRoutes from './routes/jlptRoutes';
import kanjiRoutes from './routes/kanjiRoutes';
import ocrRoutes from './routes/ocrRoutes';
import dictionaryRoutes from './routes/dictionaryRoutes';
import kaiwaRoutes from './routes/kaiwaRoutes';
import { checkDbConnection, getDbStatus } from './db';
import vocabCrudRoutes from './routes/vocabCrudRoutes';
import demoRoutes from './routes/demoRoutes';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

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
app.use('/api/vocab', vocabCrudRoutes);

// viết API
app.use('/api/demo', demoRoutes);

// Healthcheck Route
app.get('/api/health', (req: Request, res: Response) => {
  const dbStatus = getDbStatus();
  res.json({
    status: 'ok',
    architecture: '3-Tier Client-Server (React Frontend + Node.js Express Backend + PostgreSQL Database)',
    server: 'Vua Tiếng Nhật AI - Node.js TypeScript RESTful API Server',
    version: '1.0.0',
    database: {
      type: 'PostgreSQL',
      connected: dbStatus.connected,
      host: dbStatus.host,
      name: dbStatus.database,
      mode: dbStatus.connected ? 'Active Database Mode' : 'Fallback Memory Mode'
    },
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, async () => {
  console.log(`🚀 [RESTful API Server] Node.js đang chạy trên cổng http://localhost:${PORT}`);
  console.log(`📌 API Healthcheck: http://localhost:${PORT}/api/health`);

  // Test PostgreSQL Connection
  await checkDbConnection();
});
