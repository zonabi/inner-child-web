# Inner Child — Web App

A gentle, private space to reconnect with the kid you used to be — through art, conversation, and reflection.

This is the web MVP for [Inner Child](../../docs/PROJECT_KICKOFF.md), built with Next.js 15, React 19, Tailwind CSS, and Zustand.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm test` | Run tests |
| `npm run typecheck` | TypeScript type checking |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Entry — redirects to /onboarding or /home
│   ├── onboarding/         # Onboarding flow
│   └── home/               # Home dashboard
├── components/
│   └── onboarding/         # Onboarding screen components
│       ├── OnboardingFlow.tsx    # Flow orchestrator (step routing, transitions)
│       ├── WelcomeScreen.tsx     # Screen 1: Welcome
│       ├── AboutYouScreen.tsx    # Screen 2: Name, nickname, birth year, gender
│       ├── ChildhoodScreen.tsx   # Screen 3: Country, childhood word, nostalgia preview
│       ├── GoalsScreen.tsx       # Screen 4: Goal selection (multi-select)
│       ├── ReadyScreen.tsx       # Screen 5: Comfort level + submit
│       └── ProgressDots.tsx      # Step indicator
├── store/
│   └── onboarding.ts       # Zustand store (persisted to sessionStorage)
└── lib/
    ├── types.ts             # TypeScript types, goal options, feature definitions
    ├── api.ts               # API stubs (swap for real FastAPI calls)
    └── useHydrated.ts       # SSR hydration guard hook
```

## Architecture

### Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19 + Tailwind CSS 4
- **State:** Zustand with sessionStorage persistence
- **Language:** TypeScript (strict mode)
- **Linting:** ESLint + Prettier
- **Testing:** Jest + React Testing Library

### Design Tokens

All colors and typography match the wireframes in `design/ux/`. The tokens are defined in `globals.css` under `@theme` and are available as Tailwind classes with the `ic-` prefix:

| Token | Value | Tailwind Class |
|-------|-------|----------------|
| Background | `#FAF7F2` | `bg-ic-bg` |
| Card | `#FFFFFF` | `bg-ic-card` |
| Primary | `#8B6AAE` | `text-ic-primary` |
| Primary Light | `#C4ABD9` | `bg-ic-primary-light` |
| Accent | `#E8A87C` | `text-ic-accent` |
| Text | `#3D3D3D` | `text-ic-text` |
| Text Light | `#8A8A8A` | `text-ic-text-light` |
| Border | `#E8E2DA` | `border-ic-border` |
| Safe Green | `#7CB89E` | `text-ic-safe-green` |
| Warm Glow | `#FFF5EB` | `bg-ic-warm-glow` |

### State Management

The onboarding store (`src/store/onboarding.ts`) uses Zustand with the `persist` middleware. State is saved to `sessionStorage` so refreshing preserves progress, but closing the tab clears it.

Only meaningful state is persisted (step, answers, profile, completed). Transient state like `submitting`, `error`, and `direction` are excluded.

### API Stubs

All backend calls live in `src/lib/api.ts` as mock functions that simulate network latency. Each function has a comment showing the real endpoint it maps to:

- `submitOnboarding()` → `POST /api/v1/onboarding`
- `getNostalgiaPreview()` → `GET /api/v1/nostalgia/preview`
- `getDecadeLabel()` → client-side utility

When the FastAPI backend is ready, swap these for real `fetch` calls.

## Related Repos

| Repo | Description | Status |
|------|-------------|--------|
| `inner-child-web` | This repo — web MVP | Active |
| `inner-child-server` | FastAPI backend + ML services | Planned |
| `inner-child` | Monorepo with docs, specs, wireframes, and architecture | Active |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

See `.env.example` for all available variables. All Inner Child env vars are prefixed with `IC_`.

## Design Resources

- [Onboarding wireframes](../../design/ux/wireframes-onboarding.html) — 5-screen flow
- [Portrait generator wireframes](../../design/ux/wireframes-portrait-generator.html) — 6-screen flow
- [Memory Canvas prototype](../../design/ux/memory-canvas-prototype.html) — Interactive prototype
- [Project kickoff](../../docs/PROJECT_KICKOFF.md) — Vision, features, market research
