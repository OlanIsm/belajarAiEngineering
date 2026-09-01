import { create } from 'zustand';
import api from '../api/client';
import { MOCK_QUIZ } from '../api/mockData';

interface Question {
  id: string;
  questionText: string;
  options: string[];
}

interface Quiz {
  id: string;
  _id?: string;
  weekNumber: number;
  year: number;
  questions: Question[];
}

interface QuizResult {
  score: number;
  correctCount: number;
  totalQuestions: number;
}

interface QuizState {
  currentQuiz: Quiz | null;
  userAnswers: Record<string, string>;
  lastResult: QuizResult | null;
  isLoading: boolean;
  fetchQuiz: () => Promise<void>;
  selectAnswer: (questionId: string, answer: string) => void;
  submitQuiz: (userId: string) => Promise<boolean>;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  currentQuiz: MOCK_QUIZ,
  userAnswers: {},
  lastResult: null,
  isLoading: false,

  fetchQuiz: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get('/quiz/current');
      set({ currentQuiz: data ?? MOCK_QUIZ, userAnswers: {}, lastResult: null, isLoading: false });
    } catch {
      console.log('[Quiz] Backend offline — using Mock Quiz');
      set({ currentQuiz: MOCK_QUIZ, userAnswers: {}, lastResult: null, isLoading: false });
    }
  },

  selectAnswer: (questionId, answer) =>
    set((s) => ({ userAnswers: { ...s.userAnswers, [questionId]: answer } })),

  submitQuiz: async (userId: string) => {
    const { currentQuiz, userAnswers } = get();
    if (!currentQuiz) return false;
    set({ isLoading: true });
    try {
      const answers = Object.entries(userAnswers).map(([questionId, userAnswer]) => ({
        questionId, userAnswer,
      }));
      const { data } = await api.post('/quiz/submit', {
        userId,
        quizId: currentQuiz.id ?? currentQuiz._id,
        answers,
      });
      set({ lastResult: data, isLoading: false });
      return true;
    } catch {
      // Demo grading logic
      console.log('[Quiz] Backend offline — calculating score locally');
      const total = currentQuiz.questions.length;
      const answeredCount = Object.keys(userAnswers).length;
      const correctCount = Math.min(total, answeredCount);
      const score = Math.round((correctCount / total) * 100);
      set({
        lastResult: { score, correctCount, totalQuestions: total },
        isLoading: false,
      });
      return true;
    }
  },
}));
