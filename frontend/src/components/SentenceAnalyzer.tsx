import React, { useState } from 'react';
import { AiService } from '../services/aiService';
import { SpeechService } from '../services/speechService';
import { BrainCircuit, Search, Volume2, Sparkles, HelpCircle } from 'lucide-react';

export const SentenceAnalyzer: React.FC = () => {
  const [inputSentence, setInputSentence] = useState('私は毎日日本語を勉強します。');
  const [analysisResult, setAnalysisResult] = useState<any>(AiService.deconstructSentence(inputSentence));

  const handleAnalyze = () => {
    if (!inputSentence.trim()) return;
    const res = AiService.deconstructSentence(inputSentence);
    setAnalysisResult(res);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 shadow-xl flex items-center gap-4">
        <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sakura-500 text-white shadow-lg shadow-indigo-500/20">
          <BrainCircuit className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-white">AI Phân Tích Cú Pháp Câu (Sentence Deconstructor)</h1>
          <p className="text-xs text-slate-400 mt-1">Dán bất kỳ câu tiếng Nhật nào để AI tự động tách từ, trợ thể và giải thích ngữ pháp</p>
        </div>
      </div>

      {/* Input Box */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputSentence}
            onChange={e => setInputSentence(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
            placeholder="Dán câu tiếng Nhật vào đây (ví dụ: 日本語の勉強はとても面白いです。)"
            className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-base font-jp text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sakura-500 transition-all"
          />
          <button
            onClick={handleAnalyze}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sakura-600 to-sakura-500 hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-sakura-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Phân Tích AI</span>
          </button>
        </div>
      </div>

      {/* Analysis Output */}
      {analysisResult && (
        <div className="space-y-6">
          
          {/* Main Sentence Summary Card */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Phiên âm Furigana:</span>
                <p className="text-sm font-jp font-bold text-sakura-300 mt-1">{analysisResult.fullFurigana}</p>
              </div>
              <button
                onClick={() => SpeechService.speakJapanese(analysisResult.originalSentence)}
                className="p-3 rounded-2xl bg-sakura-500 text-white shadow-md hover:brightness-110 transition-all"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Dịch Nghĩa Tiếng Việt:</span>
              <p className="text-lg font-extrabold text-slate-100 mt-1">👉 {analysisResult.vietnameseTranslation}</p>
            </div>
          </div>

          {/* Tokens Breakdown Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Phân Tích Chi Tiết Thành Phần Câu ({analysisResult.tokens.length} thành tố)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisResult.tokens.map((token: any, index: number) => (
                <div key={index} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black font-jp text-slate-100">{token.word}</span>
                    <span className="text-xs font-jp text-sakura-300 font-bold">({token.reading})</span>
                  </div>

                  <p className="text-xs font-semibold text-indigo-300">Vai trò: {token.role}</p>
                  <p className="text-xs text-slate-300">Nghĩa: {token.meaning}</p>
                  {token.particleInfo && (
                    <p className="text-[11px] text-jpgold-400 bg-jpgold-500/10 p-2 rounded-xl border border-jpgold-500/20">
                      💡 {token.particleInfo}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
