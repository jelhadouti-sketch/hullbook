import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Data Processing Agreement — HullBook',
  description: 'How HullBook processes your data as a controller and processor.',
}

export default async function DpaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <main style={{maxWidth:780,margin:'0 auto',padding:'80px 24px',fontFamily:'system-ui,-apple-system,sans-serif',color:'#0F172A',lineHeight:1.7}}>
      <Link href={`/${locale}`} style={{color:'#2563EB',textDecoration:'none',fontSize:14}}>← Back to HullBook</Link>
      <h1 style={{fontSize:40,fontWeight:800,letterSpacing:'-0.02em',marginTop:32,marginBottom:8}}>Data Processing Agreement</h1>
      <p style={{color:'#64748B',marginBottom:48}}>Last updated: 31 May 2026</p>

      <p>This DPA forms part of the agreement between you (the customer / data controller) and HullBook (the data processor) under Article 28 of the GDPR.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>1. Subject matter</h2>
      <p>HullBook processes personal data on your behalf solely to provide the service: storing the expense, service, trip, and account data you submit.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>2. Sub-processors</h2>
      <p>We use the following sub-processors. By using HullBook you authorize these:</p>
      <ul style={{paddingLeft:24,marginTop:8}}>
        <li><strong>Supabase</strong> (EU region) — database, authentication</li>
        <li><strong>Vercel</strong> — application hosting</li>
        <li><strong>Stripe</strong> — payment processing</li>
        <li><strong>Resend</strong> — transactional email</li>
      </ul>
      <p>We give 30 days notice before adding a new sub-processor.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>3. Security measures</h2>
      <p>See our Security page. We maintain appropriate technical and organizational measures consistent with industry standards.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>4. Data subject rights</h2>
      <p>You can export, correct, or delete any data via your settings or by emailing hello@hullbook.com. We respond within 30 days.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>5. Breach notification</h2>
      <p>If we become aware of a personal data breach, we notify you without undue delay and within 72 hours where feasible.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>6. Deletion</h2>
      <p>On account cancellation, we delete your data within 90 days (longer only where law requires retention, e.g. tax invoices for 7 years).</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>7. Signed version</h2>
      <p>For enterprise customers requiring a signed DPA, email hello@hullbook.com.</p>
    </main>
  )
}
