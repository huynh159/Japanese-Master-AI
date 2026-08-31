import React, { useState, useEffect } from 'react';
import { JlptLevel, ExamQuestion, ExamResult } from '../types';
import { JLPT_EXAM_QUESTIONS } from '../data/japaneseData';
import { SpeechService } from '../services/speechService';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Volume2, 
  Award, 
  RotateCcw, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Headphones
} from 'lucide-react';

interface JlptExamSystemProps {
  currentJlpt: JlptLevel;
  onSelectJlpt: (level: JlptLevel) => void;
  onExamComplete?: (result: ExamResult) => void;
}

export const JlptExamSystem: React.FC<JlptExamSystemProps> = ({
  currentJlpt,
  onSelectJlpt,
  onExamComplete
}) => {
  const [examMode, setExamMode] = useState<'selection' | 'testing' | 'result'>('selection');
  const [testType, setTestType] = useState<'practice' | 'simulated'>('practice');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'vocab' | 'grammar' | 'reading' | 'listening'>('all');
  
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(1200); // 20 mins timer
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [resultData, setResultData] = useState<ExamResult | null>(null);

  // Filter questions whenever level or category changes
  useEffect(() => {
    let filtered = JLPT_EXAM_QUESTIONS.filter(q => q.jlpt === currentJlpt);
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }
    // If no questions in current combination, fallback to all questions of level or mock
    if (filtered.length === 0) {
      filtered = JLPT_EXAM_QUESTIONS.filter(q => q.jlpt === 'N5');
    }
    setQuestions(filtered);
    setCurrentIndex(0);
    setUserAnswers({});
  }, [currentJlpt, selectedCategory]);

  // Timer countdown hook
  useEffect(() => {
    let timer: any = null;
    if (isTimerRunning && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds(prev => prev - 1);
      }, 1000);
    } else if (timeLeftSeconds === 0 && isTimerRunning) {
      handleSubmitExam();
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeftSeconds]);

  const handleStartTest = (type: 'practice' | 'simulated') => {
    setTestType(type);
    setCurrentIndex(0);
    setUserAnswers({});
    setTimeLeftSeconds(type === 'simulated' ? 1200 : 0);
    setIsTimerRunning(type === 'simulated');
    setExamMode('testing');
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitExam = () => {
    setIsTimerRunning(false);
    
    let correctCount = 0;
    let categoryScores = { vocab: 0, grammar: 0, reading: 0, listening: 0 };
    let categoryTotals = { vocab: 0, grammar: 0, reading: 0, listening: 0 };

    questions.forEach(q => {
      categoryTotals[q.category]++;
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
        categoryScores[q.category]++;
      }
    });

    const total = questions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const passed = percentage >= 60;

    const result: ExamResult = {
      jlpt: currentJlpt,
      score: correctCount,
      totalQuestions: total,
      percentage,
      passed,
      categoryScores,
      timeSpentSeconds: 1200 - timeLeftSeconds,
      date: new Date().toLocaleDateString('vi-VN')
    };

    setResultData(result);
    setExamMode('result');

    if (onExamComplete) {
      onExamComplete(result);
    }

    if (passed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-sakura-600 to-jpgold-500 text-white shadow-lg shadow-sakura-500/20">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white">Luyện Thi JLPT {currentJlpt}</h1>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-sakura-500/20 text-sakura-300 border border-sakura-500/30">
                Full 5 Cấp Độ
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Đề thi chuẩn cấu trúc Thi Thật (Từ vựng, Ngữ pháp, Đọc hiểu & Luyện nghe)</p>
          </div>
        </div>

        {/* Level Switch Pills */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {(['N5', 'N4', 'N3', 'N2', 'N1'] as JlptLevel[]).map(lvl => (
            <button
              key={lvl}
              onClick={() => {
                onSelectJlpt(lvl);
                setExamMode('selection');
              }}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-xl transition-all ${
                currentJlpt === lvl
                  ? 'bg-sakura-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* MODE 1: SELECTION SCREEN */}
      {examMode === 'selection' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Practice Mode Card */}
          <div className="p-6 rounded-3xl glass-panel glass-panel-hover border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-extrabold text-slate-100">Chế Độ Luyện Tập (Practice)</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Làm bài không giới hạn thời gian. Hiển thị ngay lời giải chi tiết và ngữ pháp liên quan sau từng câu chọn.
              </p>
            </div>
            <button
              onClick={() => handleStartTest('practice')}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Bắt Đầu Luyện Tập</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Simulated Exam Mode Card */}
          <div className="p-6 rounded-3xl glass-panel glass-panel-hover border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sakura-500/20 border border-sakura-500/30 flex items-center justify-center text-sakura-400">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-extrabold text-slate-100">Thi Thử JLPT (Simulated Exam)</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tính giờ đếm ngược 20 phút. Trải nghiệm áp lực thi thật và nhận bảng phân tích năng lực AI hoàn chỉnh.
              </p>
            </div>
            <button
              onClick={() => handleStartTest('simulated')}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-sakura-600 to-sakura-500 hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-sakura-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Bắt Đầu Thi Thử (Có Đồng Hồ)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* MODE 2: TESTING SCREEN */}
      {examMode === 'testing' && currentQ && (
        <div className="space-y-6">
          
          {/* Quiz Top Action Bar */}
          <div className="flex items-center justify-between p-4 rounded-2xl glass-panel border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">
                Câu {currentIndex + 1} / {questions.length}
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md uppercase bg-indigo-500/20 text-indigo-300">
                {currentQ.category}
              </span>
            </div>

            {testType === 'simulated' && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                <Clock className="w-4 h-4" />
                <span>
                  {Math.floor(timeLeftSeconds / 60)}:{(timeLeftSeconds % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}

            <button
              onClick={handleSubmitExam}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all"
            >
              Nộp Bài
            </button>
          </div>

          {/* Question Card */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
            
            {/* Listening audio trigger if listening category */}
            {currentQ.category === 'listening' && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Headphones className="w-5 h-5 text-sakura-400" />
                  <span className="text-xs font-semibold text-slate-200">Đoạn âm thanh hội thoại mẫu:</span>
                </div>
                <button
                  onClick={() => SpeechService.speakJapanese(currentQ.question)}
                  className="px-3 py-1.5 rounded-xl bg-sakura-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe Audio</span>
                </button>
              </div>
            )}

            <div className="text-base font-bold text-slate-100 leading-relaxed font-jp whitespace-pre-line">
              {currentQ.question}
            </div>

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = userAnswers[currentQ.id] === idx;
                const isCorrect = idx === currentQ.correctAnswer;
                const showInstantAnswer = testType === 'practice' && userAnswers[currentQ.id] !== undefined;

                let optionStyle = 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200';
                if (isSelected) {
                  optionStyle = 'bg-sakura-500/20 border-sakura-500 text-sakura-200 font-bold';
                }
                if (showInstantAnswer) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.id, idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <span className="font-jp">{opt}</span>
                    {showInstantAnswer && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    {showInstantAnswer && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                  </button>
                );
              })}
            </div>

            {/* Instant Practice Explanation */}
            {testType === 'practice' && userAnswers[currentQ.id] !== undefined && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 text-xs space-y-2">
                <span className="font-bold text-indigo-300 block">💡 AI Giải thích chi tiết:</span>
                <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
                {currentQ.grammarPoint && (
                  <div className="text-slate-400 mt-1">
                    <span className="font-semibold text-jpgold-400">Điểm ngữ pháp: </span>
                    {currentQ.grammarPoint}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-40 text-slate-300 text-xs font-semibold"
            >
              Câu trước
            </button>
            <button
              onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex === questions.length - 1}
              className="px-4 py-2 rounded-xl bg-sakura-600 hover:bg-sakura-500 text-white text-xs font-semibold"
            >
              Câu kế tiếp
            </button>
          </div>

        </div>
      )}

      {/* MODE 3: RESULT SCREEN */}
      {examMode === 'result' && resultData && (
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-sakura-500 to-jpgold-400 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-jpgold-400" />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Kết Quả Luyện Thi JLPT {resultData.jlpt}</h2>
            <p className={`text-sm font-bold ${resultData.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
              {resultData.passed ? '🎉 CHÚC MỪNG! BẠN ĐÃ ĐẠT CHUẨN ĐẬU' : '💪 RẤT TIẾC! HÃY CỐ GẮNG ÔN LẠI'}
            </p>
          </div>

          {/* Score Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">Tổng Điểm</span>
              <span className="text-2xl font-black text-sakura-300">{resultData.percentage}%</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">Số Câu Đúng</span>
              <span className="text-2xl font-black text-emerald-400">{resultData.score}/{resultData.totalQuestions}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">Thời Gian Làm</span>
              <span className="text-2xl font-black text-amber-400">{Math.floor(resultData.timeSpentSeconds / 60)} phút</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">Đánh Giá AI</span>
              <span className="text-xs font-bold text-indigo-300">{resultData.passed ? 'Xuất sắc' : 'Cần ôn thêm'}</span>
            </div>
          </div>

          {/* Restart Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setExamMode('selection')}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm Bài Khác</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
