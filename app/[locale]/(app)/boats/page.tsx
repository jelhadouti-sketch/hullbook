import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { Sailboat, Plus, ArrowRight, Ruler, Calendar } from 'lucide-react';

export default async function BoatsListPage({
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

  const { data: boats } = await supabase
    .from('boats')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-coral mb-2">
            Fleet
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink">
            {dict.dashboard.boats}
          </h1>
        </div>
        <Link
          href={`/${locale}/boats/new`}
          className="inline-flex items-center gap-2 bg-ink text-paper-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-ink-deep transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {dict.dashboard.addBoat}
        </Link>
      </div>

      {!boats || boats.length === 0 ? (
        <div className="bg-white border border-black/10 rounded-2xl p-16 text-center">
          <div className="w-20 h-20 rounded-full bg-coral/10 text-coral flex items-center justify-center mx-auto mb-6">
            <Sailboat className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-2xl text-ink mb-3">No boats yet</h2>
          <p className="text-ink/60 max-w-md mx-auto mb-8">
            Add your first boat to start tracking expenses, trips, and services.
          </p>
          <Link
            href={`/${locale}/boats/new`}
            className="inline-flex items-center gap-2 bg-ink text-paper-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-ink-deep transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add your first boat
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boats.map((b) => (
            <Link
              key={b.id}
              href={`/${locale}/boats/${b.id}`}
              className="group bg-white border border-black/10 rounded-2xl p-6 hover:border-ink/30 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-coral/10 text-coral flex items-center justify-center group-hover:bg-coral group-hover:text-paper-cream transition">
                  <Sailboat className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-ink/30 group-hover:text-ink/70 group-hover:translate-x-1 transition" />
              </div>
              <h3 className="font-serif text-2xl text-ink mb-2">{b.name}</h3>
              <p className="text-sm text-ink/60 capitalize mb-4">{b.type}</p>

              <div className="flex flex-wrap gap-4 text-xs text-ink/50 pt-4 border-t border-black/5">
                {b.length_ft && (
                  <div className="flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{b.length_ft} ft</span>
                  </div>
                )}
                {b.year && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{b.year}</span>
                  </div>
                )}
                {b.make && (
                  <span className="text-ink/40">{b.make}{b.model ? ` ${b.model}` : ''}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
