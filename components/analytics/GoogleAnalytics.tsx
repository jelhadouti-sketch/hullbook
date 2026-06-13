'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const GA_ID = 'G-RN87Q1MLBR'

function isNativeApp() {
  if (typeof window === 'undefined') return false
  const w = window as any
  return !!(w.Capacitor && (typeof w.Capacitor.isNativePlatform === 'function' ? w.Capacitor.isNativePlatform() : w.Capacitor.isNative))
}

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Do not load analytics inside the native app — no tracking on iOS/Android.
    if (!isNativeApp()) setEnabled(true)
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
