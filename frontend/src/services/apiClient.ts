/**
 * =========================================================================
 * 🎨 FRONTEND (React SPA Client - HTTP Service Layer)
 * File: src/services/apiClient.ts
 * Vai trò: Gọi REST API từ Frontend (React) sang Backend (Node.js Cổng 5000)
 * =========================================================================
 */

const API_BASE_URL = 'http://localhost:5000/api';

export class ApiClient {
  /**
   * Fetch JLPT questions from RESTful API
   */
  public static async getJlptQuestions(level: string, category: string = 'all') {
    try {
      const response = await fetch(`${API_BASE_URL}/jlpt/questions?level=${level}&category=${category}`);
      const data = await response.json();
      return data.questions || [];
    } catch (err) {
      console.warn('Không thể kết nối REST API Server, chuyển sang chế độ dự phòng:', err);
      return [];
    }
  }

  /**
   * Submit JLPT Exam to RESTful API
   */
  public static async submitJlptExam(payload: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/jlpt/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      return data.result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /**
   * Recognize Handwritten Kanji via RESTful API
   */
  public static async recognizeKanji(strokes: any[], canvasWidth: number, canvasHeight: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/kanji/recognize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ strokes, canvasWidth, canvasHeight })
      });
      const data = await response.json();
      return data.matches || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  /**
   * Process Image OCR via RESTful API
   */
  public static async processOcrImage(imageDataUrl: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/ocr/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageDataUrl })
      });
      const data = await response.json();
      return data.result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /**
   * Search Dictionary via RESTful API
   */
  public static async searchDictionary(query: string, jlpt: string = 'ALL') {
    try {
      const response = await fetch(`${API_BASE_URL}/dictionary/search?q=${encodeURIComponent(query)}&jlpt=${jlpt}`);
      const data = await response.json();
      return data.vocab || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  /**
   * Generate AI Kaiwa response via RESTful API
   */
  public static async generateKaiwa(userText: string, tone: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/kaiwa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userText, tone })
      });
      const data = await response.json();
      return data.message;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /**
   * Deconstruct Sentence via RESTful API
   */
  public static async deconstructSentence(sentence: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/deconstruct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence })
      });
      const data = await response.json();
      return data.analysis;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  // =========================================================================
  // 🟢 1. READ (GET) - Lấy tất cả từ vựng từ Backend
  // =========================================================================
  public static async getAllVocab() {
    try {
      const response = await fetch(`${API_BASE_URL}/vocab`);
      const data = await response.json();
      return data.data || [];
    } catch (err) {
      console.error('Lỗi khi lấy danh sách từ vựng:', err);
      return [];
    }
  }

  // =========================================================================
  // 🟡 2. CREATE (POST) - Gửi thông tin từ vựng mới lên Backend để lưu vào DB
  // =========================================================================
  public static async createVocab(newVocab: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/vocab`, {
        method: 'POST', // Phương thức tạo mới
        headers: { 'Content-Type': 'application/json' }, // Khai báo dữ liệu gửi đi dạng JSON
        body: JSON.stringify(newVocab) // Chuyển Object Javascript thành chuỗi JSON
      });
      return await response.json();
    } catch (err) {
      console.error('Lỗi khi tạo từ vựng mới:', err);
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  }

  // =========================================================================
  // 🔵 3. UPDATE (PUT) - Cập nhật từ vựng theo ID
  // =========================================================================
  public static async updateVocab(id: string, updatedData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/vocab/${id}`, {
        method: 'PUT', // Phương thức cập nhật
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      return await response.json();
    } catch (err) {
      console.error('Lỗi khi cập nhật từ vựng:', err);
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  }

  // =========================================================================
  // 🔴 4. DELETE (DELETE) - Xóa từ vựng theo ID
  // =========================================================================
  public static async deleteVocab(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/vocab/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (err) {
      console.error('Lỗi khi xóa từ vựng:', err);
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  }

  // =========================================================================
  // 🔐 AUTHENTICATION & TOKEN HELPERS
  // =========================================================================
  public static getToken(): string | null {
    return localStorage.getItem('auth_token') || localStorage.getItem('admin_token');
  }

  public static setToken(token: string) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('admin_token', token);
  }

  public static clearAuth() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('auth_user');
  }

  private static getAuthHeaders(): HeadersInit {
    const token = ApiClient.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['x-admin-token'] = token;
    }
    return headers;
  }

  /**
   * Đăng ký tài khoản học viên mới
   */
  public static async register(payload: { username: string; email: string; password: string; fullName: string; targetLevel?: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.token) {
        ApiClient.setToken(data.token);
        if (data.user) localStorage.setItem('auth_user', JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      console.error('Lỗi đăng ký tài khoản:', err);
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  }

  /**
   * Đăng nhập người dùng (học viên hoặc quản trị viên)
   */
  public static async login(credentials: { username: string; password: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (data.token) {
        ApiClient.setToken(data.token);
        if (data.user) localStorage.setItem('auth_user', JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      console.error('Lỗi đăng nhập:', err);
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  }

  /**
   * Đăng nhập Admin chuyên dụng (giữ tính tương thích với modal Admin)
   */
  public static async adminLogin(credentials: { username: string; password: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (data.token) {
        ApiClient.setToken(data.token);
        if (data.user) localStorage.setItem('auth_user', JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      console.error('Lỗi đăng nhập Admin:', err);
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  }

  public static async verifyAdminToken(token?: string) {
    try {
      const activeToken = token || ApiClient.getToken();
      if (!activeToken) return { success: false };

      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: { 
          'Authorization': `Bearer ${activeToken}`,
          'x-admin-token': activeToken
        }
      });
      return await response.json();
    } catch (err) {
      return { success: false };
    }
  }

  // =========================================================================
  // 📝 ADMIN JLPT EXAM MANAGEMENT (Có gắn Bearer JWT Token)
  // =========================================================================
  public static async getAdminJlptQuestions(level: string = 'ALL', category: string = 'ALL', search: string = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/jlpt/questions?level=${level}&category=${category}&search=${encodeURIComponent(search)}`, {
        headers: ApiClient.getAuthHeaders()
      });
      const data = await response.json();
      return data.questions || [];
    } catch (err) {
      console.error('Lỗi lấy danh sách câu hỏi Admin:', err);
      return [];
    }
  }

  public static async createJlptQuestion(question: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/jlpt/questions`, {
        method: 'POST',
        headers: ApiClient.getAuthHeaders(),
        body: JSON.stringify(question)
      });
      return await response.json();
    } catch (err) {
      console.error('Lỗi tạo câu hỏi đề thi:', err);
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  }

  public static async bulkUploadJlptQuestions(questions: any[]) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/jlpt/questions/bulk`, {
        method: 'POST',
        headers: ApiClient.getAuthHeaders(),
        body: JSON.stringify({ questions })
      });
      return await response.json();
    } catch (err) {
      console.error('Lỗi nạp câu hỏi hàng loạt:', err);
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  }

  public static async updateJlptQuestion(id: string, question: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/jlpt/questions/${id}`, {
        method: 'PUT',
        headers: ApiClient.getAuthHeaders(),
        body: JSON.stringify(question)
      });
      return await response.json();
    } catch (err) {
      console.error('Lỗi cập nhật câu hỏi:', err);
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  }

  public static async deleteJlptQuestion(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/jlpt/questions/${id}`, {
        method: 'DELETE',
        headers: ApiClient.getAuthHeaders()
      });
      return await response.json();
    } catch (err) {
      console.error('Lỗi xóa câu hỏi:', err);
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  }

  // =========================================================================
  // 📚 ADMIN STORY READER MANAGEMENT
  // =========================================================================
  public static async getStories() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stories`, {
        headers: ApiClient.getAuthHeaders()
      });
      const data = await response.json();
      return data.stories || [];
    } catch (err) {
      console.error('Lỗi lấy danh sách bài đọc:', err);
      return [];
    }
  }

  public static async createStory(story: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stories`, {
        method: 'POST',
        headers: ApiClient.getAuthHeaders(),
        body: JSON.stringify(story)
      });
      return await response.json();
    } catch (err) {
      console.error('Lỗi tạo bài đọc mới:', err);
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  }

  public static async deleteStory(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stories/${id}`, {
        method: 'DELETE',
        headers: ApiClient.getAuthHeaders()
      });
      return await response.json();
    } catch (err) {
      console.error('Lỗi xóa bài đọc:', err);
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  }
}

