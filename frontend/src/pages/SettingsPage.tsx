import React, { useState } from 'react';
import { User, LogOut, Bell, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import ToggleSwitch from '../components/ToggleSwitch';

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const [notifOn, setNotifOn] = useState(true);
  const [quizReminder, setQuizReminder] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <p className="eyebrow" style={{ marginBottom: 6, color: 'var(--patina)' }}>PREFERENCES</p>
      <h1 className="font-heading" style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-heading)', marginBottom: 32 }}>
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

        {[
          { label: 'Notifikasi Push', desc: 'Terima update progres & pengingat belajar', checked: notifOn, onChange: setNotifOn },
          { label: 'Quiz Reminder', desc: 'Pengingat tiap Senin sebelum quiz direset', checked: quizReminder, onChange: setQuizReminder },
          { label: 'Dark Lacquer Mode', desc: 'Coming soon — tema gelap premium', checked: darkMode, onChange: setDarkMode },
        ].map((pref) => (
          <div
            key={pref.label}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(170,170,170,0.2)' }}
          >
            <div>
              <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-heading)' }}>{pref.label}</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{pref.desc}</p>
            </div>
            <ToggleSwitch
              checked={pref.checked}
              onChange={pref.onChange}
              width="4.5rem"
              accentHue="140deg"
            />
          </div>
        ))}
      </div>

      {/* App Info */}
      <div className="card" style={{ opacity: 0.85 }}>
        <p className="eyebrow" style={{ marginBottom: 8 }}>TENTANG APLIKASI</p>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--text-heading)' }}>BelajarAIEngineering.com</strong><br />
          Platform pembelajaran interaktif AI Engineering dengan kurikulum terstruktur,
          quiz mingguan, dan AI Tutor berbasis Gemini 1.5 Flash.
        </p>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--patina)', marginTop: 12, letterSpacing: 1 }}>
          v1.0.0 — Stack: React + NestJS + MongoDB
        </p>
      </div>
    </div>
  );
}
