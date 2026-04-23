'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Locale } from '@/lib/i18n/config';
import type { TranslationShape } from '@/lib/i18n';

export function LoginForm({ locale, dict }: { locale: Locale; dict: TranslationShape }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [magicSent, setMagicSent] = useState(false);
  const [pending, startTransition] = useTransition();

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(dict.common.emailInvalid);
      return;
    }
    startTransition(async () => {
      const supabase = createClient();
      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (err) {
        setError(dict.auth.invalidCredentials);
        return;
      }
      router.push(`/${locale}/dashboard`);
      router.refresh();
    });
  };

  const handleMagicLink = () => {
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(dict.common.emailInvalid);
      return;
    }
    startTransition(async () => {
      const supabase = createClient();
      const { error: err } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/${locale}/auth/callback`,
        },
      });
      if (err) {
        setError(dict.common.errorGeneric);
        return;
      }
      setMagicSent(true);
    });
  };

  if (magicSent) {
    return (
      <div className="bg-sea-deep text-paper-cream p-6 font-serif text-lg" role="status">
        {dict.auth.magicLinkSent}
      </div>
    );
  }

  return (
    <form onSubmit={handlePasswordLogin} noValidate className="space-y-5">
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
          autoComplete="current-password"
          required
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
        {pending ? dict.common.loading : dict.auth.loginButton}
      </button>
      <div className="text-center">
        <button
          type="button"
          onClick={handleMagicLink}
          disabled={pending}
          className="text-sm text-ink-mute underline hover:text-sea transition-colors"
        >
          {dict.auth.magicLinkButton}
        </button>
      </div>
    </form>
  );
}
