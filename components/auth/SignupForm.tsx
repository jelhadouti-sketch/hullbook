'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Locale } from '@/lib/i18n/config';
import type { TranslationShape } from '@/lib/i18n';
import type { Currency } from '@/lib/currency';

export function SignupForm({
  locale,
  currency,
  dict,
}: {
  locale: Locale;
  currency: Currency;
  dict: TranslationShape;
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(dict.common.emailInvalid);
      return;
    }
    if (password.length < 8) {
      setError(dict.auth.passwordMin);
      return;
    }
    startTransition(async () => {
      const supabase = createClient();
      const { error: err } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/${locale}/auth/callback`,
          data: {
            full_name: fullName.trim() || null,
            locale,
            currency,
          },
        },
      });
      if (err) {
        // Supabase returns a specific error code/message for duplicates
        if (err.message?.toLowerCase().includes('already')) {
          setError(dict.auth.emailTaken);
        } else {
          setError(dict.common.errorGeneric);
        }
        return;
      }
      setEmailSent(true);
    });
  };

  if (emailSent) {
    return (
      <div className="bg-sea-deep text-paper-cream p-6 font-serif text-lg" role="status">
        {dict.auth.verifyEmail}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-ink-soft mb-2">
          {dict.auth.fullName}
        </label>
        <input
          type="text"
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-soft mb-2">
          {dict.auth.email}
        </label>
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-soft mb-2">
          {dict.auth.password}
        </label>
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-black/15 bg-paper-cream text-ink outline-none focus:border-sea transition-colors"
        />
      </div>
      {error && (
        <div role="alert" className="text-coral text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full py-3.5 bg-sea text-paper-cream font-medium text-[15px] hover:bg-coral transition-colors disabled:opacity-60"
      >
        {pending ? dict.common.loading : dict.auth.signupButton}
      </button>
      <p className="text-xs text-ink-mute text-center leading-relaxed">
        {dict.auth.termsAgree}
      </p>
    </form>
  );
}
