# 🎨 DESIGN.md — Belajar AI Engineering Design System

Documenting the visual architecture, typography, color tokens, layout specifications, and interactive design patterns for the **Belajar AI Engineering** platform.

---

## 🌟 1. Overview & Aesthetics Strategy

The **Belajar AI Engineering** platform follows a **Tactile Neumorphic & Warm-Orange Accent** visual design. The interface balances high readability with modern micro-interactions, dark/light theme switching, and custom mascot floating action components.

### Core Principles
1. **Tactile Depth (Soft Neumorphism)**: UI elements use dual-direction drop shadows (`--shadow-raise` & `--shadow-inset`) to create physical depth without heavy outlines.
2. **Warm Orange & Amber Branding**: Gold and bright yellow accents are strictly replaced by high-contrast Warm Orange (`#FF7A00`) and Deep Amber (`#E65100`) gradients.
3. **Focused Single-Viewport Layout**: Dashboard pages are constrained within `100vh` to eliminate outer vertical scrollbars while allowing isolated, smooth scrolling on content lists (e.g., Roadmap timeline).
4. **Playful Mascot Micro-Interactions**: An integrated AI Mascot FAB that pops out of its container and executes a waving animation when hovered.

---

## 🎨 2. Design Tokens

### Color Palette

#### Dark Theme (Default)
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `--nm-base` | `#141923` | Canvas background & element surface |
| `--nm-flat` | `#1a212d` | Flat card surface |
| `--text-heading` | `#f1f5f9` | Primary titles and high-emphasis headers |
| `--text-body` | `#cbd5e1` | Main body paragraphs and descriptions |
| `--text-muted` | `#64748b` | Eyebrow labels, timestamps, metadata |
| `--gold` | `#FF7A00` | Primary brand accent orange |
| `--gold-rich` | `#FF7A00` | High-contrast accent for tags & highlights |
| `--gold-gradient` | `linear-gradient(135deg, #FF7A00, #E65100)` | Primary buttons, active badges, highlights |

#### Light Theme
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `--nm-base` | `#e0e5ec` | Soft sand canvas background |
| `--text-heading` | `#1e293b` | Dark slate titles |
| `--text-body` | `#334155` | Dark body text |
| `--text-muted` | `#64748b` | Muted labels |

### Shadow Tokens (Neumorphic Depth)
```css
/* Raised State (Buttons, Cards, Badges) */
--shadow-raise: 6px 6px 14px rgba(0,0,0,0.45), -5px -5px 12px rgba(255,255,255,0.03);
--shadow-raise-sm: 4px 4px 10px rgba(0,0,0,0.35), -3px -3px 8px rgba(255,255,255,0.03);

/* Inset State (Pressed buttons, active inputs, day streak items) */
--shadow-inset-sm: inset 3px 3px 7px rgba(0,0,0,0.45), inset -3px -3px 7px rgba(255,255,255,0.03);
```

---

## 🔤 3. Typography System

The platform combines **Sora**, **DM Sans**, and **JetBrains Mono** to achieve clean readability and modern engineering aesthetic.

| Font Family | Applied Elements | Weights Used |
| :--- | :--- | :--- |
| **Sora** | Page Titles, Card Headings (`.font-heading`), Main Stat Numbers | `700` (Bold), `800` (ExtraBold) |
| **DM Sans** | Body Copy, Descriptions, Button Labels, Subtitles | `400` (Regular), `500` (Medium), `700` (Bold) |
| **JetBrains Mono** | Code Snippets, Eyebrows (`.eyebrow`), Level Badges, Metadata Tags | `600` (SemiBold), `700` (Bold) |

### Font Hierarchy
- **Main Heading (`h1`)**: `30px / 800 Sora`, Color: `var(--text-heading)`
- **Section/Card Title (`h2`)**: `20px / 800 Sora`, Color: `var(--text-heading)`
- **Eyebrow Label (`.eyebrow`)**: `11px / 700 JetBrains Mono`, Letter spacing: `1.5px`, Upper case, Color: `var(--gold-rich)`
- **Body Text**: `13px–14px / 400 DM Sans`, Line height: `1.5`–`1.6`, Color: `var(--text-body)`

---

## 🧩 4. Key Component Designs

### A. Mascot FAB Button (`.fab-chat`)
- **Container**: `82px × 82px` fixed circular button at bottom right (`bottom: 24px; right: 24px;`).
- **Pop-out Mascot Image**: `106px × 106px` png (`/macot_chatbot_icon.png`), anchored at bottom center, overflowing top of circle (`overflow: visible`).
- **Hover Interaction**:
  - Mascot executes `@keyframes mascot-wave` (lifted `translateY(-16px) scale(1.22)` with alternating rotation `-12deg` to `10deg`).
  - Speech bubble pops out above reading **"Tanya Aku! 💬"**.
  - Circular container radiates warm orange glow: `box-shadow: 0 16px 40px rgba(255, 122, 0, 0.6), 0 0 35px rgba(255, 122, 0, 0.45)`.

### B. 2-Column Stat Cards (`.stat-card`)
Each stat card (Modul Completed, Quiz Completed, Streak) is structured as a **split 2-column flexbox**:
- **Left Column**:
  - Monospace Eyebrow (e.g., `MODUL COMPLETED`)
  - Large Metric Number (`24px / 800 Sora`)
  - Sub-percentage / status text (`33% Selesai`)
- **Right Column**:
  - `54px × 54px` rounded badge (`borderRadius: 16px`) with 28px Lucide icon (`BookOpen`, `Trophy`, `Flame`).

### C. Dashboard Layout Grid (`.homepage-grid`)
- **Grid Layout**: 50/50 2-column split (`grid-template-columns: 1fr 1fr; gap: 24px;`).
- **Height Constraint**: `calc(100vh - 105px)` with `overflow: hidden` on main container to prevent overall window scrolling.
- **Roadmap Column (`.roadmap-scroll-card`)**: Fixed vertical layout with `overflow-y: auto` list container for smooth roadmap exploration.

---

## 🛠️ 5. File Locations & Maintenance

- **Design System CSS**: `frontend/src/index.css`
- **Dashboard Layout**: `frontend/src/pages/HomePage.tsx`
- **Mascot FAB Component**: `frontend/src/App.tsx`
- **Static Assets**: `frontend/public/macot_chatbot_icon.png`, `frontend/public/logo.png`
