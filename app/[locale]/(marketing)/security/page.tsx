import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Security — HullBook',
  description: 'How we protect your data.',
}

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <main style={{maxWidth:780,margin:'0 auto',padding:'80px 24px',fontFamily:'system-ui,-apple-system,sans-serif',color:'#0F172A',lineHeight:1.7}}>
      <Link href={`/${locale}`} style={{color:'#2563EB',textDecoration:'none',fontSize:14}}>← Back to HullBook</Link>
      <h1 style={{fontSize:40,fontWeight:800,letterSpacing:'-0.02em',marginTop:32,marginBottom:8}}>Security</h1>
      <p style={{color:'#64748B',marginBottom:48}}>Last updated: 31 May 2026</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>Encryption</h2>
      <p>All connections to HullBook use TLS 1.2 or higher. Your data is encrypted at rest in the database using AES-256.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>Authentication</h2>
      <p>Passwords are hashed with bcrypt. Account access requires email verification. Optional two-factor authentication via authenticator app is available in settings.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>Payment data</h2>
      <p>HullBook never stores credit card numbers. Card details are handled directly by Stripe, a PCI-DSS Level 1 certified processor.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>Infrastructure</h2>
      <p>Hosted on Vercel (SOC 2 Type II) with database on Supabase (SOC 2 Type II). Both providers maintain ISO 27001 certified infrastructure.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>Backups</h2>
      <p>The database is backed up daily with point-in-time recovery. Backups are retained for 7 days.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>Responsible disclosure</h2>
      <p>If you discover a security issue, please email <strong>security@hullbook.com</strong>. We do not pursue legal action against researchers who follow responsible disclosure (give us 90 days to fix before publishing).</p>
    </main>
  )
}
