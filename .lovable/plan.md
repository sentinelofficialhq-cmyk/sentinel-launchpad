# Sentinel Waitlist Landing Page

A premium, dark-mode landing page to collect email + (optional) phone for Sentinel's release-day waitlist, using the uploaded app screenshots as ambient background depth.

## Design system

Update the global theme to Sentinel's palette (HSL tokens in `index.css` + Tailwind):

- `--background`: deep navy/black (`222 47% 4%`)
- `--surface` / cards: elevated navy with subtle border (`224 40% 9%`)
- `--accent` (electric green): `145 90% 52%` — used for CTAs, highlights, glow
- `--accent-glow`: soft green radial used behind hero
- `--foreground`: near-white; `--muted-foreground`: cool light gray
- Custom utilities: `.glass-card` (backdrop-blur + translucent border), `.glow-green`, premium gradient buttons
- Font: Inter (already standard), tight tracking on headline, generous line-height on body
- Radius bumped to `1rem` for iOS-style cards

## Page structure

```text
┌─────────────────────────────────────────────────┐
│ NAV  Sentinel logo          (no links, minimal) │
├─────────────────────────────────────────────────┤
│  HERO                                           │
│   ▓ floating preview cards (blurred, angled) ▓  │
│   ▓                                          ▓  │
│       "Smarter Sports Insights.                 │
│        Built for Release Day."                  │
│       subheadline                               │
│       ┌──────── Waitlist Form ────────┐         │
│       │ email • phone • sms • submit  │         │
│       └───────────────────────────────┘         │
│       trust microcopy                           │
├─────────────────────────────────────────────────┤
│  FEATURES (3 glass cards)                       │
│   Daily AI Picks │ Live Insights │ Predictive   │
├─────────────────────────────────────────────────┤
│  FINAL CTA                                      │
│   "Get notified when Sentinel launches."        │
│   compact form repeat                           │
├─────────────────────────────────────────────────┤
│  FOOTER  © Sentinel • privacy microcopy         │
└─────────────────────────────────────────────────┘
```

### 1. Hero
- Headline + subheadline, centered on mobile, left-aligned on large desktop with floating cards on the right.
- **Background screenshots**: 5–6 of the uploaded Sentinel screenshots (`Analyze`, `Games`, `Picks_Tab`, `Profit`, `Today_s_Edge`, `In-depth-analysis`) absolutely positioned around the hero with `rotate`, `scale`, `blur-sm`, and a dark overlay gradient on top. They sit behind the form so text stays sharp.
- A soft radial green glow behind the headline.
- Sentinel lock icon as the brand mark in the nav (using the uploaded `sentinel-lock` image).

### 2. Features
- Three iOS-style glass cards in a grid (stacked on mobile):
  - **Daily AI Picks** — "High-confidence picks delivered every morning."
  - **Live Game Insights** — "Real-time edges as games unfold."
  - **Predictive Analysis** — "Models trained on millions of data points."
- Each card has a small green-tinted icon tile (lucide-react), thin border, hover lift.

### 3. Final CTA
- Centered, narrower container, same form component reused.
- Subtle green divider glow above.

## Waitlist form

Built as a single reusable `<WaitlistForm variant="hero" | "compact" />` component:

- **Fields**: email (required), phone (optional, formatted), SMS consent checkbox (disabled until phone has value), submit button.
- **Validation**: zod schema (`email().max(255)`, optional phone via simple regex, sms boolean) + react-hook-form. Inline error messages in red below each field.
- **States**: idle → loading (spinner in button, disabled) → success (replaces form with check-mark card: "You're on the list. Sentinel launch updates are coming.") → error (toast).
- **Consent text**: full legal blurb shown in muted small text below the checkbox.
- **Trust line** under submit: "No spam. Launch updates only. Unsubscribe anytime."
- **Submission handler**: isolated `submitWaitlist(payload)` function in `src/lib/waitlist.ts` that currently resolves after a short delay and logs the payload. A clear `// TODO: wire to Supabase / API` comment marks the integration point so it can be swapped for a Supabase insert or fetch call later without touching the UI.

## Responsive behavior

- Mobile-first, single column, form takes full width, large 48px-tall inputs/buttons for thumb reach.
- On mobile, only 2 background preview cards remain (top-right + bottom-left), heavier blur, lower opacity — readability first.
- Desktop ≥ `lg`: cinematic spacing (min-h-screen hero), 5–6 floating cards visible, two-column hero on `xl`.
- Reduced-motion respected; hover states only on pointer devices.

## Files to add / change

- `src/index.css` — replace color tokens with Sentinel palette, add glow + glass utilities.
- `tailwind.config.ts` — extend with accent + glow colors, custom box-shadows, keyframes for subtle float animation on background cards.
- `src/pages/Index.tsx` — compose the sections.
- `src/components/sentinel/Nav.tsx`
- `src/components/sentinel/Hero.tsx`
- `src/components/sentinel/FloatingPreviews.tsx` — handles the screenshot collage with prop-driven image list (easy to swap).
- `src/components/sentinel/Features.tsx`
- `src/components/sentinel/FinalCta.tsx`
- `src/components/sentinel/Footer.tsx`
- `src/components/sentinel/WaitlistForm.tsx` — reusable, both variants.
- `src/lib/waitlist.ts` — submission stub + types.
- `src/assets/sentinel/*` — copy uploaded screenshots + lock icon here and import as ES modules.
- `index.html` — update `<title>` and meta description for Sentinel.

## Out of scope (for this pass)
- Real backend / Supabase wiring (stub left ready).
- Auth, dashboard, or any post-signup flow.
- Analytics / pixels.
