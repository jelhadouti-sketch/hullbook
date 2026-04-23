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
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  // Currency: cookie → browser detection → locale default
  const cookieStore = await cookies();
  const hdrs = await headers();
  const cookieCurrency = cookieStore.get('hb_currency')?.value;
  const currency: Currency = isCurrency(cookieCurrency)
    ? cookieCurrency
    : detectCurrencyFromAcceptLanguage(hdrs.get('accept-language')) ??
      defaultCurrencyForLocale(locale);

  return (
    <>
      {/* ================ NAV ================ */}
      <nav className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-black/15">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3 font-serif font-medium text-[22px] tracking-tight text-sea">
            <LogoMark className="w-8 h-8" />
            HullBook
          </div>
          <div className="flex gap-5 sm:gap-7 items-center text-[15px]">
            <a href="#demo" className="hidden md:inline text-ink/75 hover:text-ink transition">
              {dict.nav.demo}
            </a>
            <a href="#how" className="hidden md:inline text-ink/75 hover:text-ink transition">
              {dict.nav.howItWorks}
            </a>
            <a href="#pricing" className="hidden md:inline text-ink/75 hover:text-ink transition">
              {dict.nav.pricing}
            </a>
            <LanguageSwitcher current={locale} />
            <a
              href="#waitlist"
              className="px-5 py-2.5 bg-sea text-paper-cream hover:bg-coral transition-colors"
            >
              {dict.nav.earlyAccess}
            </a>
          </div>
        </div>
      </nav>

      {/* ================ HERO ================ */}
      

      {/* ================ FAQ ================ */}
      <section className="py-20 md:py-36 border-t border-black/15">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <SectionLabel num="05">{dict.faq.label}</SectionLabel>
          <h2 className="font-serif font-normal text-[clamp(28px,4vw,42px)] leading-[1.05] tracking-[-0.028em] max-w-[22ch] mb-14 text-sea-deep">
            {dict.faq.title}
          </h2>
          <div>
            {[
              ['i.', dict.faq.q1, dict.faq.a1],
              ['ii.', dict.faq.q2, dict.faq.a2],
              ['iii.', dict.faq.q3, dict.faq.a3],
              ['iv.', dict.faq.q4, dict.faq.a4],
              ['v.', dict.faq.q5, dict.faq.a5],
              ['vi.', dict.faq.q6, dict.faq.a6],
            ].map(([marker, q, a], i) => (
              <div key={i} className="border-t border-black/15 py-8 last:border-b">
                <div className="font-serif font-medium text-[22px] tracking-tight mb-3.5 leading-tight text-sea-deep">
                  <span className="italic font-light text-coral mr-4">{marker}</span>
                  {q}
                </div>
                <p className="text-base text-ink-mute max-w-[64ch] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================ FINAL CTA ================ */}
      <section id="waitlist" className="py-24 md:py-40 text-center bg-paper-fog border-t border-black/15">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="font-mono text-xs tracking-[0.18em] uppercase text-coral mb-6 flex items-center justify-center gap-3.5 before:content-[''] before:w-6 before:h-px before:bg-coral">
            {dict.final.eyebrow}
          </div>
          <h2 className="font-serif font-normal text-[clamp(36px,5.8vw,64px)] leading-[1.05] tracking-[-0.028em] max-w-[22ch] mx-auto mb-6 text-sea-deep">
            {dict.final.title1} <em className="italic text-coral">{dict.final.title2}</em>
          </h2>
          <p className="font-serif font-light text-[clamp(20px,2vw,26px)] leading-[1.4] max-w-[560px] mx-auto mb-12 text-ink-soft">
            {dict.final.lede}
          </p>
          <WaitlistForm
            locale={locale}
            currency={currency}
            dict={dict}
            source="final_cta"
            successMessage={dict.hero.ctaSuccess}
            buttonLabel={dict.final.ctaButton}
            center
            noteNode={
              <p className="text-sm text-ink-mute max-w-[540px] mx-auto">{dict.final.note}</p>
            }
          />
        </div>
      </section>

      {/* ================ FOOTER ================ */}
      <footer className="max-w-[1280px] mx-auto px-5 sm:px-10 py-12 text-sm text-ink-mute flex justify-between flex-wrap gap-4 border-t border-black/15">
        <div>© 2026 HullBook · {dict.footer.tagline}</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-ink transition-colors">
            {dict.footer.privacy}
          </a>
          <a href="#" className="hover:text-ink transition-colors">
            {dict.footer.terms}
          </a>
          <a href="mailto:hello@hullbook.com" className="hover:text-ink transition-colors">
            {dict.footer.contact}
          </a>
        </div>
      </footer>
    </>
  );
}

// ============================================================================
// Sub-components (server)
// ============================================================================

function SectionLabel({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-mute mb-12 flex items-center gap-3.5">
      <span className="font-serif italic text-sm text-coral tracking-normal normal-case">
        {num}
      </span>
      {children}
    </div>
  );
}

function PricingDisplay({
  locale,
  currency,
  dict,
}: {
  locale: Locale;
  currency: Currency;
  dict: ReturnType<typeof getDictionary>;
}) {
  // For the marketing price display we use a locale-appropriate round number.
  // The real billing price is set per-currency in Stripe at checkout time.
  const priceMonthly = { USD: 9, EUR: 8, GBP: 7, CAD: 12, AUD: 14, CHF: 8, NOK: 89, SEK: 89, DKK: 69, NZD: 15 }[currency];
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceMonthly);
  return (
    <>
      <div className="font-serif font-light text-[clamp(80px,14vw,180px)] leading-[0.9] tracking-[-0.05em] my-5 text-sea-deep">
        {formatted}
        <em className="italic text-coral">.</em>
      </div>
      <div className="font-mono text-sm tracking-[0.25em] uppercase text-ink-mute">
        {dict.pricing.perMonth}
      </div>
    </>
  );
}

function FeatureIcon({ kind }: { kind: string }) {
  const paths: Record<string, React.ReactNode> = {
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 2v4M16 2v4" />
      </>
    ),
    trending: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 4 5-5" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </>
    ),
    map: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
    export: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
  };
  return (
    <svg
      className="w-10 h-10 text-sea"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[kind]}
    </svg>
  );
}

