import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/blog'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'HullBook blog post'

export default async function OpengraphImage({
  params,
}: {
  params: { slug: string; locale: string }
}) {
  const post = getPostBySlug(params.slug)
  const title = post?.title ?? 'HullBook'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: '#0a1628',
          width: '100%',
          height: '100%',
          padding: 80,
          justifyContent: 'space-between',
          color: '#faf7f1',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 50,
              height: 50,
              background: '#B8812E',
              color: '#0a1628',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 700,
              borderRadius: 8,
            }}
          >
            H
          </div>
          <div style={{ fontSize: 32, fontWeight: 600 }}>HullBook</div>
        </div>
        <div style={{ fontSize: 60, lineHeight: 1.1, fontWeight: 600, color: '#faf7f1', maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 24, color: '#B8812E' }}>hullbook.com / blog</div>
          <div style={{ fontSize: 20, color: '#cccccc' }}>{post?.readMinutes ?? 5} min read</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
