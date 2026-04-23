import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { formatCurrency, toMajor, type Currency, isCurrency } from '@/lib/currency';
import { SpendingByMonthChart, CategoryPieChart } from '@/components/app/BoatCharts';

export default async function BoatDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);

  const { data: profile } = await supabase
    .from('profiles')
    .select('currency')
    .eq('id', user.id)
    .single();
  const currency: Currency = isCurrency(profile?.currency) ? profile.currency : 'USD';

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
    .order('occurred_on', { ascending: false });

  const allEntries = entries ?? [];
  const expenses = allEntries.filter((e) => e.kind === 'expense' || e.kind === 'service');
  const trips = allEntries.filter((e) => e.kind === 'trip');

  // Totals
  const totalSpent = expenses
    .filter((e) => e.currency === currency)
    .reduce((acc, e) => acc + e.amount_minor, 0);
  const totalHours = allEntries.reduce(
    (acc, e) => acc + (e.engine_hours_delta ?? 0),
    0,
  );
  const costPerOuting = trips.length > 0 ? totalSpent / trips.length : 0;

  // Chart data: monthly spending by category
  const monthlyData: Record<string, Record<string, number>> = {};
  for (const e of expenses) {
    if (e.currency !== currency) continue;
    const month = e.occurred_on.slice(0, 7); // YYYY-MM
    monthlyData[month] ??= {};
    monthlyData[month][e.category] =
      (monthlyData[month][e.category] ?? 0) + e.amount_minor;
  }

  // Category totals for the pie
  const byCategory: Record<string, number> = {};
  for (const e of expenses) {
    if (e.currency !== currency) continue;
    byCategory[e.category] = (byCategory[e.category] ?? 0) + e.amount_minor;
  }

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <div>
          <Link
            href={`/${locale}/boats`}
            className="text-sm text-ink-mute hover:text-sea mb-2 inline-block"
          >
            ← {dict.dashboard.boats}
          </Link>
          <h1 className="font-serif text-4xl font-normal text-sea-deep">{boat.name}</h1>
          <p className="text-ink-mute mt-1">
            {(dict.boat[
              `type${boat.type.charAt(0).toUpperCase() + boat.type.slice(1)}` as keyof typeof dict.boat
            ] as string) ?? boat.type}
            {boat.length_ft ? ` · ${boat.length_ft} ft` : ''}
            {boat.year ? ` · ${boat.year}` : ''}
            {boat.make ? ` · ${boat.make}` : ''}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link
            href={`/${locale}/entries/new?boat=${boat.id}`}
            className="px-5 py-2.5 bg-sea text-paper-cream font-medium hover:bg-coral transition-colors"
          >
            {dict.entry.addEntry}
          </Link>
          <Link
            href={`/${locale}/boats/${boat.id}/report`}
            className="px-5 py-2.5 border border-sea text-sea font-medium hover:bg-sea hover:text-paper-cream transition-colors"
          >
            {dict.report.exportButton}
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Kpi
          label={dict.dashboard.totalSpent}
          value={formatCurrency(toMajor(totalSpent), currency, locale)}
        />
        <Kpi
          label={dict.dashboard.engineHours}
          value={totalHours.toFixed(1)}
        />
        <Kpi
          label={dict.dashboard.entryCount}
          value={String(allEntries.length)}
        />
        <Kpi
          label={dict.dashboard.costPerOuting}
          value={
            trips.length > 0
              ? formatCurrency(toMajor(costPerOuting), currency, locale)
              : '—'
          }
        />
      </div>

      {/* Charts */}
      {Object.keys(byCategory).length > 0 && (
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-4 mb-10">
          <div className="bg-paper-cream border border-black/15 p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-sea-deep">
                {dict.demo.chartTitle1}
              </span>
              <span className="text-xs text-ink-mute font-mono tracking-wider">
                {new Date().getFullYear()}
              </span>
            </div>
            <SpendingByMonthChart
              monthlyData={monthlyData}
              currency={currency}
              locale={locale}
            />
          </div>
          <div className="bg-paper-cream border border-black/15 p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-sea-deep">
                {dict.demo.chartTitle2}
              </span>
            </div>
            <CategoryPieChart
              byCategory={byCategory}
              currency={currency}
              locale={locale}
            />
          </div>
        </div>
      )}

      {/* Entry log */}
      <div className="bg-paper-cream border border-black/15">
        <h2 className="font-serif text-xl font-medium text-sea-deep p-5 border-b border-black/15">
          {dict.demo.recentEntries}
        </h2>
        {allEntries.length === 0 ? (
          <p className="p-10 text-center text-ink-mute">
            {dict.dashboard.noEntriesYet}
          </p>
        ) : (
          <ul className="divide-y divide-black/10">
            {allEntries.slice(0, 30).map((e) => (
              <li key={e.id} className="p-5 flex justify-between items-center gap-4">
                <div className="min-w-0">
                  <div className="font-medium truncate">
                    {e.merchant ?? e.category}
                  </div>
                  <div className="text-sm text-ink-mute mt-0.5">
                    {new Date(e.occurred_on).toLocaleDateString(locale)} ·{' '}
                    {e.category}
                  </div>
                </div>
                <div className="font-serif tabular-nums text-lg whitespace-nowrap">
                  {e.kind !== 'trip' &&
                    formatCurrency(toMajor(e.amount_minor), e.currency as Currency, locale)}
                  {e.kind === 'trip' && e.engine_hours_delta
                    ? `${e.engine_hours_delta}h`
                    : ''}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper-cream border border-black/15 p-5">
      <div className="text-xs uppercase tracking-wider text-ink-mute mb-2">{label}</div>
      <div className="font-serif text-3xl text-sea-deep tabular-nums">{value}</div>
    </div>
  );
}
