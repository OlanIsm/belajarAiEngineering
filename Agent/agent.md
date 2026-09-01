# AGENT PROTOCOL - BELAJARAIENGINEERING.COM DEVELOPMENT

## PURPOSE
This document ensures that every AI-assisted task (design, development, implementation) follows a systematic, skill-aware workflow. **Always read this first, then execute.**

---

## MANDATORY WORKFLOW (FOR EVERY TASK)

### STEP 1: CONTEXT CHECK ✅
Before doing anything:
1. Read `/home/claude/context.md` (full)
2. Verify project scope (MVP only, no Phase 2 features)
3. Confirm color palette, design principles, tech stack
4. Identify what's already built vs. what's new

**If context is unclear or missing:**
→ Ask for clarification, don't assume

---

### STEP 2: SKILL AUDIT 🔧
Depending on task type, check available skills:

#### **For UI/Design Tasks** (Flutter, Neumorphism, Layouts)
- Load: `frontend-design` skill
- Read: Design system, typography, color theory, component patterns
- Confirm: Neumorphism principles, white + yellow palette, responsive approach

#### **For Document Tasks** (README, guides, documentation)
- Load: `docx` skill (if Word format needed)
- Otherwise: Use markdown inline or create `.md` files

#### **For NestJS/Backend Tasks** (API design, schemas, middleware)
- Check: Any existing NestJS examples or templates
- Confirm: TypeScript conventions, folder structure, naming patterns

#### **For Flutter/Frontend Tasks** (Widgets, screens, state management)
- Load: `frontend-design` skill first
- Then: Implement using Flutter best practices (Dart syntax, stateful/stateless widgets)

#### **For Data/Database Tasks** (MongoDB schema, seeding)
- Confirm: Schema structure matches context.md
- Validate: Collections, indexes, relationships

#### **For Integration Tasks** (API ↔ Frontend, Gemini proxy)
- Cross-reference: API endpoints (context.md) + frontend consumers
- Validate: Rate limiting, error handling, security

---

### STEP 3: CLARIFY TASK SCOPE 📋
Ask or confirm:
1. **What's the specific deliverable?** (e.g., "Neumorphism button component", "NestJS auth module", "Quiz API endpoint")
2. **What inputs/dependencies exist?** (e.g., "using context.md design palette")
3. **What's the acceptance criteria?** (e.g., "responsive on mobile + desktop", "passes rate limit check")
4. **Is this MVP or Phase 2?** (reject Phase 2 if not explicitly approved)

---

### STEP 4: EXECUTE (WITH GUARDRAILS) 🚀

#### **UI/Component Design:**
- ✅ Use neumorphism principles (soft shadows, inset states, rounded corners)
- ✅ Stick to white + yellow + light gray palette
- ✅ Design responsive-first (mobile width awareness)
- ✅ Include hover/active states
- ✅ Use simple, soothing aesthetics (no clutter)
- ❌ Don't overcomplicate animations
- ❌ Don't introduce new colors outside palette
- ❌ Don't ignore accessibility (contrast, readability)

#### **API/Backend Development:**
- ✅ Follow NestJS conventions (controllers, services, modules, guards)
- ✅ Use TypeScript types strictly
- ✅ Include error handling (try-catch, validation)
- ✅ Implement rate limiting for Gemini proxy
- ✅ Document endpoints in comments
- ❌ Don't hardcode API keys (use .env)
- ❌ Don't skip validation on user input
- ❌ Don't add features beyond MVP scope

#### **Database/Schema:**
- ✅ Match MongoDB collections to context.md schema
- ✅ Include indexes for frequently queried fields (userId, courseId, etc.)
- ✅ Use timestamps (createdAt, updatedAt)
- ✅ Reference relationships clearly (_id types, foreign key patterns)
- ❌ Don't deviate from defined schema without updating context.md
- ❌ Don't add unnecessary fields for "future use"

#### **Content/Seed Data:**
- ✅ Create realistic, well-written module content
- ✅ Include code examples with proper syntax highlighting
- ✅ Structure as JSON that matches schema
- ✅ Keep reading time estimates realistic
- ❌ Don't create low-quality placeholder text
- ❌ Don't deviate from 3 courses (Python, ML, Prompt Engineering)

#### **Gemini Integration:**
- ✅ Proxy through NestJS backend
- ✅ Add system prompt to keep responses on-topic
- ✅ Implement 10 req/min rate limiting per user
- ✅ Store chat history in MongoDB
- ✅ Handle API errors gracefully
- ❌ Don't expose API key to frontend
- ❌ Don't allow off-topic queries without redirect
- ❌ Don't skip error responses

---

### STEP 5: VALIDATE & DOCUMENT 📝

After execution:
1. **Does it match context.md?** (design, scope, tech stack)
2. **Does it follow MVP scope?** (no Phase 2 features sneaking in)
3. **Is code quality high?** (readable, commented, typed)
4. **Is it testable/deployable?** (no dependencies missing)
5. **Document what was built:**
   - What file(s) were created/modified
   - What it does + how to use it
   - Any assumptions made
   - Next steps or blockers

---

## COMMON SCENARIOS & RESPONSES

