import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Boat Ownership Guides & Articles — HullBook Blog',
  description: 'Practical guides on boat ownership costs, maintenance schedules, tax deductions, resale value, and more. Written by and for boat owners.',
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: BLOG_POSTS.map((post, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: \`https://www.hullbook.com/\${locale}/blog/\${post.slug}\`,
      name: post.title,
    })),
  }

  return (
    <main className="bg-paper-cream min-h-screen"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <header className="max-w-4xl mx-auto px-6 py-16">
        <Link href={`/${locale}`} className="text-sea text-sm hover:text-coral">← Back to HullBook</Link>
        <h1 className="font-serif text-5xl mt-8 mb-4 text-ink">Boat ownership, written down.</h1>
        <p className="text-lg text-ink/70 max-w-2xl">Practical guides on costs, maintenance, taxes, and resale — from people who actually own boats.</p>
      </header>
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="block bg-white p-8 border border-black/10 rounded-2xl hover:border-sea transition"
            >
              <div className="text-xs text-coral uppercase tracking-wider mb-3 font-medium">{post.readMinutes} min read · {post.publishedAt}</div>
              <h2 className="font-serif text-2xl text-ink mb-3">{post.title}</h2>
              <p className="text-ink/70 leading-relaxed">{post.description}</p>
              <div className="text-sea text-sm mt-4 font-medium">Read article →</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
