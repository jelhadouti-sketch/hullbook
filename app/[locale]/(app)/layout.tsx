import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n';
import { DashboardSidebar } from '@/components/app/DashboardSidebar';

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);

  // Load profile — created by the signup trigger
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashboardSidebar
        locale={locale}
        dict={dict}
        profile={
          profile
            ? { email: profile.email, fullName: profile.full_name }
            : { email: user.email ?? '', fullName: null }
        }
      />
      <main className="flex-1 p-6 md:p-10 bg-paper">{children}</main>
    </div>
  );
}
