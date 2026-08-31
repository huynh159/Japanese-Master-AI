import React, { useState, useRef } from 'react';
import { OcrService } from '../services/ocrService';
import { SpeechService } from '../services/speechService';
import { ApiClient } from '../services/apiClient';
import { OcrResult } from '../types';
import { Camera, Upload, Sparkles, Volume2, Plus, Check, Loader2, Image as ImageIcon } from 'lucide-react';

export const ImageOcrScanner: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set());

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setSelectedImage(url);
        runScan(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setSelectedImage(url);
        runScan(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const runScan = async (imageDataUrl: string) => {
    setIsScanning(true);
    setOcrResult(null);
    try {
      const res = await ApiClient.processOcrImage(imageDataUrl) || await OcrService.processImage(imageDataUrl);
      setOcrResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const toggleSaveWord = (word: string) => {
    setSavedWords(prev => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word);
      else next.add(word);
      return next;
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-purple-500/20 shadow-xl flex items-center gap-4">
        <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-sakura-500 text-white shadow-lg shadow-purple-500/20">
          <Camera className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-white">Chụp Ảnh & Trích Xuất Từ Vựng (OCR AI)</h1>
          <p className="text-xs text-slate-400 mt-1">Tải ảnh trang sách, biển hiệu hoặc manga để AI tự động bóc tách từ vựng tiếng Nhật</p>
        </div>
      </div>

      {/* Upload Zone & Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Dropzone Column */}
        <div className="md:col-span-5 space-y-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="relative h-72 rounded-3xl border-2 border-dashed border-slate-700 hover:border-sakura-500 bg-slate-900/50 hover:bg-slate-900/80 cursor-pointer transition-all flex flex-col items-center justify-center p-6 text-center group overflow-hidden"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            {selectedImage ? (
              <div className="relative w-full h-full">
                <img
                  src={selectedImage}
                  alt="Scanned visual"
                  className="w-full h-full object-contain rounded-2xl"
                />
                {isScanning && (
                  <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm flex flex-col items-center justify-center text-sakura-300">
                    <Loader2 className="w-10 h-10 animate-spin mb-3 text-sakura-400" />
                    <p className="text-xs font-bold">Model OCR AI đang nhận diện...</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-sakura-500/10 border border-sakura-500/20 flex items-center justify-center text-sakura-400 group-hover:scale-110 transition-all">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-200">Kéo & Thả hoặc Bấm để tải ảnh</p>
                  <p className="text-xs text-slate-400 mt-1">Hỗ trợ JPG, PNG, WebP (Bìa sách, Manga, Biển báo)</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* OCR Extracted Results Column */}
        <div className="md:col-span-7 flex flex-col justify-between">
          {!ocrResult && !isScanning ? (
            <div className="h-72 rounded-3xl glass-panel border border-slate-800 flex flex-col items-center justify-center text-slate-500 p-6 text-center">
              <ImageIcon className="w-12 h-12 mb-3 text-slate-600 stroke-[1.5]" />
              <p className="text-sm font-semibold">Chưa chọn hình ảnh</p>
              <p className="text-xs text-slate-400 mt-1">Vui lòng tải ảnh lên ở khung bên trái để xem kết quả trích xuất từ vựng</p>
            </div>
          ) : isScanning ? (
            <div className="h-72 rounded-3xl glass-panel border border-slate-800 flex flex-col items-center justify-center text-slate-400 p-6">
              <Loader2 className="w-8 h-8 animate-spin text-sakura-400 mb-3" />
              <p className="text-xs font-bold">Đang phân tích các ký tự tiếng Nhật...</p>
            </div>
          ) : ocrResult ? (
            <div className="space-y-4">
              
              {/* Extracted Raw Text Display */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Văn Bản Nhận Diện Từ Ảnh:
                </span>
                <p className="text-sm font-bold text-slate-100 font-jp leading-relaxed">
                  {ocrResult.rawText}
                </p>
              </div>

              {/* Extracted Vocab Cards Grid */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Danh Sách Từ Vựng Trích Xuất ({ocrResult.extractedVocab.length} từ)</span>
                  <span className="text-[10px] text-jpgold-400 font-bold">Cấp độ nhận diện: {ocrResult.detectedLevel}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                  {ocrResult.extractedVocab.map((v, i) => {
                    const isSaved = savedWords.has(v.word);
                    return (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sakura-500/40 transition-all flex items-start justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-extrabold font-jp text-slate-100">{v.word}</span>
                            <span className="text-xs text-sakura-400 font-jp">({v.reading})</span>
                            <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-sakura-500/20 text-sakura-300">
                              {v.jlpt}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300">{v.meaning}</p>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => SpeechService.speakJapanese(v.word)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sakura-300 transition-all"
                            title="Phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleSaveWord(v.word)}
                            className={`p-1.5 rounded-lg transition-all ${
                              isSaved
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                            }`}
                            title="Lưu vào thẻ SRS"
                          >
                            {isSaved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : null}
        </div>

      </div>

    </div>
  );
};
