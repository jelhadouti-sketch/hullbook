import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { formatCurrency, toMajor, type Currency } from '@/lib/currency';

export default async function EntriesListPage({
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
  if (!user) return null;

  const { data: entries } = await supabase
    .from('entries')
    .select('*, boats ( name )')
    .eq('user_id', user.id)
    .order('occurred_on', { ascending: false })
    .limit(100);

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="font-serif text-4xl font-normal text-sea-deep">{dict.dashboard.entries}</h1>
        <Link
          href={`/${locale}/entries/new`}
          className="px-5 py-2.5 bg-sea text-paper-cream font-medium hover:bg-coral transition-colors"
        >
          {dict.entry.addEntry}
        </Link>
      </div>

      {!entries || entries.length === 0 ? (
        <div className="bg-paper-cream border border-black/15 p-10 text-center text-ink-mute">
          {dict.dashboard.noEntriesYet}
        </div>
      ) : (
        <ul className="bg-paper-cream border border-black/15 divide-y divide-black/10">
          {entries.map((e) => {
            const boatName = (e as unknown as { boats: { name: string } | null }).boats?.name ?? '';
            return (
              <li key={e.id} className="p-5 flex justify-between items-center gap-4">
                <div className="min-w-0">
                  <div className="font-medium truncate">{e.merchant ?? e.category}</div>
                  <div className="text-sm text-ink-mute mt-0.5 truncate">
                    {new Date(e.occurred_on).toLocaleDateString(locale)} · {e.category}
                    {boatName ? ` · ${boatName}` : ''}
                  </div>
                </div>
                <div className="font-serif tabular-nums text-lg whitespace-nowrap">
                  {e.kind !== 'trip' && formatCurrency(toMajor(e.amount_minor), e.currency as Currency, locale)}
                  {e.kind === 'trip' && e.engine_hours_delta ? `${e.engine_hours_delta}h` : ''}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
