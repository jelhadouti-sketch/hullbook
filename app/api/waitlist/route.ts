import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { LOCALES, type Locale } from '@/lib/i18n/config';
import { CURRENCIES, type Currency } from '@/lib/currency';
import { Resend } from 'resend';

const bodySchema = z.object({
  email: z.string().email().max(320),
  locale: z.enum(LOCALES as unknown as [Locale, ...Locale[]]).default('en'),
  currency: z.enum(CURRENCIES as unknown as [Currency, ...Currency[]]).default('USD'),
  source: z.string().max(40).default('unknown'),
});

// Localized confirmation subject + body — shortened here; expand in lib/emails/ later.
const CONFIRM_SUBJECT: Record<Locale, string> = {
  en: 'Welcome aboard — HullBook',
  es: 'Bienvenido a bordo — HullBook',
  de: 'Willkommen an Bord — HullBook',
  fr: 'Bienvenue à bord — HullBook',
  nl: 'Welkom aan boord — HullBook',
  it: 'Benvenuto a bordo — HullBook',
};

const CONFIRM_BODY: Record<Locale, string> = {
  en:
    "You're on the HullBook waitlist. Founding-captain pricing is locked in for you. We'll email you once when we launch — no spam in between. — Jamal",
  es:
    'Estás en la lista de HullBook. Tu tarifa de capitán fundador está reservada. Te escribiremos solo al lanzar — sin spam. — Jamal',
  de:
    'Sie stehen auf der HullBook-Warteliste. Ihr Gründerkapitäns-Preis ist gesichert. Wir melden uns nur beim Start — kein Spam dazwischen. — Jamal',
  fr:
    'Vous êtes sur la liste HullBook. Votre tarif capitaine fondateur est verrouillé. Un seul email au lancement — pas de spam. — Jamal',
  nl:
    'Je staat op de HullBook-wachtlijst. Je oprichters-kapiteinstarief is gereserveerd. We mailen alleen bij lancering — geen spam. — Jamal',
  it:
    'Sei sulla lista HullBook. La tua tariffa capitano fondatore è bloccata. Ti scriviamo solo al lancio — niente spam. — Jamal',
};

export async function POST(request: NextRequest) {
  // Parse and validate
  let payload;
  try {
    const json = await request.json();
    payload = bodySchema.parse(json);
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: 'invalid_body' },
      { status: 400 },
    );
  }

  // Store in Supabase (admin client; waitlist has no public select policy)
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from('waitlist').insert({
      email: payload.email.toLowerCase(),
      locale: payload.locale,
      currency: payload.currency,
      source: payload.source,
    });

    // Duplicate email is NOT an error from the user's perspective — they're already in.
    if (error && error.code !== '23505') {
      console.error('[waitlist] Supabase error:', error);
      return NextResponse.json({ ok: false, error: 'storage_failed' }, { status: 500 });
    }
  } catch (err) {
    console.error('[waitlist] Storage exception:', err);
    return NextResponse.json({ ok: false, error: 'storage_failed' }, { status: 500 });
  }

  // Send confirmation email (best-effort — failures don't block success response)
  if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: payload.email,
        subject: CONFIRM_SUBJECT[payload.locale],
        text: CONFIRM_BODY[payload.locale],
      });
    } catch (err) {
      console.error('[waitlist] Email error (non-fatal):', err);
    }
  }

  return NextResponse.json({ ok: true });
}
