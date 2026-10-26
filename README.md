# OWOC — Omnikon Winter of Code

[![Production Deployment](https://img.shields.io/badge/Deployment-Vercel-black?style=flat&logo=vercel)](https://event-nine-swart.vercel.app/)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Omnikon Winter of Code (OWOC)** is an open-source mentorship and developer sprint program running throughout **December 2026**. OWOC connects aspiring student engineers with production-grade open-source repositories, vetted maintainers, and experienced mentors. Contributors resolve real-world issues, climb the live podium leaderboard, earn streak bonuses, and receive official digital certificates.

Live Deployment: **[https://event-nine-swart.vercel.app/](https://event-nine-swart.vercel.app/)**

---

## ⚡ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with signature dark cyber crimson aesthetic (`#050505` background, red glows, glassmorphism)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visuals & Charts**: Custom HTML5 Canvas (Ember & Blizzard particle effects), [Recharts](https://recharts.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with persona role-switching (Contributor, Maintainer, Mentor, Campus Ambassador, Super Admin)
- **Database (Optional / Production)**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security schema included in `supabase/schema.sql`)

---

## 🚀 Quickstart & Setup

### 1. Clone the repository
```bash
git clone https://github.com/namanlunia/Event.git
cd Event
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy the example environment configuration:
```bash
cp .env.example .env.local
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

All supported environment configuration flags are documented in `.env.example`:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_DEMO_MODE` | Controls whether sample preview data is displayed with transparent disclaimer banners (`true`) or strictly verified live records (`false`). | `true` |
| `NEXT_PUBLIC_ORG_NAME` | Organization name displayed in header, footer, and certificates. | `"Omnikon"` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | General support and inquiries email address. | `"contact@omnikonhub.com"` |
| `NEXT_PUBLIC_CONDUCT_EMAIL` | Code of conduct reporting contact email. | `"contact@omnikonhub.com"` |
| `NEXT_PUBLIC_GITHUB_URL` | Organization GitHub profile URL (renders icon if provided). | `""` |
| `NEXT_PUBLIC_TWITTER_URL` | Official X / Twitter profile URL. | `""` |
| `NEXT_PUBLIC_LINKEDIN_URL` | Official LinkedIn page URL. | `""` |
| `NEXT_PUBLIC_DISCORD_URL` | Community Discord invite URL. | `""` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL (optional for mockup, required for live DB). | `""` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anonymous API key. | `""` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase administrative service role secret key. | `""` |
| `GITHUB_CLIENT_ID` | GitHub OAuth application client ID for contributor auth. | `""` |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth application secret. | `""` |
| `GITHUB_WEBHOOK_SECRET` | Secret token to authenticate GitHub webhook payloads. | `""` |

---

## 🛡️ Demonstration Mode (`DEMO_MODE`)

OWOC 2026 is an inaugural program. To maintain transparency:
- **`DEMO_MODE=true` (Default)**: Renders sample data across projects, PR timelines, and leaderboards clearly labeled with amber disclaimers and `Sample` badges.
- **`DEMO_MODE=false`**: Turns off sample mockups and displays real database records with clean, honest empty states (e.g. *"Standings go live when active coding begins on Dec 4, 2026"*).

---

## 🗓️ December 2026 Schedule & Single Source of Truth

All dates, durations, and phase calculations derive strictly from [`src/lib/season.ts`](src/lib/season.ts):
1. **Registration & Project Onboarding**: Oct 28 – Nov 30, 2026
2. **Community Bonding & AMA Sprints**: Dec 1 – Dec 3, 2026
3. **Coding Period & Weekly Sprints**: Dec 4 – Dec 26, 2026 (23-day active sprint)
4. **Code Freeze & Evaluation**: Dec 27 – Dec 30, 2026
5. **Grand Results & Certificate Issuance**: Dec 31, 2026

---

## 📦 Scripts

- `npm run dev`: Starts local development server on port 3000
- `npm run build`: Validates TypeScript types and creates optimized production bundle
- `npm run start`: Starts production server
- `npm run lint`: Runs ESLint checks
