import Link from 'next/link'

export const metadata = {
  title: 'Page not found — HullBook',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#faf7f1', color: '#0a1628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ textAlign: 'center', maxWidth: 480, padding: 40 }}>
        <div style={{ fontSize: 96, fontFamily: 'serif', color: '#B8812E', lineHeight: 1, marginBottom: 24 }}>404</div>
        <h1 style={{ fontFamily: 'serif', fontSize: 32, marginBottom: 16, fontWeight: 400 }}>Off the chart.</h1>
        <p style={{ color: '#4a5f7d', marginBottom: 32, lineHeight: 1.6 }}>
          The page you are looking for has drifted out of port. Let us guide you back.
        </p>
        <Link href="/" style={{ display: 'inline-block', backgroundColor: '#0a1628', color: '#faf7f1', padding: '14px 28px', borderRadius: 999, textDecoration: 'none', fontWeight: 500 }}>
          Return to HullBook
        </Link>
      </div>
    </main>
  )
}
