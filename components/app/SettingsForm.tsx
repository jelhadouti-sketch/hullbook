'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LOCALES, LOCALE_META, type Locale } from '@/lib/i18n/config';
import { CURRENCIES, CURRENCY_META, type Currency } from '@/lib/currency';
import type { TranslationShape } from '@/lib/i18n';

interface Props {
  locale: Locale;
  dict: TranslationShape;
  initialLocale: Locale;
  initialCurrency: Currency;
  fullName: string;
  email: string;
}

export function SettingsForm({
  locale,
  dict,
  initialLocale,
  initialCurrency,
  fullName,
  email,
}: Props) {
  const router = useRouter();
  const [name, setName] = useState(fullName);
  const [userLocale, setUserLocale] = useState<Locale>(initialLocale);
  const [currency, setCurrency] = useState<Currency>(initialCurrency);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error: err } = await supabase
        .from('profiles')
        .update({
          full_name: name.trim() || null,
          locale: userLocale,
          currency,
        })
        .eq('id', user.id);

      if (err) {
        setError(dict.common.errorGeneric);
        return;
      }

      // Persist locale + currency preferences in cookies too (read by marketing)
      document.cookie = `hb_locale=${userLocale};path=/;max-age=31536000;samesite=lax`;
      document.cookie = `hb_currency=${currency};path=/;max-age=31536000;samesite=lax`;

      setSaved(true);

      // If locale changed, redirect to the new locale's settings page
      if (userLocale !== locale) {
        router.push(`/${userLocale}/settings`);
        router.refresh();
      } else {
        router.refresh();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-5">
        <h2 className="font-serif text-xl font-medium text-sea-deep border-b border-black/15 pb-2">
          {dict.settings.profile}
        </h2>
        <Field label={dict.auth.fullName}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
          />
        </Field>
        <Field label={dict.settings.email}>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-3 border border-black/15 bg-paper-fog text-ink-mute cursor-not-allowed"
          />
        </Field>
      </section>

      <section className="space-y-5">
        <h2 className="font-serif text-xl font-medium text-sea-deep border-b border-black/15 pb-2">
          {dict.settings.language} & {dict.settings.currency}
        </h2>
        <Field label={dict.settings.language}>
          <select
            value={userLocale}
            onChange={(e) => setUserLocale(e.target.value as Locale)}
            className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
          >
            {LOCALES.map((l) => (
              <option key={l} value={l}>
                {LOCALE_META[l].flag} {LOCALE_META[l].name}
              </option>
            ))}
          </select>
        </Field>
        <Field label={dict.settings.currency}>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {CURRENCY_META[c].symbol} {CURRENCY_META[c].code} — {CURRENCY_META[c].name}
              </option>
            ))}
          </select>
        </Field>
      </section>

      {error && (
        <div role="alert" className="text-coral text-sm">
          {error}
        </div>
      )}
      {saved && (
        <div role="status" className="text-sm bg-sea-deep text-paper-cream px-4 py-2">
          {dict.settings.saved}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="px-6 py-3 bg-sea text-paper-cream font-medium hover:bg-coral transition-colors disabled:opacity-60"
      >
        {pending ? dict.common.loading : dict.common.save}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-soft mb-2">{label}</span>
      {children}
    </label>
  );
}
