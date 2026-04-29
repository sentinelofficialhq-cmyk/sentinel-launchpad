# Sentinel

AI-powered sports analysis — daily picks, predictive insights, live games, and smarter betting decisions.

This repository contains the Sentinel waitlist landing page.

## Stack

- React 18 + Vite 5
- TypeScript 5
- Tailwind CSS v3
- shadcn/ui
- React Hook Form + Zod

## Getting started

```bash
bun install
bun run dev
```

The dev server runs at `http://localhost:8080`.

## Build

```bash
bun run build
```

## Project structure

- `src/pages/` — top-level routes
- `src/components/sentinel/` — landing page sections (Hero, Features, FinalCta, Footer, Nav, FloatingPreviews, WaitlistForm)
- `src/lib/waitlist.ts` — waitlist submission stub; wire to your backend / database here
- `src/assets/sentinel/` — app screenshots used in the hero collage

## Waitlist integration

`submitWaitlist(payload)` in `src/lib/waitlist.ts` is the single integration point. Replace its body with a `fetch` call or database insert to connect the form to your backend.
