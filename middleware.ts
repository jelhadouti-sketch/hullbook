import { NextRequest, NextResponse } from 'next/server';
import { LOCALES, detectLocaleFromAcceptLanguage, isLocale } from './lib/i18n/config';

// Paths that are not locale-prefixed.
const PUBLIC_PATHS = ['/api', '/_next', '/favicon.ico', '/robots.txt', '/sitemap.xml'];

// Country code -> Locale map
const COUNTRY_TO_LOCALE: Record<string, string> = {
  NL: 'nl', BE: 'nl', SR: 'nl',
  DE: 'de', AT: 'de', CH: 'de', LI: 'de',
  FR: 'fr', LU: 'fr', MC: 'fr',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es',
  IT: 'it', SM: 'it', VA: 'it',
};

// Country code -> Currency map
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: 'USD', CA: 'CAD', AU: 'AUD', NZ: 'NZD',
  GB: 'GBP', UK: 'GBP',
  CH: 'CHF', LI: 'CHF',
  NO: 'NOK', SE: 'SEK', DK: 'DKK',
  NL: 'EUR', BE: 'EUR', DE: 'EUR', AT: 'EUR', FR: 'EUR', LU: 'EUR',
  ES: 'EUR', IT: 'EUR', IE: 'EUR', PT: 'EUR', FI: 'EUR', GR: 'EUR',
  SK: 'EUR', SI: 'EUR', EE: 'EUR', LV: 'EUR', LT: 'EUR', CY: 'EUR', MT: 'EUR',
};

function detectLocaleFromCountry(country: string | null): string | null {
  if (!country) return null;
  return COUNTRY_TO_LOCALE[country.toUpperCase()] || null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let non-localized paths through.
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check if pathname already has a supported locale prefix.
  const firstSegment = pathname.split('/')[1];
  const hasLocale = isLocale(firstSegment);

  // Get country from Vercel headers
  const country = request.headers.get('x-vercel-ip-country');
  const currency = country ? COUNTRY_TO_CURRENCY[country.toUpperCase()] : null;

  if (hasLocale) {
    // Already on a locale path — just set currency cookie if needed
    const response = NextResponse.next();
    if (currency && !request.cookies.get('hb_currency')) {
      response.cookies.set('hb_currency', currency, {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
      });
    }
    return response;
  }

  // Determine locale: cookie > country > Accept-Language
  const cookieLocale = request.cookies.get('hb_locale')?.value;
  let locale: string;
  if (isLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    const countryLocale = detectLocaleFromCountry(country);
    if (countryLocale && isLocale(countryLocale)) {
      locale = countryLocale;
    } else {
      locale = detectLocaleFromAcceptLanguage(request.headers.get('accept-language'));
    }
  }

  // Redirect to /<locale><pathname>
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  const response = NextResponse.redirect(url);

  // Set currency cookie on redirect too
  if (currency && !request.cookies.get('hb_currency')) {
    response.cookies.set('hb_currency', currency, {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)',
  ],
};
