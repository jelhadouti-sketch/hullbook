import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cookies, headers } from 'next/headers';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import {
  defaultCurrencyForLocale,
  detectCurrencyFromAcceptLanguage,
  isCurrency,
  type Currency,
} from '@/lib/currency';
import { SignupForm } from '@/components/auth/SignupForm';

export default async function SignupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const cookieStore = await cookies();
  const hdrs = await headers();
  const cookieCurrency = cookieStore.get('hb_currency')?.value;
  const currency: Currency = isCurrency(cookieCurrency)
    ? cookieCurrency
    : detectCurrencyFromAcceptLanguage(hdrs.get('accept-language')) ??
      defaultCurrencyForLocale(locale);

  return (
    <>
      <h1 className="font-serif text-4xl font-normal tracking-tight text-sea-deep mb-2">
        {dict.auth.signupTitle}
      </h1>
      <p className="text-ink-mute mb-10">{dict.auth.signupSubtitle}</p>

      <SignupForm locale={locale} currency={currency} dict={dict} />

      <p className="text-sm text-ink-mute mt-8 text-center">
        {dict.auth.hasAccount}{' '}
        <Link href={`/${locale}/login`} className="text-sea font-medium hover:text-coral transition-colors">
          {dict.auth.signIn}
        </Link>
      </p>
    </>
  );
}
