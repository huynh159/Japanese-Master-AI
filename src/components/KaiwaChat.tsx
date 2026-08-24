import React, { useState, useRef, useEffect } from 'react';
import { AiService } from '../services/aiService';
import { SpeechService } from '../services/speechService';
import { ApiClient } from '../services/apiClient';
import { KaiwaMessage, KaiwaTone } from '../types';
import { MessageSquareCode, Mic, Send, Volume2, Sparkles, CheckCircle2, AlertCircle, User, Bot } from 'lucide-react';

export const KaiwaChat: React.FC = () => {
  const [messages, setMessages] = useState<KaiwaMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      japanese: 'こんにちは！王様日本語AIへようこそ。今日はどのような話をしましょうか。',
      reading: 'こんにちは！おうさまにほんごえーあいへようこそ。きょうはどのようなはなしをしましょうか。',
      vietnamese: 'Xin chào! Chào mừng bạn đến với Vua Tiếng Nhật AI. Hôm nay chúng ta sẽ trò chuyện về chủ đề gì nào?',
      timestamp: '10:00'
    }
  ]);

  const [inputState, setInputState] = useState('');
  const [currentTone, setCurrentTone] = useState<KaiwaTone>('sensei');
  const [isRecording, setIsRecording] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiThinking]);

  const handleSendMessage = async () => {
    const text = inputState.trim();
    if (!text) return;

    const userMsg: KaiwaMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      japanese: text,
      vietnamese: '',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputState('');
    setIsAiThinking(true);

    try {
      const aiReply = await ApiClient.generateKaiwa(text, currentTone) || await AiService.generateKaiwaResponse(text, currentTone);
      setMessages(prev => [...prev, aiReply]);
      SpeechService.speakJapanese(aiReply.japanese);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    SpeechService.startSpeechRecognition(
      (transcript: string) => {
        setInputState(transcript);
        setIsRecording(false);
      },
      (err: any) => {
        console.error('STT Error:', err);
        setIsRecording(false);
      }
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-sakura-600 to-indigo-600 text-white shadow-lg shadow-sakura-500/20">
            <MessageSquareCode className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">AI Sensei Kaiwa (Luyện Nói 1:1)</h1>
            <p className="text-xs text-slate-400 mt-1">Trò chuyện giọng nói / chữ viết, AI tự động sửa lỗi ngữ pháp & hướng dẫn phát âm</p>
          </div>
        </div>

        {/* Tone Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {[
            { id: 'sensei', label: '👩‍🏫 Sensei' },
            { id: 'anime', label: '⚔️ Anime' },
            { id: 'business', label: '💼 Business' },
            { id: 'friend', label: '🌸 Friend' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setCurrentTone(t.id as KaiwaTone)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                currentTone === t.id
                  ? 'bg-sakura-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="glass-panel rounded-3xl border border-slate-800 h-[520px] flex flex-col overflow-hidden">
        
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sakura-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div className={`max-w-xl space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* Speech Bubble */}
                <div className={`p-4 rounded-3xl border space-y-1.5 ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-sakura-600 to-sakura-500 text-white border-sakura-400 rounded-tr-none'
                    : 'bg-slate-900 border-slate-800 text-slate-100 rounded-tl-none'
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-base font-bold font-jp leading-relaxed">{msg.japanese}</p>
                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => SpeechService.speakJapanese(msg.japanese)}
                        className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sakura-300 transition-all shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {msg.reading && (
                    <p className="text-xs font-jp text-sakura-300 opacity-90">{msg.reading}</p>
                  )}

                  {msg.vietnamese && (
                    <p className="text-xs text-slate-300 italic pt-1 border-t border-white/10">
                      👉 {msg.vietnamese}
                    </p>
                  )}
                </div>

                {/* AI Grammar Correction Badge */}
                {msg.grammarCorrection?.hasError && (
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1 text-amber-300">
                    <div className="flex items-center gap-1.5 font-bold">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      <span>Góp ý ngữ pháp từ AI Sensei:</span>
                    </div>
                    <p>Sửa thành: <span className="font-bold font-jp text-emerald-400">{msg.grammarCorrection.corrected}</span></p>
                    <p className="text-slate-400 text-[11px]">{msg.grammarCorrection.explanation}</p>
                  </div>
                )}

              </div>

              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 border border-slate-700">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {isAiThinking && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-sakura-600/30 border border-sakura-500/40 flex items-center justify-center text-sakura-300 animate-pulse">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400">AI Sensei đang soạn câu trả lời...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
          <button
            onClick={handleMicClick}
            className={`p-3 rounded-2xl transition-all ${
              isRecording
                ? 'bg-rose-600 text-white animate-bounce'
                : 'bg-slate-900 hover:bg-slate-800 text-sakura-400 border border-slate-800'
            }`}
            title="Thu âm nói tiếng Nhật (STT)"
          >
            <Mic className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputState}
            onChange={e => setInputState(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Nhập câu tiếng Nhật hoặc bấm mic để nói..."
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-sakura-500 font-jp"
          />

          <button
            onClick={handleSendMessage}
            disabled={!inputState.trim()}
            className="p-3 rounded-2xl bg-gradient-to-r from-sakura-600 to-sakura-500 hover:brightness-110 disabled:opacity-40 text-white font-bold transition-all shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  );
};
