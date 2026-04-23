import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { isCurrency, type Currency } from '@/lib/currency';
import { OwnershipReport } from '@/components/app/OwnershipReport';

export default async function ReportPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);

  const { data: profile } = await supabase
    .from('profiles')
    .select('currency, full_name, email')
    .eq('id', user.id)
    .single();
  const currency: Currency = isCurrency((profile as { currency?: string } | null)?.currency) ? ((profile as { currency: string }).currency as Currency) : 'USD';

  const { data: boat } = await supabase
    .from('boats')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!boat) notFound();

  const { data: entries } = await supabase
    .from('entries')
    .select('*')
    .eq('boat_id', id)
    .order('occurred_on', { ascending: true });

  return (
    <OwnershipReport
      locale={locale}
      dict={dict}
      currency={currency}
      boat={boat}
      entries={entries ?? []}
      ownerName={profile?.full_name ?? profile?.email ?? user.email ?? ''}
    />
  );
}
