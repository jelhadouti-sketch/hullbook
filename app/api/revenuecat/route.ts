import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ACTIVE_TYPES = ['INITIAL_PURCHASE', 'RENEWAL', 'UNCANCELLATION', 'PRODUCT_CHANGE', 'NON_RENEWING_PURCHASE']

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (!process.env.REVENUECAT_WEBHOOK_AUTH || auth !== process.env.REVENUECAT_WEBHOOK_AUTH) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let payload: any
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const ev = payload?.event
  const userId = ev?.app_user_id
  if (!ev || !userId) return NextResponse.json({ received: true })

  const type = ev.type as string
  const isTrial = ev.period_type === 'TRIAL'
  const expirationMs = ev.expiration_at_ms as number | undefined
  const productId = ev.product_id as string | undefined

  let status: string
  let cancelAtPeriodEnd = false

  if (ACTIVE_TYPES.includes(type)) {
    status = isTrial ? 'trialing' : 'active'
  } else if (type === 'CANCELLATION') {
    status = isTrial ? 'trialing' : 'active'
    cancelAtPeriodEnd = true
  } else if (type === 'EXPIRATION') {
    status = 'canceled'
  } else if (type === 'BILLING_ISSUE') {
    status = 'past_due'
  } else {
    return NextResponse.json({ received: true })
  }

  try {
    await supabase.from('subscriptions').upsert({
      user_id: userId,
      stripe_subscription_id: 'rc_' + userId,
      stripe_customer_id: 'rc_' + userId,
      status,
      price_id: productId || 'revenuecat',
      current_period_end: expirationMs ? new Date(expirationMs).toISOString() : new Date().toISOString(),
      trial_end: null,
      cancel_at_period_end: cancelAtPeriodEnd,
    }, { onConflict: 'stripe_subscription_id' })
    return NextResponse.json({ received: true })
  } catch (e: any) {
    console.error('[revenuecat webhook]', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
