import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Imprint — HullBook',
  description: 'Legal information about HullBook.',
}

export default async function ImprintPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <main style={{maxWidth:780,margin:'0 auto',padding:'80px 24px',fontFamily:'system-ui,-apple-system,sans-serif',color:'#0F172A',lineHeight:1.7}}>
      <Link href={`/${locale}`} style={{color:'#2563EB',textDecoration:'none',fontSize:14}}>← Back to HullBook</Link>
      <h1 style={{fontSize:40,fontWeight:800,letterSpacing:'-0.02em',marginTop:32,marginBottom:8}}>Imprint</h1>
      <p style={{color:'#64748B',marginBottom:48}}>Required by EU and DACH region disclosure laws (e.g. § 5 TMG).</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:24,marginBottom:12}}>Operator</h2>
      <p>HullBook<br/>Operated by INNOFA B.V.<br/>Tilburg, Netherlands</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>Contact</h2>
      <p>Email: hello@hullbook.com<br/>Support: hello@hullbook.com</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>Responsibility for content</h2>
      <p>Per § 55 RStV / Article 10 of the EU eCommerce Directive, the operator above is responsible for the content of this website.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>EU online dispute resolution</h2>
      <p>The European Commission provides a platform for online dispute resolution: <a href="https://ec.europa.eu/consumers/odr" style={{color:'#2563EB'}}>ec.europa.eu/consumers/odr</a>. We are not obligated to participate in dispute resolution proceedings before a consumer arbitration board.</p>
    </main>
  )
}
