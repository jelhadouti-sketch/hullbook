'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Locale } from '@/lib/i18n/config';
import type { TranslationShape } from '@/lib/i18n';
import {
  LayoutDashboard,
  Sailboat,
  Receipt,
  Wrench,
  FileText,
  Settings,
  LogOut,
  User,
} from 'lucide-react';

interface Props {
  locale: Locale;
  dict: TranslationShape;
  profile: { email: string; fullName: string | null };
}

export function DashboardSidebar({ locale, dict, profile }: Props) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = `/${locale}`;
  };

  const nav = [
    { href: `/${locale}/dashboard`, label: dict.dashboard.overview, icon: LayoutDashboard },
    { href: `/${locale}/boats`, label: dict.dashboard.boats, icon: Sailboat },
    { href: `/${locale}/entries`, label: dict.dashboard.entries, icon: Receipt },
    { href: `/${locale}/settings`, label: dict.dashboard.settings, icon: Settings },
  ];

  const initial = (profile.fullName || profile.email || 'U').charAt(0).toUpperCase();

  return (
    <aside className="w-full md:w-72 md:min-h-screen bg-ink text-paper-cream flex flex-col border-r border-black/20">
      {/* Brand */}
      <div className="p-6 border-b border-white/10">
        <Link href={`/${locale}/dashboard`} className="flex items-center gap-3">
          <svg className="w-9 h-9" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 20 C3 20, 8 26, 16 26 C24 26, 29 20, 29 20 L26 12 L6 12 Z" fill="#B8812E" stroke="#F5F0E1" strokeWidth="2"/>
            <path d="M16 4 L16 12 M16 4 L22 12" stroke="#F5F0E1" strokeWidth="2"/>
            <path d="M3 20 Q10 22, 16 20 T29 20" stroke="#F5F0E1" strokeWidth="1.5" fill="none" opacity="0.6"/>
          </svg>
          <span className="font-serif text-2xl font-semibold">HullBook</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-0.5">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                active
                  ? 'bg-white/10 text-paper-cream font-medium'
                  : 'text-paper-cream/60 hover:bg-white/5 hover:text-paper-cream'
              }`}
            >
              <Icon className={`w-[18px] h-[18px] ${active ? 'text-brass' : ''}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-9 h-9 rounded-full bg-brass/20 text-brass flex items-center justify-center font-serif text-lg font-medium">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm text-paper-cream truncate font-medium">
              {profile.fullName ?? 'Captain'}
            </div>
            <div className="text-xs text-paper-cream/50 truncate">
              {profile.email}
            </div>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-paper-cream/60 hover:bg-white/5 hover:text-paper-cream rounded-lg transition-colors"
        >
          <LogOut className="w-[18px] h-[18px]" />
          {dict.common.signOut}
        </button>
      </div>
    </aside>
  );
}
