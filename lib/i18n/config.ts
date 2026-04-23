// ============================================================================
// i18n configuration — single source of truth for all languages in HullBook.
//
// Adding a new language:
//   1. Add its code to LOCALES below
//   2. Add its metadata to LOCALE_META
//   3. Create lib/i18n/locales/<code>.ts with all translation keys
//   4. That's it — the rest of the app picks it up automatically.
// ============================================================================

export const LOCALES = ['en', 'es', 'de', 'fr', 'nl', 'it'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMeta {
  code: Locale;
  name: string;        // Native name (shown to users in that language)
  englishName: string; // For admin/fallback
  flag: string;        // ISO country flag for UI
  dir: 'ltr' | 'rtl';
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { code: 'en', name: 'English',   englishName: 'English',    flag: '🇬🇧', dir: 'ltr' },
  es: { code: 'es', name: 'Español',   englishName: 'Spanish',    flag: '🇪🇸', dir: 'ltr' },
  de: { code: 'de', name: 'Deutsch',   englishName: 'German',     flag: '🇩🇪', dir: 'ltr' },
  fr: { code: 'fr', name: 'Français',  englishName: 'French',     flag: '🇫🇷', dir: 'ltr' },
  nl: { code: 'nl', name: 'Nederlands',englishName: 'Dutch',      flag: '🇳🇱', dir: 'ltr' },
  it: { code: 'it', name: 'Italiano',  englishName: 'Italian',    flag: '🇮🇹', dir: 'ltr' },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

// Browser Accept-Language header parser.
// Returns the best-matching supported locale, or DEFAULT_LOCALE.
export function detectLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  // Parse "en-US,en;q=0.9,fr;q=0.8" into ordered list by quality
  const entries = header
    .split(',')
    .map((entry) => {
      const [tag, ...params] = entry.trim().split(';');
      const qParam = params.find((p) => p.trim().startsWith('q='));
      const q = qParam ? parseFloat(qParam.split('=')[1]) : 1;
      return { tag: tag.trim().toLowerCase(), q };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of entries) {
    // Match full tag first (e.g. "en-gb" -> "en")
    const primary = tag.split('-')[0];
    if (isLocale(primary)) return primary;
  }
  return DEFAULT_LOCALE;
}
