# Flowora AI — Ideas Flow. Content Connects.

> **Production-grade AI Content Creation & Marketing SaaS**

Flowora AI is an enterprise-ready, full-stack SaaS platform designed to help digital creators, marketers, and agencies produce high-converting, personalized, natural content across social media, video platforms, and marketing campaigns.

---

## 🌟 Key Features

### 1. Instagram & Reels Studio
- **15s, 30s, 45s, and 60s Reel Scripts**: Formatted with visual action notes, spoken script, on-screen text, caption, and hashtags.
- **10 Viral Scroll-Stopping Hooks**: Built with curiosity gap, contrarian truth, and FOMO psychological triggers.
- **8-Slide High-Save Carousels**: Slide-by-slide copy with companion caption.
- **Categorized Hashtag Suggestions**: Niche, category, and broad hashtags.

### 2. YouTube Studio
- **YouTube Shorts Scripts**: 60-second fast-paced scripts with visual cues and loop strategies.
- **Long-form Video Blueprints**: Chapter breakdowns, timestamp guides, retention hooks, and engagement questions.
- **High-CTR Video Titles**: 10 title options grouped by curiosity, listicle, and contrarian formats.
- **SEO Descriptions & Search Tags**: Comprehensive metadata to optimize search reach.

### 3. Marketing Copy Studio
- **Ad Copy Frameworks**: High-converting variations using AIDA (Attention, Interest, Desire, Action) and PAS (Problem, Agitation, Solution) models.
- **SEO Blog Drafts**: Long-form structured drafts with H2/H3 headings, meta descriptions, and FAQ schema ready questions.
- **WhatsApp Promotional Broadcasts**: High-conversion formatting with bolding and direct CTA.
- **LinkedIn Thought Leadership**: Punchy whitespace formatting and engagement closing questions.
- **Email Campaigns**: Subject line variations, preview text, body, and high-converting P.S. lines.
- **Content Repurposer**: Multiplies 1 core concept into 4 distinct distribution formats.

### 4. Brand Brain™ Personalization
- Multi-brand profile storage with business descriptions, industry, customer pain points, preferred tone, guidelines, and reference voice examples.
- **Banned Words & Phrases**: Enforces negative restrictions to filter out corporate filler slop.
- Complete user-to-user context isolation.

### 5. Multilingual Native Engine
- **English**: Fluent, persuasive international copywriting.
- **Tamil (தமிழ்)**: Culturally fluent, natural contemporary Tamil script.
- **Tanglish**: Viral conversational Tamil written in the Latin alphabet (e.g., *"Indha trick kandippa try pannunga"*).

### 6. Server-Authoritative Credit System
- **Atomic Deductions**: Transactions verified on the server before AI execution.
- **Duplicate-Charge Prevention**: Idempotency keys protect concurrent submissions.
- **Automatic Failure Refunds**: If an AI request fails or times out, reserved credits are immediately credited back to the user's ledger.
- **Audit Ledger**: Complete transparent transaction log with timestamps.

### 7. Administrator Console
- Platform-wide telemetry (Total users, generations, success rate, credits consumed, estimated model cost).
- User management table with manual credit adjustment tool requiring mandatory audit notes.
- Detailed generation logs and failure reports.
- Default administrator: `selvarajkasthuri15081984@gmail.com`.

---

## 🏗️ Technical Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React icons, Canvas Confetti.
- **Backend API**: Express router mounted seamlessly inside Vite dev server and standalone production server.
- **AI Engine**: Google GenAI SDK (`@google/genai`) using `gemini-3.8-flash` with system instructions and server-side secret handling.
- **Persistent Database**: Server-side JSON store (`data/flowora_db.json`) with atomic file writes, version histories, and relations for users, brands, content, and transactions.
- **Authentication**: Salted `scrypt` cryptographic password hashing, Bearer session tokens, and Google OAuth payload verification.

---

## 🚀 Quick Start

### 1. Development Mode
```bash
npm install
npm run dev
```
The dev server starts on `http://localhost:3000` with the API routes active.

### 2. Production Build
```bash
npm run build
npm start
```

---

## 🔒 Security & Privacy

- All API keys (`GEMINI_API_KEY`) remain strictly on the backend. No secret credentials are ever sent to client browsers.
- User data can be exported in full JSON format (GDPR/CCPA compliant).
- Passwords are encrypted with random salts and timing-safe comparisons.
