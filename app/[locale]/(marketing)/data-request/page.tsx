import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Data Request — HullBook',
  description: 'Exercise your GDPR / CCPA rights.',
}

export default async function DataRequestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <main style={{maxWidth:780,margin:'0 auto',padding:'80px 24px',fontFamily:'system-ui,-apple-system,sans-serif',color:'#0F172A',lineHeight:1.7}}>
      <Link href={`/${locale}`} style={{color:'#2563EB',textDecoration:'none',fontSize:14}}>← Back to HullBook</Link>
      <h1 style={{fontSize:40,fontWeight:800,letterSpacing:'-0.02em',marginTop:32,marginBottom:8}}>Your data, your rights</h1>
      <p style={{color:'#64748B',marginBottom:48}}>Under GDPR, CCPA, and similar laws.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:24,marginBottom:12}}>What you can request</h2>
      <ul style={{paddingLeft:24}}>
        <li style={{marginBottom:10}}><strong>Access</strong> — a copy of all data we hold about you</li>
        <li style={{marginBottom:10}}><strong>Correction</strong> — fix anything that&apos;s wrong</li>
        <li style={{marginBottom:10}}><strong>Deletion</strong> — erase your account and data</li>
        <li style={{marginBottom:10}}><strong>Portability</strong> — export your data in JSON or CSV</li>
        <li style={{marginBottom:10}}><strong>Opt-out</strong> — stop us from selling or sharing your data (we don&apos;t do either, but the right is yours)</li>
      </ul>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>How to request</h2>
      <p>Most requests can be done yourself in your account settings (export, delete). For anything else, email <strong>hello@hullbook.com</strong> from the email address on your account.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>Response time</h2>
      <p>We respond within 30 days. No fees for reasonable requests.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>If we say no</h2>
      <p>If we cannot complete your request, we explain why. You have the right to complain to your local data protection authority (in the Netherlands: <a href="https://autoriteitpersoonsgegevens.nl" style={{color:'#2563EB'}}>autoriteitpersoonsgegevens.nl</a>).</p>
    </main>
  )
}
