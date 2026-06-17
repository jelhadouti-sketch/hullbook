import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export async function GET() {
  try {
    const supabase = admin()
    const { data, error } = await supabase.from('subscriptions').select('user_id, status, stripe_subscription_id')
    return NextResponse.json({ version: 'v4', count: data ? data.length : 0, error: error ? error.message : null, rows: data || [] })
  } catch (e: any) {
    return NextResponse.json({ version: 'v4', threw: e && e.message ? e.message : String(e) })
  }
}

export async function POST(req: NextRequest) {
  const supabase = admin()
  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.replace('Bearer ', '').trim()
  if (!token) return NextResponse.json({ error: 'No token' }, { status: 401 })

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) return NextResponse.json({ error: 'Invalid session' }, { status: 401 })

  let interval = 'monthly'
  try {
    const body = await req.json()
    if (body && body.interval) interval = body.interval
  } catch {}
  const productId = interval === 'yearly' ? 'com.hullbook.app.yearly' : 'com.hullbook.app.monthly'
  const days = interval === 'yearly' ? 365 : 31

  const { error: upsertError } = await supabase.from('subscriptions').upsert({
    user_id: user.id,
    stripe_subscription_id: 'rc_' + user.id,
    stripe_customer_id: 'rc_' + user.id,
    status: 'active',
    price_id: productId,
    current_period_end: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
    trial_end: null,
    cancel_at_period_end: false,
  }, { onConflict: 'stripe_subscription_id' })

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message, userId: user.id }, { status: 500 })
  }
  return NextResponse.json({ ok: true, userId: user.id })
}
