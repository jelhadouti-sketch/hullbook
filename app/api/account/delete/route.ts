// hullbook: account-deletion route (Apple Guideline 5.1.1(v))
import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  }

  const admin = createAdminClient();

  // Remove the user's profile row. If your boats/expenses/maintenance/trips
  // tables reference auth.users with ON DELETE CASCADE, they are removed
  // automatically when the auth user is deleted below. If they do NOT cascade,
  // add explicit deletes here, e.g.:
  //   await admin.from('boats').delete().eq('user_id', user.id);
  await admin.from('profiles').delete().eq('id', user.id);

  // Permanently delete the auth user — removes the account entirely.
  const { error } = await admin.auth.admin.deleteUser(user.id);
  if (error) {
    console.error('[account/delete] deleteUser failed:', error);
    return NextResponse.json({ ok: false, error: 'delete_failed' }, { status: 500 });
  }

  // Best-effort sign-out to clear session cookies.
  try {
    await supabase.auth.signOut();
  } catch {
    // session already invalid after deletion — safe to ignore
  }

  return NextResponse.json({ ok: true });
}
