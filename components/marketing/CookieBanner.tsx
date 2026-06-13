'use client'

import { useEffect, useState } from 'react'

const COOKIE_KEY = 'hb_cookies'

function isNativeApp() {
  if (typeof window === 'undefined') return false
  const w = window as any
  return !!(w.Capacitor && (typeof w.Capacitor.isNativePlatform === 'function' ? w.Capacitor.isNativePlatform() : w.Capacitor.isNative))
}

export function CookieBanner({ locale }: { locale: string }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof document === 'undefined') return
    // Inside the native app we use only essential cookies and do not track users,
    // so no consent banner is shown.
    if (isNativeApp()) return
    const has = document.cookie.split('; ').find((c) => c.startsWith(COOKIE_KEY + '='))
    if (!has) setShow(true)
  }, [])

  function setCookie(value: 'all' | 'essential') {
    const oneYear = 60 * 60 * 24 * 365
    document.cookie = `${COOKIE_KEY}=${value}; Max-Age=${oneYear}; Path=/; SameSite=Lax`
    setShow(false)
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: '#0F172A', color: '#fff',
      padding: '16px 24px',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
    }}>
      <div style={{maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between'}}>
        <p style={{margin: 0, fontSize: 14, lineHeight: 1.5, flex: '1 1 320px'}}>
          We use essential cookies to keep you signed in and remember your language. With your consent we also use analytics cookies to improve the product.{' '}
          <a href={`/${locale}/cookies`} style={{color: '#93C5FD', textDecoration: 'underline'}}>Learn more</a>.
        </p>
        <div style={{display: 'flex', gap: 8}}>
          <button onClick={() => setCookie('essential')} style={{padding: '8px 16px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 14, borderRadius: 4}}>
            Essential only
          </button>
          <button onClick={() => setCookie('all')} style={{padding: '8px 16px', background: '#fff', color: '#0F172A', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, borderRadius: 4}}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
