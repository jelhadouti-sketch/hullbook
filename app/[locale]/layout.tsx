import { CookieBanner } from '@/components/marketing/CookieBanner'
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, LOCALES, LOCALE_META } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL('https://www.hullbook.com'),
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-96.png', type: 'image/png', sizes: '96x96' },
        { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
        { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
      ],
      apple: '/apple-touch-icon.png',
      shortcut: '/favicon.ico',
    },
    themeColor: '#0a1628',
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `https://www.hullbook.com/${l}`])),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale,
      type: 'website',
      siteName: 'HullBook',
      images: [{ url: 'https://www.hullbook.com/og-default.png', width: 1200, height: 630, alt: 'HullBook — Know what your boat really costs.' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: ['https://www.hullbook.com/og-default.png'],
    },
    verification: {
      // To verify: go to bing.com/webmasters → add site → choose meta tag method → paste content value here
      // other: { 'msvalidate.01': 'YOUR_BING_CODE' },
      // To verify Yandex: go to webmaster.yandex.com → add site → meta tag method
      // other: { 'yandex-verification': 'YOUR_YANDEX_CODE' },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    keywords: ['boat expenses', 'boat maintenance tracker', 'boat ownership app', 'marine maintenance log', 'engine hours tracker', 'yacht expenses', 'sailing expense tracker'],
    authors: [{ name: 'HullBook' }],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Set the HTML lang attribute via a client-side effect.
  return (
    <div data-locale={locale} dir={LOCALE_META[locale].dir}>
      {children}
        <CookieBanner locale={locale} />
    </div>
  );
}
