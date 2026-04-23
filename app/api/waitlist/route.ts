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
    "Thanks for signing up to HullBook. You'll receive an email when your account is ready. In the meantime, feel free to reach out with any questions. — The HullBook Team",
  es:
    'Gracias por unirte a HullBook. Te enviaremos un email cuando tu cuenta esté lista. — El equipo HullBook',
  de:
    'Vielen Dank, dass Sie HullBook beigetreten sind. Wir senden Ihnen eine E-Mail, sobald Ihr Konto bereit ist. — Das HullBook Team',
  fr:
    "Merci de rejoindre HullBook. Nous vous enverrons un email dès que votre compte sera prêt. — L'équipe HullBook",
  nl:
    'Bedankt voor uw aanmelding bij HullBook. We sturen u een email zodra uw account klaar is. — Het HullBook Team',
  it:
    'Grazie per esserti unito a HullBook. Ti invieremo un email quando il tuo account sarà pronto. — Il team HullBook',
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
