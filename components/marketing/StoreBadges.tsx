const APP_STORE_URL = 'https://apps.apple.com/app/hullbook/id6776191454';

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.985 4.45z"/>
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.6 1.3c-.3.2-.5.6-.5 1.1v19.2c0 .5.2.9.5 1.1l.1.1L14.5 12 3.7 1.2l-.1.1zm12 9.4 3.6-2.1c1-.6 1-1.5 0-2.1l-3.6-2.1L12.1 9.6l3.5 1.1zM3.7 22.8c.3.2.7.2 1.2-.1l8.7-5-2.6-2.6-7.3 7.7z"/>
    </svg>
  );
}

export function StoreBadges({ onDark = false }: { onDark?: boolean }) {
  const liveCls = onDark
    ? 'bg-paper-cream text-ink hover:bg-white'
    : 'bg-ink text-paper-cream hover:bg-ink-deep';
  const soonCls = onDark
    ? 'bg-white/10 text-paper-cream border border-paper-cream/25'
    : 'bg-ink/40 text-paper-cream';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download HullBook on the App Store"
        className={`inline-flex items-center gap-3 rounded-xl px-5 py-3 shadow-sm transition ${liveCls}`}
      >
        <AppleIcon className="w-7 h-7" />
        <span className="flex flex-col leading-none text-left">
          <span className="text-[10px] tracking-wide opacity-80">Download on the</span>
          <span className="text-lg font-semibold -mt-0.5">App Store</span>
        </span>
      </a>

      <div
        aria-label="HullBook is coming soon to Google Play"
        className={`inline-flex items-center gap-3 rounded-xl px-5 py-3 shadow-sm cursor-default ${soonCls}`}
      >
        <PlayIcon className="w-6 h-6" />
        <span className="flex flex-col leading-none text-left">
          <span className="text-[10px] tracking-wide opacity-80">Coming soon to</span>
          <span className="text-lg font-semibold -mt-0.5">Google Play</span>
        </span>
      </div>
    </div>
  );
}
