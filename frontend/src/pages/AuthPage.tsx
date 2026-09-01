import React, { useState } from 'react';
import { User, Mail, Lock, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { login, signup, isLoading, error, clearError } = useAuthStore();

  const switchMode = (mode: boolean) => {
    setIsLogin(mode);
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await signup(email, password, name);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Mascot placeholder */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div className="mascot-avatar" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/logo.png" alt="BelajarAI Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          </div>
          <div className="mascot-bubble">
            Selamat Datang di Belajar AI Engineering!
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <h1 className="font-heading" style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-heading)', marginBottom: 4 }}>
            {isLogin ? 'Masuk ke Akun Kamu' : 'Buat Akun Baru'}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {isLogin ? 'Lanjutkan perjalanan belajar AI Engineering' : 'Mulai belajar interaktif gratis sekarang'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="tab-toggle">
          <button className={isLogin ? 'active' : ''} onClick={() => switchMode(true)}>
            Masuk
          </button>
          <button className={!isLogin ? 'active' : ''} onClick={() => switchMode(false)}>
            Daftar
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {!isLogin && (
            <div className="input-group">
              <label className="input-label">Nama Lengkap</label>
              <div className="input-wrap">
                <span className="input-icon"><User size={18} /></span>
                <input
                  type="text"
                  placeholder="e.g. Budi Santoso"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Email</label>
            <div className="input-wrap">
              <span className="input-icon"><Mail size={18} /></span>
              <input
                type="email"
                placeholder="nama@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-wrap">
              <span className="input-icon"><Lock size={18} /></span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-danger">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className="btn btn-gold btn-full" disabled={isLoading} style={{ gap: 8 }}>
            {isLoading ? (
              <><span className="spinner" /> Memproses...</>
            ) : (
              <>
                {isLogin ? 'Masuk Sekarang' : 'Daftar Akun'} <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
