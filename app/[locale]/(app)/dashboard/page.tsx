import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { formatCurrency, toMajor, type Currency, isCurrency } from '@/lib/currency';

export default async function DashboardPage({
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

  const { data: profile } = await supabase
    .from('profiles')
    .select('currency, full_name')
    .eq('id', user.id)
    .single();

  const currency: Currency = isCurrency(profile?.currency) ? profile.currency : 'USD';

  const { data: boats } = await supabase.from('boats').select('id, name').eq('user_id', user.id);
  const { data: entries } = await supabase
    .from('entries')
    .select('amount_minor, currency, kind, engine_hours_delta')
    .eq('user_id', user.id);

  const expenses = entries?.filter((e) => e.kind === 'expense') ?? [];
  const trips = entries?.filter((e) => e.kind === 'trip') ?? [];
  const totalSpent = expenses.reduce(
    (acc, e) => acc + (e.currency === currency ? e.amount_minor : 0),
    0,
  );
  const totalHours = trips.reduce(
    (acc, e) => acc + (e.engine_hours_delta ?? 0),
    0,
  );

  if (!boats || boats.length === 0) {
    return (
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl font-normal text-sea-deep mb-4">
          {dict.dashboard.welcomeNew}
          {profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}.
        </h1>
        <p className="text-ink-mute text-lg mb-8">{dict.dashboard.addFirstBoat}</p>
        <Link
          href={`/${locale}/boats/new`}
          className="inline-block px-6 py-3.5 bg-sea text-paper-cream font-medium hover:bg-coral transition-colors"
        >
          {dict.dashboard.addBoat}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <h1 className="font-serif text-4xl font-normal text-sea-deep mb-10">
        {dict.dashboard.overview}
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Kpi label={dict.dashboard.totalSpent} value={formatCurrency(toMajor(totalSpent), currency, locale)} />
        <Kpi label={dict.dashboard.engineHours} value={totalHours.toFixed(1)} />
        <Kpi label={dict.dashboard.entryCount} value={String(entries?.length ?? 0)} />
        <Kpi label={dict.dashboard.boats} value={String(boats.length)} />
      </div>

      <div className="bg-paper-cream border border-black/15 p-6">
        <h2 className="font-serif text-xl font-medium text-sea-deep mb-4">
          {dict.dashboard.allBoats}
        </h2>
        <ul className="divide-y divide-black/10">
          {boats.map((b) => (
            <li key={b.id}>
              <Link
                href={`/${locale}/boats/${b.id}`}
                className="flex justify-between items-center py-3 hover:text-sea transition-colors"
              >
                <span className="font-medium">{b.name}</span>
                <span className="text-ink-mute">→</span>
              </Link>
            </li>
          ))}
        </ul>
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
