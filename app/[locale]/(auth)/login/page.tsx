import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { LoginForm } from '@/components/auth/LoginForm';

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <>
      <h1 className="font-serif text-4xl font-normal tracking-tight text-sea-deep mb-2">
        {dict.auth.loginTitle}
      </h1>
      <p className="text-ink-mute mb-10">{dict.auth.loginSubtitle}</p>

      <LoginForm locale={locale} dict={dict} />

      <p className="text-sm text-ink-mute mt-8 text-center">
        {dict.auth.noAccount}{' '}
        <Link href={`/${locale}/signup`} className="text-sea font-medium hover:text-coral transition-colors">
          {dict.auth.signUp}
        </Link>
      </p>
    </>
  );
}
