import React, { useState, useEffect } from 'react';
import { Brain, Clock, Trophy, Check, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useQuizStore } from '../store/quizStore';

export default function QuizPage() {
  const { user } = useAuthStore();
  const { currentQuiz, userAnswers, lastResult, isLoading, fetchQuiz, selectAnswer, submitQuiz } = useQuizStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => { fetchQuiz(); }, []);

  const handleSubmit = async () => {
    if (!user?.id) return;
    const ok = await submitQuiz(user.id);
    if (ok) setShowResult(true);
  };

  if (isLoading && !currentQuiz) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="spinner" style={{ width: 36, height: 36, borderTopColor: 'var(--gold)' }} />
      </div>
    );
  }

  if (!currentQuiz) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <Brain size={64} color="var(--text-muted)" />
        </div>
        <h2 className="font-heading" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-heading)' }}>
          Tidak Ada Quiz Aktif
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>
          Quiz mingguan akan tersedia setiap Senin 00:00 WIB.
        </p>
      </div>
    );
  }

  const questions = currentQuiz.questions ?? [];
  const currentQ = questions[currentIdx];

  // Result Modal
  if (showResult && lastResult) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <div className="card" style={{ maxWidth: 480, width: '100%', textAlign: 'center', padding: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%', background: 'var(--gold)',
              boxShadow: 'var(--shadow-raise)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Trophy size={36} color="#2D3748" />
            </div>
          </div>
          <h2 className="font-heading" style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-heading)', marginBottom: 8 }}>
            Skor Kamu: {lastResult.score}%
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 32 }}>
            Benar <strong style={{ color: 'var(--text-heading)' }}>{lastResult.correctCount}</strong> dari <strong style={{ color: 'var(--text-heading)' }}>{lastResult.totalQuestions}</strong> soal
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              className="btn btn-gold"
              onClick={() => { setShowResult(false); setCurrentIdx(0); fetchQuiz(); }}
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: 6 }}>
            WEEKLY QUIZ CYCLE #{String(currentQuiz.weekNumber).padStart(2, '0')}
          </p>
          <h1 className="font-heading" style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-heading)' }}>
            Evaluasi Pemahaman AI Engineering
          </h1>
        </div>
        <div className="card-sm" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Clock size={16} color="var(--text-muted)" />
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 1, color: 'var(--text-muted)' }}>
            Reset: Senin 00:00 WIB
          </span>
        </div>
      </div>

      {/* Stepper */}
      <div className="quiz-stepper">
        {questions.map((q, idx) => {
          const answered = !!userAnswers[q.id];
          return (
            <div
              key={q.id}
              className={`quiz-step${idx === currentIdx ? ' current' : answered ? ' answered' : ''}`}
            />
          );
        })}
      </div>

      {/* Question Card */}
      <div className="card" style={{ maxWidth: 720 }}>
        <p className="eyebrow" style={{ marginBottom: 12 }}>
          SOAL {currentIdx + 1} DARI {questions.length}
        </p>
        <h2 className="font-heading" style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 24 }}>
          {currentQ.questionText}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {currentQ.options.map((opt) => {
            const isSelected = userAnswers[currentQ.id] === opt;
            return (
              <div
                key={opt}
                className={`option-card${isSelected ? ' selected' : ''}`}
                onClick={() => selectAnswer(currentQ.id, opt)}
              >
                <span style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: isSelected ? 'var(--gold)' : 'var(--nm-base)',
                  boxShadow: isSelected ? 'var(--shadow-raise-sm)' : 'var(--shadow-inset-sm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isSelected && <Check size={14} color="#2D3748" strokeWidth={3} />}
                </span>
                {opt}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            className="btn btn-ghost"
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            disabled={currentIdx === 0}
            style={{ gap: 6 }}
          >
            <ChevronLeft size={16} /> Sebelumnya
          </button>

          {currentIdx < questions.length - 1 ? (
            <button
              className="btn btn-gold"
              onClick={() => setCurrentIdx((i) => i + 1)}
              style={{ gap: 6 }}
            >
              Berikutnya <ChevronRight size={16} />
            </button>
          ) : (
            <button
              className="btn btn-gold"
              onClick={handleSubmit}
              disabled={isLoading}
              style={{ gap: 8 }}
            >
              {isLoading ? <><span className="spinner" /> Mengirim...</> : <>Kirim Jawaban <Send size={16} /></>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
