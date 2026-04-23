import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { isCurrency, type Currency } from '@/lib/currency';
import { SettingsForm } from '@/components/app/SettingsForm';
import { User } from 'lucide-react';

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

  const currentCurrency: Currency = isCurrency((profile as { currency?: string } | null)?.currency)
    ? ((profile as { currency: string }).currency as Currency)
    : 'USD';
  const currentLocale: Locale = isLocale(profile?.locale) ? profile.locale : locale;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10">
        <p className="text-xs tracking-[0.2em] uppercase text-coral mb-2">
          Account
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink">
          {dict.settings.title}
        </h1>
        <p className="text-ink/60 mt-3">Manage your profile, language, and currency preferences.</p>
      </div>

      <div className="bg-white border border-black/10 rounded-2xl p-8 md:p-10">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-black/5">
          <div className="w-14 h-14 rounded-full bg-coral/10 text-coral flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="font-serif text-xl text-ink">{profile?.full_name ?? 'Captain'}</div>
            <div className="text-sm text-ink/50">{profile?.email ?? user.email}</div>
          </div>
        </div>

        <SettingsForm
          locale={locale}
          dict={dict}
          initialLocale={currentLocale}
          initialCurrency={currentCurrency}
          fullName={profile?.full_name ?? ''}
          email={profile?.email ?? user.email ?? ''}
        />
      </div>
    </div>
  );
}
