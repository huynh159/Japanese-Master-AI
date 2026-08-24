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
}
