import React, { useState } from 'react';
import { VOCAB_DATABASE } from '../data/japaneseData';
import { SpeechService } from '../services/speechService';
import { Layers, RotateCcw, Volume2, Sparkles, CheckCircle2, ThumbsUp, ThumbsDown, Smile } from 'lucide-react';

export const SrsFlashcards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  const currentVocab = VOCAB_DATABASE[currentIndex % VOCAB_DATABASE.length];

  const handleRating = (difficulty: 'again' | 'good' | 'easy') => {
    setIsFlipped(false);
    setReviewedCount(prev => prev + 1);
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-sakura-600 to-jpgold-500 text-white shadow-lg shadow-sakura-500/20">
            <Layers className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">Thẻ Nhớ Thông Minh SRS (Spaced Repetition)</h1>
            <p className="text-xs text-slate-400 mt-1">Thuật toán lặp lại ngắt quãng Anki giúp ghi nhớ từ vựng N5-N1 dài hạn</p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300">
          Đã ôn: <span className="text-sakura-300 font-extrabold">{reviewedCount}</span> thẻ
        </div>
      </div>

      {/* Flashcard Flip Container */}
      <div className="max-w-xl mx-auto space-y-6">
        
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative h-80 w-full rounded-3xl glass-panel border border-slate-800 p-8 cursor-pointer transition-all hover:scale-[1.01] shadow-2xl flex flex-col justify-between items-center text-center select-none overflow-hidden"
        >
          
          <span className="px-3 py-1 text-xs font-extrabold rounded-full bg-sakura-500/20 text-sakura-300 border border-sakura-500/30">
            JLPT {currentVocab.jlpt} • {isFlipped ? 'MẶT SAU' : 'MẶT TRƯỚC (Nhấp để lật)'}
          </span>

          {!isFlipped ? (
            /* FRONT CARD */
            <div className="space-y-4">
              <h2 className="text-6xl font-black font-jp text-slate-100">{currentVocab.word}</h2>
              {currentVocab.hanViet && (
                <span className="px-3 py-1 text-xs font-bold rounded-lg bg-indigo-500/20 text-indigo-300">
                  Hán-Việt: {currentVocab.hanViet}
                </span>
              )}
            </div>
          ) : (
            /* BACK CARD */
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-3xl font-extrabold font-jp text-sakura-300">{currentVocab.reading}</h3>
              <p className="text-xl font-bold text-slate-100">{currentVocab.meanings.join(', ')}</p>
              {currentVocab.exampleSentence && (
                <p className="text-xs font-jp text-slate-300 italic max-w-sm">
                  "{currentVocab.exampleSentence.japanese}"
                </p>
              )}
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              SpeechService.speakJapanese(currentVocab.word);
            }}
            className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-sakura-400 border border-slate-800 transition-all"
            title="Phát âm"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Rating Buttons */}
        {isFlipped && (
          <div className="grid grid-cols-3 gap-3 animate-fadeIn">
            <button
              onClick={() => handleRating('again')}
              className="py-3 rounded-2xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all"
            >
              <ThumbsDown className="w-4 h-4 text-rose-400" />
              <span>Chưa Nhớ (+1 ngày)</span>
            </button>
            <button
              onClick={() => handleRating('good')}
              className="py-3 rounded-2xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all"
            >
              <Smile className="w-4 h-4 text-amber-400" />
              <span>Nhớ Vừa (+3 ngày)</span>
            </button>
            <button
              onClick={() => handleRating('easy')}
              className="py-3 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all"
            >
              <ThumbsUp className="w-4 h-4 text-emerald-400" />
              <span>Dễ Dàng (+7 ngày)</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
