import { cookies, headers } from 'next/headers';
import { getDictionary } from '@/lib/i18n';
import { isLocale, type Locale } from '@/lib/i18n/config';
import {
  defaultCurrencyForLocale,
  detectCurrencyFromAcceptLanguage,
  isCurrency,
  type Currency,
} from '@/lib/currency';
import { WaitlistForm } from '@/components/marketing/WaitlistForm';
import { LanguageSwitcher } from '@/components/marketing/LanguageSwitcher';
import { LogoMark } from '@/components/marketing/LogoMark';
import { notFound } from 'next/navigation';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  // Detect currency (used elsewhere; kept for compatibility)
  const cookieStore = await cookies();
  const hdrs = await headers();
  const cookieCurrency = cookieStore.get('hb_currency')?.value;
  const acceptLanguage = hdrs.get('accept-language');
  let currency: Currency = defaultCurrencyForLocale(locale);
  if (cookieCurrency && isCurrency(cookieCurrency)) {
    currency = cookieCurrency;
  } else if (acceptLanguage) {
    const detected = detectCurrencyFromAcceptLanguage(acceptLanguage);
    if (detected) currency = detected;
  }

  return (
    <main className="bg-paper-cream text-ink min-h-screen">
      {/* ========== NAV ========== */}
      <nav className="sticky top-0 z-40 bg-paper-cream/95 backdrop-blur border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-3">
            <LogoMark className="w-10 h-10" />
            <span className="text-2xl font-serif text-ink font-semibold">HullBook</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-ink/70">
            <a href="#how" className="hover:text-ink transition">{dict.nav.howItWorks}</a>
            <a href="#features" className="hover:text-ink transition">Features</a>
            <a href="#pricing" className="hover:text-ink transition">{dict.nav.pricing}</a>
            <a href="#faq" className="hover:text-ink transition">{dict.nav.faq}</a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher current={locale} />
            <a href="#pricing" className="inline-flex items-center gap-2 bg-ink text-paper-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-ink-deep transition shadow-sm">
              {dict.nav.signup}
            </a>
          </div>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <section id="top" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-coral font-medium mb-8">
                <span className="w-8 h-px bg-coral" />
                {dict.hero.eyebrow}
              </div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-ink font-normal mb-8">
                {dict.hero.title1}
                <br />
                <em className="text-coral not-italic font-normal">{dict.hero.title2}</em>
                <br />
                {dict.hero.title3}
              </h1>
              <p className="text-lg md:text-xl text-ink/70 leading-relaxed max-w-xl mb-10">
                {dict.hero.lede}
              </p>
              <div className="max-w-md mb-6">
                <WaitlistForm locale={locale} currency={currency} dict={dict} source="hero" successMessage={dict.hero.ctaSuccess} buttonLabel={dict.hero.ctaButton} />
              </div>
              <p className="text-sm text-ink/50">{dict.hero.note}</p>
            </div>
            <div className="md:col-span-5">
              <DashboardMockup dict={dict} />
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="bg-ink text-paper-cream py-20 border-y border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <p className="font-serif text-5xl md:text-6xl text-brass mb-3">{dict.stats.stat1Num}</p>
            <p className="text-paper-cream/70 text-sm leading-relaxed">{dict.stats.stat1Label}</p>
          </div>
          <div>
            <p className="font-serif text-5xl md:text-6xl text-brass mb-3">{dict.stats.stat2Num}</p>
            <p className="text-paper-cream/70 text-sm leading-relaxed">{dict.stats.stat2Label}</p>
          </div>
          <div>
            <p className="font-serif text-5xl md:text-6xl text-brass mb-3">{dict.stats.stat3Num}</p>
            <p className="text-paper-cream/70 text-sm leading-relaxed">{dict.stats.stat3Label}</p>
          </div>
        </div>
      </section>

      {/* ========== PROBLEM ========== */}
      <section id="problem" className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <p className="text-xs tracking-[0.2em] uppercase text-coral mb-4">01 · {dict.problem.section}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-16 max-w-3xl">
            {dict.problem.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            <div>
              <p className="text-sm text-ink/40 mb-3 font-mono">i.</p>
              <h3 className="font-serif text-2xl text-ink mb-3">{dict.problem.item1Title}</h3>
              <p className="text-ink/70 leading-relaxed">{dict.problem.item1Desc}</p>
            </div>
            <div>
              <p className="text-sm text-ink/40 mb-3 font-mono">ii.</p>
              <h3 className="font-serif text-2xl text-ink mb-3">{dict.problem.item2Title}</h3>
              <p className="text-ink/70 leading-relaxed">{dict.problem.item2Desc}</p>
            </div>
            <div>
              <p className="text-sm text-ink/40 mb-3 font-mono">iii.</p>
              <h3 className="font-serif text-2xl text-ink mb-3">{dict.problem.item3Title}</h3>
              <p className="text-ink/70 leading-relaxed">{dict.problem.item3Desc}</p>
            </div>
            <div>
              <p className="text-sm text-ink/40 mb-3 font-mono">iv.</p>
              <h3 className="font-serif text-2xl text-ink mb-3">{dict.problem.item4Title}</h3>
              <p className="text-ink/70 leading-relaxed">{dict.problem.item4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW ========== */}
      <section id="how" className="py-24 md:py-32 bg-paper-fog border-y border-black/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="text-xs tracking-[0.2em] uppercase text-coral mb-4">02 · {dict.how.section}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-16 max-w-3xl">
            {dict.how.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <p className="font-serif text-5xl text-brass mb-6">{dict.how.step1Num}</p>
              <h3 className="font-serif text-2xl text-ink mb-3">{dict.how.step1Title}</h3>
              <p className="text-ink/70 leading-relaxed">{dict.how.step1Desc}</p>
            </div>
            <div>
              <p className="font-serif text-5xl text-brass mb-6">{dict.how.step2Num}</p>
              <h3 className="font-serif text-2xl text-ink mb-3">{dict.how.step2Title}</h3>
              <p className="text-ink/70 leading-relaxed">{dict.how.step2Desc}</p>
            </div>
            <div>
              <p className="font-serif text-5xl text-brass mb-6">{dict.how.step3Num}</p>
              <h3 className="font-serif text-2xl text-ink mb-3">{dict.how.step3Title}</h3>
              <p className="text-ink/70 leading-relaxed">{dict.how.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="text-xs tracking-[0.2em] uppercase text-coral mb-4">03 · {dict.features.section}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-16 max-w-3xl">
            {dict.features.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard title={dict.features.item1Title} desc={dict.features.item1Desc} />
            <FeatureCard title={dict.features.item2Title} desc={dict.features.item2Desc} />
            <FeatureCard title={dict.features.item3Title} desc={dict.features.item3Desc} />
            <FeatureCard title={dict.features.item4Title} desc={dict.features.item4Desc} />
            <FeatureCard title={dict.features.item5Title} desc={dict.features.item5Desc} />
            <FeatureCard title={dict.features.item6Title} desc={dict.features.item6Desc} />
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section id="pricing" className="py-24 md:py-32 bg-paper-fog border-y border-black/10">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <p className="text-xs tracking-[0.2em] uppercase text-coral mb-4 text-center">04 · {dict.pricing.section}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-4 text-center">
            {dict.pricing.title}
          </h2>
          <p className="text-ink/70 text-center mb-16">{dict.pricing.subtitle}</p>
          <div className="bg-white border border-ink/10 rounded-2xl p-10 md:p-14 shadow-xl">
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-wider text-coral mb-3">{dict.pricing.planName}</p>
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="font-serif text-7xl text-ink">{dict.pricing.planPrice}</span>
                <span className="text-ink/60 text-xl">{dict.pricing.planPeriod}</span>
              </div>
              <p className="text-sm text-ink/50">{dict.pricing.planNote}</p>
              <p className="text-sm text-coral mt-2 font-medium">{dict.pricing.planAnnual}</p>
            </div>
            <ul className="space-y-4 mb-10 max-w-md mx-auto">
              {[
                dict.pricing.bullet1,
                dict.pricing.bullet2,
                dict.pricing.bullet3,
                dict.pricing.bullet4,
                dict.pricing.bullet5,
                dict.pricing.bullet6,
                dict.pricing.bullet7,
                dict.pricing.bullet8,
              ].map((txt, i) => (
                <li key={i} className="flex items-start gap-3 text-ink">
                  <span className="text-coral mt-0.5 font-bold">✓</span>
                  <span>{txt}</span>
                </li>
              ))}
            </ul>
            <div className="max-w-md mx-auto">
              <WaitlistForm locale={locale} currency={currency} dict={dict} source="hero" successMessage={dict.hero.ctaSuccess} buttonLabel={dict.hero.ctaButton} />
              <p className="text-center text-sm text-ink/50 mt-4">{dict.pricing.trustLine}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TRUST ========== */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="text-xs tracking-[0.2em] uppercase text-coral mb-4 text-center">{dict.trust.section}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight mb-16 text-center">
            {dict.trust.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="font-serif text-xl text-ink mb-3">{dict.trust.item1Title}</h3>
              <p className="text-ink/70 text-sm">{dict.trust.item1Desc}</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-ink mb-3">{dict.trust.item2Title}</h3>
              <p className="text-ink/70 text-sm">{dict.trust.item2Desc}</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-ink mb-3">{dict.trust.item3Title}</h3>
              <p className="text-ink/70 text-sm">{dict.trust.item3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section id="faq" className="py-24 md:py-32 border-t border-black/10">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <p className="text-xs tracking-[0.2em] uppercase text-coral mb-4">05 · {dict.faq.section}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-16">
            {dict.faq.title}
          </h2>
          <div className="space-y-6">
            {[
              [dict.faq.q1, dict.faq.a1],
              [dict.faq.q2, dict.faq.a2],
              [dict.faq.q3, dict.faq.a3],
              [dict.faq.q4, dict.faq.a4],
              [dict.faq.q5, dict.faq.a5],
              [dict.faq.q6, dict.faq.a6],
            ].map(([q, a], i) => (
              <div key={i} className="border-b border-black/10 pb-6">
                <h3 className="font-serif text-xl text-ink mb-3">{q}</h3>
                <p className="text-ink/70 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-24 md:py-32 bg-ink text-paper-cream">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-brass mb-6">{dict.final.eyebrow}</p>
          <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
            {dict.final.title1}{' '}
            <em className="italic text-brass not-italic">{dict.final.title2}</em>
          </h2>
          <p className="text-lg md:text-xl text-paper-cream/70 mb-12 max-w-2xl mx-auto">
            {dict.final.lede}
          </p>
          <div className="max-w-md mx-auto">
            <WaitlistForm locale={locale} currency={currency} dict={dict} source="hero" successMessage={dict.hero.ctaSuccess} buttonLabel={dict.hero.ctaButton} />
            <p className="text-center text-sm text-paper-cream/50 mt-4">{dict.final.note}</p>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-ink-deep text-paper-cream/60 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <LogoMark className="w-8 h-8" />
            <span className="text-lg font-serif text-paper-cream">HullBook</span>
          </div>
          <p className="text-sm">{dict.footer.copyright}</p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-paper-cream transition">{dict.footer.privacy}</a>
            <a href="#" className="hover:text-paper-cream transition">{dict.footer.terms}</a>
            <a href="mailto:hello@hullbook.com" className="hover:text-paper-cream transition">{dict.footer.contact}</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ========== DASHBOARD MOCKUP ==========
function DashboardMockup({ dict }: { dict: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-black/5 p-6 md:p-8 relative">
      {/* window chrome */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-black/5">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <span className="text-xs text-ink/40 ml-3">hullbook.com / dashboard</span>
      </div>
      {/* content */}
      <div className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-ink/50 mb-1">{dict.product.mockupTotalLabel}</p>
          <p className="font-serif text-5xl text-ink">{dict.product.mockupTotalValue}</p>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-black/5">
          <div>
            <p className="text-xs text-ink/50 mb-1">{dict.product.mockupFuelLabel}</p>
            <p className="text-lg font-medium text-ink">{dict.product.mockupFuelValue}</p>
          </div>
          <div>
            <p className="text-xs text-ink/50 mb-1">{dict.product.mockupMarinaLabel}</p>
            <p className="text-lg font-medium text-ink">{dict.product.mockupMarinaValue}</p>
          </div>
          <div>
            <p className="text-xs text-ink/50 mb-1">{dict.product.mockupServiceLabel}</p>
            <p className="text-lg font-medium text-ink">{dict.product.mockupServiceValue}</p>
          </div>
        </div>
        <div className="pt-4 border-t border-black/5 bg-coral/5 -mx-6 -mb-6 md:-mx-8 md:-mb-8 px-6 py-4 md:px-8 rounded-b-2xl">
          <p className="text-xs uppercase tracking-wider text-coral mb-1 font-medium">{dict.product.mockupNextServiceLabel}</p>
          <p className="text-sm text-ink">{dict.product.mockupNextServiceValue}</p>
        </div>
      </div>
    </div>
  );
}

// ========== FEATURE CARD ==========
function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="border border-black/10 rounded-xl p-6 md:p-8 bg-white hover:border-ink/30 hover:shadow-md transition">
      <h3 className="font-serif text-xl text-ink mb-3">{title}</h3>
      <p className="text-ink/70 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
