# Sentinel

AI-powered sports analysis - daily picks, predictive insights, live games, and smarter betting decisions.

This repository contains the Sentinel waitlist landing page.

## Stack

- React 18 + Vite 5
- TypeScript 5
- Tailwind CSS v3
- shadcn/ui
- React Hook Form + Zod

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:8080`.

## Build

```bash
npm run build
```

## Project structure

- `src/pages/` - top-level routes
- `src/components/sentinel/` - landing page sections (Hero, Features, FinalCta, Footer, Nav, FloatingPreviews, WaitlistForm)
- `src/lib/waitlist.ts` - waitlist submission client
- `src/lib/utm.ts` - UTM capture and localStorage persistence helper
- `src/assets/sentinel/` - app screenshots used in the hero collage
- `supabase/functions/submit-waitlist/` - Supabase Edge Function for waitlist submissions
- `supabase/migrations/` - SQL migrations for Supabase schema changes

## Waitlist integration

The landing page posts waitlist signups to the `submit-waitlist` Supabase Edge Function using:

```env
VITE_SUPABASE_FUNCTION_URL=https://YOUR_PROJECT_REF.supabase.co/functions/v1/submit-waitlist
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The Edge Function reads its secrets from the function environment only:

```env
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Supabase deploy steps

1. Link the local repo to your Supabase project:

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

2. Push the SQL migration:

```bash
supabase db push
```

3. Set the Edge Function secrets:

```bash
supabase secrets set SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

4. Deploy the function:

```bash
supabase functions deploy submit-waitlist
```
