# BELAJARAIENGINEERING.COM - PROJECT CONTEXT

## PROJECT SNAPSHOT
**What:** Duolingo-style interactive learning platform for AI Engineering  
**Who:** Olan (Computer Science student, BINUS, olan.dev)  
**Where:** Hosted on Render (backend) + Vercel (frontend)  
**When:** MVP first, Phase 2 later  
**Why:** Make AI Engineering education accessible, engaging, consistent through gamification  

---

## TECH STACK (FINAL)
- **Backend:** NestJS + TypeScript (Render free tier)
- **Frontend:** Flutter Web (Vercel) → Flutter Mobile Phase 2
- **Database:** MongoDB (Atlas free tier)
- **AI/Chatbot:** Gemini API (free tier, server-side, rate-limited)
- **Content:** JSON seed files in repo
- **IDE:** Antigravity (primary dev environment)

---

## DESIGN SYSTEM

### COLOR PALETTE
- **Primary Background:** White (#FFFFFF or #F8F9FA)
- **Accent:** Warm Yellow (#FFD700, #FFC857, or #FFBB33)
- **Secondary Neutral:** Light Gray (#E8E8E8, #D4D4D4) - shadows
- **Text:** Dark Gray (#424242, #333333)
- **Gradient (optional):** White → very light cream

### STYLE: NEUMORPHISM
- Soft outer shadows (light gray, low opacity)
- Inset shadows for pressed/active states
- Yellow accent for CTAs, active tabs, progress bars
- Smooth rounded corners (16-24px)
- Tactile 3D feel without clutter
- Eye-friendly, soothing aesthetic

### MASCOT
🔥 **Fire Character:** Simple, cute, energetic
- Body: Orange/yellow gradient flame shape
- Arms: Simple line sticks
- Legs: Simple line sticks
- Face: 2 dots (eyes) + curve smile (mouth)
- Placement: Hero section (home), chat bubble (bottom-right), onboarding
- Personality: Encouraging, playful, motivational

---

## FEATURE SPECIFICATIONS (MVP ONLY)

### 1. HOME (Dashboard)
- **Shortcut Widget:** CTA button to last studied course + progress indicator
- **Mascot Hero:** Fire mascot in prominent position (center or corner) with welcoming message
- **Quick Stats:** Small cards - quiz completion %, study streak, points (Phase 2)
- **Daily Encouragement:** Rotating motivational tip or streak message
- **Chatbot Avatar:** Bottom-right corner, expandable chat

### 2. STUDY
- **Course Cards Grid:** 3 cards (expandable later)
  - Title, difficulty (Beginner/Intermediate/Advanced), % completion
  - Visual icon per course
- **Inside Course:** Module list with:
  - Lesson title + reading time estimate
  - Guide content (markdown rendered)
  - Code snippets (syntax highlighting)
  - "Mark Complete" button
  - Progress bar per module
- **Initial 3 Courses:**
  1. **Python Fundamentals** (Beginner) - variables, loops, functions, OOP basics
  2. **Machine Learning** (Intermediate) - supervised, unsupervised, metrics
  3. **Prompt Engineering** (Beginner-Intermediate) - design, chain-of-thought, few-shot

### 3. QUIZ (Weekly)
- **Weekly Reset:** Every Monday 00:00 WIB
- **Question Pool:** Pre-built (JSON seed data, ~30-50 questions per pool)
- **Question Types:** MCQ, short-answer, code-fill, matching
- **Scoring:** Instant feedback + explanation for wrong answers
- **Tracking:** Store attempts, show score trends
- **Reward:** Points/badges (Phase 2)

### 4. INTERVIEW QUESTIONS
**STATUS: PHASE 2** (not MVP)
- Save for after core features are solid

### 5. SETTINGS
- **Preferences:**
  - Theme toggle (light/dark)
  - Notification settings (study reminders, quiz alerts)
  - Language (Bahasa Indonesia primary, English secondary)
- **Account:**
  - Profile view (name, email, stats)
  - Log out
- **About App**

---

## NAVIGATION STRUCTURE

```
├── Left Expandable Navbar (hamburger on mobile)
│   ├── Home
│   ├── Study
│   ├── Quiz
│   ├── Interview Questions (disabled MVP phase)
│   └── Settings (pinned at bottom)
├── Navbar State: Collapsed (icon only) / Expanded (label + icon)
└── Smooth transitions between states
```

---

## DATABASE (MONGODB SCHEMA)

### Collections

**users**
```
{
  _id: ObjectId,
  email: String (unique),
  passwordHash: String,
  name: String,
  theme: "light" | "dark",
  language: "id" | "en",
  timezone: "Asia/Jakarta" (default WIB),
  createdAt: Date,
  updatedAt: Date
}
```

**courses**
```
{
  _id: ObjectId,
  title: String,
  description: String,
  difficulty: "Beginner" | "Intermediate" | "Advanced",
  icon: String (emoji or image URL),
  order: Number,
  createdAt: Date
}
```

**modules**
```
{
  _id: ObjectId,
  courseId: ObjectId (ref: courses),
  title: String,
  content: String (markdown),
  codeSnippets: Array<{language: String, code: String}>,
  readingTimeMinutes: Number,
  order: Number,
  createdAt: Date
}
```

**quizzes**
```
{
  _id: ObjectId,
  weekNumber: Number (1-52),
  year: Number,
  questions: Array<{
    id: String,
    type: "mcq" | "shortAnswer" | "codeFill" | "matching",
    question: String,
    options: Array<String> (for MCQ),
    correctAnswer: String | Array<String>,
    explanation: String,
    difficulty: "Easy" | "Medium" | "Hard"
  }>,
  createdAt: Date,
  resetDay: "Monday" (WIB)
}
```

**userProgress**
```
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  courseId: ObjectId (ref: courses),
  moduleId: ObjectId (ref: modules),
  completed: Boolean,
  completedAt: Date,
  progress: Number (0-100),
  createdAt: Date,
  updatedAt: Date
}
```

**userQuizAttempts**
```
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  quizId: ObjectId (ref: quizzes),
  score: Number (0-100),
  totalQuestions: Number,
  answers: Array<{questionId: String, userAnswer: String, isCorrect: Boolean}>,
  attemptedAt: Date,
  weekNumber: Number
}
```

**chatHistory**
```
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  messages: Array<{
    role: "user" | "assistant",
    content: String,
    timestamp: Date
  }>,
  topic: String (AI Engineering related),
  createdAt: Date,
  updatedAt: Date
}
```

---

## NESTJS API ENDPOINTS (MVP)

### Auth
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user profile

### Courses & Modules
- `GET /api/courses` - List all courses
- `GET /api/courses/:courseId` - Get course details
- `GET /api/courses/:courseId/modules` - Get modules in course
- `GET /api/modules/:moduleId` - Get module content (full)
- `PUT /api/progress/:userId/:moduleId` - Mark module complete

### Quiz
- `GET /api/quiz/current` - Get current week's quiz
- `POST /api/quiz/submit` - Submit quiz attempt
- `GET /api/quiz/history/:userId` - Get past quiz attempts

### Chat (Gemini Proxy)
- `POST /api/chat` - Send message to chatbot
  - Rate limit: 10 req/min per user
  - Response stays on-topic to AI Engineering learning

### Settings
- `PUT /api/users/:userId/settings` - Update user preferences
- `POST /api/auth/logout` - Logout

---

## GEMINI API INTEGRATION (SERVER-SIDE)

**Why Server-Side?**
- Protects API key from exposure
- Rate limiting & cost control
- Context management

**Implementation:**
```
User sends message to /api/chat
↓
Backend validates rate limit (10 req/min)
↓
Backend adds system prompt: "You are a helpful AI Engineering tutor. Stay on-topic. If question is off-topic, politely redirect to AI Engineering learning."
↓
Backend calls Gemini API
↓
Response returned to user
↓
Store in chatHistory collection
```

**Rate Limiting:**
- 10 requests per minute per user
- Return 429 Too Many Requests if exceeded
- Reset counter daily

---

## MONDAY RESET LOGIC (WIB)

**Weekly Quiz Reset:**
- Every Monday 00:00 WIB, new quiz is made available
- Old quiz is archived (users can still view past attempts)
- Trigger: Cron job in NestJS (node-cron or similar)
- User timezone stored as WIB by default, changeable in settings

---

## CONTENT SEEDING (JSON)

**File Structure:**
```
/seed/
├── courses.json (3 courses)
├── modules/
│   ├── python-fundamentals.json (4-5 modules)
│   ├── machine-learning.json (4-5 modules)
│   └── prompt-engineering.json (4-5 modules)
└── quizzes/
    └── week-01.json (10-15 questions)
```

**Example (`seed/courses.json`):**
```json
[
  {
    "title": "Python Fundamentals",
    "description": "Master Python basics for AI engineering",
    "difficulty": "Beginner",
    "icon": "🐍",
    "order": 1
  },
  ...
]
```

---

## MVP SCOPE CHECKLIST

✅ User authentication (email/password)  
✅ Dashboard/Home screen  
✅ Study: 3 courses, read modules, mark complete  
✅ Weekly quiz (pre-built questions)  
✅ Chatbot (Gemini, server-side, rate-limited)  
✅ Settings (theme, language, logout)  
✅ Neumorphism design + yellow/white palette  
✅ Mascot (fire character)  

❌ Interview Questions (Phase 2)  
❌ Gamification/points/badges/streaks (Phase 2)  
❌ Mobile app (Phase 2 after web polish)  
❌ Advanced analytics (Phase 2)  

---

## DEPLOYMENT CHECKLIST

**Render (Backend)**
- NestJS app deployed
- MongoDB Atlas connection string in env vars
- Gemini API key in env vars
- CORS configured for Vercel domain

**Vercel (Frontend)**
- Flutter Web build deployed
- API base URL env var pointing to Render
- Auto-deploy on git push

**MongoDB Atlas**
- Free cluster created
- Collections seeded with initial data
- User access configured

**Gemini API**
- Project created in Google Cloud
- API key generated
- Billing (free tier)

---

## KEY PRINCIPLES

1. **Simple over complex** - No unnecessary features
2. **Soothing UX** - Eye-friendly colors, smooth animations
3. **Consistency** - Unified design system across all screens
4. **Mobile-first mindset** - Even though web first, design responsively
5. **Content quality** - Well-written guides, clear code examples
6. **Learning retention** - Weekly quiz + spaced repetition
7. **Encouraging tone** - Mascot, motivational messages, streak tracking

---

## NEXT ACTIONS

1. **Backend Setup** - NestJS project, MongoDB connection, auth middleware
2. **Frontend Setup** - Flutter Web project, neumorphism component library
3. **Content Creation** - Seed data for 3 courses + modules
4. **API Development** - Implement endpoints (auth, courses, quiz, chat)
5. **UI Development** - Build screens (home, study, quiz, settings)
6. **Integration** - Connect frontend ↔ backend
7. **Testing** - Manual testing + edge cases
8. **Deployment** - Render + Vercel setup
9. **Launch** - Get feedback from early users
10. **Iterate** - Phase 2 based on user feedback

---

## CONTACT / OWNER
**Olan (Insan Maulana)**  
- GitHub: @olan-dev (atau check olan.dev)
- Primary IDE: Antigravity
- Status: Full-time student + developer
