// ============================================================================
// Currency configuration and formatting.
//
// Design principles:
//  - Store amounts as the user's chosen currency (no base currency drift).
//  - Always format via Intl.NumberFormat using the user's locale.
//  - Store amounts as integer minor units (cents) to avoid float errors.
// ============================================================================

import type { Locale } from '../i18n/config';

export const CURRENCIES = [
  'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'NOK', 'SEK', 'DKK', 'NZD',
] as const;
export type Currency = (typeof CURRENCIES)[number];

export const DEFAULT_CURRENCY: Currency = 'USD';

export interface CurrencyMeta {
  code: Currency;
  symbol: string;    // Canonical symbol for quick UI; Intl does the real work
  name: string;
}

export const CURRENCY_META: Record<Currency, CurrencyMeta> = {
  USD: { code: 'USD', symbol: '$',   name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€',   name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£',   name: 'British Pound' },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
  AUD: { code: 'AUD', symbol: 'A$',  name: 'Australian Dollar' },
  CHF: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  NOK: { code: 'NOK', symbol: 'kr',  name: 'Norwegian Krone' },
  SEK: { code: 'SEK', symbol: 'kr',  name: 'Swedish Krona' },
  DKK: { code: 'DKK', symbol: 'kr',  name: 'Danish Krone' },
  NZD: { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
};

export function isCurrency(value: string | undefined | null): value is Currency {
  return typeof value === 'string' && (CURRENCIES as readonly string[]).includes(value);
}

// ----------------------------------------------------------------------------
// Locale → likely currency (best-effort default for new signups).
// The user can always override in settings.
// ----------------------------------------------------------------------------
const LOCALE_TO_CURRENCY: Record<Locale, Currency> = {
  en: 'USD', // conservative: US has largest boat market; UK users re-pick to GBP
  es: 'EUR',
  de: 'EUR',
  fr: 'EUR',
  nl: 'EUR',
  it: 'EUR',
};

export function defaultCurrencyForLocale(locale: Locale): Currency {
  return LOCALE_TO_CURRENCY[locale] ?? DEFAULT_CURRENCY;
}

// ----------------------------------------------------------------------------
// Browser-country currency detection (used only at first visit).
// We map common Accept-Language regional tags to currencies.
// ----------------------------------------------------------------------------
const REGION_TO_CURRENCY: Record<string, Currency> = {
  US: 'USD', CA: 'CAD', GB: 'GBP', AU: 'AUD', NZ: 'NZD',
  DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR',
  BE: 'EUR', AT: 'EUR', IE: 'EUR', PT: 'EUR', FI: 'EUR',
  CH: 'CHF', NO: 'NOK', SE: 'SEK', DK: 'DKK',
};

export function detectCurrencyFromAcceptLanguage(header: string | null): Currency {
  if (!header) return DEFAULT_CURRENCY;
  const tags = header.split(',').map((t) => t.trim().split(';')[0]);
  for (const tag of tags) {
    const parts = tag.split('-');
    if (parts.length >= 2) {
      const region = parts[1].toUpperCase();
      if (region in REGION_TO_CURRENCY) return REGION_TO_CURRENCY[region];
    }
  }
  return DEFAULT_CURRENCY;
}

// ----------------------------------------------------------------------------
// Formatting.
// ----------------------------------------------------------------------------

// Minor-unit aware formatter. Amount is in major units (dollars, not cents).
// For storage, keep everything as integer minor units and divide by 100 here.
export function formatCurrency(
  amount: number,
  currency: Currency,
  locale: Locale,
  options: { showCents?: boolean; compact?: boolean } = {},
): string {
  const { showCents = false, compact = false } = options;
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: showCents ? 2 : 0,
      maximumFractionDigits: showCents ? 2 : 0,
      notation: compact ? 'compact' : 'standard',
    }).format(amount);
  } catch {
    // Fallback: plain number with symbol
    return `${CURRENCY_META[currency].symbol}${Math.round(amount).toLocaleString('en-US')}`;
  }
}

// Convert between minor units (cents) and major units (dollars).
// All DB storage uses minor units; UI uses major units.
export const toMinor = (major: number): number => Math.round(major * 100);
export const toMajor = (minor: number): number => minor / 100;
