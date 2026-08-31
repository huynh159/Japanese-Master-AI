import React, { useState, useMemo } from 'react';
import { VOCAB_DATABASE, KANJI_DATABASE } from '../data/japaneseData';
import { SpeechService } from '../services/speechService';
import { ApiClient } from '../services/apiClient';
import { JlptLevel, VocabItem } from '../types';
import { Search, BookMarked, Volume2, Filter, Sparkles, PenTool, Plus, Trash2 } from 'lucide-react';

interface JapaneseDictionaryProps {
  onOpenHandwritingModal?: () => void;
}

export const JapaneseDictionary: React.FC<JapaneseDictionaryProps> = ({ onOpenHandwritingModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJlpt, setSelectedJlpt] = useState<JlptLevel | 'ALL'>('ALL');
  const [selectedWord, setSelectedWord] = useState<VocabItem | null>(VOCAB_DATABASE[0] || null);

  // CRUD Test State
  const [isCrudModalOpen, setIsCrudModalOpen] = useState(false);
  const [newWord, setNewWord] = useState({ word: '', reading: '', romaji: '', meaning: '' });
  const [crudStatusMessage, setCrudStatusMessage] = useState('');

  const handleAddVocab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.word || !newWord.meaning) return;
    
    setCrudStatusMessage('⏳ Đang gửi request POST /api/vocab sang Backend...');
    const result = await ApiClient.createVocab({
      id: `v-user-${Date.now()}`,
      word: newWord.word,
      reading: newWord.reading || newWord.word,
      romaji: newWord.romaji || 'romaji',
      hanViet: 'TỪ MỚI VỪA TẠO',
      meanings: [newWord.meaning],
      jlpt: 'N5',
      type: 'Danh từ'
    });

    if (result.success) {
      setCrudStatusMessage('🎉 CHÚC MỪNG! Đã tạo từ vựng mới thành công trên Backend Node.js & PostgreSQL!');
      setNewWord({ word: '', reading: '', romaji: '', meaning: '' });
    } else {
      setCrudStatusMessage(`❌ Thất bại: ${result.message || 'Chưa bật Server Backend'}`);
    }
  };

  // Filter dictionary items based on query and selected JLPT level
  const filteredVocab = useMemo(() => {
    return VOCAB_DATABASE.filter(item => {
      const matchesJlpt = selectedJlpt === 'ALL' || item.jlpt === selectedJlpt;
      const q = searchTerm.toLowerCase().trim();
      if (!q) return matchesJlpt;

      const matchesWord = item.word.includes(q);
      const matchesReading = item.reading.includes(q);
      const matchesRomaji = item.romaji.toLowerCase().includes(q);
      const matchesHanViet = item.hanViet?.toLowerCase().includes(q) || false;
      const matchesMeaning = item.meanings.some(m => m.toLowerCase().includes(q));

      return matchesJlpt && (matchesWord || matchesReading || matchesRomaji || matchesHanViet || matchesMeaning);
    });
  }, [searchTerm, selectedJlpt]);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Search Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-sakura-600 to-indigo-600 text-white shadow-lg shadow-sakura-500/20">
              <BookMarked className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white">Từ Điển Tiếng Nhật Thông Minh (Dictionary)</h1>
              <p className="text-xs text-slate-400 mt-1">Tra cứu Kanji, Hiragana, Romaji, Âm Hán-Việt & Ví dụ câu</p>
            </div>
          </div>

          {/* Action Buttons: Handwritten AI + Test API CRUD */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCrudModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Thử Nghiệm API CRUD (+ Thêm Từ)</span>
            </button>

            {onOpenHandwritingModal && (
              <button
                onClick={onOpenHandwritingModal}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all"
              >
                <PenTool className="w-4 h-4" />
                <span>Tra Viết Tay AI</span>
              </button>
            )}
          </div>
        </div>

        {/* Input & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Nhập từ Hán (日本語), Hiragana (にほんご), Romaji (nihongo) hoặc nghĩa tiếng Việt..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sakura-500 transition-all"
            />
          </div>

          {/* JLPT Filter dropdown */}
          <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0">
            {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedJlpt(lvl)}
                className={`px-3 py-1.5 text-xs font-extrabold rounded-xl transition-all ${
                  selectedJlpt === lvl
                    ? 'bg-sakura-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid: Search Results List + Word Detail View */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Results List */}
        <div className="md:col-span-5 space-y-2 max-h-[600px] overflow-y-auto pr-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Kết Quả Tìm Kiếm ({filteredVocab.length} từ)
          </p>

          {filteredVocab.length === 0 ? (
            <div className="p-8 rounded-3xl glass-panel border border-slate-800 text-center text-slate-500">
              <p className="text-sm font-semibold">Không tìm thấy từ phù hợp</p>
              <p className="text-xs text-slate-400 mt-1">Thử đổi từ khóa hoặc dùng công cụ Vẽ Kanji AI</p>
            </div>
          ) : (
            filteredVocab.map(item => {
              const isSelected = selectedWord?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedWord(item)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-sakura-600/30 via-indigo-950 to-slate-900 border-sakura-500 shadow-md'
                      : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-extrabold font-jp text-slate-100">{item.word}</span>
                        <span className="text-xs text-sakura-300 font-jp">({item.reading})</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-1">{item.meanings.join(', ')}</p>
                    </div>

                    <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-sakura-500/20 text-sakura-300">
                      {item.jlpt}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Word Detail Panel */}
        <div className="md:col-span-7">
          {selectedWord ? (
            <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
              
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-black font-jp text-slate-100">{selectedWord.word}</h2>
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-sakura-500/20 text-sakura-300 border border-sakura-500/30">
                      {selectedWord.jlpt}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="font-semibold text-sakura-400 font-jp">Cách đọc: {selectedWord.reading}</span>
                    <span className="text-slate-400 font-mono">[{selectedWord.romaji}]</span>
                    {selectedWord.hanViet && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded bg-indigo-500/20 text-indigo-300">
                        Hán-Việt: {selectedWord.hanViet}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => SpeechService.speakJapanese(selectedWord.word)}
                  className="p-3 rounded-2xl bg-sakura-600 hover:bg-sakura-500 text-white shadow-lg shadow-sakura-600/30 transition-all active:scale-95"
                  title="Phát âm tiếng Nhật chuẩn Tokyo"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Từ loại:</span>
                  <span className="font-semibold text-slate-200">{selectedWord.type}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Pitch Accent:</span>
                  <span className="font-semibold text-jpgold-400">{selectedWord.pitchAccent || '0 (Heiban)'}</span>
                </div>
              </div>

              {/* Meanings */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Nghĩa tiếng Việt:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-200">
                  {selectedWord.meanings.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>

              {/* Example Sentence */}
              {selectedWord.exampleSentence && (
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 space-y-2">
                  <span className="text-xs font-bold text-indigo-300 block">💬 Ví dụ minh họa:</span>
                  <p className="text-base font-bold font-jp text-slate-100">
                    {selectedWord.exampleSentence.japanese}
                  </p>
                  <p className="text-xs font-jp text-sakura-300">
                    {selectedWord.exampleSentence.reading}
                  </p>
                  <p className="text-xs text-slate-300 italic pt-1 border-t border-indigo-500/10">
                    👉 {selectedWord.exampleSentence.vietnamese}
                  </p>
                </div>
              )}

            </div>
          ) : (
            <div className="p-8 rounded-3xl glass-panel border border-slate-800 text-center text-slate-500">
              Chưa chọn từ vựng nào
            </div>
          )}
        </div>

      </div>

      {/* CRUD Test Modal */}
      {isCrudModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Thử Nghiệm API CRUD (+ Thêm Từ Vựng Mới)
              </h3>
              <button
                onClick={() => { setIsCrudModalOpen(false); setCrudStatusMessage(''); }}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddVocab} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Chữ Hán / Từ Tiếng Nhật (Word):</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: 桜 (Sakura)"
                  value={newWord.word}
                  onChange={e => setNewWord({ ...newWord, word: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Cách Đọc Hiragana (Reading):</label>
                <input
                  type="text"
                  placeholder="Ví dụ: さくら"
                  value={newWord.reading}
                  onChange={e => setNewWord({ ...newWord, reading: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Phiên Âm Romaji:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: sakura"
                  value={newWord.romaji}
                  onChange={e => setNewWord({ ...newWord, romaji: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Nghĩa Tiếng Việt (Meaning):</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoa Anh Đào"
                  value={newWord.meaning}
                  onChange={e => setNewWord({ ...newWord, meaning: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {crudStatusMessage && (
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs font-bold text-emerald-300">
                  {crudStatusMessage}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setIsCrudModalOpen(false); setCrudStatusMessage(''); }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
                >
                  Gửi Request POST Sang Backend
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