function HeroIllustration() {
  return (
    <div className="relative aspect-square max-w-[480px] mx-auto">
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
        style={{ animation: 'float 6s ease-in-out infinite' }}
      >
        <circle cx="200" cy="200" r="180" fill="#FAF7F1" stroke="#0A1628" strokeWidth="1.5" />
        <circle cx="290" cy="130" r="28" fill="#B8812E" opacity="0.8" />
        <path d="M20 230 Q100 225, 200 230 T380 230" stroke="#2C6E8F" strokeWidth="2" fill="none" />
        <path
          d="M20 245 Q120 240, 200 248 T380 245"
          stroke="#2C6E8F"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M20 260 Q130 255, 200 262 T380 260"
          stroke="#2C6E8F"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <g>
          <line x1="200" y1="110" x2="200" y2="230" stroke="#0A1628" strokeWidth="2.5" />
          <path d="M200 110 L200 225 L260 225 Z" fill="#F5F1EA" stroke="#0A1628" strokeWidth="2" />
          <path d="M200 125 L200 225 L155 225 Z" fill="#C14B3A" stroke="#0A1628" strokeWidth="2" />
          <path
            d="M140 228 L265 228 L250 252 L155 252 Z"
            fill="#0E3B5C"
            stroke="#0A1628"
            strokeWidth="2"
          />
          <line x1="145" y1="240" x2="260" y2="240" stroke="#B8812E" strokeWidth="1.5" />
          <path d="M200 110 L215 105 L200 115 Z" fill="#C14B3A" />
        </g>
        <path
          d="M130 140 Q135 135, 140 140 M140 140 Q145 135, 150 140"
          stroke="#0A1628"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M250 95 Q253 92, 256 95 M256 95 Q259 92, 262 95"
          stroke="#0A1628"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
