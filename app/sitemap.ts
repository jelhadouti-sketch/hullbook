import type { MetadataRoute } from 'next'

const LOCALES = ['en', 'nl', 'fr', 'de', 'es', 'it'] as const

const PAGES = [
  '',                    // landing
  '/privacy',
  '/terms',
  '/cookies',
  '/refund',
  '/security',
  '/imprint',
  '/acceptable-use',
  '/dpa',
  '/data-request',
  '/login',
  '/signup',
] as const

const BASE = 'https://www.hullbook.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const page of PAGES) {
    for (const locale of LOCALES) {
      const url = `${BASE}/${locale}${page}`
      const alternates = Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE}/${l}${page}`])
      )
      entries.push({
        url,
        lastModified: now,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.7,
        alternates: { languages: alternates },
      })
    }
  }
  return entries
}
