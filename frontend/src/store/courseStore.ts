import { create } from 'zustand';
import api from '../api/client';
import { MOCK_COURSES, MOCK_MODULES } from '../api/mockData';

interface Module {
  id: string;
  _id?: string;
  title: string;
  contentMarkdown: string;
  order: number;
  isCompleted?: boolean;
}

interface Course {
  id: string;
  _id?: string;
  title: string;
  description: string;
  level?: string;
  difficulty?: string;
  estimatedHours?: number;
  progress?: number;
}

interface CourseState {
  courses: Course[];
  selectedCourse: Course | null;
  modules: Module[];
  activeModule: Module | null;
  isLoading: boolean;
  error: string | null;
  fetchCourses: (userId?: string) => Promise<void>;
  selectCourse: (courseId: string, userId?: string) => Promise<void>;
  setActiveModule: (mod: Module) => void;
  markModuleComplete: (userId: string, moduleId: string) => Promise<boolean>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: MOCK_COURSES,
  selectedCourse: MOCK_COURSES[0],
  modules: MOCK_MODULES['course-1'] || [],
  activeModule: MOCK_MODULES['course-1']?.[0] || null,
  isLoading: false,
  error: null,

  fetchCourses: async (userId?: string) => {
    set({ isLoading: true, error: null });
    try {
      const url = userId ? `/courses?userId=${userId}` : '/courses';
      const { data } = await api.get(url);
      if (Array.isArray(data) && data.length > 0) {
        set({ courses: data, isLoading: false });
      } else {
        set({ courses: MOCK_COURSES, isLoading: false });
      }
    } catch {
      // Backend offline fallback → display rich mock courses!
      console.log('[Courses] Backend offline — using Mock Courses');
      set({ courses: MOCK_COURSES, isLoading: false });
    }
  },

  selectCourse: async (courseId: string, userId?: string) => {
    set({ isLoading: true });
    try {
      const url = userId
        ? `/courses/${courseId}/modules?userId=${userId}`
        : `/courses/${courseId}/modules`;
      const { data } = await api.get(url);
      const courseRes = await api.get(`/courses/${courseId}`);
      set({
        selectedCourse: courseRes.data,
        modules: data,
        activeModule: data[0] ?? null,
        isLoading: false,
      });
    } catch {
      // Backend offline fallback
      console.log('[Courses] Backend offline — using Mock Modules for', courseId);
      const mockCourse = get().courses.find((c) => (c.id ?? (c as any)._id) === courseId) || MOCK_COURSES[0];
      const mockMods = MOCK_MODULES[courseId] || MOCK_MODULES['course-1'];
      set({
        selectedCourse: mockCourse,
        modules: mockMods,
        activeModule: mockMods[0] ?? null,
        isLoading: false,
      });
    }
  },

  setActiveModule: (mod: Module) => set({ activeModule: mod }),

  markModuleComplete: async (userId: string, moduleId: string) => {
    try {
      await api.put(`/progress/${userId}/${moduleId}`, { completed: true });
    } catch {
      console.log('[Progress] Backend offline — marking complete in local state');
    }
    const modules = get().modules.map((m) =>
      (m.id ?? m._id) === moduleId ? { ...m, isCompleted: true } : m
    );
    const activeModule = get().activeModule;
    if (activeModule && (activeModule.id ?? activeModule._id) === moduleId) {
      set({ modules, activeModule: { ...activeModule, isCompleted: true } });
    } else {
      set({ modules });
    }
    return true;
  },
}));
