import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { formatCurrency, toMajor, type Currency } from '@/lib/currency';
import { Receipt, Plus, Anchor, Fuel, Wrench, Ship } from 'lucide-react';

function getCategoryIcon(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes('fuel')) return Fuel;
  if (cat.includes('service') || cat.includes('repair') || cat.includes('maintenance')) return Wrench;
  if (cat.includes('marina') || cat.includes('slip') || cat.includes('dock')) return Ship;
  return Receipt;
}

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
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-coral mb-2">
            Activity
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink">
            {dict.dashboard.entries}
          </h1>
        </div>
        <Link
          href={`/${locale}/entries/new`}
          className="inline-flex items-center gap-2 bg-ink text-paper-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-ink-deep transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {dict.entry.addEntry}
        </Link>
      </div>

      {!entries || entries.length === 0 ? (
        <div className="bg-white border border-black/10 rounded-2xl p-16 text-center">
          <div className="w-20 h-20 rounded-full bg-coral/10 text-coral flex items-center justify-center mx-auto mb-6">
            <Receipt className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-2xl text-ink mb-3">No entries yet</h2>
          <p className="text-ink/60 max-w-md mx-auto mb-8">
            Log your first expense, trip, or service to start tracking.
          </p>
          <Link
            href={`/${locale}/entries/new`}
            className="inline-flex items-center gap-2 bg-ink text-paper-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-ink-deep transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add your first entry
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-black/10 rounded-2xl overflow-hidden">
          <ul className="divide-y divide-black/5">
            {entries.map((e) => {
              const boatName = (e as unknown as { boats: { name: string } | null }).boats?.name ?? '';
              const isTrip = e.kind === 'trip';
              const Icon = isTrip ? Anchor : getCategoryIcon(e.category ?? '');
              return (
                <li key={e.id} className="p-5 md:p-6 flex items-center gap-4 hover:bg-paper-fog/50 transition">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    isTrip ? 'bg-sea/10 text-sea' : 'bg-coral/10 text-coral'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-ink truncate">
                      {e.merchant ?? e.category}
                    </div>
                    <div className="text-sm text-ink/50 mt-0.5 truncate">
                      {new Date(e.occurred_on).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}
                      {e.category ? ` · ${e.category}` : ''}
                      {boatName ? ` · ${boatName}` : ''}
                    </div>
                  </div>
                  <div className="font-serif text-xl tabular-nums text-ink whitespace-nowrap">
                    {e.kind !== 'trip' && formatCurrency(toMajor(e.amount_minor), e.currency as Currency, locale)}
                    {e.kind === 'trip' && e.engine_hours_delta ? `${e.engine_hours_delta}h` : ''}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
