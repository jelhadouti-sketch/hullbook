import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — HullBook',
  description: 'How HullBook collects, uses, and protects your data.',
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en'
  return (
    <main style={{maxWidth:780,margin:'0 auto',padding:'80px 24px',fontFamily:'system-ui,-apple-system,sans-serif',color:'#0F172A',lineHeight:1.7}}>
      <Link href={`/${locale}`} style={{color:'#2563EB',textDecoration:'none',fontSize:14}}>← Back to HullBook</Link>
      <h1 style={{fontSize:40,fontWeight:800,letterSpacing:'-0.02em',marginTop:32,marginBottom:8}}>Privacy Policy</h1>
      <p style={{color:'#64748B',marginBottom:48}}>Last updated: 7 May 2026</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>1. Who we are</h2>
      <p>HullBook is operated as a sole proprietorship based in Tilburg, the Netherlands. Contact: hello@hullbook.com.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>2. What we collect</h2>
      <p>We collect only what is needed to run your account: your email address, the boats and expenses you choose to log, and basic technical information (IP address, browser type) for security and abuse prevention.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>3. How we use it</h2>
      <p>To provide the service, send service-related emails (sign-in links, billing receipts, service reminders), and improve the product. We do not sell your data. We do not share it with advertisers.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>4. Where it lives</h2>
      <p>Your data is stored on Supabase (EU region) and processed by Vercel (hosting), Stripe (payments), and Resend (email). All transfers are encrypted.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>5. Your rights</h2>
      <p>Under GDPR you can access, export, correct, or delete your data at any time from your settings page, or by emailing hello@hullbook.com. We respond within 30 days.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>6. Cookies</h2>
      <p>We use a single essential cookie for authentication. We do not use tracking, advertising, or analytics cookies that identify you personally.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>7. Retention</h2>
      <p>Active accounts: data is kept while your account is active. After cancellation, you have 90 days to export. After that, your data is deleted, except where law requires retention (invoices: 7 years for tax compliance).</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>8. Changes</h2>
      <p>If we make material changes to this policy, we will email account holders at least 30 days before they take effect.</p>
    </main>
  )
}
