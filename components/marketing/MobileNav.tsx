'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

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
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            zIndex: 99999,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          className="md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '85vw',
              maxWidth: '320px',
              height: '100vh',
              backgroundColor: '#faf7f1',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                style={{ padding: '8px', color: '#0a1628', background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'block',
                    padding: '14px 0',
                    fontSize: '18px',
                    color: '#1b2e47',
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div style={{ padding: '24px', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={`/${locale}/login`}
                onClick={() => setOpen(false)}
                style={{
                  textAlign: 'center',
                  padding: '12px',
                  color: '#4a5f7d',
                  textDecoration: 'none',
                  fontSize: '15px',
                }}
              >
                {loginLabel}
              </a>
              <a
                href={`/${locale}/signup`}
                onClick={() => setOpen(false)}
                style={{
                  textAlign: 'center',
                  backgroundColor: '#0a1628',
                  color: '#faf7f1',
                  padding: '14px',
                  borderRadius: '999px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontSize: '15px',
                }}
              >
                {signupLabel}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
