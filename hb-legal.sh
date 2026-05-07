#!/bin/bash
set -e
cd ~/Desktop/hullbook

mkdir -p "app/[locale]/(marketing)/privacy"
mkdir -p "app/[locale]/(marketing)/terms"

cat > "app/[locale]/(marketing)/privacy/page.tsx" << 'TSX'
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
TSX

cat > "app/[locale]/(marketing)/terms/page.tsx" << 'TSX'
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
TSX

# Update marketing page footer to use real /privacy and /terms links
python3 << 'PY'
from pathlib import Path
import re

p = Path("app/[locale]/(marketing)/page.tsx")
src = p.read_text()
orig = src

# Replace href="#" patterns next to "Privacy" and "Terms"
# Common patterns: <Link href="#">Privacy</Link>  or  href="#"...>Privacy
# Use the locale prop where possible

# Strategy: find Privacy and Terms links with href="#" and rewrite
src = re.sub(r'href="#"(\s*[^>]*?)>Privacy', r'href={`/${locale}/privacy`}\1>Privacy', src)
src = re.sub(r'href="#"(\s*[^>]*?)>Terms', r'href={`/${locale}/terms`}\1>Terms', src)

if src != orig:
    p.write_text(src)
    print("✓ footer links updated")
else:
    print("⚠ footer links not auto-updated — pattern didn't match. Will inspect.")
PY

git add -A && git commit -m "Add Privacy + Terms pages, fix footer links" && git push
echo "✓ Step 2 complete"
