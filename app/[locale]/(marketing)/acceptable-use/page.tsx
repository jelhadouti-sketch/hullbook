import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Acceptable Use Policy — HullBook',
  description: 'Rules for using HullBook.',
}

export default async function AupPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <main style={{maxWidth:780,margin:'0 auto',padding:'80px 24px',fontFamily:'system-ui,-apple-system,sans-serif',color:'#0F172A',lineHeight:1.7}}>
      <Link href={`/${locale}`} style={{color:'#2563EB',textDecoration:'none',fontSize:14}}>← Back to HullBook</Link>
      <h1 style={{fontSize:40,fontWeight:800,letterSpacing:'-0.02em',marginTop:32,marginBottom:8}}>Acceptable Use Policy</h1>
      <p style={{color:'#64748B',marginBottom:48}}>Last updated: 31 May 2026</p>

      <p>To keep HullBook safe and reliable for everyone, you agree not to:</p>
      <ul style={{paddingLeft:24,marginTop:16}}>
        <li style={{marginBottom:12}}>Upload illegal content, content that infringes intellectual property, or content that violates the privacy of others.</li>
        <li style={{marginBottom:12}}>Use HullBook to send unsolicited messages, spam, or malware.</li>
        <li style={{marginBottom:12}}>Attempt to access another user&apos;s account or data without permission.</li>
        <li style={{marginBottom:12}}>Reverse-engineer, decompile, or attempt to extract the source code.</li>
        <li style={{marginBottom:12}}>Use the service for activities that compete directly with HullBook in a way that misuses our API or data.</li>
        <li style={{marginBottom:12}}>Overload, attack, or attempt to disrupt the service (DoS, brute-force, scraping at high rates).</li>
        <li style={{marginBottom:12}}>Resell or sublicense HullBook without a written agreement.</li>
      </ul>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>Enforcement</h2>
      <p>We may suspend or terminate accounts that violate this policy. For serious violations, we may also notify law enforcement.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>Reporting abuse</h2>
      <p>If you see something that violates this policy, email hello@hullbook.com.</p>
    </main>
  )
}
