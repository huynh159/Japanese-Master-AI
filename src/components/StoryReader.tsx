import React, { useState } from 'react';
import { JAPANESE_STORIES } from '../data/japaneseData';
import { SpeechService } from '../services/speechService';
import { BookOpenText, Volume2, Eye, EyeOff, Play, Pause, Sparkles } from 'lucide-react';

export const StoryReader: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState(JAPANESE_STORIES[0]);
  const [showTranslation, setShowTranslation] = useState(true);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    SpeechService.speakJapanese(selectedStory.content, speechRate);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-sakura-600 to-indigo-600 text-white shadow-lg shadow-sakura-500/20">
            <BookOpenText className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">Đọc Truyện & Audio Tiếng Nhật (Audio Reader)</h1>
            <p className="text-xs text-slate-400 mt-1">Luyện đọc hiểu & luyện nghe tích hợp giọng nói AI chuẩn Tokyo</p>
          </div>
        </div>
      </div>

      {/* Story Selector Pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {JAPANESE_STORIES.map(story => (
          <button
            key={story.id}
            onClick={() => {
              setSelectedStory(story);
              setIsPlaying(false);
            }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs border transition-all flex items-center gap-2 ${
              selectedStory.id === story.id
                ? 'bg-sakura-600 text-white border-sakura-500 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <span>{story.title}</span>
            <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-white/20">
              {story.jlpt}
            </span>
          </button>
        ))}
      </div>

      {/* Main Story Card */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
        
        {/* Story Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <h2 className="text-lg font-bold text-slate-100">{selectedStory.title}</h2>

          <div className="flex items-center gap-3">
            {/* Speed Control */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              {[0.75, 1.0, 1.25].map(rate => (
                <button
                  key={rate}
                  onClick={() => setSpeechRate(rate)}
                  className={`px-2 py-1 rounded-lg ${speechRate === rate ? 'bg-sakura-500 text-white' : 'text-slate-400'}`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* Audio Play */}
            <button
              onClick={handlePlayAudio}
              className="px-4 py-2 rounded-xl bg-sakura-600 hover:bg-sakura-500 text-white text-xs font-bold flex items-center gap-2 shadow-md"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Truyện Audio</span>
            </button>

            {/* Toggle Translation */}
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              title="Ẩn/Hiện dịch tiếng Việt"
            >
              {showTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Story Japanese Text */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <p className="text-lg font-jp font-bold text-slate-100 leading-relaxed whitespace-pre-line">
            {selectedStory.content}
          </p>
        </div>

        {/* Translation */}
        {showTranslation && (
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs space-y-1">
            <span className="font-bold text-indigo-300 block">🇻🇳 Bản dịch tiếng Việt:</span>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {selectedStory.vietnameseTranslation}
            </p>
          </div>
        )}

        {/* Story Vocab Highlights */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Từ Vựng Quan Trọng Trong Bài:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {selectedStory.vocabList.map((v, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="font-bold font-jp text-sakura-300 text-sm block">{v.word}</span>
                <span className="text-[11px] font-jp text-slate-400 block">{v.reading}</span>
                <span className="text-slate-300 block mt-1">{v.meaning}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
