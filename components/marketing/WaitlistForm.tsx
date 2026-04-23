'use client';

import { useState, useTransition } from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { TranslationShape } from '@/lib/i18n';
import type { Currency } from '@/lib/currency';

interface WaitlistFormProps {
  locale: Locale;
  currency: Currency;
  dict: TranslationShape;
  source: 'hero' | 'final_cta';
  successMessage: string;
  placeholderKey?: string;
  buttonLabel: string;
  noteNode?: React.ReactNode;
  center?: boolean;
}

export function WaitlistForm({
  locale,
  currency,
  dict,
  source,
  successMessage,
  buttonLabel,
  noteNode,
  center = false,
}: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError(dict.common.emailInvalid);
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed, locale, currency, source }),
        });
        if (!res.ok) throw new Error('Request failed');
        setSubmitted(true);
      } catch {
        setError(dict.common.errorGeneric);
      }
    });
  };

  if (submitted) {
    return (
      <div
        className={`max-w-[540px] bg-sea-deep text-paper-cream px-6 py-5 font-serif text-lg ${center ? 'mx-auto' : ''}`}
        role="status"
      >
        {successMessage}
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row gap-3 max-w-[540px] mb-5 ${center ? 'mx-auto' : ''}`}
        noValidate
      >
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.hero.emailPlaceholder}
          aria-label="Email address"
          className="flex-1 px-5 py-4 border border-black/15 bg-paper-cream font-sans text-base text-ink outline-none focus:border-sea transition-colors"
        />
        <button
          type="submit"
          disabled={pending}
          className="px-7 py-4 bg-sea text-paper-cream font-medium text-[15px] tracking-wide hover:bg-coral transition-colors whitespace-nowrap disabled:opacity-60"
        >
          {pending ? dict.common.loading : buttonLabel}
        </button>
      </form>
      {error && (
        <div role="alert" className="text-coral text-sm mb-3 max-w-[540px]">
          {error}
        </div>
      )}
      {noteNode}
    </>
  );
}
