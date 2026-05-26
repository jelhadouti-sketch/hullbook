import { createClient } from '@supabase/supabase-js'

export type SubscriptionStatus =
  | 'trialing' | 'active' | 'past_due' | 'canceled'
  | 'incomplete' | 'incomplete_expired' | 'unpaid' | 'paused'

const ACTIVE_STATUSES: SubscriptionStatus[] = ['trialing', 'active']

export async function getUserSubscription(userId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) return null
  return data
}

export function hasActiveSubscription(sub: { status?: string } | null): boolean {
  if (!sub?.status) return false
  return ACTIVE_STATUSES.includes(sub.status as SubscriptionStatus)
}
