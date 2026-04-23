import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';

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
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-4xl font-normal text-sea-deep">{dict.dashboard.boats}</h1>
        <Link
          href={`/${locale}/boats/new`}
          className="px-5 py-2.5 bg-sea text-paper-cream font-medium hover:bg-coral transition-colors"
        >
          {dict.dashboard.addBoat}
        </Link>
      </div>

      {!boats || boats.length === 0 ? (
        <div className="bg-paper-cream border border-black/15 p-10 text-center text-ink-mute">
          {dict.dashboard.noBoatsYet}
        </div>
      ) : (
        <ul className="space-y-3">
          {boats.map((b) => (
            <li key={b.id}>
              <Link
                href={`/${locale}/boats/${b.id}`}
                className="block bg-paper-cream border border-black/15 p-5 hover:border-sea transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-lg">{b.name}</div>
                    <div className="text-sm text-ink-mute mt-1">
                      {dict.boat[`type${capitalize(b.type)}` as keyof typeof dict.boat] ?? b.type}
                      {b.length_ft ? ` · ${b.length_ft} ft` : ''}
                      {b.year ? ` · ${b.year}` : ''}
                    </div>
                  </div>
                  <div className="text-ink-mute">→</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