### Scenario 1: "Design the home screen UI"
```
1. ✅ Read context.md (home screen spec)
2. ✅ Load frontend-design skill
3. ✅ Confirm: white + yellow palette, neumorphism, mascot placement
4. ✅ Design: dashboard, shortcut widget, stats cards, chatbot avatar
5. ✅ Include: responsive breakpoints, hover/active states
6. ✅ Document: file path, component breakdown, usage example
```

### Scenario 2: "Build the NestJS auth module"
```
1. ✅ Read context.md (API endpoints, user schema)
2. ✅ Confirm: endpoints (/signup, /login, /logout, /me)
3. ✅ Check: NestJS project structure (already exist? new?)
4. ✅ Build: AuthController, AuthService, AuthGuard, DTOs
5. ✅ Include: password hashing, JWT tokens, error handling
6. ✅ Document: how to use, env vars needed, testing notes
```

### Scenario 3: "Create seed data for quiz"
```
1. ✅ Read context.md (quiz schema, question types)
2. ✅ Confirm: 10-15 questions, MCQ + short answer + code-fill
3. ✅ Validate: difficulty mix (easy/medium/hard)
4. ✅ Create: JSON file matching schema exactly
5. ✅ Include: clear explanations for each answer
6. ✅ Document: how to seed to MongoDB
```

### Scenario 4: "User asks for a feature outside MVP"
```
❌ STOP - This is Phase 2
→ Politely explain: "Interview Questions is Phase 2. MVP focus: auth, study, quiz, chatbot."
→ Redirect: "Want to knock out a core MVP feature instead?"
→ Offer: Document the idea for Phase 2 planning
```

---

## ANTI-PATTERNS (DON'T DO THIS)

❌ **Skip context.md** - Always read it, even if you think you know the project  
❌ **Ignore skill requirements** - Load frontend-design before designing UI  
❌ **Assume scope** - Ask what's MVP vs. Phase 2 if unclear  
❌ **Hardcode secrets** - API keys, passwords, tokens → .env files only  
❌ **Add "just one more feature"** - Scope creep kills MVP  
❌ **Design outside palette** - No surprise new colors  
❌ **Skip documentation** - Always explain what was built  
❌ **Overengineer** - Simple > perfect, at this stage  
❌ **Break existing code** - Always verify you're not breaking other components  
❌ **Ignore errors gracefully** - Handle all edge cases  

---

## DECISION TREE (QUICK REFERENCE)

```
User asks for something
│
├─ Is it in context.md scope? (MVP features only)
│  ├─ YES → Go to Step 2 (Skill Audit)
│  └─ NO → Ask if it's Phase 2, redirect to MVP focus
│
├─ Does it require UI/design?
│  ├─ YES → Load frontend-design skill first
│  └─ NO → Continue
│
├─ Does it require backend/API?
│  ├─ YES → Check NestJS structure, follow TypeScript conventions
│  └─ NO → Continue
│
├─ Does it require data/database?
│  ├─ YES → Match context.md schema exactly
│  └─ NO → Continue
│
└─ EXECUTE (Step 4) + VALIDATE (Step 5)
```

---

## INFORMATION HIERARCHY

**Priority 1 (Most Important):**
- context.md (project truth source)
- MVP scope (no Phase 2 sneaking)
- Design palette (white + yellow + neumorphism)

**Priority 2 (Important):**
- Tech stack (NestJS, Flutter, MongoDB, Gemini)
- API endpoints (from context.md)
- Database schema (from context.md)

**Priority 3 (Reference):**
- Best practices (TypeScript, Flutter conventions, UX principles)
- Deployment notes (Render, Vercel, MongoDB Atlas)
- Mascot guidelines (fire character, placement)

---

## ASKING FOR HELP (WITHIN WORKFLOW)

If stuck or unclear:
1. **First:** Reread context.md (usually answers are there)
2. **Then:** Clarify what specifically is confusing
3. **Ask:** "Does [assumption] match context.md?" or "Is this MVP or Phase 2?"
4. **Include:** What you've tried, what failed, what you need

**Example:**
> "Building the quiz endpoint. Context.md says 'pre-built questions', but do we need AI generation for future quizzes? Or hardcode JSON for MVP only?"
> → This shows you read context.md + thought critically

---

## FINAL CHECKLIST (BEFORE DELIVERING ANYTHING)

- [ ] Read context.md (full, not skimmed)
- [ ] Loaded relevant skills (frontend-design, docx, etc.)
- [ ] Confirmed MVP scope (no Phase 2)
- [ ] Validated against palette/design system
- [ ] Error handling included
- [ ] Code/content quality is high
- [ ] Documented: what was built, how to use, next steps
- [ ] Asked clarifying questions if needed
- [ ] Tested mentally/logically (or actually if possible)
- [ ] No hardcoded secrets, no scope creep, no shortcuts

---

## CONTACTS & RESOURCES

**Project Owner:** Olan (Insan Maulana)  
**Primary IDE:** Antigravity  
**Status:** MVP Phase, Full-Stack Development  

**Key Files:**
- `/home/claude/context.md` (project context)
- `/home/claude/agent.md` (this file)

**Git Workflow:** (confirm with Olan)
- Branch naming: `feature/thing-name`, `fix/issue-name`
- Commit messages: Clear, concise, reference what was done
- PR template: Link to context.md, explain changes

---

## VERSION HISTORY

**v1.0** - Initial protocol, MVP scope, skill audit workflow  
Last updated: September 1, 2026  
Author: Claude + Olan collaboration
