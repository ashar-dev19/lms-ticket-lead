# LMS Ticket System — Project Bible

## What This Is
A support ticket system for an AI-based LMS startup. Students enroll and interact with AI tutors. This system lets students submit support tickets and admins respond — with AI assistance built into both sides.

## Tech Stack
| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Database | PostgreSQL via Neon.tech |
| ORM | Prisma |
| Auth | NextAuth.js v5 (credentials provider) |
| UI | Tailwind CSS + shadcn/ui |
| AI | Google Gemini 2.0 Flash (free tier) |
| Deployment | Vercel (app) + Neon (db) |

## Design System
- **Primary:** `#7F56D8` (purple)
- **Background:** `#F9F9FB`
- **Text Primary:** `#2E2C34`
- **Text Secondary:** `#84818A`
- **Surface:** `#FFFFFF`
- **Font:** Montserrat — Regular (400), Medium (500), SemiBold (600)
- **Figma file key:** `q9Oc71tZvRJoFnvPQd0TiY`

## Roles & Permissions
- `ADMIN` — one per system. Sees all tickets, can reply, change status, manage users.
- `USER` (student) — can create tickets, view own tickets, read replies.

## Domain Model
```
User → many Tickets → many Replies
```

## Ticket Fields
- `type`: TECHNICAL_ISSUE | CONTENT_QUESTION | AI_TUTOR_ISSUE | ACCOUNT_ISSUE | OTHER
- `status`: NEW | ON_GOING | PENDING | RESOLVED
- `priority`: LOW | MEDIUM | HIGH

## AI Features
| Feature | Who | Where | Prompt Goal |
|---|---|---|---|
| Polish It | User | New Ticket form | Reformat raw student input into structured ticket |
| Polish Response | Admin | Reply form | Make admin reply professional and empathetic |
| Summarize Thread | Admin | Ticket detail | Bullet-point summary of full conversation |

## Folder Structure
```
lms-ticket-system/
├── CLAUDE.md                  ← you are here
├── .env.example               ← all required env vars
├── .env.local                 ← actual secrets (gitignored)
├── prisma/
│   ├── schema.prisma          ← single source of truth for DB
│   └── seed.ts                ← demo admin + 3 students + sample tickets
├── app/
│   ├── globals.css
│   ├── layout.tsx             ← root layout, Montserrat font
│   ├── page.tsx               ← redirects to /login
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx         ← sidebar + topbar shell
│   │   ├── admin/
│   │   │   ├── page.tsx       ← admin dashboard
│   │   │   ├── tickets/page.tsx
│   │   │   ├── tickets/[id]/page.tsx
│   │   │   └── users/page.tsx
│   │   └── user/
│   │       ├── page.tsx       ← student dashboard
│   │       ├── tickets/page.tsx
│   │       ├── tickets/[id]/page.tsx
│   │       └── new-ticket/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── tickets/
│       │   ├── route.ts       ← GET list, POST create
│       │   └── [id]/route.ts  ← GET one, PATCH update, DELETE
│       ├── replies/route.ts   ← POST reply
│       └── ai/
│           ├── polish-ticket/route.ts
│           ├── polish-response/route.ts
│           └── summarize-thread/route.ts
├── components/
│   ├── ui/                    ← shadcn primitives (do not edit directly)
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── TopBar.tsx
│   ├── tickets/
│   │   ├── TicketCard.tsx
│   │   ├── TicketFilters.tsx
│   │   ├── TicketForm.tsx
│   │   └── ReplyForm.tsx
│   └── ai/
│       ├── PolishButton.tsx   ← reusable AI polish trigger
│       └── SummarizeButton.tsx
└── lib/
    ├── db.ts                  ← Prisma client singleton
    ├── auth.ts                ← NextAuth config
    ├── ai.ts                  ← Gemini client + prompt functions
    └── utils.ts               ← cn(), formatDate(), ticket helpers

```

## Conventions
- All server components by default. Add `"use client"` only when needed (interactivity, hooks).
- API routes always return `{ data }` on success and `{ error }` on failure with correct HTTP status.
- Prisma is always accessed via `lib/db.ts` singleton — never instantiate directly.
- All AI calls go through `lib/ai.ts` — never call Gemini SDK directly from components.
- Tailwind only — no inline styles, no CSS modules (except globals.css for font import).
- shadcn/ui components live in `components/ui/` — use them as-is, extend via wrapper components.

## Environment Variables
See `.env.example` for all required vars. Key ones:
- `DATABASE_URL` — Neon PostgreSQL connection string
- `NEXTAUTH_SECRET` — random 32-char string
- `NEXTAUTH_URL` — `http://localhost:3000` in dev
- `GEMINI_API_KEY` — Google AI Studio free key

## Running Locally
```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

## Demo Credentials (after seed)
- **Admin:** admin@lms.com / admin123
- **Student 1:** alice@student.com / student123
- **Student 2:** bob@student.com / student123

## Deployment
1. Push to GitHub
2. Import to Vercel → set all env vars
3. Neon DB → copy connection string → paste as `DATABASE_URL`
4. Vercel will auto-run `prisma generate` on build
