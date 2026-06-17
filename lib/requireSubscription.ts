import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getUserSubscription, hasActiveSubscription } from '@/lib/subscription'

/**
 * Server-side guard. Call at the top of every (app) page.
 * Redirects to /login if not signed in.
 * Redirects to /billing if no active trial or subscription.
 * Returns the authenticated user on success.
 */
export async function requireSubscription(locale: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/login`)

  const sub = await getUserSubscription(user.id)
  if (!hasActiveSubscription(sub)) {
    redirect(`/${locale}/billing`)
  }
  return { user, supabase }
}
