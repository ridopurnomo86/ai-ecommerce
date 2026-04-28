import * as React from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { blogPosts } from '@/data/products'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug)
    if (!post) throw notFound()
    return { post }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post.title} | GlowFind Blog` },
      { name: 'description', content: loaderData?.post.excerpt },
    ],
  }),
  component: BlogPostPage,
})

function BlogPostPage() {
  const { post } = Route.useLoaderData()
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  const contentLines = post.content.split('\n').filter(Boolean)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link to="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</Link>
        <span>›</span>
        <span style={{ color: 'var(--text-primary)' }}>{post.title.slice(0, 40)}…</span>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem', alignItems: 'start' }}>
        {/* Main Article */}
        <article>
          {/* Meta */}
          <div style={{ display: 'flex', gap: 10, marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="badge badge-purple">{post.category}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{post.readTime} min read</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>·</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{post.publishedAt}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>·</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{post.author}</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: 1.25, marginBottom: '1.5rem' }}>
            {post.title}
          </h1>

          <img src={post.image} alt={post.title}
            style={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 16, marginBottom: '2rem' }} />

          {/* Tags */}
          <div style={{ display: 'flex', gap: 6, marginBottom: '2rem', flexWrap: 'wrap' }}>
            {post.tags.map((t) => (
              <span key={t} className="badge badge-rose" style={{ fontSize: '0.75rem' }}>#{t}</span>
            ))}
          </div>

          {/* Content */}
          <div style={{ lineHeight: 1.9, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            {contentLines.map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i} style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-primary)', margin: '2rem 0 1rem' }}>{line.replace('## ', '')}</h2>
              }
              if (line.startsWith('### ')) {
                return <h3 key={i} style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)', margin: '1.5rem 0 0.75rem' }}>{line.replace('### ', '')}</h3>
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{line.replace(/\*\*/g, '')}</p>
              }
              if (line.match(/^\d+\. /)) {
                return <p key={i} style={{ paddingLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700, marginRight: 6 }}>→</span>
                  {line.replace(/^\d+\. /, '')}
                </p>
              }
              return <p key={i} style={{ marginBottom: '1rem' }}>{line}</p>
            })}
          </div>

          {/* CTA */}
          <div style={{
            marginTop: '3rem', padding: '2rem', borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(244,63,94,0.1), rgba(192,132,252,0.08))',
            border: '1px solid var(--border-subtle)', textAlign: 'center',
          }}>
            <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>
              Siap Mulai Skincare Journey?
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Temukan produk yang tepat dengan harga terbaik di Shopee
            </p>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
                🛍️ Lihat Semua Produk
              </button>
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: 80 }} className="hidden-mobile">
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <p style={{ fontWeight: 700, marginBottom: '1rem' }}>Artikel Lainnya</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {otherPosts.map((p) => (
                <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} style={{ textDecoration: 'none', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <img src={p.image} alt={p.title} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '0.82rem', fontWeight: 600, lineHeight: 1.4, color: 'var(--text-primary)' }}>{p.title}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 3 }}>{p.readTime} min · {p.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '1.5rem' }}>
            <p style={{ fontWeight: 700, marginBottom: '0.75rem' }}>💎 Top Picks</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Produk skincare terbaik dengan harga terjangkau, kurasi khusus tim GlowFind.
            </p>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Lihat Produk →</button>
            </Link>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </div>
  )
}
