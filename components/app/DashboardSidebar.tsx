'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogoMark } from '@/components/marketing/LogoMark';
import type { Locale } from '@/lib/i18n/config';
import type { TranslationShape } from '@/lib/i18n';

interface Props {
  locale: Locale;
  dict: TranslationShape;
  profile: { email: string; fullName: string | null };
}

export function DashboardSidebar({ locale, dict, profile }: Props) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = `/${locale}`;
  };

  const nav = [
    { href: `/${locale}/dashboard`, label: dict.dashboard.overview },
    { href: `/${locale}/boats`, label: dict.dashboard.boats },
    { href: `/${locale}/entries`, label: dict.dashboard.entries },
    { href: `/${locale}/settings`, label: dict.dashboard.settings },
  ];

  return (
    <aside className="w-full md:w-64 md:min-h-screen bg-sea-deep text-paper-cream flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href={`/${locale}/dashboard`} className="flex items-center gap-3 font-serif font-medium text-xl">
          <LogoMark className="w-7 h-7" />
          HullBook
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2.5 text-sm transition-colors ${
              isActive(item.href)
                ? 'bg-white/10 text-paper-cream'
                : 'text-paper-cream/70 hover:bg-white/5 hover:text-paper-cream'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10 text-sm">
        <div className="px-4 py-2 text-paper-cream/70 truncate">
          {profile.fullName ?? profile.email}
        </div>
        <button
          onClick={handleSignOut}
          className="w-full text-left px-4 py-2.5 text-paper-cream/70 hover:bg-white/5 hover:text-paper-cream transition-colors"
        >
          {dict.common.signOut}
        </button>
      </div>
    </aside>
  );
}
