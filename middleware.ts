import { NextRequest, NextResponse } from 'next/server';
import { LOCALES, detectLocaleFromAcceptLanguage, isLocale } from './lib/i18n/config';

// Paths that are not locale-prefixed (API routes, static assets, auth callbacks).
const PUBLIC_PATHS = ['/api', '/_next', '/favicon.ico', '/robots.txt', '/sitemap.xml'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let non-localized paths through.
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check if pathname already has a supported locale prefix.
  const firstSegment = pathname.split('/')[1];
  const hasLocale = isLocale(firstSegment);
  if (hasLocale) {
    return NextResponse.next();
  }

  // Determine locale preference — cookie wins, then Accept-Language.
  const cookieLocale = request.cookies.get('hb_locale')?.value;
  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : detectLocaleFromAcceptLanguage(request.headers.get('accept-language'));

  // Redirect to /<locale><pathname>
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Run on every path except static assets, Next internals, and API.
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)',
  ],
};
