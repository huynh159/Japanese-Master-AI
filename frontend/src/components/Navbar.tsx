import React from 'react';
import { JlptLevel, UserStats } from '../types';
import { Flame, Award, Sparkles, PenTool, BookOpen, Volume2 } from 'lucide-react';

interface NavbarProps {
  currentJlpt: JlptLevel;
  onSelectJlpt: (level: JlptLevel) => void;
  userStats: UserStats;
  onOpenHandwritingModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentJlpt,
  onSelectJlpt,
  userStats,
  onOpenHandwritingModal
}) => {
  const jlptLevels: JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sakura-600 via-sakura-500 to-jpgold-400 p-0.5 shadow-sakura-glow">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="text-xl">🌸</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-sakura-300 via-pink-200 to-jpgold-400 bg-clip-text text-transparent">
                JAPANESE MASTER
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-full bg-sakura-500/20 text-sakura-300 border border-sakura-500/30">
                AI PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">AI Japanese & JLPT Learning Platform</p>
          </div>
        </div>

        {/* Level Selector & Action Bar */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* JLPT Level Pills */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            {jlptLevels.map(lvl => (
              <button
                key={lvl}
                onClick={() => onSelectJlpt(lvl)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  currentJlpt === lvl
                    ? 'bg-gradient-to-r from-sakura-600 to-sakura-500 text-white shadow-md shadow-sakura-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Quick Handwritten Kanji AI Modal Trigger */}
          <button
            onClick={onOpenHandwritingModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
            title="Nhận diện chữ Kanji viết tay bằng AI"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Vẽ Kanji AI</span>
          </button>

          {/* Stats Counters */}
          <div className="hidden lg:flex items-center gap-3 pl-2 border-l border-slate-800">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{userStats.streakDays} ngày</span>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-sakura-500/10 border border-sakura-500/20 text-sakura-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-sakura-400" />
              <span>{userStats.xp.toLocaleString()} XP</span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
