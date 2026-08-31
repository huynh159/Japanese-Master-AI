# 👑 JAPANESE MASTER AI (Japanese Learning Platform)
> **Dự án Fullstack Website Học & Luyện Thi Tiếng Nhật AI (JLPT N5-N1)**  
> **Kiến trúc:** Monorepo Client-Server 3-Tier (React 18 Frontend + Java Spring Boot Backend + PostgreSQL Database + AI Model)

---

## 📂 THƯ MỤC DỰ ÁN (CHUẨN DOANH NGHIỆP THỰC TẾ)

Dự án được phân chia theo **Chuẩn Monorepo / Multi-Package Thực Tế**:

```text
japanesemaster/
│
├── 🎨 frontend/                     <-- THƯ MỤC FRONTEND REACT (CỔNG 5173)
│   ├── src/                         <-- Mã nguồn React components & services
│   │   ├── components/              <-- Dashboard, Canvas Kanji, JLPT, Flashcards, Kaiwa AI...
│   │   ├── services/                <-- Gọi REST API (apiClient.ts)
│   │   ├── types/                   <-- TypeScript Interfaces
│   │   └── App.tsx                  <-- Main React App Component
│   ├── index.html                   <-- File HTML chính
│   ├── package.json                 <-- Quản lý thư viện Frontend
│   └── vite.config.ts               <-- Cấu hình Vite Build Tool
│
├── ⚙️ backend/                      <-- THƯ MỤC BACKEND JAVA SPRING BOOT (CỔNG 5000)
│   ├── src/main/java/com/japanesemaster/
│   │   ├── config/                  <-- CorsConfig, DataSeeder (PostgreSQL Auto Seeder)
│   │   ├── controller/              <-- REST Controllers (Health, Vocab, Dictionary, JLPT, Kanji, OCR, AI)
│   │   ├── model/                   <-- JPA Entities (Vocab, Kanji, JlptQuestion, ExamResult, UserStats)
│   │   ├── repository/              <-- Spring Data JPA Repositories
│   │   ├── service/                 <-- AI, OCR, Kanji Recognition Services
│   │   └── JapaneseMasterApplication.java <-- Entry point của Spring Boot Server
│   ├── src/main/resources/
│   │   └── application.properties   <-- Cấu hình kết nối PostgreSQL, Server Port
│   ├── pom.xml                      <-- Quản lý dependencies Maven (Spring Web, Spring Data JPA, PostgreSQL)
│   └── mvnw.cmd                     <-- Maven Wrapper khởi chạy Backend trên Windows
│
├── 🧠 ai_training/                  <-- THƯ MỤC AI MODEL TRAINING
│   └── README.md                    <-- Huấn luyện mô hình Mạng nơ-ron cuộn CNN (Python)
│
├── .gitignore                       <-- Bỏ qua target, node_modules, build outputs khi push Git
├── docker-compose.yml               <-- Cấu hình chạy Container PostgreSQL DB + Java Spring Boot + React
└── package.json                     <-- ROOT PACKAGE MANAGER (Điều khiển chạy cả 2 cùng lúc)
```

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY

### 🌟 Cách 1: Khởi Động Cả Frontend & Backend Cùng Lúc (Khuyên Dùng)
Chỉ cần mở terminal ở thư mục gốc dự án và gõ **1 câu lệnh**:
```bash
npm run dev
```
=> Hệ thống tự động kích hoạt:
- 🌐 **Frontend React:** `http://localhost:5173`
- ⚙️ **Backend Java Spring Boot:** `http://localhost:5000`

---

### 🐳 Cách 2: Chạy Bằng Docker Compose (Production Standard)
```bash
docker-compose up -d
```

---

### 🛠️ Cách 3: Khởi Động Từng Phần Riêng Biệt

#### 1. Khởi động Backend Java Spring Boot (Cổng 5000):
```bash
npm run dev:backend
```
hoặc vào thư mục `backend`:
```bash
cd backend
.\mvnw.cmd spring-boot:run
```

#### 2. Khởi động Frontend React (Cổng 5173):
```bash
npm run dev:frontend
```

---

## 🎯 CÁC API ENDPOINTS BACKEND SPRING BOOT (PORT 5000)

- `GET /api/health` -> Kiểm tra trạng thái máy chủ Spring Boot & kết nối PostgreSQL DB.
- `GET /api/dictionary/search?q=...&jlpt=N5` -> Tra cứu từ điển từ PostgreSQL DB qua JPA.
- `GET /api/jlpt/questions?level=N5` -> Tải ngân hàng câu hỏi đề thi JLPT.
- `POST /api/jlpt/submit` -> Nộp bài thi và lưu kết quả vào PostgreSQL DB.
- `POST /api/vocab` -> Tạo từ vựng mới.
- `PUT /api/vocab/{id}` -> Cập nhật từ vựng theo ID.
- `DELETE /api/vocab/{id}` -> Xóa từ vựng theo ID.
- `POST /api/kanji/recognize` -> Nhận diện chữ Kanji vẽ trên Canvas.
- `POST /api/ocr/scan` -> Trích xuất văn bản & từ vựng từ ảnh.
- `POST /api/ai/kaiwa` -> Trợ lý AI hội thoại & sửa lỗi ngữ pháp.
