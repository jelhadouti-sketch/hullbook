'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function BillingCheckout({ locale }: { locale: string }) {
  const [loading, setLoading] = useState<'monthly' | 'yearly' | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function startCheckout(interval: 'monthly' | 'yearly') {
    setError(null)
    setLoading(interval)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = `/${locale}/login`
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
      setError(e.message)
      setLoading(null)
    }
  }

  return (
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
  )
}
