'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const TERMS_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'

function isNativeApp() {
  if (typeof window === 'undefined') return false
  const w = window as any
  return !!(w.Capacitor && (typeof w.Capacitor.isNativePlatform === 'function' ? w.Capacitor.isNativePlatform() : w.Capacitor.isNative))
}

export function BillingCheckout({ locale }: { locale: string }) {
  const [loading, setLoading] = useState<'monthly' | 'yearly' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [opened, setOpened] = useState(false)
  const [restoring, setRestoring] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [native, setNative] = useState(false)

  useEffect(() => {
    setNative(isNativeApp())
  }, [])

  async function startCheckout(interval: 'monthly' | 'yearly') {
    setError(null)
    setMessage(null)
    setLoading(interval)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = `/${locale}/login`
        return
      }

      if (isNativeApp()) {
        // iOS app: pay with Apple In-App Purchase (App Store requirement 3.1.1)
        const { initRevenueCat, purchaseInterval } = await import('@/lib/revenuecat')
        await initRevenueCat(session.user.id)
        let active = false
        try {
          active = await purchaseInterval(interval)
        } catch (err: any) {
          if (err && err.userCancelled) { setLoading(null); return }
          setError('Purchase could not be completed. Please try again.')
          setLoading(null)
          return
        }
        if (active) {
          try {
            await fetch('/api/revenuecat/activate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({ interval }),
            })
          } catch {}
          window.location.href = `/${locale}/dashboard`
        } else {
          setError('Purchase could not be completed. Please try again.')
          setLoading(null)
        }
        return
      }

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ interval, locale }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')

      window.location.href = data.url
    } catch (e: any) {
      if (e && e.userCancelled) {
        setLoading(null)
        return
      }
      setError(e.message)
      setLoading(null)
    }
  }

  async function restore() {
    setError(null)
    setMessage(null)
    setRestoring(true)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = `/${locale}/login`
        return
      }

      if (isNativeApp()) {
        // iOS app: restore previous Apple In-App Purchases (App Store requirement 3.1.1)
        const { initRevenueCat, restorePurchases } = await import('@/lib/revenuecat')
        await initRevenueCat(session.user.id)
        const active = await restorePurchases()
        if (active) {
          window.location.href = `/${locale}/dashboard`
        } else {
          setMessage('No previous purchases were found to restore.')
          setRestoring(false)
        }
        return
      }

      // Web: subscriptions are tied to your account — send you to your dashboard.
      window.location.href = `/${locale}/dashboard`
    } catch (e: any) {
      setError('Could not restore purchases. Please try again.')
      setRestoring(false)
    }
  }

  if (opened) {
    return (
      <div className="p-8 bg-white border border-black/10">
        <h2 className="font-serif text-2xl text-sea-deep mb-3">Finish in your browser</h2>
        <p className="text-ink-mute mb-6">
          We opened your secure checkout in your browser. Complete your payment there, then return to HullBook and tap continue.
        </p>
        <button
          onClick={() => { window.location.href = `/${locale}/dashboard` }}
          className="inline-flex items-center gap-2 bg-ink text-paper-cream px-6 py-3 text-sm font-medium"
        >
          I&apos;ve completed payment — continue
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={() => startCheckout('monthly')}
          disabled={loading !== null}
          className="text-left p-8 bg-white border border-black/10 hover:border-sea transition-all disabled:opacity-60"
        >
          <div className="text-xs uppercase tracking-wider text-ink-mute mb-3">Monthly</div>
          <div className="font-serif text-4xl text-sea-deep mb-2">$9</div>
          <div className="text-sm text-ink-mute mb-6">per boat, per month</div>
          <div className="inline-flex items-center gap-2 bg-ink text-paper-cream px-5 py-2.5 text-sm font-medium">
            {loading === 'monthly' ? 'Loading…' : 'Start 14-day trial →'}
          </div>
        </button>

        <button
          onClick={() => startCheckout('yearly')}
          disabled={loading !== null}
          className="text-left p-8 bg-white border-2 border-sea hover:border-sea-deep transition-all disabled:opacity-60 relative"
        >
          <div className="absolute top-4 right-4 bg-sea text-paper-cream text-xs px-2 py-1 font-medium">
            Save 20%
          </div>
          <div className="text-xs uppercase tracking-wider text-ink-mute mb-3">Yearly</div>
          <div className="font-serif text-4xl text-sea-deep mb-2">$86</div>
          <div className="text-sm text-ink-mute mb-6">per boat, per year</div>
          <div className="inline-flex items-center gap-2 bg-sea text-paper-cream px-5 py-2.5 text-sm font-medium">
            {loading === 'yearly' ? 'Loading…' : 'Start 14-day trial →'}
          </div>
        </button>

        {error && (
          <div className="md:col-span-2 text-coral text-sm">{error}</div>
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={restore}
          disabled={restoring || loading !== null}
          className="text-sm font-medium text-sea-deep underline underline-offset-4 hover:text-sea disabled:opacity-60"
        >
          {restoring ? 'Restoring…' : 'Restore Purchases'}
        </button>
        {message && (
          <p className="mt-3 text-sm text-ink-mute">{message}</p>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-black/10 text-xs leading-relaxed text-ink-mute">
        <p className="mb-3">
          HullBook Premium is an auto-renewable subscription. Choose Monthly ($9 / month) or Yearly ($86 / year), each starting with a 14-day free trial.
          {native
            ? ' Payment is charged to your Apple Account at confirmation of purchase. The subscription renews automatically unless canceled at least 24 hours before the end of the current period. You can manage or cancel your subscription anytime in your Apple Account settings.'
            : ' Your subscription renews automatically unless you cancel before the end of the current period. You can manage or cancel anytime from your account settings.'}
        </p>
        <p>
          <a href={TERMS_URL} className="underline underline-offset-2 hover:text-sea-deep">Terms of Use (EULA)</a>
          {' · '}
          <a href={`/${locale}/privacy`} className="underline underline-offset-2 hover:text-sea-deep">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}
