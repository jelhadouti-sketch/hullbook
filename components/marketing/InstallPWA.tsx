'use client';

import { useEffect, useState } from 'react';

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.6 1.3c-.3.2-.5.6-.5 1.1v19.2c0 .5.2.9.5 1.1l.1.1L14.5 12 3.7 1.2l-.1.1z" fill="#00d3ff"/>
      <path d="M18.7 8.6 14.5 12l4.2 4.2 3.6-2.1c1-.6 1-1.5 0-2.1l-3.6-1.4z" fill="#ffce00"/>
      <path d="M3.7 22.8c.3.2.7.2 1.2-.1l13.8-7.9L14.5 12 3.7 22.8z" fill="#ff3a44"/>
      <path d="M3.7 1.2 14.5 12l4.2-3.4L4.9 1.1c-.5-.3-.9-.3-1.2-.1z" fill="#00f076"/>
    </svg>
  );
}

export function InstallPWA({ onDark = false }: { onDark?: boolean }) {
  const [deferred, setDeferred] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    const onPrompt = (e: any) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onInstalled = () => setInstalled(true);

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);

    try {
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
        setInstalled(true);
      }
    } catch {}

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  async function handleClick() {
    if (deferred) {
      deferred.prompt();
      try { await deferred.userChoice; } catch {}
      setDeferred(null);
    } else {
      setShowHelp((s) => !s);
    }
  }

  if (installed) return null;

  const cls = onDark
    ? 'bg-white/10 text-paper-cream border border-paper-cream/25 hover:bg-white/20'
    : 'bg-ink/80 text-paper-cream hover:bg-ink';

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        aria-label="Get HullBook on Google Play"
        className={`inline-flex items-center gap-3 rounded-xl px-5 py-3 shadow-sm transition ${cls}`}
      >
        <PlayIcon className="w-6 h-6" />
        <span className="flex flex-col leading-none text-left">
          <span className="text-[10px] tracking-wide opacity-80">GET IT ON</span>
          <span className="text-lg font-semibold -mt-0.5">Google Play</span>
        </span>
      </button>
      {showHelp && (
        <div className={`mt-2 text-xs leading-relaxed max-w-xs ${onDark ? 'text-paper-cream/80' : 'text-ink/70'}`}>
          On Android, open hullbook.com in Chrome, tap the ⋮ menu, then choose “Install app” (or “Add to Home screen”).
        </div>
      )}
    </div>
  );
}
