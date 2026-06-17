import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json({ version: 'activate-v2', ts: Date.now() })
}

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.replace('Bearer ', '').trim()
  if (!token) return NextResponse.json({ error: 'No token' }, { status: 401 })

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return NextResponse.json({ error: 'Invalid session' }, { status: 401 })

  let interval = 'monthly'
  try {
    const body = await req.json()
    if (body && body.interval) interval = body.interval
  } catch {}
  const productId = interval === 'yearly' ? 'com.hullbook.app.yearly' : 'com.hullbook.app.monthly'
  const days = interval === 'yearly' ? 365 : 31

  try {
    await supabase.from('subscriptions').upsert({
      user_id: user.id,
      stripe_subscription_id: 'rc_' + user.id,
      stripe_customer_id: 'rc_' + user.id,
      status: 'active',
      price_id: productId,
      current_period_end: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
      trial_end: null,
      cancel_at_period_end: false,
    }, { onConflict: 'stripe_subscription_id' })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('[revenuecat activate]', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
