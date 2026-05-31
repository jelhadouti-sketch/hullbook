import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, getPostBySlug } from '@/lib/blog'

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: \`/\${(await params).locale}/blog/\${slug}\`,
      languages: Object.fromEntries(['en','nl','fr','de','es','it'].map((l) => [l, \`https://www.hullbook.com/\${l}/blog/\${slug}\`])),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

function renderBody(body: string) {
  return body.split('\n\n').map((paragraph, i) => {
    if (paragraph.startsWith('## ')) {
      return <h2 key={i} className="font-serif text-3xl text-ink mt-12 mb-4">{paragraph.slice(3)}</h2>
    }
    // bold within text
    const parts = paragraph.split(/(\*\*[^*]+\*\*)/g)
    return (
      <p key={i} className="text-ink/80 leading-relaxed mb-5 text-lg">
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="text-ink font-semibold">{part.slice(2, -2)}</strong>
            : <span key={j}>{part}</span>
        )}
      </p>
    )
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://www.hullbook.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://www.hullbook.com/${locale}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.hullbook.com/${locale}/blog/${post.slug}` },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'HullBook' },
    publisher: {
      '@type': 'Organization',
      name: 'HullBook',
      logo: { '@type': 'ImageObject', url: 'https://www.hullbook.com/icon-512.png' },
    },
  }

  return (
    <main className="bg-paper-cream min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link href={`/${locale}/blog`} className="text-sea text-sm hover:text-coral">← All articles</Link>
        <header className="mt-8 mb-12">
          <div className="text-xs text-coral uppercase tracking-wider mb-3 font-medium">{post.readMinutes} min read · {post.publishedAt}</div>
          <h1 className="font-serif text-5xl text-ink leading-tight mb-4">{post.title}</h1>
          <p className="text-xl text-ink/60 leading-relaxed">{post.description}</p>
        </header>
        <div>{renderBody(post.body)}</div>
        <section className="mt-16 pt-12 border-t border-black/10">
          <h3 className="font-serif text-2xl text-ink mb-6">Related articles</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 4).map((rel) => (
              <Link key={rel.slug} href={`/${locale}/blog/${rel.slug}`} className="block p-5 bg-white border border-black/10 rounded-xl hover:border-sea transition">
                <div className="text-xs text-coral uppercase tracking-wider mb-2 font-medium">{rel.readMinutes} min</div>
                <div className="font-serif text-lg text-ink leading-tight">{rel.title}</div>
              </Link>
            ))}
          </div>
        </section>
        <footer className="mt-16 pt-12 border-t border-black/10">
          <div className="bg-ink text-paper-cream p-10 rounded-2xl text-center">
            <p className="text-sm text-brass uppercase tracking-wider mb-3">Ready?</p>
            <h3 className="font-serif text-3xl mb-4">Track every dollar your boat costs.</h3>
            <p className="text-paper-cream/70 mb-6">14-day free trial. Cancel anytime. 30-day money-back guarantee.</p>
            <Link href={`/${locale}/signup`} className="inline-flex bg-paper-cream text-ink px-8 py-3 rounded-full font-medium hover:bg-white transition">Start free trial</Link>
          </div>
        </footer>
      </article>
    </main>
  )
}
