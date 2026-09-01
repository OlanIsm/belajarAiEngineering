import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen, CheckCircle2, Play, Check, Sparkles } from 'lucide-react';
import { useCourseStore } from '../store/courseStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function StudyPage() {
  const { selectedCourse, modules, activeModule, isLoading, setActiveModule, markModuleComplete } = useCourseStore();
  const { user } = useAuthStore();
  const [marking, setMarking] = useState(false);

  const handleMarkComplete = async () => {
    if (!user?.id || !activeModule) return;
    const moduleId = activeModule.id ?? (activeModule as any)._id;
    setMarking(true);
    const ok = await markModuleComplete(user.id, moduleId);
    setMarking(false);
    if (ok) toast.success('Modul berhasil diselesaikan!');
    else toast.error('Gagal menyimpan progres. Coba lagi.');
  };

  if (!selectedCourse || modules.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh', flexDirection: 'column', gap: 16 }}>
        <BookOpen size={56} color="var(--text-muted)" />
        <h2 className="font-heading" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-heading)' }}>
          Belum Ada Course Terpilih
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Pilih course di Dashboard untuk mulai belajar!</p>
      </div>
    );
  }

  return (
    <div className="study-layout" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Module Sidebar */}
      <aside className="module-sidebar">
        <div style={{ padding: '20px 16px 12px' }}>
          <p className="eyebrow" style={{ marginBottom: 4 }}>COURSE CONTENT</p>
          <h2 className="font-heading" style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-heading)', lineHeight: 1.3 }}>
            {selectedCourse.title}
          </h2>
        </div>
        <div style={{ height: 1, background: 'rgba(168,184,200,0.3)', margin: '0 16px' }} />
        <div className="module-list">
          {modules.map((mod, idx) => {
            const isActive = activeModule && (activeModule.id ?? (activeModule as any)._id) === (mod.id ?? (mod as any)._id);
            return (
              <button
                key={mod.id ?? (mod as any)._id}
                className={`module-item${isActive ? ' active' : ''}${mod.isCompleted ? ' done' : ''}`}
                style={{ border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', background: 'transparent', display: 'flex', alignItems: 'center', gap: 10 }}
                onClick={() => setActiveModule(mod)}
              >
                <span className="module-check" style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  {mod.isCompleted ? (
                    <CheckCircle2 size={16} color="var(--gold-rich)" />
                  ) : (
                    <Play size={14} color="var(--text-muted)" />
                  )}
                </span>
                <span>{idx + 1}. {mod.title}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Reading Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>
        {activeModule ? (
          <>
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 6 }}>LESSON CONTENT</p>
                <h1 className="font-heading" style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-heading)' }}>
                  {activeModule.title}
                </h1>
              </div>
              <button
                className={`btn ${activeModule.isCompleted ? 'btn-ghost' : 'btn-gold'}`}
                onClick={handleMarkComplete}
                disabled={activeModule.isCompleted || marking}
                style={{ gap: 8 }}
              >
                {marking ? (
                  <><span className="spinner" /> Menyimpan...</>
                ) : activeModule.isCompleted ? (
                  <><Check size={16} /> Selesai</>
                ) : (
                  <><Sparkles size={16} /> Tandai Selesai</>
                )}
              </button>
            </div>

            <div style={{ height: 1, background: 'rgba(168,184,200,0.3)', marginBottom: 32 }} />

            {/* Content */}
            <div className="card">
              <div className="markdown-content">
                <ReactMarkdown>{activeModule.contentMarkdown ?? 'Tidak ada materi.'}</ReactMarkdown>
              </div>
            </div>
          </>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>Pilih modul di kiri untuk mulai membaca.</p>
        )}
      </div>
    </div>
  );
}
