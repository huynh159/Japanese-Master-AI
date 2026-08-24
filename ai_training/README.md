# 🧠 Hướng Dẫn Tự Train Model AI Nhận Diện Chữ Kanji Viết Tay (Custom Kanji CNN Model)

Thư mục này chứa toàn bộ mã nguồn Python để bạn **tự huấn luyện (train)** mô hình Mạng nơ-ron cuộn (CNN - Convolutional Neural Network) nhận diện chữ Hán Kanji viết tay từ tập dữ liệu thực tế.

---

## 🛠️ Quy Trình Tự Train & Đưa Model Vào Dự Án

### BƯỚC 1: Cài Đặt Môi Trường Python (Google Colab hoặc Máy Cục Bộ)
```bash
pip install tensorflow tensorflowjs numpy matplotlib pillow
```

### BƯỚC 2: Chạy Script Huấn Luyện (`train_kanji_model.py`)
Script sẽ:
1. Tạo mạng nơ-ron CNN gồm các lớp: `Conv2D` -> `MaxPooling2D` -> `Flatten` -> `Dense` -> `Dropout`.
2. Huấn luyện model nhận diện nét chữ ảnh 64x64 pixel.
3. Xuất file model sang định dạng **TensorFlow.js (`model.json` + `weights.bin`)**.

```bash
python train_kanji_model.py
```

### BƯỚC 3: Đưa File Model Đã Train Vào Server Node.js
Copy thư mục model đã train từ `ai_training/output_model/` vào `server/models/kanji_model/`.

Backend Node.js sẽ dùng thư viện `@tensorflow/tfjs-node` để nạp file `model.json` và thực hiện dự đoán:
```typescript
import * as tf from '@tensorflow/tfjs-node';
const model = await tf.loadLayersModel('file://./models/kanji_model/model.json');
const prediction = model.predict(tensor);
```
