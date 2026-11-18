# MOMENT — AI-Powered Real-World Social Companion

> **"Don't find people. Find your moment."**

MOMENT is an AI-powered social companion for physical events (college fests, hackathons, concerts, MUNs, tech conferences). Instead of static profiles, swipe mechanics, or awkward endless messaging, MOMENT combines:

$$\text{Intent} + \text{Interests} + \text{Time} + \text{Social Energy} + \text{Event Context} + \text{Zone Proximity} \longrightarrow \text{Moment Experience}$$

---

## 🏗️ Architecture & Monorepo Structure

```text
moment/
├── apps/
│   ├── web/               # React 18, Vite, Tailwind CSS, Framer Motion, Lucide React
│   └── mobile/            # React Native, Expo 51, Expo Router, Reanimated, EAS ready
├── backend/               # Node.js, Express, TypeScript, Gemini Modular AI Services
├── packages/
│   ├── types/             # Shared TypeScript models and contracts
│   └── shared/            # Matching chemistry algorithms, demo data, color tokens
├── supabase/
│   ├── migrations/        # PostgreSQL schema with 21+ tables, indexes, and RLS
│   └── seed/              # Seed data for TechFest 2026, zones, and demo users
├── .env.example
└── README.md
```

---

## 🎨 Visual Aesthetics & Palette

Adheres strictly to human, warm, premium Gen-Z social event aesthetics (no generic neon cyan or sci-fi cyber clichés):

- **Primary Canvas Background**: `#F7F3EA` (Warm cream)
- **Deep Charcoal**: `#202020`
- **Terracotta Accent**: `#C66A45`
- **Muted Olive Accent**: `#7B8062`
- **Soft Surface**: `#EFE8DC`
- **Dark Mode**: `#151515`
- **Typography**: Plus Jakarta Sans & Inter

---

## 🚀 Core Product Loop (Demonstrated End-to-End)

1. **Check-In**: Physical presence gate verification (QR Scanner simulation or 1-click Demo Check-in).
2. **Intent Onboarding**: 4-question interactive card flow:
   - *Q1*: What do you feel like doing? (*Explore, Photo Walk, Food, Games, Team...*)
   - *Q2*: How much time do you have? (*15m, 30m, 45m, 1h, 2h+*)
   - *Q3*: Social energy? (*Very Social, Comfortable, Small Groups, Low-Key*)
   - *Q4*: Passions? (*Photography, Music, Gaming, Coding, Startups...*)
3. **Moment Radar**: Signature Social Compass with floating attendee avatars, distance-free approximate zone proximity labels, and Serendipity Mode (*"Surprise Me"*).
4. **Person Details & Privacy Gradient**: Progressive identity reveal, Compatibility score (*"84% Moment Chemistry"*), and *"Why you match"* bullet points.
5. **Mutual Wave**: Two-way opt-in handshake (`Wave sent 👋` $\rightarrow$ `Wave back` $\rightarrow$ `YOU FOUND EACH OTHER!`).
6. **AI Group Formation**: Formats 4-person micro-squads (*Rahul, Priya, Ananya, You*) with 91% group chemistry.
7. **AI Moment Engine & Active Moment**:
   - Live countdown timer
   - Route stops: Photography Zone $\rightarrow$ Food Court $\rightarrow$ Main Stage
   - Group Challenge: *"College Life Without Faces"* (+250 XP)
   - Dynamic Replanning: Crowd shift detection & route auto-repair
   - Conversation Rescue: Non-awkward discussion prompts
8. **Moment Memory Keepsake**: AI synthesized recap, photo memories, with **"KEEP SQUAD"** retention or clean expiration.
9. **Organizer Dashboard**: Live velocity metrics (4,821 check-ins, active zones, peak times, sponsor challenge orchestrator).

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Backend & Web
```bash
# Terminal 1: Backend (Port 4000)
npm run dev:backend

# Terminal 2: Web (Port 5173)
npm run dev:web
```

### 3. Native Mobile (Expo)
```bash
npm run dev:mobile
```

### 4. Build Android APK
Configured with `eas.json` (preview profile):
```bash
cd apps/mobile
eas build -p android --profile preview
```
