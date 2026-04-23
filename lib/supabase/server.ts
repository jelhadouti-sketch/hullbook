import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './types';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `setAll` throws in Server Components — the middleware will
            // refresh the session before it reaches a component, so this
            // can be safely ignored.
          }
        },
      },
    },
  );
}

// Admin client for privileged server-side operations (e.g. inserting to
// waitlist without requiring auth). Uses the service role key — NEVER
// import this into client code.
export function createAdminClient() {
  const { createClient: createStandardClient } = require('@supabase/supabase-js') as
    typeof import('@supabase/supabase-js');

  return createStandardClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  );
}
