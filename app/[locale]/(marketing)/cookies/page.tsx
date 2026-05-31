import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy — HullBook',
  description: 'How HullBook uses cookies and similar technologies.',
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <main style={{maxWidth:780,margin:'0 auto',padding:'80px 24px',fontFamily:'system-ui,-apple-system,sans-serif',color:'#0F172A',lineHeight:1.7}}>
      <Link href={`/${locale}`} style={{color:'#2563EB',textDecoration:'none',fontSize:14}}>← Back to HullBook</Link>
      <h1 style={{fontSize:40,fontWeight:800,letterSpacing:'-0.02em',marginTop:32,marginBottom:8}}>Cookie Policy</h1>
      <p style={{color:'#64748B',marginBottom:48}}>Last updated: 31 May 2026</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>1. What are cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They allow the site to remember your actions, preferences, and login state.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>2. The cookies we use</h2>
      <p><strong>Essential cookies (always on).</strong> These are required for the service to work and cannot be switched off. They include authentication tokens, language preferences (<code>hb_locale</code>), and currency preferences (<code>hb_currency</code>).</p>
      <p><strong>Analytics cookies (optional).</strong> If enabled, we use privacy-friendly analytics (no fingerprinting, no cross-site tracking) to understand how the product is used and improve it.</p>
      <p><strong>Advertising cookies (optional).</strong> If enabled, we may use cookies from Google Ads and similar networks to measure ad performance. These are set only after you accept them.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>3. Managing cookies</h2>
      <p>You can accept or reject non-essential cookies the first time you visit. You can change your choice anytime by clearing your browser cookies for hullbook.com.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>4. Third parties</h2>
      <p>Some cookies are set by third parties we use (Stripe for payments, Supabase for authentication, Vercel for hosting). These cookies are governed by their own policies.</p>

      <h2 style={{fontSize:22,fontWeight:700,marginTop:40,marginBottom:12}}>5. Contact</h2>
      <p>Questions about cookies? Email hello@hullbook.com.</p>
    </main>
  )
}
