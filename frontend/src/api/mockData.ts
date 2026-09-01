export const MOCK_USER = {
  id: 'mock-user-123',
  name: 'Budi Santoso (Demo)',
  email: 'budi@aiengineer.id',
};

export const MOCK_COURSES = [
  {
    id: 'course-1',
    title: 'AI Engineering 101',
    description: 'Dasar-dasar Artificial Intelligence, Machine Learning vs Deep Learning, dan landscape AI modern.',
    level: 'Beginner',
    difficulty: 'Beginner',
    estimatedHours: 3,
    progress: 66,
  },
  {
    id: 'course-2',
    title: 'Prompt Engineering Masterclass',
    description: 'Teknik Advanced Prompting: Chain-of-Thought, Few-Shot Prompting, ReAct pattern, dan System Instructions.',
    level: 'Intermediate',
    difficulty: 'Intermediate',
    estimatedHours: 4,
    progress: 25,
  },
  {
    id: 'course-3',
    title: 'RAG & Vector Database',
    description: 'Membangun Retrieval-Augmented Generation menggunakan Pinecone/Qdrant, LangChain, dan Embedding Models.',
    level: 'Advanced',
    difficulty: 'Advanced',
    estimatedHours: 6,
    progress: 0,
  },
  {
    id: 'course-4',
    title: 'Fine-Tuning LLM & Deployment',
    description: 'Fine-tuning Llama 3 & Mistral pakai QLoRA, lalu deploy ke Production dengan FastAPI & Docker.',
    level: 'Expert',
    difficulty: 'Expert',
    estimatedHours: 8,
    progress: 0,
  },
];

export const MOCK_MODULES: Record<string, Array<{ id: string; title: string; contentMarkdown: string; order: number; isCompleted?: boolean }>> = {
  'course-1': [
    {
      id: 'mod-1',
      title: 'Pengenalan AI Engineering',
      order: 1,
      isCompleted: true,
      contentMarkdown: `# Modul 1: Pengenalan AI Engineering

Selamat datang di modul **AI Engineering 101**! 🚀

## Apa itu AI Engineer?
AI Engineer adalah profesional perangkat lunak yang menggabungkan prinsip **Software Engineering** dengan **Machine Learning / AI Models** untuk membangun produk aplikasi yang cerdas, scalable, dan andal.

### Perbedaan Roles dalam Dunia AI:
| Role | Fokus Utama | Output |
|---|---|---|
| **Data Scientist** | Analisis Data, Formulasi Hipotesis | Insight, Model prototype |
| **ML Engineer** | Training Model, Pipeline Data | Model weights, Training pipeline |
| **AI Engineer** | Integrasi LLM, RAG, System Prompt, API | Aplikasi End-to-End |

\`\`\`python
# Contoh memanggil OpenAI API sederhana
import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Jelaskan AI Engineering dalam 1 kalimat!"}]
)

print(response.choices[0].message.content)
\`\`\`

> **Tips Neumorphic:** Klik tombol **"Tandai Selesai"** di kanan atas untuk mencatat progres belajar kamu!
`,
    },
    {
      id: 'mod-2',
      title: 'Landscape Model Modern (LLMs)',
      order: 2,
      isCompleted: true,
      contentMarkdown: `# Modul 2: Landscape LLM & AI Models Modern

Di modul ini kita akan membahas arsitektur Transformer dan ekosistem model yang mendominasi industri hari ini.

## Proprietary vs Open-Weight Models

1. **Proprietary Models:**
   - OpenAI (GPT-4o, GPT-4o-mini)
   - Google (Gemini 1.5 Pro, Flash)
   - Anthropic (Claude 3.5 Sonnet)

2. **Open-Weight Models:**
   - Meta Llama 3.1 & 3.2
   - Mistral AI & Mixtral
   - Alibaba Qwen 2.5

\`\`\`bash
# Install Ollama untuk run Llama 3 lokal
curl -fsSL https://ollama.com/install.sh | sh
ollama run llama3.1
\`\`\`
`,
    },
    {
      id: 'mod-3',
      title: 'Ekosistem Framework (LangChain & LlamaIndex)',
      order: 3,
      isCompleted: false,
      contentMarkdown: `# Modul 3: Framework Utama AI Engineer

Belajar menggunakan LangChain, LlamaIndex, dan Vercel AI SDK untuk mempercepat pengembangan aplikasi AI.
`,
    },
  ],
};

export const MOCK_QUIZ = {
  id: 'mock-quiz-1',
  weekNumber: 35,
  year: 2026,
  questions: [
    {
      id: 'q-1',
      questionText: 'Apa fungsi utama dari komponen Embedding Model dalam arsitektur RAG?',
      options: [
        'Mengubah teks dokumen menjadi representasi vektor bernilai numerik',
        'Menyimpan data user di database relasional PostgreSQL',
        'Mengompres ukuran model LLM agar hemat memory RAM',
        'Menyusun prompt otomatis tanpa batas token',
      ],
    },
    {
      id: 'q-2',
      questionText: 'Teknik prompting manakah yang menambahkan langkah penalaran (reasoning steps) sebelum menghasilkan jawaban akhir?',
      options: [
        'Zero-Shot Prompting',
        'Chain-of-Thought (CoT) Prompting',
        'Sentiment Analysis Prompting',
        'Single-Turn Prompting',
      ],
    },
    {
      id: 'q-3',
      questionText: 'Metode PEFT (Parameter-Efficient Fine-Tuning) yang paling populer untuk hemat GPU VRAM adalah...',
      options: [
        'Full Model Retraining',
        'QLoRA (Quantized Low-Rank Adaptation)',
        'Gradient Descent Normalization',
        'Manual Hyperparameter Tuning',
      ],
    },
  ],
};
