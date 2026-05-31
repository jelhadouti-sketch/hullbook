import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isLocale, DEFAULT_LOCALE } from '@/lib/i18n/config';

export async function GET(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;
  const code = searchParams.get('code');
  const next = searchParams.get('next');

  // Extract locale from pathname (/en/auth/callback)
  const segs = pathname.split('/').filter(Boolean);
  const locale = isLocale(segs[0]) ? segs[0] : DEFAULT_LOCALE;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(
        new URL(next ?? `/${locale}/dashboard`, request.url),
      );
    }
  }

  // Error: back to login with a message
  return NextResponse.redirect(new URL(`/${locale}/login?error=auth`, request.url));
}
