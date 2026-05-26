import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n'
import { BillingCheckout } from '@/components/billing/BillingCheckout'

export default async function BillingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw
  const dict = getDictionary(locale)

  return (
    <main className="min-h-screen bg-paper-cream py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl font-normal tracking-tight text-sea-deep mb-3">
          Start your 14-day free trial
        </h1>
        <p className="text-ink-mute mb-10 text-lg">
          No card required. Cancel anytime. Choose a plan to lock in your trial.
        </p>
        <BillingCheckout locale={locale} />
      </div>
    </main>
  )
}
