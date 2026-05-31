import { NextResponse } from 'next/server'

const KEY = '2ca8785729740d0be1871826c673099a'
const HOST = 'www.hullbook.com'

const URLS = [
  '/en', '/nl', '/fr', '/de', '/es', '/it',
  '/en/blog',
  '/en/blog/how-much-does-it-cost-to-own-a-boat',
  '/en/blog/boat-maintenance-checklist',
  '/en/blog/track-boat-expenses-taxes',
  '/en/blog/best-boat-ownership-apps-2026',
  '/en/blog/increase-boat-resale-value',
]

export async function GET() {
  const urlList = URLS.map((u) => `https://${HOST}${u}`)
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  })
  return NextResponse.json({ ok: res.ok, status: res.status, urls: urlList.length })
}
