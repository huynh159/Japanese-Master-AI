import React from 'react';
import { AppTab, UserStats, JlptLevel } from '../types';
import { 
  Flame, 
  Sparkles, 
  GraduationCap, 
  PenTool, 
  Camera, 
  BookMarked, 
  MessageSquareCode, 
  ArrowRight,
  Trophy,
  Target
} from 'lucide-react';

interface DashboardProps {
  userStats: UserStats;
  onNavigateTab: (tab: AppTab) => void;
  onOpenHandwritingModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  userStats,
  onNavigateTab,
  onOpenHandwritingModal
}) => {
  const quickActions: { id: AppTab; title: string; desc: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'exam',
      title: 'Luyện Thi JLPT N5-N1',
      desc: 'Bộ đề thi thử 4 phần có đếm ngược & AI giải thích chi tiết.',
      icon: <GraduationCap className="w-6 h-6 text-sakura-300" />,
      color: 'from-sakura-600/30 to-sakura-900/30 border-sakura-500/30'
    },
    {
      id: 'kanji-canvas',
      title: 'Nhận Diện Kanji Viết Tay (AI Model)',
      desc: 'Vẽ cảm ứng trên bảng để Model AI tự nhận diện real-time.',
      icon: <PenTool className="w-6 h-6 text-purple-400" />,
      color: 'from-purple-600/30 to-purple-900/30 border-purple-500/30'
    },
    {
      id: 'ocr-scanner',
      title: 'Quét Chữ Từ Ảnh & Camera (OCR)',
      desc: 'Tải ảnh trang sách/manga để AI tự động trích xuất từ vựng.',
      icon: <Camera className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-600/30 to-emerald-900/30 border-emerald-500/30'
    },
    {
      id: 'dictionary',
      title: 'Từ Điển Tiếng Nhật Đa Năng',
      desc: 'Tra nhanh Kanji, Hiragana, Romaji, Hán-Việt & Phát âm audio.',
      icon: <BookMarked className="w-6 h-6 text-amber-400" />,
      color: 'from-amber-600/30 to-amber-900/30 border-amber-500/30'
    },
    {
      id: 'kaiwa',
      title: 'AI Sensei Kaiwa (Luyện Nói 1:1)',
      desc: 'Hội thoại giọng nói, AI tự sửa lỗi ngữ pháp & hướng dẫn.',
      icon: <MessageSquareCode className="w-6 h-6 text-indigo-400" />,
      color: 'from-indigo-600/30 to-indigo-900/30 border-indigo-500/30'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Welcome Header */}
      <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-r from-sakura-950 via-slate-900 to-indigo-950 border border-sakura-500/30 shadow-sakura-glow">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-black tracking-wider uppercase rounded-full bg-sakura-500 text-white shadow-md">
                🏆 DANH HIỆU: {userStats.currentLevelTitle}
              </span>
              <span className="text-xs text-slate-400">Mục tiêu: {userStats.targetLevel}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Chào mừng bạn đến với <span className="bg-gradient-to-r from-sakura-300 via-pink-200 to-jpgold-400 bg-clip-text text-transparent">Japanese Master AI</span>!
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Hệ thống học tiếng Nhật đột phá ứng dụng AI hỗ trợ Luyện thi N5-N1, Nhận diện nét vẽ Kanji cảm ứng, Quét từ vựng qua ảnh chụp và Trò chuyện Kaiwa giọng nói.
            </p>
          </div>

          {/* Quick Action Canvas */}
          <button
            onClick={onOpenHandwritingModal}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sakura-600 to-jpgold-500 hover:brightness-110 text-white font-extrabold text-sm shadow-xl shadow-sakura-600/30 transition-all flex items-center gap-2 shrink-0 active:scale-95"
          >
            <PenTool className="w-5 h-5" />
            <span>Vẽ & Nhận Diện Kanji AI</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-amber-400">
            <Flame className="w-5 h-5 fill-amber-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Chuỗi Ngày Học</span>
          </div>
          <span className="text-3xl font-black text-slate-100">{userStats.streakDays} ngày</span>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-sakura-400">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Điểm Kinh Nghiệm</span>
          </div>
          <span className="text-3xl font-black text-sakura-300">{userStats.xp.toLocaleString()} XP</span>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-purple-400">
            <PenTool className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Kanji Đã Thuộc</span>
          </div>
          <span className="text-3xl font-black text-purple-300">{userStats.kanjiMastered} chữ</span>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-emerald-400">
            <Trophy className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Bài Thi Hoàn Thành</span>
          </div>
          <span className="text-3xl font-black text-emerald-300">{userStats.examsCompleted} đề</span>
        </div>
      </div>

      {/* Quick Launch Features Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Khám Phá Các Công Cụ Học TẬP AI
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quickActions.map(action => (
            <div
              key={action.id}
              onClick={() => {
                if (action.id === 'kanji-canvas') {
                  onOpenHandwritingModal();
                } else {
                  onNavigateTab(action.id);
                }
              }}
              className={`p-6 rounded-3xl glass-panel border bg-gradient-to-br ${action.color} cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4 group`}
            >
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-slate-950/80 w-fit border border-slate-800 group-hover:scale-110 transition-all">
                  {action.icon}
                </div>
                <h3 className="text-base font-extrabold text-slate-100 group-hover:text-sakura-300 transition-all">
                  {action.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{action.desc}</p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-sakura-300 group-hover:translate-x-1 transition-all">
                <span>Trải nghiệm ngay</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
