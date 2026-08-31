# ⚙️ BACKEND NODE.JS EXPRESS RESTFUL API SERVER

Thư mục này chứa **toàn bộ mã nguồn Máy chủ Backend** của ứng dụng **Vua Tiếng Nhật AI**.

---

## 📂 CẤU TRÚC THƯ MỤC BACKEND (`server/`)

```text
server/
├── .env.example             <-- File mẫu cấu hình biến môi trường kết nối PostgreSQL
├── .env                     <-- File cấu hình thực tế (Cổng PORT=5000, PGHOST, PGUSER, PGDATABASE...)
├── package.json             <-- Quản lý dependencies (express, pg, cors, dotenv)
├── tsconfig.json            <-- Cấu hình TypeScript compiler cho Backend
│
└── src/
    ├── server.ts            <-- 🚀 Entrypoint chính khởi động Express REST API Server
    │
    ├── db/                  <-- 🗄️ CƠ SỞ DỮ LIỆU POSTGRESQL
    │   ├── schema.sql       <-- SQL DDL khởi tạo các bảng (kanji, vocab, jlpt_questions, exam_results)
    │   ├── index.ts         <-- Connection Pool (pg.Pool) & cơ chế Smart DB Fallback
    │   └── seed.ts          <-- Script nạp dữ liệu ban đầu (npm run db:seed)
    │
    ├── routes/              <-- 🛣️ RESTFUL API ROUTERS
    │   ├── dictionaryRoutes.ts <-- Router tra cứu từ điển từ PostgreSQL DB
    │   ├── jlptRoutes.ts       <-- Router lấy ngân hàng đề thi & nộp bài thi
    │   ├── kanjiRoutes.ts      <-- Router nhận diện nét vẽ Hán tự
    │   ├── ocrRoutes.ts        <-- Router xử lý trích xuất chữ từ hình ảnh
    │   └── kaiwaRoutes.ts      <-- Router hội thoại AI & bắt lỗi ngữ pháp
    │
    ├── services/            <-- 🧠 LOGIC NGHIỆP VỤ (BUSINESS LOGIC)
    │   ├── aiService.ts                <-- Xử lý sinh phản hồi AI & sửa lỗi ngữ pháp
    │   ├── kanjiRecognitionService.ts  <-- Thuật toán so khớp nét vẽ Hán tự
    │   └── ocrService.ts               <-- Bóc tách từ vựng & Kanji từ văn bản OCR
    │
    └── types/               <-- 🏷️ CÁC INTERFACES & TYPESCRIPT DEFINITIONS
```

---

## 🚀 CÁCH CHẠY BACKEND

1. **Nạp dữ liệu vào PostgreSQL:**
   ```bash
   npm run db:seed
   ```

2. **Khởi chạy Development Server:**
   ```bash
   npm run dev
   ```

3. **Kiểm tra trạng thái máy chủ:**
   Mở trình duyệt truy cập: `http://localhost:5000/api/health`
