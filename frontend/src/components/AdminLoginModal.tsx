import React, { useState } from 'react';
import { Lock, User, ShieldAlert, Key, X, CheckCircle2 } from 'lucide-react';
import { ApiClient } from '../services/apiClient';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string, user: any) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await ApiClient.adminLogin({ username, password });
      setIsLoading(false);

      if (res.success && res.token) {
        onLoginSuccess(res.token, res.user);
        onClose();
      } else {
        setErrorMsg(res.message || 'Tài khoản hoặc mật khẩu không chính xác!');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg('Lỗi kết nối máy chủ!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel border border-sakura-500/30 shadow-2xl shadow-sakura-500/20 bg-slate-900/90 text-white space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-sakura-600 to-amber-500 shadow-lg shadow-sakura-500/30">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-sakura-300 via-white to-amber-300 bg-clip-text text-transparent">
            Đăng Nhập Quản Trị Viên
          </h2>
          <p className="text-xs text-slate-400">
            Vui lòng nhập tài khoản Admin để truy cập trang quản lý & nạp đề thi
          </p>
        </div>

        {/* Quick Hint Alert */}
        <div className="p-3 rounded-2xl bg-slate-800/80 border border-amber-500/30 flex items-start space-x-3 text-xs text-amber-200">
          <Key className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Tài khoản mặc định:</span>
            <div className="mt-0.5 text-slate-300">Username: <code className="text-sakura-300 font-mono">admin</code> | Password: <code className="text-sakura-300 font-mono">admin123</code></div>
          </div>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 rounded-2xl bg-red-950/80 border border-red-500/40 flex items-center space-x-3 text-xs text-red-300 animate-shake">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Tên tài khoản (Username)
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                placeholder="Nhập tên đăng nhập"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-sakura-500 focus:ring-1 focus:ring-sakura-500 text-sm text-white placeholder-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Mật khẩu (Password)
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Nhập mật khẩu"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-sakura-500 focus:ring-1 focus:ring-sakura-500 text-sm text-white placeholder-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sakura-600 to-amber-600 hover:from-sakura-500 hover:to-amber-500 font-bold text-sm text-white shadow-lg shadow-sakura-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Đang xác thực...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Xác Nhận Đăng Nhập</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
