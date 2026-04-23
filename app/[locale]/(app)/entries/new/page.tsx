import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { isCurrency, type Currency } from '@/lib/currency';
import { EntryForm } from '@/components/app/EntryForm';

export default async function NewEntryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ boat?: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const { boat: presetBoatId } = await searchParams;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: profile }, { data: boats }] = await Promise.all([
    supabase.from('profiles').select('currency').eq('id', user.id).single(),
    supabase.from('boats').select('id, name').eq('user_id', user.id).order('name'),
  ]);

  const currency: Currency = isCurrency(profile?.currency) ? profile.currency as Currency : 'USD';

  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-4xl font-normal text-sea-deep mb-8">
        {dict.entry.addEntry}
      </h1>
      <EntryForm
        locale={locale}
        dict={dict}
        currency={currency}
        boats={boats ?? []}
        presetBoatId={presetBoatId}
      />
    </div>
  );
}
