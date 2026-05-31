'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  locale: string;
  links: NavLink[];
  loginLabel: string;
  signupLabel: string;
}

export function MobileNav({ locale, links, loginLabel, signupLabel }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="md:hidden p-2 -mr-2 text-ink"
      >
        <Menu className="w-6 h-6" />
      </button>

      {open && (
        <div
          style={{zIndex:9998}}
          className="md:hidden fixed inset-0 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        style={{backgroundColor:"#f5f0e1",zIndex:9999}}
        className={`md:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] flex flex-col transform transition-transform duration-200 shadow-2xl ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-end p-4 border-b border-black/10">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="p-2 -mr-2 text-ink"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 flex flex-col px-6 py-4 gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-lg text-ink/80 hover:text-ink border-b border-black/5 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="p-6 border-t border-black/10 flex flex-col gap-3">
          <a
            href={`/${locale}/login`}
            onClick={() => setOpen(false)}
            className="text-center py-3 text-ink/70 hover:text-ink"
          >
            {loginLabel}
          </a>
          <a
            href={`/${locale}/signup`}
            onClick={() => setOpen(false)}
            className="text-center bg-ink text-paper-cream py-3 rounded-full font-medium hover:bg-ink-deep transition"
          >
            {signupLabel}
          </a>
        </div>
      </aside>
    </>
  );
}
