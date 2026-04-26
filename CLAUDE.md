# Inner Child Web — Repo Instructions

This file is read by Claude at the start of every session.  Follow these rules exactly.

## What This Repo Is

Next.js 15 web MVP for Inner Child.  Onboarding flow + home dashboard.  Backend is a separate repo (FastAPI, not yet created).  The parent monorepo at `../../` has all specs, wireframes, and architecture docs.

## Code Style

- **TypeScript strict mode.**  No `any` types.  No `@ts-ignore`.  If the types are wrong, fix the types.
- **Tailwind CSS only.**  No inline styles, no CSS modules, no styled-components.  Use the `ic-` prefixed design tokens from `globals.css`.
- **Functional components only.**  No class components.  Use hooks for state and effects.
- **Named exports for utilities, default exports for components and pages.**
- **Two spaces after periods in comments and copy** — project convention.

## Component Patterns

### New Screen Components

Every screen component in the onboarding flow follows this structure:

```tsx
"use client";

import { useOnboardingStore } from "@/store/onboarding";
import ProgressDots from "./ProgressDots";

export default function NewScreen() {
  const { answers, nextStep, prevStep } = useOnboardingStore();

  return (
    <div className="flex flex-col h-full">
      <ProgressDots total={4} current={N} />
      <h2 className="text-xl font-bold text-center mb-1.5">Title</h2>
      <p className="text-sm text-ic-text-light text-center mb-6">Subtitle</p>

      {/* Screen content */}

      <div className="flex-1" />
      <button onClick={nextStep} className="w-full bg-ic-primary text-white rounded-[14px] py-4 px-6 text-base font-semibold">
        Continue
      </button>
      <button onClick={prevStep} className="w-full text-ic-text-light text-sm py-3">
        Back
      </button>
    </div>
  );
}
```

### New Feature Pages

Feature pages go in `src/app/{feature}/page.tsx`.  They should check `completed` from the onboarding store and redirect to `/onboarding` if false.  See `src/app/home/page.tsx` for the pattern.

### Adding New Features to the Dashboard

Add a `FeatureCard` entry to the `FEATURES` array in `src/lib/types.ts`.  Set `available: false` until the feature page is built, then flip to `true`.  Map the feature to relevant `OnboardingGoal` tags so it sorts correctly on the dashboard.

## State Management Rules

- All shared state goes in Zustand stores under `src/store/`.
- Local-only UI state (dropdowns, hover, focus) stays in `useState`.
- The persist middleware uses `sessionStorage`.  Only persist data the user entered — never persist loading states, errors, or animation flags.
- When adding a new store, use the same `persist` + `partialize` pattern from `onboarding.ts`.

## API Integration

- All API calls go in `src/lib/api.ts`.
- Each function must have a comment showing the real endpoint: `// REAL: POST /api/v1/endpoint`
- Use `async/await` with proper error handling.
- API stubs must simulate realistic latency with `delay()`.
- When the backend is ready, swap stubs for real `fetch` calls — the function signatures should stay the same.

## Security — Pre-Commit Checklist

**Run this mental checklist before every commit:**

1. No API keys, tokens, or secrets in code — use `IC_` prefixed env vars
2. No email addresses, phone numbers, or real names — use placeholders
3. No `.env` files staged — only `.env.example`
4. Scan for patterns: `sk-`, `sk_`, `ghp_`, `AKIA`, `AIza`, `eyJ`
5. Run `git diff --staged` and review

See the parent repo's `CLAUDE.md` for the full security policy.

## Testing Conventions

- Test files live next to the code they test: `ComponentName.test.tsx`
- Store tests go in `src/store/__tests__/`
- Use React Testing Library for component tests — test behavior, not implementation
- Name tests descriptively: `it("disables Continue when name is empty")`
- Run `npm test` before committing

## Design Tokens

Never use raw hex colors.  Always use Tailwind classes with the `ic-` prefix:

- `bg-ic-bg`, `bg-ic-card`, `bg-ic-warm-glow`
- `text-ic-text`, `text-ic-text-light`, `text-ic-primary`
- `border-ic-border`, `border-ic-primary-light`
- `bg-ic-primary` for buttons, `bg-ic-accent` for warmth

If you need a new color, add it to `@theme` in `globals.css` with the `ic-` prefix and document it here.

## Therapeutic Safety

All user-facing copy must be:
- Warm, never clinical ("How old is your inner child?" not "Select target age")
- Invitational, never pushy ("Not right now" not "Cancel")
- Emotionally safe — always provide an exit, never trap users in emotional experiences
- Reviewed for appropriateness before shipping

See the wireframe annotations for tone examples.
