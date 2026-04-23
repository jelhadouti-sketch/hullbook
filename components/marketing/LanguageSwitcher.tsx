'use client';

import { useRouter, usePathname } from 'next/navigation';
import { LOCALES, LOCALE_META, isLocale, type Locale } from '@/lib/i18n/config';

export function LanguageSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    if (!isLocale(newLocale)) return;

    // Persist preference
    document.cookie = `hb_locale=${newLocale};path=/;max-age=31536000;samesite=lax`;

    // Swap the leading locale segment
    const parts = pathname.split('/');
    if (parts.length > 1 && isLocale(parts[1])) {
      parts[1] = newLocale;
    } else {
      parts.splice(1, 0, newLocale);
    }
    router.push(parts.join('/') || `/${newLocale}`);
  };

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Language</span>
      <select
        value={current}
        onChange={handleChange}
        className="appearance-none bg-transparent border border-black/15 pl-3 pr-8 py-1.5 text-sm cursor-pointer hover:border-black/30 transition-colors"
      >
        {LOCALES.map((loc) => (
          <option key={loc} value={loc}>
            {LOCALE_META[loc].flag} {LOCALE_META[loc].name}
          </option>
        ))}
      </select>
    </label>
  );
}
