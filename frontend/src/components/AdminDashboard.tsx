import React, { useState, useEffect } from 'react';
import { 
  FileText, Upload, Plus, Trash2, Edit3, Search, Filter, 
  Download, BookOpen, Layers, Award, CheckCircle, RefreshCw, 
  HelpCircle, Sparkles, LogOut, Code, Save, Database
} from 'lucide-react';
import { JlptLevel, AdminTab, StoryItem, ExamQuestion, VocabItem } from '../types';
import { ApiClient } from '../services/apiClient';

interface AdminDashboardProps {
  onLogoutAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogoutAdmin }) => {
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('questions');
  
  // States for Questions
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(false);

  // States for Single Question Form
  const [formQuestion, setFormQuestion] = useState({
    id: '',
    jlpt: 'N5' as JlptLevel,
    category: 'vocab' as 'vocab' | 'grammar' | 'reading' | 'listening',
    question: '',
    readingContext: '',
    audioPromptUrl: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    grammarPoint: ''
  });
  const [isEditingQuestion, setIsEditingQuestion] = useState<boolean>(false);

  // States for Bulk Import JSON
  const [bulkJsonText, setBulkJsonText] = useState<string>('');
  const [bulkStatusMsg, setBulkStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isUploadingBulk, setIsUploadingBulk] = useState<boolean>(false);

  // States for Vocab
  const [vocabList, setVocabList] = useState<VocabItem[]>([]);
  const [formVocab, setFormVocab] = useState({
    word: '',
    reading: '',
    romaji: '',
    hanViet: '',
    meanings: '',
    jlpt: 'N5' as JlptLevel,
    type: 'Danh từ'
  });

  // States for Stories
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [formStory, setFormStory] = useState({
    title: '',
    jlpt: 'N5' as JlptLevel,
    content: '',
    reading: '',
    translation: ''
  });

  // Notification Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Load Data
  const fetchQuestionsData = async () => {
    setIsLoadingQuestions(true);
    const data = await ApiClient.getAdminJlptQuestions(filterLevel, filterCategory, searchQuery);
    setQuestions(data);
    setIsLoadingQuestions(false);
  };

  const fetchVocabData = async () => {
    const data = await ApiClient.getAllVocab();
    setVocabList(data);
  };

  const fetchStoriesData = async () => {
    const data = await ApiClient.getStories();
    setStories(data);
  };

  useEffect(() => {
    fetchQuestionsData();
    fetchVocabData();
    fetchStoriesData();
  }, [filterLevel, filterCategory]);

  // Handle Question Form Submit
  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.question.trim()) {
      showToast('⚠️ Vui lòng nhập nội dung câu hỏi!');
      return;
    }

    if (isEditingQuestion && formQuestion.id) {
      const res = await ApiClient.updateJlptQuestion(formQuestion.id, formQuestion);
      if (res.success) {
        showToast('✅ Cập nhật câu hỏi thành công!');
        resetQuestionForm();
        fetchQuestionsData();
      } else {
        showToast(`❌ ${res.message}`);
      }
    } else {
      const res = await ApiClient.createJlptQuestion(formQuestion);
      if (res.success) {
        showToast('✅ Thêm câu hỏi mới thành công!');
        resetQuestionForm();
        fetchQuestionsData();
      } else {
        showToast(`❌ ${res.message}`);
      }
    }
  };

  const handleEditQuestionClick = (q: ExamQuestion) => {
    setFormQuestion({
      id: q.id,
      jlpt: q.jlpt,
      category: q.category,
      question: q.question,
      readingContext: q.readingContext || '',
      audioPromptUrl: q.audioPromptUrl || '',
      options: q.options && q.options.length >= 4 ? q.options : [q.options[0] || '', q.options[1] || '', q.options[2] || '', q.options[3] || ''],
      correctAnswer: q.correctAnswer || 0,
      explanation: q.explanation || '',
      grammarPoint: q.grammarPoint || ''
    });
    setIsEditingQuestion(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteQuestionClick = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này khỏi đề thi?')) {
      const res = await ApiClient.deleteJlptQuestion(id);
      if (res.success) {
        showToast('🗑️ Đã xóa câu hỏi!');
        fetchQuestionsData();
      } else {
        showToast(`❌ ${res.message}`);
      }
    }
  };

  const resetQuestionForm = () => {
    setFormQuestion({
      id: '',
      jlpt: 'N5',
      category: 'vocab',
      question: '',
      readingContext: '',
      audioPromptUrl: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      grammarPoint: ''
    });
    setIsEditingQuestion(false);
  };

  // Handle Bulk Upload
  const handleBulkUploadSubmit = async () => {
    if (!bulkJsonText.trim()) {
      setBulkStatusMsg({ type: 'error', text: 'Vui lòng dán hoặc chọn file JSON chứa danh sách câu hỏi!' });
      return;
    }

    try {
      const parsed = JSON.parse(bulkJsonText);
      const questionsArray = Array.isArray(parsed) ? parsed : (parsed.questions || []);

      if (questionsArray.length === 0) {
        setBulkStatusMsg({ type: 'error', text: 'Mảng danh sách câu hỏi trong JSON rỗng hoặc sai cấu trúc!' });
        return;
      }

      setIsUploadingBulk(true);
      setBulkStatusMsg(null);

      const res = await ApiClient.bulkUploadJlptQuestions(questionsArray);
      setIsUploadingBulk(false);

      if (res.success) {
        setBulkStatusMsg({ type: 'success', text: `🎉 ${res.message}` });
        showToast(`✅ Đã nạp ${res.count || questionsArray.length} câu hỏi mới vào hệ thống!`);
        setBulkJsonText('');
        fetchQuestionsData();
      } else {
        setBulkStatusMsg({ type: 'error', text: res.message || 'Lỗi khi nạp dữ liệu hàng loạt' });
      }
    } catch (e: any) {
      setIsUploadingBulk(false);
      setBulkStatusMsg({ type: 'error', text: `Cú pháp JSON không hợp lệ: ${e.message}` });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setBulkJsonText(text);
      };
      reader.readAsText(file);
    }
  };

  const downloadSampleJson = () => {
    const sample = [
      {
        jlpt: 'N5',
        category: 'vocab',
        question: '「毎朝、パンを（　）コーヒーを飲みます。」に入る言葉は？',
        options: ['食べて', '食て', '飲んで', '行きて'],
        correctAnswer: 0,
        explanation: 'Dùng thể Te của 食べる (たべる -> 食べて) để nối 2 hành động liên tiếp.',
        grammarPoint: 'Động từ thể Te (Vて)'
      },
      {
        jlpt: 'N4',
        category: 'grammar',
        question: '「明日雨が（　）、試合は中止です。」',
        options: ['降ったら', '降れば', '降ると', '降りなら'],
        correctAnswer: 0,
        explanation: 'Mẫu câu giả định ~たら (Nếu... thì...).',
        grammarPoint: 'Cấu trúc ~たら'
      }
    ];

    const blob = new Blob([JSON.stringify(sample, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'de_thi_sample_jlpt.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle Vocab Form
  const handleSaveVocab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formVocab.word.trim()) return;

    const payload = {
      id: `vocab-${Date.now()}`,
      word: formVocab.word,
      reading: formVocab.reading,
      romaji: formVocab.romaji,
      hanViet: formVocab.hanViet,
      meanings: formVocab.meanings.split(',').map(m => m.trim()),
      jlpt: formVocab.jlpt,
      type: formVocab.type
    };

    const res = await ApiClient.createVocab(payload);
    if (res.success) {
      showToast('✅ Thêm từ vựng mới thành công!');
      setFormVocab({ word: '', reading: '', romaji: '', hanViet: '', meanings: '', jlpt: 'N5', type: 'Danh từ' });
      fetchVocabData();
    }
  };

  const handleDeleteVocab = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa từ vựng này?')) {
      const res = await ApiClient.deleteVocab(id);
      if (res.success) {
        showToast('🗑️ Đã xóa từ vựng!');
        fetchVocabData();
      }
    }
  };

  // Handle Story Form
  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStory.title.trim() || !formStory.content.trim()) return;

    const res = await ApiClient.createStory(formStory);
    if (res.success) {
      showToast('✅ Thêm bài đọc tài liệu mới thành công!');
      setFormStory({ title: '', jlpt: 'N5', content: '', reading: '', translation: '' });
      fetchStoriesData();
    }
  };

  const handleDeleteStory = async (id: string) => {
    if (window.confirm('Bạn muốn xóa bài đọc tài liệu này?')) {
      const res = await ApiClient.deleteStory(id);
      if (res.success) {
        showToast('🗑️ Đã xóa bài đọc!');
        fetchStoriesData();
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 border border-sakura-500/50 shadow-2xl shadow-sakura-500/30 text-sm font-semibold text-white flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Banner & Header Stats */}
      <div className="relative p-6 sm:p-8 rounded-3xl glass-panel border border-sakura-500/20 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-sakura-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sakura-950/80 border border-sakura-500/30 text-sakura-300 text-xs font-bold uppercase tracking-wider">
              <Database className="w-3.5 h-3.5 text-sakura-400" />
              <span>Admin Management Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-sakura-300 via-white to-amber-300 bg-clip-text text-transparent">
              Quản Trị Hệ Thống & Nạp Đề Thi
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Quản lý toàn bộ ngân hàng đề thi JLPT N1-N5, nạp đề thi hàng loạt từ JSON, cập nhật từ vựng và bài đọc tài liệu.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={downloadSampleJson}
              className="px-4 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-amber-500/30 text-amber-300 hover:text-white font-semibold text-xs transition-all flex items-center space-x-2 shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Tải File JSON Mẫu</span>
            </button>

            <button
              onClick={onLogoutAdmin}
              className="px-4 py-2.5 rounded-2xl bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 text-red-300 font-semibold text-xs transition-all flex items-center space-x-2 shadow-lg"
            >
              <LogOut className="w-4 h-4" />
              <span>Thoát Admin</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-sakura-500/20 text-sakura-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">{questions.length}</div>
              <div className="text-[11px] text-slate-400">Câu hỏi Đề thi</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">{vocabList.length}</div>
              <div className="text-[11px] text-slate-400">Từ vựng & Hán tự</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">{stories.length}</div>
              <div className="text-[11px] text-slate-400">Bài đọc / Tài liệu</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">N1 - N5</div>
              <div className="text-[11px] text-slate-400">Cấp độ hỗ trợ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation Header */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800">
        <button
          onClick={() => setActiveAdminTab('questions')}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeAdminTab === 'questions'
              ? 'bg-gradient-to-r from-sakura-600 to-amber-600 text-white shadow-lg shadow-sakura-600/30'
              : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Nạp & Quản Lý Đề Thi JLPT</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('vocab')}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeAdminTab === 'vocab'
              ? 'bg-gradient-to-r from-sakura-600 to-amber-600 text-white shadow-lg shadow-sakura-600/30'
              : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Quản Lý Từ Vựng</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('stories')}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeAdminTab === 'stories'
              ? 'bg-gradient-to-r from-sakura-600 to-amber-600 text-white shadow-lg shadow-sakura-600/30'
              : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Nạp Bài Đọc Tài Liệu</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: NẠP & QUẢN LÝ ĐỀ THI JLPT */}
      {/* ========================================================================= */}
      {activeAdminTab === 'questions' && (
        <div className="space-y-8">

          {/* Section A: Bulk JSON Upload */}
          <div className="p-6 rounded-3xl glass-panel border border-amber-500/30 bg-slate-900/90 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Nạp Đề Thi Hàng Loạt (Bulk JSON Import)</h3>
                  <p className="text-xs text-slate-400">Tải file `.json` hoặc dán mảng dữ liệu câu hỏi đề thi để nạp ngay lập tức</p>
                </div>
              </div>

              <label className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs cursor-pointer transition-all flex items-center space-x-2">
                <Code className="w-4 h-4 text-sakura-400" />
                <span>Chọn File JSON</span>
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {bulkStatusMsg && (
              <div className={`p-3 rounded-2xl text-xs font-semibold ${
                bulkStatusMsg.type === 'success' ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300' : 'bg-red-950/80 border border-red-500/40 text-red-300'
              }`}>
                {bulkStatusMsg.text}
              </div>
            )}

            <textarea
              rows={4}
              value={bulkJsonText}
              onChange={e => setBulkJsonText(e.target.value)}
              placeholder={`Dán chuỗi JSON danh sách câu hỏi đề thi tại đây...\nVí dụ: [{"jlpt": "N5", "category": "vocab", "question": "...", "options": ["A","B","C","D"], "correctAnswer": 0, "explanation": "..."}]`}
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 focus:border-amber-500 outline-none transition-all"
            />

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setBulkJsonText('')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-medium"
              >
                Xóa Ô Nhập
              </button>
              
              <button
                onClick={handleBulkUploadSubmit}
                disabled={isUploadingBulk}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-sakura-600 hover:from-amber-400 hover:to-sakura-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-2 disabled:opacity-50"
              >
                {isUploadingBulk ? <span>Đang xử lý nạp...</span> : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Nạp Dữ Liệu Hàng Loạt</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Section B: Single Question Form */}
          <form onSubmit={handleSaveQuestion} className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-900/90 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-sakura-500/20 text-sakura-400">
                  {isEditingQuestion ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <h3 className="text-base font-bold text-white">
                  {isEditingQuestion ? 'Chỉnh Sửa Câu Hỏi Đề Thi' : 'Thêm 1 Câu Hỏi Mới Thủ Công'}
                </h3>
              </div>

              {isEditingQuestion && (
                <button
                  type="button"
                  onClick={resetQuestionForm}
                  className="text-xs text-sakura-400 hover:underline"
                >
                  Hủy chỉnh sửa
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Cấp độ JLPT</label>
                <select
                  value={formQuestion.jlpt}
                  onChange={e => setFormQuestion({ ...formQuestion, jlpt: e.target.value as JlptLevel })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-sakura-500"
                >
                  <option value="N5">JLPT N5 (Sơ cấp 1)</option>
                  <option value="N4">JLPT N4 (Sơ cấp 2)</option>
                  <option value="N3">JLPT N3 (Trung cấp 1)</option>
                  <option value="N2">JLPT N2 (Trung cấp 2)</option>
                  <option value="N1">JLPT N1 (Cao cấp)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phần thi (Category)</label>
                <select
                  value={formQuestion.category}
                  onChange={e => setFormQuestion({ ...formQuestion, category: e.target.value as any })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-sakura-500"
                >
                  <option value="vocab">Chữ Hán & Từ vựng</option>
                  <option value="grammar">Ngữ pháp & Cấu trúc</option>
                  <option value="reading">Đọc hiểu đoạn văn</option>
                  <option value="listening">Nghe hiểu đàm thoại</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Điểm Ngữ Pháp liên quan</label>
                <input
                  type="text"
                  value={formQuestion.grammarPoint}
                  onChange={e => setFormQuestion({ ...formQuestion, grammarPoint: e.target.value })}
                  placeholder="Ví dụ: Vて + から / ~たら"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-sakura-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nội dung câu hỏi *</label>
              <textarea
                rows={2}
                required
                value={formQuestion.question}
                onChange={e => setFormQuestion({ ...formQuestion, question: e.target.value })}
                placeholder="Nhập đề bài tiếng Nhật hoặc câu hỏi trắc nghiệm..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-sakura-500"
              />
            </div>

            {formQuestion.category === 'reading' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Đoạn văn đọc hiểu (Reading Context)</label>
                <textarea
                  rows={3}
                  value={formQuestion.readingContext}
                  onChange={e => setFormQuestion({ ...formQuestion, readingContext: e.target.value })}
                  placeholder="Nhập đoạn văn bản đọc hiểu tiếng Nhật..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-sakura-500"
                />
              </div>
            )}

            {/* 4 Options Grid */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">4 Đáp án lựa chọn (Chọn nút tròn để đánh dấu đáp án đúng)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formQuestion.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center space-x-2 p-2 rounded-xl bg-slate-950 border border-slate-800 focus-within:border-sakura-500">
                    <input
                      type="radio"
                      name="correctAnswerRadio"
                      checked={formQuestion.correctAnswer === idx}
                      onChange={() => setFormQuestion({ ...formQuestion, correctAnswer: idx })}
                      className="w-4 h-4 text-sakura-600 focus:ring-sakura-500 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-400 w-6">[{String.fromCharCode(65 + idx)}]</span>
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={e => {
                        const newOpts = [...formQuestion.options];
                        newOpts[idx] = e.target.value;
                        setFormQuestion({ ...formQuestion, options: newOpts });
                      }}
                      placeholder={`Đáp án ${String.fromCharCode(65 + idx)}`}
                      className="flex-1 bg-transparent text-xs text-white outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Lời giải thích đáp án</label>
              <input
                type="text"
                value={formQuestion.explanation}
                onChange={e => setFormQuestion({ ...formQuestion, explanation: e.target.value })}
                placeholder="Giải thích lý do tại sao đáp án đó đúng..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-sakura-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sakura-600 to-amber-600 hover:from-sakura-500 hover:to-amber-500 font-bold text-xs text-white shadow-lg shadow-sakura-600/30 transition-all flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{isEditingQuestion ? 'Cập Nhật Câu Hỏi' : 'Lưu Câu Hỏi Mới'}</span>
              </button>
            </div>
          </form>

          {/* Section C: Questions Data Table */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-900/90 space-y-4">
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-sakura-400" />
                <span className="text-xs font-bold text-slate-300">Danh Sách Câu Hỏi Đề Thi ({questions.length})</span>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <select
                  value={filterLevel}
                  onChange={e => setFilterLevel(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                >
                  <option value="ALL">Tất cả trình độ</option>
                  <option value="N5">JLPT N5</option>
                  <option value="N4">JLPT N4</option>
                  <option value="N3">JLPT N3</option>
                  <option value="N2">JLPT N2</option>
                  <option value="N1">JLPT N1</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                >
                  <option value="ALL">Tất cả phần thi</option>
                  <option value="vocab">Từ vựng</option>
                  <option value="grammar">Ngữ pháp</option>
                  <option value="reading">Đọc hiểu</option>
                  <option value="listening">Nghe hiểu</option>
                </select>

                <button
                  onClick={fetchQuestionsData}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                  title="Tải lại"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingQuestions ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Questions List */}
            {questions.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                Chưa có câu hỏi nào phù hợp với bộ lọc. Hãy nạp thêm câu hỏi mới!
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {questions.map((q, idx) => (
                  <div key={q.id || idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded-md bg-sakura-500/20 text-sakura-300 font-mono text-[10px] font-bold">
                          {q.jlpt}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase">
                          {q.category}
                        </span>
                        <span className="text-[10px] text-slate-500">ID: {q.id}</span>
                      </div>

                      <div className="text-xs font-semibold text-slate-100">{q.question}</div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                        {q.options?.map((opt, oIdx) => (
                          <div key={oIdx} className={`px-2 py-1 rounded-lg border ${
                            q.correctAnswer === oIdx ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}>
                            [{String.fromCharCode(65 + oIdx)}] {opt}
                          </div>
                        ))}
                      </div>

                      {q.explanation && (
                        <div className="text-[11px] text-slate-400 italic">
                          💡 Giải thích: {q.explanation}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => handleEditQuestionClick(q)}
                        className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-700 transition-all"
                        title="Sửa câu hỏi"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestionClick(q.id)}
                        className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-red-400 hover:bg-slate-700 transition-all"
                        title="Xóa câu hỏi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: QUẢN LÝ TỪ VỰNG */}
      {/* ========================================================================= */}
      {activeAdminTab === 'vocab' && (
        <div className="space-y-8">
          
          <form onSubmit={handleSaveVocab} className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-900/90 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Plus className="w-5 h-5 text-sakura-400" />
              <span>Thêm Từ Vựng Tiếng Nhật Mới</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Từ Nhật (Kanji/Kana) *</label>
                <input
                  type="text"
                  required
                  value={formVocab.word}
                  onChange={e => setFormVocab({ ...formVocab, word: e.target.value })}
                  placeholder="Ví dụ: 日本語"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cách đọc (Furigana)</label>
                <input
                  type="text"
                  value={formVocab.reading}
                  onChange={e => setFormVocab({ ...formVocab, reading: e.target.value })}
                  placeholder="Ví dụ: にほんご"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phiên âm Romaji</label>
                <input
                  type="text"
                  value={formVocab.romaji}
                  onChange={e => setFormVocab({ ...formVocab, romaji: e.target.value })}
                  placeholder="Ví dụ: nihongo"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Âm Hán Việt</label>
                <input
                  type="text"
                  value={formVocab.hanViet}
                  onChange={e => setFormVocab({ ...formVocab, hanViet: e.target.value })}
                  placeholder="Ví dụ: NHẬT BẢN NGỮ"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nghĩa Tiếng Việt (cách nhau bởi phẩy)</label>
                <input
                  type="text"
                  required
                  value={formVocab.meanings}
                  onChange={e => setFormVocab({ ...formVocab, meanings: e.target.value })}
                  placeholder="Ví dụ: Tiếng Nhật, Nhật ngữ"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cấp độ JLPT</label>
                <select
                  value={formVocab.jlpt}
                  onChange={e => setFormVocab({ ...formVocab, jlpt: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                >
                  <option value="N5">N5</option>
                  <option value="N4">N4</option>
                  <option value="N3">N3</option>
                  <option value="N2">N2</option>
                  <option value="N1">N1</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Từ loại</label>
                <input
                  type="text"
                  value={formVocab.type}
                  onChange={e => setFormVocab({ ...formVocab, type: e.target.value })}
                  placeholder="Ví dụ: Danh từ / Động từ"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-sakura-600 hover:bg-sakura-500 font-bold text-xs text-white shadow-lg shadow-sakura-600/30"
            >
              Thêm Từ Vựng Mới
            </button>
          </form>

          {/* Vocab Data List */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-900/90 space-y-4">
            <h3 className="text-sm font-bold text-slate-200">Danh Sách Từ Vựng ({vocabList.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {vocabList.map(v => (
                <div key={v.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between">
                  <div>
                    <div className="text-base font-bold text-white">{v.word} <span className="text-xs font-normal text-slate-400">({v.reading})</span></div>
                    <div className="text-xs text-sakura-300">{v.hanViet || v.romaji}</div>
                    <div className="text-xs text-slate-300 mt-1">{Array.isArray(v.meanings) ? v.meanings.join(', ') : v.meanings}</div>
                  </div>
                  <button
                    onClick={() => handleDeleteVocab(v.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: NẠP BÀI ĐỌC TÀI LIỆU (STORY READER) */}
      {/* ========================================================================= */}
      {activeAdminTab === 'stories' && (
        <div className="space-y-8">
          
          <form onSubmit={handleSaveStory} className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-900/90 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Plus className="w-5 h-5 text-sakura-400" />
              <span>Nạp Bài Đọc / Tài Liệu Mới (Story Reader)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tên bài đọc / Tác phẩm *</label>
                <input
                  type="text"
                  required
                  value={formStory.title}
                  onChange={e => setFormStory({ ...formStory, title: e.target.value })}
                  placeholder="Ví dụ: 桃太郎 (Cậu Bé Quả Đào)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cấp độ JLPT</label>
                <select
                  value={formStory.jlpt}
                  onChange={e => setFormStory({ ...formStory, jlpt: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                >
                  <option value="N5">JLPT N5</option>
                  <option value="N4">JLPT N4</option>
                  <option value="N3">JLPT N3</option>
                  <option value="N2">JLPT N2</option>
                  <option value="N1">JLPT N1</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nội dung văn bản tiếng Nhật (Kanji) *</label>
              <textarea
                rows={3}
                required
                value={formStory.content}
                onChange={e => setFormStory({ ...formStory, content: e.target.value })}
                placeholder="Nhập đoạn văn bản câu chuyện bằng tiếng Nhật..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phiên âm Hiragana (Reading)</label>
              <textarea
                rows={2}
                value={formStory.reading}
                onChange={e => setFormStory({ ...formStory, reading: e.target.value })}
                placeholder="Nhập cách đọc Hiragana tương ứng..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Bản dịch Tiếng Việt</label>
              <textarea
                rows={2}
                value={formStory.translation}
                onChange={e => setFormStory({ ...formStory, translation: e.target.value })}
                placeholder="Nhập bản dịch tiếng Việt chi tiết..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sakura-600 to-amber-600 hover:from-sakura-500 hover:to-amber-500 font-bold text-xs text-white shadow-lg shadow-sakura-600/30"
            >
              Nạp Bài Đọc Vào Hệ Thống
            </button>
          </form>

          {/* Stories List */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-900/90 space-y-4">
            <h3 className="text-sm font-bold text-slate-200">Danh Sách Bài Đọc Hiện Có ({stories.length})</h3>
            <div className="space-y-3">
              {stories.map(s => (
                <div key={s.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-sakura-500/20 text-sakura-300 font-mono text-[10px] font-bold">{s.jlpt}</span>
                      <h4 className="text-sm font-bold text-white">{s.title}</h4>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2">{s.content}</p>
                    <p className="text-xs text-slate-500 italic line-clamp-1">Dịch: {s.translation}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteStory(s.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
