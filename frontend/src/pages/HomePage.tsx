import React, { useEffect } from 'react';
import {
  Brain,
  Clock,
  Sparkles,
  BookOpen,
  Trophy,
  Flame,
  Check,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';
import ProgressBar from '../components/ProgressBar';
import GoldButton from '../components/GoldButton';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { user } = useAuthStore();
  const { courses, selectedCourse, isLoading, fetchCourses, selectCourse } = useCourseStore();

  useEffect(() => {
    fetchCourses(user?.id);
  }, []);

  const activeCourse = selectedCourse || courses[0];
  const activeCourseId = activeCourse?.id ?? (activeCourse as any)?._id;

  const handleStartCourse = async (courseId: string) => {
    await selectCourse(courseId, user?.id);
    onNavigate('study');
  };

  const streakDays = [
    { day: 'S', active: true, isToday: false },
    { day: 'S', active: true, isToday: false },
    { day: 'R', active: true, isToday: false },
    { day: 'K', active: true, isToday: false },
    { day: 'J', active: true, isToday: false },
    { day: 'S', active: true, isToday: false },
    { day: 'M', active: true, isToday: true },
  ];

  return (
    <div>
      {/* Top Header - Clean greeting without membership level box */}
      <div style={{ marginBottom: 24 }}>
        <p className="eyebrow" style={{ marginBottom: 4 }}>MY LEARNING JOURNEY</p>
        <h1 className="font-heading" style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-heading)' }}>
          Halo, {user?.name ?? 'Learner'}! 👋
        </h1>
      </div>

      {/* Main Layout Grid: Left Column vs Right Scrollable Roadmap */}
      <div className="homepage-grid">

        {/* ─── LEFT COLUMN ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* 1. MODUL TERAKHIR (CARD UTAMA BESAR) */}
          <div className="card" style={{ padding: 26, background: 'var(--nm-base)' }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>
              MODUL TERAKHIR YANG KAMU PELAJARI
            </p>

            {activeCourse ? (
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Visual Banner Thumbnail */}
                <div style={{
                  width: 130,
                  height: 110,
                  borderRadius: 16,
                  background: 'var(--nm-base)',
                  boxShadow: 'var(--shadow-inset-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.6)',
                }}>
                  <Brain size={36} color="var(--gold-rich)" />
                  <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: 'var(--text-muted)', fontWeight: 700 }}>
                    AI ENGINE
                  </span>
                </div>

                {/* Course Main Details */}
                <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 6,
                      background: 'var(--nm-base)', boxShadow: 'var(--shadow-raise-sm)',
                      fontSize: 11, fontFamily: 'JetBrains Mono', fontWeight: 700, color: 'var(--gold-rich)',
                    }}>
                      {activeCourse.level ?? 'BEGINNER'}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} /> {activeCourse.estimatedHours ?? 3} Jam · 3 Bab · 12 Sub-materi
                    </span>
                  </div>

                  <h2 className="font-heading" style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-heading)', lineHeight: 1.3 }}>
                    {activeCourse.title}
                  </h2>

                  <p style={{ fontSize: 12, color: 'var(--text-body)', lineHeight: 1.5 }}>
                    {activeCourse.description}
                  </p>

                  {/* Progress Bar */}
                  <div style={{ marginTop: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Progres Modul</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-heading)' }}>
                        {Math.round(activeCourse.progress ?? 66)}%
                      </span>
                    </div>
                    <ProgressBar percentage={activeCourse.progress ?? 66} />
                  </div>

                  {/* CTA Button */}
                  <div style={{ marginTop: 10 }}>
                    <GoldButton
                      text="Lanjut Belajar"
                      onClick={() => handleStartCourse(activeCourseId)}
                      fullWidth={false}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Memuat modul pembelajaran...</p>
            )}
          </div>

          {/* 2. MIDDLE ROW (3 CARDS: MODUL COMPLETED, QUIZ COMPLETED, STREAK) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            
            {/* Card 1: MODUL COMPLETED */}
            <div className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Modul Completed
                </span>
                <BookOpen size={16} color="var(--gold-rich)" />
              </div>
              <p className="font-heading" style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-heading)', marginTop: 4 }}>
                4 <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>/ 12</span>
              </p>
              <p style={{ fontSize: 11, color: 'var(--gold-rich)', fontWeight: 700 }}>33% Selesai</p>
            </div>

            {/* Card 2: QUIZ COMPLETED */}
            <div className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Quiz Completed
                </span>
                <Trophy size={16} color="var(--gold)" />
              </div>
              <p className="font-heading" style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-heading)', marginTop: 4 }}>
                2 <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>/ 5</span>
              </p>
              <p style={{ fontSize: 10, color: 'var(--gold)', fontWeight: 600 }}>Skor: 85%</p>
            </div>

            {/* Card 3: STREAK CARD (COMPACT FIRE CARD) */}
            <div className="stat-card" style={{ background: 'var(--nm-base)', boxShadow: 'var(--shadow-raise-sm)', border: '1px solid rgba(255,153,0,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: '#D97706', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Streak 🔥
                </span>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #FF9900, #FF5500)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(255,85,0,0.4)',
                }}>
                  <Flame size={13} color="#ffffff" />
                </div>
              </div>
              <p className="font-heading" style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-heading)', marginTop: 4 }}>
                7 <span style={{ fontSize: 11, fontWeight: 600, color: '#D97706' }}>Hari</span>
              </p>
              
              {/* Mini Days Dots */}
              <div style={{ display: 'flex', gap: 3, marginTop: 2 }}>
                {streakDays.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      background: d.isToday ? '#FF5500' : d.active ? 'var(--gold-rich)' : 'rgba(0,0,0,0.1)',
                    }}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* 3. BOTTOM WIDE CARD (CHATBOT QUOTA & WEEKLY QUIZ BANNER) */}
          <div className="card" style={{ padding: 22, background: 'var(--nm-base)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              {/* Left Info: Chatbot Quota */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: 'var(--nm-base)',
                  boxShadow: 'var(--shadow-raise-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Sparkles size={22} color="#3B82F6" />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: '#3B82F6', fontWeight: 700 }}>
                    CHATBOT TOKEN QUOTA
                  </p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-heading)' }}>
                    43 / 50 Token <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>(7 Digunakan)</span>
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    Gunakan AI Assistant kapan saja saat mengalami kesulitan coding!
                  </p>
                </div>
              </div>

              {/* Right Action: Mulai Weekly Quiz */}
              <button
                className="btn btn-ghost"
                onClick={() => onNavigate('quiz')}
                style={{ gap: 8, fontSize: 12, padding: '8px 16px', borderRadius: 12 }}
              >
                <Trophy size={15} color="var(--gold)" /> Mulai Weekly Quiz <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* ─── RIGHT COLUMN: SCROLLABLE ROADMAP ──────────────────────── */}
        <div className="roadmap-scroll-card">
          <div>
            <p className="eyebrow" style={{ marginBottom: 4 }}>AI ENGINEERING ROADMAP</p>
            <h2 className="font-heading" style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-heading)' }}>
              Learning Journey
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
              Scroll & keeptrack alur pembelajaranmu
            </p>
          </div>

          <div className="sidebar-divider" style={{ margin: '12px 0 0' }} />

          {/* Scrollable Roadmap List */}
          <div className="roadmap-list">
            {courses.map((course, index) => {
              const courseId = course.id ?? (course as any)._id;
              const progress = course.progress ?? 0;
              const isCurrent = courseId === activeCourseId;
              const isCompleted = progress === 100;

              return (
                <div key={courseId} className="roadmap-item">
                  {/* Status Circle Node */}
                  <div className={`roadmap-node${isCompleted ? ' completed' : isCurrent ? ' active' : ''}`}>
                    {isCompleted ? (
                      <Check size={12} color="#ffffff" strokeWidth={3} />
                    ) : isCurrent ? (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffffff' }} />
                    ) : (
                      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{index + 1}</span>
                    )}
                  </div>

                  {/* Course Item Box */}
                  <div
                    className="card-sm"
                    style={{
                      padding: 16,
                      background: 'var(--nm-base)',
                      boxShadow: isCurrent ? 'var(--shadow-inset-sm)' : 'var(--shadow-raise-sm)',
                      border: isCurrent ? '1.5px solid var(--gold)' : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onClick={() => handleStartCourse(courseId)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{
                        fontSize: 10, fontFamily: 'JetBrains Mono', fontWeight: 700,
                        color: isCurrent ? 'var(--gold)' : 'var(--gold-rich)', letterSpacing: 1,
                      }}>
                        {course.level ?? 'BEGINNER'}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
                        {course.estimatedHours ?? 3} Jam
                      </span>
                    </div>

                    <h4 className="font-heading" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 6 }}>
                      {course.title}
                    </h4>

                    <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: 10 }}>
                      {course.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <ProgressBar percentage={progress} />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-heading)' }}>
                        {Math.round(progress)}%
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                      <button
                        className="btn btn-ghost"
                        style={{ padding: '4px 10px', fontSize: 11, gap: 4, borderRadius: 8 }}
                        onClick={(e) => { e.stopPropagation(); handleStartCourse(courseId); }}
                      >
                        {isCurrent ? 'Lanjut' : 'Detail'} <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
