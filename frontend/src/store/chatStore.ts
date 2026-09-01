import { create } from 'zustand';
import api from '../api/client';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (prompt: string) => Promise<void>;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Halo! Saya AI Tutor Belajar AI Engineering. Ada topik AI, Python, RAG, atau Machine Learning yang ingin kamu tanyakan?',
    },
  ],
  isLoading: false,

  sendMessage: async (prompt: string) => {
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: prompt };
    set((s) => ({ messages: [...s.messages, userMsg], isLoading: true }));
    try {
      const { data } = await api.post('/chat', { prompt });
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.response ?? data.reply ?? 'Terima kasih atas pertanyaannya!',
      };
      set((s) => ({ messages: [...s.messages, aiMsg], isLoading: false }));
    } catch {
      // Friendly fallback demo response when backend is offline
      setTimeout(() => {
        const demoReply = generateDemoAiReply(prompt);
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: demoReply,
        };
        set((s) => ({ messages: [...s.messages, aiMsg], isLoading: false }));
      }, 600);
    }
  },

  clearChat: () => set({ messages: [] }),
}));

function generateDemoAiReply(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('rag') || p.includes('vector')) {
    return 'Retrieval-Augmented Generation (RAG) adalah teknik menggabungkan LLM dengan pencarian dokumen eksternal (Vector DB) agar model menjawab berdasarkan data spesifik perusahaan tanpa hallucination! 🚀';
  }
  if (p.includes('prompt') || p.includes('system')) {
    return 'Prompt Engineering yang baik menggunakan struktur: 1. Persona/Role, 2. Context & Constraints, 3. Input format, 4. Expected Output format (seperti JSON/Markdown). 💡';
  }
  if (p.includes('python') || p.includes('code')) {
    return 'Di AI Engineering, library Python yang paling sering dipakai adalah: OpenAI/Anthropic SDK, LangChain, LlamaIndex, PyTorch, HuggingFace Transformers, dan FastAPI! 🐍';
  }
  return `Pertanyaan menarik tentang "${prompt}"! Dalam AI Engineering, fokus utamanya adalah membangun sistem cerdas yang reliable, hemat token, dan efisien dalam latensi. 🔥`;
}
