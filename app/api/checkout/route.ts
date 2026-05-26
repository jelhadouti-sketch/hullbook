import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { stripe, PRICE_IDS, PlanInterval } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { interval, locale } = await req.json() as { interval: PlanInterval, locale: string }

    if (!PRICE_IDS[interval]) {
      return NextResponse.json({ error: 'Invalid plan interval' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const token = req.headers.get('authorization')?.replace('Bearer ', '')
      ?? req.cookies.get('sb-access-token')?.value

    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { data: { user } } = await supabase.auth.getUser(token)
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: { user_id: user.id },
      })
      customerId = customer.id
      await supabase.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id)
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hullbook.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: PRICE_IDS[interval], quantity: 1 }],
      subscription_data: {
        trial_period_days: 14,
        metadata: { user_id: user.id },
      },
      success_url: `${siteUrl}/${locale}/dashboard?checkout=success`,
      cancel_url: `${siteUrl}/${locale}/dashboard?checkout=cancelled`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (e: any) {
    console.error('[checkout]', e)
    return NextResponse.json({ error: e.message ?? 'Unknown error' }, { status: 500 })
  }
}
