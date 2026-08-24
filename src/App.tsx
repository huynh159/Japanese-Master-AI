import React, { useState } from 'react';
import { AppTab, JlptLevel, UserStats } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { JlptExamSystem } from './components/JlptExamSystem';
import { HandwrittenKanjiModal } from './components/HandwrittenKanjiModal';
import { ImageOcrScanner } from './components/ImageOcrScanner';
import { JapaneseDictionary } from './components/JapaneseDictionary';
import { KaiwaChat } from './components/KaiwaChat';
import { SentenceAnalyzer } from './components/SentenceAnalyzer';
import { SrsFlashcards } from './components/SrsFlashcards';
import { StoryReader } from './components/StoryReader';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [currentJlpt, setCurrentJlpt] = useState<JlptLevel>('N5');
  const [isHandwritingModalOpen, setIsHandwritingModalOpen] = useState(false);

  const [userStats, setUserStats] = useState<UserStats>({
    xp: 1250,
    streakDays: 5,
    currentLevelTitle: 'Vua Tiếng Nhật (Tập Sự)',
    cardsMastered: 48,
    kanjiMastered: 18,
    examsCompleted: 3,
    targetLevel: 'N3'
  });

  const handleExamComplete = () => {
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + 150,
      examsCompleted: prev.examsCompleted + 1
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-sakura-500 selection:text-white">
      
      {/* Top Fixed Header Navbar */}
      <Navbar
        currentJlpt={currentJlpt}
        onSelectJlpt={setCurrentJlpt}
        userStats={userStats}
        onOpenHandwritingModal={() => setIsHandwritingModalOpen(true)}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              userStats={userStats}
              onNavigateTab={setActiveTab}
              onOpenHandwritingModal={() => setIsHandwritingModalOpen(true)}
            />
          )}

          {activeTab === 'exam' && (
            <JlptExamSystem
              currentJlpt={currentJlpt}
              onSelectJlpt={setCurrentJlpt}
              onExamComplete={handleExamComplete}
            />
          )}

          {activeTab === 'kanji-canvas' && (
            <div className="p-8 rounded-3xl glass-panel text-center space-y-4">
              <h2 className="text-xl font-bold">Vẽ & Nhận Diện Kanji Bằng Model AI</h2>
              <p className="text-xs text-slate-400">Mở cửa sổ vẽ nét Hán tự tương tác</p>
              <button
                onClick={() => setIsHandwritingModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-sakura-600 hover:bg-sakura-500 text-white font-bold text-sm shadow-lg shadow-sakura-600/30 transition-all"
              >
                Mở Bảng Vẽ Kanji AI
              </button>
            </div>
          )}

          {activeTab === 'ocr-scanner' && <ImageOcrScanner />}
          {activeTab === 'dictionary' && (
            <JapaneseDictionary
              onOpenHandwritingModal={() => setIsHandwritingModalOpen(true)}
            />
          )}
          {activeTab === 'kaiwa' && <KaiwaChat />}
          {activeTab === 'sentence-analyzer' && <SentenceAnalyzer />}
          {activeTab === 'srs-flashcards' && <SrsFlashcards />}
          {activeTab === 'story-reader' && <StoryReader />}
        </main>

      </div>

      {/* Handwritten Kanji Drawing Modal */}
      <HandwrittenKanjiModal
        isOpen={isHandwritingModalOpen}
        onClose={() => setIsHandwritingModalOpen(false)}
      />

    </div>
  );
};
