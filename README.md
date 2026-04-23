# HullBook

**The logbook for your boat's real cost of ownership.**

A multilingual, multi-currency B2C SaaS that tracks every dollar, every engine hour,
and every service for boat owners worldwide.

- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind · Supabase · Resend · Vercel
- **Languages:** English, Spanish, German, French, Dutch, Italian
- **Currencies:** USD, EUR, GBP, CAD, AUD, CHF, NOK, SEK, DKK, NZD

---

## 1. Quick start (local development)

```bash
# Install dependencies
npm install

# Copy env template
cp .env.example .env.local

# Fill in your Supabase + Resend keys in .env.local, then:
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the middleware will redirect
you to `/en`, `/es`, `/de`, etc. depending on your browser's Accept-Language header.

## 2. Supabase setup

1. Create a new project at [supabase.com](https://supabase.com).
2. Copy the project URL and the `anon` + `service_role` keys into `.env.local`.
3. Apply the schema — either via the SQL editor (paste `supabase/migrations/0001_initial_schema.sql`)
   or via the Supabase CLI:
   ```bash
   npx supabase link --project-ref <your-ref>
   npx supabase db push
   ```
4. In **Authentication → URL Configuration**, add to the allowed redirect URLs:
   - `http://localhost:3000/en/auth/callback` (and one per locale)
   - `https://hullbook.com/en/auth/callback` (production, same)

## 3. Resend setup (for emails)

1. Create an account at [resend.com](https://resend.com).
2. Add and verify the `hullbook.com` domain.
3. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in `.env.local`.

## 4. Deploy to Vercel

```bash
vercel --prod
```

In Vercel's dashboard, add the same environment variables as in `.env.local`.
Make sure `NEXT_PUBLIC_SITE_URL` is set to `https://hullbook.com`.

## 5. Adding a new language

1. Add its code to `LOCALES` in `lib/i18n/config.ts`.
2. Add its metadata to `LOCALE_META`.
3. Create `lib/i18n/locales/<code>.ts` — copy `en.ts` and translate every key.
4. Done. The middleware, routing, and switcher all pick it up automatically.

## 6. Project structure

```
app/
├── layout.tsx                Root layout (fonts, global CSS)
├── globals.css               Tailwind base + grain texture
├── [locale]/
│   ├── layout.tsx            Localized metadata, hreflang
│   ├── (marketing)/          Public-facing marketing site
│   │   └── page.tsx          Full landing page (hero, demo, pricing, etc.)
│   ├── (auth)/               Login, signup, magic-link callback
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── callback/route.ts
│   └── (app)/                Authenticated dashboard
│       ├── layout.tsx        Checks auth, provides sidebar
│       ├── dashboard/page.tsx
│       ├── boats/            List, new, detail for boats
│       ├── entries/          List and new for expense/trip/service entries
│       └── settings/page.tsx
└── api/
    └── waitlist/route.ts     Zod-validated waitlist signup endpoint

components/
├── marketing/                WaitlistForm, LanguageSwitcher, LogoMark
├── auth/                     LoginForm, SignupForm
└── app/                      DashboardSidebar, BoatForm, EntryForm, SettingsForm

lib/
├── i18n/
│   ├── config.ts             Locale list, browser detection
│   ├── index.ts              getDictionary + type-safe t()
│   └── locales/              en, es, de, fr, nl, it
├── currency/
│   └── index.ts              10 currencies, Intl formatting, region detection
└── supabase/
    ├── client.ts             Browser client (SSR-safe)
    ├── server.ts             Server + admin clients
    └── types.ts              Database types

supabase/
└── migrations/
    └── 0001_initial_schema.sql   Full schema with RLS policies

middleware.ts                 Locale routing, cookie persistence
tailwind.config.ts            Maritime design tokens
```

## 7. What's included vs. what's next

**In this foundation:**
- All marketing site copy in 6 native languages
- Full auth: signup, login, magic link, email verification
- Dashboard with boat + entry CRUD
- Boat detail page with Chart.js visualizations (stacked monthly spending, category doughnut)
- Year-end ownership report with on-screen preview and PDF export (jsPDF)
- Profile settings: name, language, currency
- Waitlist API with localized confirmation emails
- Row-Level Security on every table
- Multi-currency storage (minor units, no float drift)
- Service schedule database (table + RLS policies, ready for UI)

**Next session's work:**
- Service schedule UI (list, create, edit on boat detail)
- Service reminder cron (daily check, send email when due)
- Receipt photo upload → OCR via OpenAI/Textract
- Stripe billing integration (subscription + founding-member discount)
- Referral system
- SEO landing pages per boat type (`/en/sailboat`, `/en/powerboat`, etc.)
- Import from CSV (spreadsheet migration)

## 8. Running quality checks

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
npm run build        # Production build — must succeed before deploy
```

## 9. Philosophy

- **Storage in user's currency.** No base-currency drift.
- **Integer minor units for money.** No float rounding errors, ever.
- **RLS from day one.** Every row is scoped to its owner at the database level.
- **Native translations.** Every locale file is hand-written, not machine-translated.
- **SEO-first architecture.** Each locale has its own URL (`/en`, `/es`, …), each
  ready for a per-country static landing page.

---

Built in Tilburg, Netherlands by Jamal · in public · [hullbook.com](https://hullbook.com)
