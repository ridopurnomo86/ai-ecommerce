import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { blogPosts } from '@/data/products'

export const Route = createFileRoute('/blog')({
  head: () => ({
    meta: [
      { title: 'Blog Skincare — Tips & Review Terbaik | GlowFind' },
      { name: 'description', content: 'Tips skincare, review produk, dan panduan kecantikan terpercaya dari tim GlowFind.' },
    ],
  }),
  component: BlogPage,
})

const CATEGORIES = ['Semua', 'Review', 'Tips', 'Trending']

function BlogPage() {
  const [activeCategory, setActiveCategory] = React.useState('Semua')

  const filtered = activeCategory === 'Semua'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory)

  const [featured, ...rest] = filtered

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
          📖 GlowFind Blog
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>
          Tips & Review <span className="gradient-text">Skincare</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
          Panduan skincare berbahasa Indonesia yang jujur dan terpercaya. Semua produk yang kami review tersedia di Shopee dengan harga terbaik.
        </p>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.5rem 1.25rem', borderRadius: 999, border: '1px solid',
              borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border-subtle)',
              background: activeCategory === cat ? 'var(--accent-soft)' : 'transparent',
              color: activeCategory === cat ? 'var(--accent)' : 'var(--text-secondary)',
              cursor: 'pointer', fontWeight: activeCategory === cat ? 700 : 400,
              fontSize: '0.875rem', transition: 'all 0.2s',
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Post */}
      {featured && (
        <Link to="/blog/$slug" params={{ slug: featured.slug }} style={{ textDecoration: 'none', display: 'block', marginBottom: '2.5rem' }}>
          <div className="glow-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', overflow: 'hidden' }}>
            <div style={{ position: 'relative', minHeight: 260 }}>
              <img src={featured.image} alt={featured.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(13,10,14,0.5), transparent)',
              }} />
              <span className="badge badge-rose" style={{ position: 'absolute', top: 16, left: 16 }}>⭐ Featured</span>
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
                <span className="badge badge-purple">{featured.category}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', alignSelf: 'center' }}>
                  {featured.readTime} min read · {featured.publishedAt}
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.35, marginBottom: '0.875rem' }}>
                {featured.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                {featured.excerpt}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {featured.tags.map((t) => (
                  <span key={t} className="badge badge-rose" style={{ fontSize: '0.72rem' }}>#{t}</span>
                ))}
              </div>
              <p style={{ color: 'var(--accent)', fontWeight: 600, marginTop: '1.25rem', fontSize: '0.9rem' }}>
                Baca Selengkapnya →
              </p>
            </div>
          </div>
        </Link>
      )}

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {rest.map((post) => (
          <Link key={post.id} to="/blog/$slug" params={{ slug: post.slug }} style={{ textDecoration: 'none' }}>
            <div className="glow-card" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', paddingTop: '56%' }}>
                <img src={post.image} alt={post.title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{post.category}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', alignSelf: 'center' }}>
                    {post.readTime} min
                  </span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.4, flex: 1, marginBottom: 10 }}>
                  {post.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: 12 }}>
                  {post.excerpt.slice(0, 100)}…
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{post.publishedAt}</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.82rem' }}>Baca →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
