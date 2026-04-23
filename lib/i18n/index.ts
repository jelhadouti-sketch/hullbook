import { Locale } from './config';
import en from './locales/en';
import es from './locales/es';
import de from './locales/de';
import fr from './locales/fr';
import nl from './locales/nl';
import it from './locales/it';
import type { TranslationShape } from './locales/en';

// All locale bundles. Must mirror LOCALES in config.ts.
const dictionaries: Record<Locale, TranslationShape> = { en, es, de, fr, nl, it };

export function getDictionary(locale: Locale): TranslationShape {
  return dictionaries[locale] ?? dictionaries.en;
}

// Utility: type-safe dotted-path accessor.
// Usage: t(dict, 'hero.title1') → string
// Compile-time error if key doesn't exist.
type Paths<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? Paths<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`;
    }[keyof T & string]
  : never;

export type TranslationKey = Paths<TranslationShape>;

export function t(dict: TranslationShape, key: TranslationKey): string {
  const parts = key.split('.');
  let node: unknown = dict;
  for (const part of parts) {
    if (node && typeof node === 'object' && part in node) {
      node = (node as Record<string, unknown>)[part];
    } else {
      // Missing key — return the key itself as a fallback so it's obvious in UI.
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[i18n] Missing translation key: ${key}`);
      }
      return key;
    }
  }
  return typeof node === 'string' ? node : key;
}

export type { TranslationShape };
