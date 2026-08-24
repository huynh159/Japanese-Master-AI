"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jlptRoutes_1 = __importDefault(require("./routes/jlptRoutes"));
const kanjiRoutes_1 = __importDefault(require("./routes/kanjiRoutes"));
const ocrRoutes_1 = __importDefault(require("./routes/ocrRoutes"));
const dictionaryRoutes_1 = __importDefault(require("./routes/dictionaryRoutes"));
const kaiwaRoutes_1 = __importDefault(require("./routes/kaiwaRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
// RESTful API Routes
app.use('/api/jlpt', jlptRoutes_1.default);
app.use('/api/kanji', kanjiRoutes_1.default);
app.use('/api/ocr', ocrRoutes_1.default);
app.use('/api/dictionary', dictionaryRoutes_1.default);
app.use('/api/ai', kaiwaRoutes_1.default);
// Healthcheck Route
app.get('/api/health', (req, res) => {
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
