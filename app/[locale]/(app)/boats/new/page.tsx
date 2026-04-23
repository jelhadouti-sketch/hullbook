import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { BoatForm } from '@/components/app/BoatForm';

export default async function NewBoatPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-4xl font-normal text-sea-deep mb-8">
        {dict.dashboard.addBoat}
      </h1>
      <BoatForm locale={locale} dict={dict} />
    </div>
  );
}
