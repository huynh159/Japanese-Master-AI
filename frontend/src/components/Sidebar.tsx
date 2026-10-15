import React from 'react';
import { AppTab } from '../types';
import { 
  LayoutDashboard, 
  GraduationCap, 
  PenTool, 
  Camera, 
  BookMarked, 
  MessageSquareCode, 
  BrainCircuit, 
  Layers, 
  BookOpenText,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems: { id: AppTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Trang chủ', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'exam', label: 'Luyện Thi JLPT N5-N1', icon: <GraduationCap className="w-5 h-5" />, badge: 'HOT' },
    { id: 'kanji-canvas', label: 'AI Nhận Diện Kanji', icon: <PenTool className="w-5 h-5" />, badge: 'MODEL' },
    { id: 'ocr-scanner', label: 'Quét Chữ Từ Ảnh', icon: <Camera className="w-5 h-5" />, badge: 'OCR' },
    { id: 'dictionary', label: 'Từ Điển Tiếng Nhật', icon: <BookMarked className="w-5 h-5" /> },
    { id: 'kaiwa', label: 'AI Sensei Kaiwa', icon: <MessageSquareCode className="w-5 h-5" /> },
    { id: 'sentence-analyzer', label: 'Phân Tích Cú Pháp', icon: <BrainCircuit className="w-5 h-5" /> },
    { id: 'srs-flashcards', label: 'Thẻ Nhớ SRS', icon: <Layers className="w-5 h-5" /> },
    { id: 'story-reader', label: 'Đọc Truyện & Audio', icon: <BookOpenText className="w-5 h-5" /> },
    { id: 'admin', label: 'Trang Quản Trị', icon: <ShieldCheck className="w-5 h-5 text-amber-400" />, badge: 'ADMIN' },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-800 shrink-0 hidden md:block min-h-[calc(100vh-4rem)] p-3">
      <div className="space-y-1">
        <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Công Cụ Học TẬP AI
        </p>
        
        {menuItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-sakura-600 to-sakura-500 text-white shadow-lg shadow-sakura-600/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-white' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`px-1.5 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-wider ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-sakura-500/20 text-sakura-300 border border-sakura-500/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom AI Assistant Status Widget */}
      <div className="mt-8 p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/20 text-xs">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-slate-200">AI Sensei Online</span>
        </div>
        <p className="text-slate-400 leading-relaxed text-[11px]">
          Model AI tự nhận diện nét Kanji & trích xuất OCR sẵn sàng hỗ trợ bạn 24/7.
        </p>
      </div>
    </aside>
  );
};
