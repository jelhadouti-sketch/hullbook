import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy — HullBook',
  description: 'How refunds work at HullBook.',
}

export default async function RefundPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <main style={{maxWidth:780,margin:'0 auto',padding:'80px 24px',fontFamily:'system-ui,-apple-system,sans-serif',color:'#0F172A',lineHeight:1.7}}>
      <Link href={`/${locale}`} style={{color:'#2563EB',textDecoration:'none',fontSize:14}}>← Back to HullBook</Link>
      <h1 style={{fontSize:40,fontWeight:800,letterSpacing:'-0.02em',marginTop:32,marginBottom:8}}>Refund Policy</h1>
      <p style={{color:'#64748B',marginBottom:48}}>Last updated: 31 May 2026</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>1. 14-day free trial</h2>
      <p>Every HullBook account starts with a 14-day free trial. You are not charged during the trial. If you cancel before the trial ends, you are never charged.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>2. 30-day money-back guarantee</h2>
      <p>If you are not satisfied within 30 days of your first paid charge, email hello@hullbook.com and we will issue a full refund. No questions asked.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>3. After 30 days</h2>
      <p>After 30 days, cancellations stop future renewals but past charges are non-refundable. You keep access until the end of the billing period you already paid for.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>4. How to cancel</h2>
      <p>One click from your account settings cancels the subscription. No phone calls, no retention pitches. You can also email hello@hullbook.com.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>5. EU consumer rights</h2>
      <p>If you are a consumer in the EU, you have an additional statutory right to withdraw within 14 days of starting a paid subscription, in line with EU directive 2011/83/EU. To exercise it, email hello@hullbook.com.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>6. Contact</h2>
      <p>hello@hullbook.com — replies within 24 hours on business days.</p>
    </main>
  )
}
