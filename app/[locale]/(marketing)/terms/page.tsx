import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — HullBook',
  description: 'The terms governing your use of HullBook.',
}

export default function TermsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en'
  return (
    <main style={{maxWidth:780,margin:'0 auto',padding:'80px 24px',fontFamily:'system-ui,-apple-system,sans-serif',color:'#0F172A',lineHeight:1.7}}>
      <Link href={`/${locale}`} style={{color:'#2563EB',textDecoration:'none',fontSize:14}}>← Back to HullBook</Link>
      <h1 style={{fontSize:40,fontWeight:800,letterSpacing:'-0.02em',marginTop:32,marginBottom:8}}>Terms of Service</h1>
      <p style={{color:'#64748B',marginBottom:48}}>Last updated: 7 May 2026</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>1. The service</h2>
      <p>HullBook is a software service that helps boat owners track expenses, services, and engine hours. By creating an account you agree to these terms.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>2. Your account</h2>
      <p>You are responsible for keeping your login credentials confidential and for all activity under your account. You must be 18 or older to use HullBook.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>3. Subscription and billing</h2>
      <p>HullBook is $9 per boat per month, or $86 per boat per year. The 14-day free trial does not require a card. After the trial you must add a payment method to continue. Subscriptions renew automatically until cancelled.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>4. Refunds</h2>
      <p>If you cancel within 30 days of your first paid charge and email us at hello@hullbook.com, we issue a full refund. After 30 days, cancellation stops future renewals but past charges are non-refundable.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>5. Cancellation</h2>
      <p>Cancel anytime from your settings page. Your account remains active until the end of the paid period. You can export your data for 90 days after cancellation.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>6. Acceptable use</h2>
      <p>Do not abuse, reverse-engineer, or attempt to disrupt the service. Do not upload illegal content. We reserve the right to suspend accounts that violate these rules.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>7. No warranty</h2>
      <p>HullBook is provided "as is". We do our best to keep the service available and accurate, but we do not guarantee uninterrupted service or error-free data.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>8. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, our total liability is limited to the amount you paid in the 12 months before the event giving rise to the claim.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>9. Governing law</h2>
      <p>These terms are governed by the laws of the Netherlands. Disputes will be resolved in the courts of Tilburg, the Netherlands.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>10. Contact</h2>
      <p>Questions? Email hello@hullbook.com.</p>
    </main>
  )
}
