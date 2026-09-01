import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import ToggleSwitch from '../components/ToggleSwitch';

interface SettingsPageProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function SettingsPage({ theme, onToggleTheme }: SettingsPageProps) {
  const { user, logout } = useAuthStore();
  const [notifOn, setNotifOn] = useState(true);
  const [quizReminder, setQuizReminder] = useState(true);

  return (
    <div>
      <p className="eyebrow" style={{ marginBottom: 6 }}>PREFERENCES</p>
      <h1 className="font-heading" style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-heading)', marginBottom: 32 }}>
        Pengaturan & Profil
      </h1>

      {/* Profile Card */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'var(--gold)',
            boxShadow: 'var(--shadow-raise)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <User size={28} color="#2D3748" />
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="font-heading" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-heading)' }}>
              {user?.name ?? 'Guest Learner'}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{user?.email ?? '-'}</p>
          </div>
          <button
            className="btn btn-danger"
            style={{ boxShadow: 'var(--shadow-raise-sm)', gap: 8 }}
            onClick={logout}
          >
            <LogOut size={16} /> Keluar
          </button>
        </div>
      </div>

      {/* Preferences / Toggles */}
      <div className="card" style={{ marginBottom: 24 }}>
        <p className="eyebrow" style={{ marginBottom: 20 }}>PREFERENSI</p>

        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(170,170,170,0.2)' }}
        >
          <div>
            <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-heading)' }}>Notifikasi Push</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Terima update progres & pengingat belajar</p>
          </div>
          <ToggleSwitch
            checked={notifOn}
            onChange={setNotifOn}
            width="4.5rem"
            accentHue="140deg"
          />
        </div>

        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(170,170,170,0.2)' }}
        >
          <div>
            <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-heading)' }}>Quiz Reminder</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Pengingat tiap Senin sebelum quiz direset</p>
          </div>
          <ToggleSwitch
            checked={quizReminder}
            onChange={setQuizReminder}
            width="4.5rem"
            accentHue="140deg"
          />
        </div>

        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}
        >
          <div>
            <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-heading)' }}>Dark Lacquer Mode</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Tema gelap Neumorphic premium yang elegan</p>
          </div>
          <ToggleSwitch
            checked={theme === 'dark'}
            onChange={onToggleTheme}
            width="4.5rem"
            accentHue="220deg"
          />
        </div>
      </div>

      {/* App Info */}
      <div className="card" style={{ opacity: 0.85 }}>
        <p className="eyebrow" style={{ marginBottom: 8 }}>TENTANG APLIKASI</p>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--text-heading)' }}>BelajarAIEngineering.com</strong><br />
          Platform pembelajaran interaktif AI Engineering dengan kurikulum terstruktur,
          quiz mingguan, dan AI Tutor berbasis Gemini 1.5 Flash.
        </p>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--gold-rich)', marginTop: 12, letterSpacing: 1 }}>
          v1.0.0 — Stack: React + NestJS + MongoDB
        </p>
      </div>
    </div>
  );
}
