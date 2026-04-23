import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { isCurrency, type Currency } from '@/lib/currency';
import { SettingsForm } from '@/components/app/SettingsForm';

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const currentCurrency: Currency = isCurrency((profile as { currency?: string } | null)?.currency) ? ((profile as { currency: string }).currency as Currency) : 'USD';
  const currentLocale: Locale = isLocale(profile?.locale) ? profile.locale : locale;

  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-4xl font-normal text-sea-deep mb-8">
        {dict.settings.title}
      </h1>
      <SettingsForm
        locale={locale}
        dict={dict}
        initialLocale={currentLocale}
        initialCurrency={currentCurrency}
        fullName={profile?.full_name ?? ''}
        email={profile?.email ?? user.email ?? ''}
      />
    </div>
  );
}
