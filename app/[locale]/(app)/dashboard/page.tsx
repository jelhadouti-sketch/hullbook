import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { formatCurrency, toMajor, type Currency, isCurrency } from '@/lib/currency';
import {
  Sailboat,
  Receipt,
  Clock,
  TrendingUp,
  Plus,
  ArrowRight,
  Fuel,
  Wrench,
  Anchor,
} from 'lucide-react';

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

  const currency: Currency = isCurrency((profile as { currency?: string } | null)?.currency)
    ? ((profile as { currency: string }).currency as Currency)
    : 'USD';

  const { data: boats } = await supabase
    .from('boats')
    .select('id, name, type, length_ft, year')
    .eq('user_id', user.id);

  const { data: entries } = await supabase
    .from('entries')
    .select('*, boats ( name )')
    .eq('user_id', user.id)
    .order('occurred_on', { ascending: false })
    .limit(5);

  const { data: allEntries } = await supabase
    .from('entries')
    .select('amount_minor, currency, kind, engine_hours_delta, category')
    .eq('user_id', user.id);

  const expenses = allEntries?.filter((e) => e.kind === 'expense') ?? [];
  const trips = allEntries?.filter((e) => e.kind === 'trip') ?? [];
  const totalSpent = expenses.reduce(
    (acc, e) => acc + (e.currency === currency ? e.amount_minor : 0),
    0,
  );
  const totalHours = trips.reduce(
    (acc, e) => acc + (e.engine_hours_delta ?? 0),
    0,
  );

  const firstName = profile?.full_name?.split(' ')[0] ?? 'Captain';

  // Empty state — no boats yet
  if (!boats || boats.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-coral mb-3">
            Welcome aboard
          </p>
          <h1 className="font-serif text-5xl text-ink mb-4">
            Hello, {firstName}.
          </h1>
          <p className="text-lg text-ink/70 leading-relaxed max-w-xl">
            Let&apos;s set up your first boat. It takes 30 seconds, and then you can start tracking expenses, trips, and services.
          </p>
        </div>

        <div className="bg-white border border-black/10 rounded-2xl p-10 shadow-sm">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-xl bg-coral/10 text-coral flex items-center justify-center shrink-0">
              <Sailboat className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-ink mb-2">
                Add your first boat
              </h2>
              <p className="text-ink/60 mb-6 leading-relaxed">
                Name, type, length, year — just the basics. You can add more details later.
              </p>
              <Link
                href={`/${locale}/boats/new`}
                className="inline-flex items-center gap-2 bg-ink text-paper-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-ink-deep transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add your first boat
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <FeaturePreview icon={Receipt} title="Track expenses" desc="Log fuel, marina, parts — everything in one place." />
          <FeaturePreview icon={Wrench} title="Service schedule" desc="Get reminders before services are due." />
          <FeaturePreview icon={Anchor} title="Trip log" desc="Document every journey, crew, condition." />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-coral mb-2">
            Overview
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink">
            Welcome back, {firstName}.
          </h1>
        </div>
        <Link
          href={`/${locale}/entries/new`}
          className="inline-flex items-center gap-2 bg-ink text-paper-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-ink-deep transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New entry
        </Link>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          icon={TrendingUp}
          label="Total spent"
          value={formatCurrency(toMajor(totalSpent), currency, locale)}
          accent="coral"
        />
        <StatCard
          icon={Clock}
          label="Engine hours"
          value={totalHours.toFixed(1)}
          accent="brass"
        />
        <StatCard
          icon={Receipt}
          label="Entries"
          value={String(allEntries?.length ?? 0)}
          accent="sea"
        />
        <StatCard
          icon={Sailboat}
          label="Boats"
          value={String(boats.length)}
          accent="ink"
        />
      </div>

      {/* Two column layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-black/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-ink">Recent activity</h2>
              <Link
                href={`/${locale}/entries`}
                className="text-sm text-ink/60 hover:text-ink flex items-center gap-1 transition"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {!entries || entries.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-full bg-paper-fog flex items-center justify-center mx-auto mb-4">
                  <Receipt className="w-6 h-6 text-ink/40" />
                </div>
                <p className="text-ink/60 mb-4">No entries yet.</p>
                <Link
                  href={`/${locale}/entries/new`}
                  className="inline-flex items-center gap-2 text-sm text-coral hover:text-coral/80 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add your first entry
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-black/5">
                {entries.map((e) => {
                  const boatName = (e as unknown as { boats: { name: string } | null }).boats?.name ?? '';
                  const isTrip = e.kind === 'trip';
                  return (
                    <li key={e.id} className="py-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isTrip ? 'bg-sea/10 text-sea' : 'bg-coral/10 text-coral'
                      }`}>
                        {isTrip ? <Anchor className="w-5 h-5" /> : <Receipt className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-ink truncate">
                          {e.merchant ?? e.category}
                        </div>
                        <div className="text-sm text-ink/50 mt-0.5">
                          {new Date(e.occurred_on).toLocaleDateString(locale, { month: 'short', day: 'numeric' })} · {e.category}
                          {boatName ? ` · ${boatName}` : ''}
                        </div>
                      </div>
                      <div className="font-serif text-lg tabular-nums text-ink whitespace-nowrap">
                        {e.kind !== 'trip' && formatCurrency(toMajor(e.amount_minor), e.currency as Currency, locale)}
                        {e.kind === 'trip' && e.engine_hours_delta ? `${e.engine_hours_delta}h` : ''}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Your boats */}
        <div>
          <div className="bg-white border border-black/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-ink">Your boats</h2>
              <Link
                href={`/${locale}/boats/new`}
                className="text-coral hover:text-coral/80"
                title="Add boat"
              >
                <Plus className="w-5 h-5" />
              </Link>
            </div>
            <ul className="space-y-2">
              {boats.map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/${locale}/boats/${b.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-paper-fog transition group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-ink/5 text-ink flex items-center justify-center shrink-0 group-hover:bg-ink group-hover:text-paper-cream transition">
                      <Sailboat className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-ink truncate">{b.name}</div>
                      <div className="text-xs text-ink/50 truncate">
                        {b.type}{b.length_ft ? ` · ${b.length_ft} ft` : ''}{b.year ? ` · ${b.year}` : ''}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink/30 group-hover:text-ink/60 transition" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

type AccentColor = 'coral' | 'brass' | 'sea' | 'ink';

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent: AccentColor;
}) {
  const accents: Record<AccentColor, string> = {
    coral: 'bg-coral/10 text-coral',
    brass: 'bg-brass/10 text-brass',
    sea: 'bg-sea/10 text-sea',
    ink: 'bg-ink/10 text-ink',
  };
  return (
    <div className="bg-white border border-black/10 rounded-2xl p-5 md:p-6 hover:border-ink/30 hover:shadow-md transition">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${accents[accent]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-xs uppercase tracking-wider text-ink/50 mb-2">{label}</div>
      <div className="font-serif text-3xl text-ink tabular-nums">{value}</div>
    </div>
  );
}

function FeaturePreview({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white/50 border border-black/5 rounded-xl p-5">
      <Icon className="w-5 h-5 text-ink/40 mb-3" />
      <div className="font-medium text-ink mb-1 text-sm">{title}</div>
      <div className="text-xs text-ink/60 leading-relaxed">{desc}</div>
    </div>
  );
}
