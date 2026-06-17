import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n'
import { BillingCheckout } from '@/components/billing/BillingCheckout'

export const dynamic = 'force-dynamic'

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
          Add your payment details to start
        </h1>
        <p className="text-ink-mute mb-10 text-lg">
          Your 14-day free trial starts as soon as you add a card. You won&apos;t be charged until day 15. Cancel anytime with one click.
        </p>
        <div className="text-xs font-mono text-sea mb-4">build v2</div>
        <BillingCheckout locale={locale} />
      </div>
    </main>
  )
}
