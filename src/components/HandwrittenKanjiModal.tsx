import React, { useRef, useState, useEffect } from 'react';
import { KanjiRecognitionService, Stroke, KanjiMatchResult } from '../services/kanjiRecognitionService';
import { SpeechService } from '../services/speechService';
import { ApiClient } from '../services/apiClient';
import { PenTool, RotateCcw, X, Volume2, Sparkles, Check, HelpCircle } from 'lucide-react';
import { KanjiItem } from '../types';

interface HandwrittenKanjiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectKanji?: (kanji: KanjiItem) => void;
}

export const HandwrittenKanjiModal: React.FC<HandwrittenKanjiModalProps> = ({
  isOpen,
  onClose,
  onSelectKanji
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);
  const [matches, setMatches] = useState<KanjiMatchResult[]>([]);
  const [selectedKanjiDetail, setSelectedKanjiDetail] = useState<KanjiItem | null>(null);

  // Redraw canvas whenever strokes change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background guide grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw completed strokes
    ctx.strokeStyle = '#fb7199'; // Sakura pink stroke
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    strokes.forEach(stroke => {
      if (stroke.points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    });

    // Draw current active stroke
    if (currentStroke.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(currentStroke[0].x, currentStroke[0].y);
      for (let i = 1; i < currentStroke.length; i++) {
        ctx.lineTo(currentStroke[i].x, currentStroke[i].y);
      }
      ctx.stroke();
    }
  }, [strokes, currentStroke]);

  // Run AI recognition via RESTful API whenever strokes update
  useEffect(() => {
    if (strokes.length > 0 && canvasRef.current) {
      ApiClient.recognizeKanji(
        strokes,
        canvasRef.current.width,
        canvasRef.current.height
      ).then(results => {
        setMatches(results);
        if (results.length > 0 && !selectedKanjiDetail) {
          setSelectedKanjiDetail(results[0].kanji);
        }
      });
    } else {
      setMatches([]);
      setSelectedKanjiDetail(null);
    }
  }, [strokes]);

  if (!isOpen) return null;

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setCurrentStroke([{ x, y }]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentStroke(prev => [...prev, { x, y }]);
  };

  const handleMouseUp = () => {
    if (isDrawing && currentStroke.length > 0) {
      setStrokes(prev => [...prev, { points: currentStroke }]);
      setCurrentStroke([]);
    }
    setIsDrawing(false);
  };

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || e.touches.length === 0) return;
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    setIsDrawing(true);
    setCurrentStroke([{ x, y }]);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || e.touches.length === 0) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    setCurrentStroke(prev => [...prev, { x, y }]);
  };

  const handleClear = () => {
    setStrokes([]);
    setCurrentStroke([]);
    setMatches([]);
    setSelectedKanjiDetail(null);
  };

  const handleUndo = () => {
    setStrokes(prev => prev.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-slate-800 p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-sakura-600 to-indigo-600 text-white">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Nhận Diện Kanji Viết Tay (AI Handwritten Model)
              </h2>
              <p className="text-xs text-slate-400">Vẽ chữ Kanji trên bảng để Model AI tự nhận diện real-time</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Canvas + Results */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 overflow-y-auto pr-1">
          
          {/* Canvas Column */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-slate-900 border-2 border-sakura-500/30 shadow-inner overflow-hidden flex items-center justify-center cursor-crosshair">
              <canvas
                ref={canvasRef}
                width={288}
                height={288}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                className="w-full h-full touch-none"
              />
              {strokes.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 pointer-events-none p-4 text-center">
                  <PenTool className="w-8 h-8 mb-2 stroke-[1.5] text-sakura-400/40" />
                  <p className="text-xs">Vẽ chữ Hán Kanji vào ô này</p>
                </div>
              )}
            </div>

            {/* Canvas Actions */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={handleUndo}
                disabled={strokes.length === 0}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Hoàn tác ({strokes.length})</span>
              </button>
              <button
                onClick={handleClear}
                disabled={strokes.length === 0}
                className="px-3 py-1.5 rounded-xl bg-sakura-500/20 hover:bg-sakura-500/30 text-sakura-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <X className="w-3.5 h-3.5" />
                <span>Xóa bảng</span>
              </button>
            </div>
          </div>

          {/* AI Recognition Results Column */}
          <div className="md:col-span-7 flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-jpgold-400" />
              Gợi ý từ Model AI ({matches.length} kết quả)
            </h3>

            {matches.length === 0 ? (
              <div className="h-48 rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                <HelpCircle className="w-10 h-10 mb-2 stroke-[1.5] text-slate-600" />
                <p className="text-sm font-medium">Chưa có dữ liệu nét vẽ</p>
                <p className="text-xs text-slate-400 mt-1">Hãy dùng chuột/tay vẽ Kanji lên ô nét vẽ bên trái</p>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Horizontal Candidate Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {matches.map(m => (
                    <button
                      key={m.kanji.character}
                      onClick={() => setSelectedKanjiDetail(m.kanji)}
                      className={`flex flex-col items-center px-4 py-2 rounded-2xl border transition-all ${
                        selectedKanjiDetail?.character === m.kanji.character
                          ? 'bg-gradient-to-br from-sakura-600 to-sakura-700 text-white border-sakura-400 shadow-lg shadow-sakura-500/20'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                      }`}
                    >
                      <span className="text-2xl font-bold font-jp">{m.kanji.character}</span>
                      <span className="text-[10px] opacity-80">{m.kanji.hanViet}</span>
                      <span className="text-[10px] font-extrabold text-jpgold-400">{m.confidence}%</span>
                    </button>
                  ))}
                </div>

                {/* Selected Kanji Detailed Card */}
                {selectedKanjiDetail && (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-sakura-500/40 flex items-center justify-center text-4xl font-bold text-sakura-300 font-jp shadow-inner">
                          {selectedKanjiDetail.character}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-extrabold text-slate-100">{selectedKanjiDetail.hanViet}</h4>
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-sakura-500/20 text-sakura-300">
                              {selectedKanjiDetail.jlpt}
                            </span>
                            <span className="text-xs text-slate-400">{selectedKanjiDetail.strokeCount} nét</span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">Nghĩa: {selectedKanjiDetail.meanings.join(', ')}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => SpeechService.speakJapanese(selectedKanjiDetail.character)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sakura-300 transition-all"
                        title="Phát âm"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Âm On (Onyomi):</span>
                        <span className="font-semibold text-slate-200">{selectedKanjiDetail.onyomi.join(', ') || '---'}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Âm Kun (Kunyomi):</span>
                        <span className="font-semibold text-slate-200">{selectedKanjiDetail.kunyomi.join(', ') || '---'}</span>
                      </div>
                    </div>

                    {/* Mnemonic Story */}
                    <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs">
                      <span className="font-bold text-indigo-300 block mb-1">💡 Mẹo ghi nhớ AI (Mnemonic):</span>
                      <p className="text-slate-300 leading-relaxed italic">{selectedKanjiDetail.mnemonic}</p>
                    </div>

                    {onSelectKanji && (
                      <button
                        onClick={() => {
                          onSelectKanji(selectedKanjiDetail);
                          onClose();
                        }}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-sakura-600 to-sakura-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-95 transition-all"
                      >
                        <Check className="w-4 h-4" />
                        <span>Chọn chữ Kanji này</span>
                      </button>
                    )}
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
