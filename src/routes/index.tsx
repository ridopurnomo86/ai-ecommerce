import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { products, blogPosts } from '@/data/products'
import { formatPrice, searchProducts, parseNaturalQuery } from '@/lib/search'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const CATEGORIES = [
  { id: 'serum', label: 'Serum', icon: '💧', desc: 'Aktif & Targeting' },
  { id: 'sunscreen', label: 'Sunscreen', icon: '☀️', desc: 'Proteksi UV' },
  { id: 'moisturizer', label: 'Moisturizer', icon: '🌿', desc: 'Hidrasi & Barrier' },
  { id: 'cleanser', label: 'Cleanser', icon: '🫧', desc: 'Bersih Optimal' },
  { id: 'toner', label: 'Toner', icon: '🌸', desc: 'Prep & Balance' },
  { id: 'mask', label: 'Mask', icon: '✨', desc: 'Treatment Intensif' },
] as const

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="stars" style={{ fontSize: '0.75rem' }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <span style={{ color: 'var(--text-muted)', marginLeft: 4 }}>{rating}</span>
    </span>
  )
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <Link to="/products/$productId" params={{ productId: product.id }} style={{ textDecoration: 'none' }}>
      <div className="glow-card" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative', paddingTop: '75%', background: 'var(--bg-elevated)' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
          {discount > 0 && (
            <span className="badge badge-rose" style={{ position: 'absolute', top: 10, right: 10 }}>
              -{discount}%
            </span>
          )}
          {product.tags.includes('bestseller') && (
            <span className="badge badge-purple" style={{ position: 'absolute', top: 10, left: 10 }}>
              🔥 Bestseller
            </span>
          )}
        </div>
        <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.brand}
          </p>
          <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.4, flex: 1 }}>
            {product.name}
          </p>
          <StarRating rating={product.rating} />
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {product.reviewCount.toLocaleString('id-ID')} ulasan
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto' }}>
            <span style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '1rem' }}>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'line-through' }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

function HomePage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [searchResults, setSearchResults] = React.useState<typeof products>([])
  const [hasSearched, setHasSearched] = React.useState(false)

  const bestSellers = products.filter((p) => p.tags.includes('bestseller')).slice(0, 4)
  const budgetPicks = products.filter((p) => p.tags.includes('budget')).slice(0, 4)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    const intent = parseNaturalQuery(searchQuery)
    const results = searchProducts(searchQuery)
    setSearchResults(results.slice(0, 8))
    setHasSearched(true)
    console.log('Search intent:', intent)
  }

  return (
    <div>
      {/* Hero */}
      <section className="hero-bg" style={{ padding: '5rem 1.5rem 4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="badge badge-rose" style={{ marginBottom: '1.5rem', fontSize: '0.8rem' }}>
            ✨ Powered by AI · Shopee Affiliate
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Temukan Skincare{' '}
            <span className="gradient-text">Terbaik</span>{' '}
            untuk Kulitmu
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 560, margin: '0 auto 2.5rem' }}>
            AI kami membantu menemukan produk skincare yang tepat berdasarkan jenis kulit, budget, dan kebutuhanmu. Hemat lebih banyak dengan link Shopee Affiliate.
          </p>

          {/* AI Search Bar */}
          <form onSubmit={handleSearch} style={{ maxWidth: 560, margin: '0 auto', display: 'flex', gap: 8 }}>
            <input
              id="hero-search"
              type="text"
              className="input-field"
              placeholder='Coba: "serum murah untuk kulit berminyak"'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, padding: '0.875rem 1.25rem', fontSize: '0.95rem' }}
            />
            <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap', padding: '0.875rem 1.5rem' }}>
              🔍 Cari
            </button>
          </form>

          {/* Search hints */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
            {['serum vitamin c', 'sunscreen spf 50', 'moisturizer kulit kering', 'toner korea'].map((hint) => (
              <button
                key={hint}
                onClick={() => setSearchQuery(hint)}
                style={{
                  background: 'var(--accent-soft)', border: '1px solid rgba(244,63,94,0.2)',
                  borderRadius: 999, padding: '0.35rem 0.85rem', color: 'var(--text-secondary)',
                  fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {hint}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
          {[
            { num: '80+', label: 'Produk Dikurasi' },
            { num: '100%', label: 'Link Resmi Shopee' },
            { num: 'AI', label: 'Smart Search' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div className="gradient-text" style={{ fontSize: '1.75rem', fontWeight: 800 }}>{s.num}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Search Results */}
      {hasSearched && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '1.25rem' }}>
                Hasil untuk "{searchQuery}"
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{searchResults.length} produk ditemukan</p>
            </div>
            <button onClick={() => { setHasSearched(false); setSearchQuery('') }} className="btn-ghost">
              ✕ Clear
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {searchResults.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Categories */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Browse</p>
          <h2 style={{ fontWeight: 700, fontSize: '1.75rem', marginTop: 4 }}>Kategori Produk</h2>
          <div className="section-divider" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to="/products" search={{ category: cat.id }} style={{ textDecoration: 'none' }}>
              <div className="glow-card" style={{ padding: '1.5rem 1rem', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>{cat.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{cat.label}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{cat.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '1rem 1.5rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>🔥 Hot</p>
            <h2 style={{ fontWeight: 700, fontSize: '1.75rem', marginTop: 4 }}>Bestseller Bulan Ini</h2>
            <div className="section-divider" />
          </div>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <button className="btn-ghost">Lihat Semua →</button>
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Budget Picks */}
      <section style={{ background: 'var(--bg-card)', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <p style={{ color: '#34d399', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>💚 Hemat</p>
              <h2 style={{ fontWeight: 700, fontSize: '1.75rem', marginTop: 4 }}>Budget Picks Terbaik</h2>
              <div className="section-divider" />
            </div>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <button className="btn-ghost">Lihat Semua →</button>
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {budgetPicks.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Blog Teaser */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <p style={{ color: '#c084fc', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>📖 Tips & Review</p>
            <h2 style={{ fontWeight: 700, fontSize: '1.75rem', marginTop: 4 }}>Artikel Terbaru</h2>
            <div className="section-divider" />
          </div>
          <Link to="/blog" style={{ textDecoration: 'none' }}>
            <button className="btn-ghost">Semua Artikel →</button>
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {blogPosts.slice(0, 3).map((post) => (
            <Link key={post.id} to="/blog/$slug" params={{ slug: post.slug }} style={{ textDecoration: 'none' }}>
              <div className="glow-card" style={{ overflow: 'hidden', height: '100%' }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} loading="lazy" />
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{post.category}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{post.readTime} min read</span>
                  </div>
                  <h3 style={{ fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.45, color: 'var(--text-primary)' }}>
                    {post.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 6, lineHeight: 1.5 }}>
                    {post.excerpt.slice(0, 100)}…
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(244,63,94,0.15) 0%, rgba(192,132,252,0.1) 100%)',
        borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)',
        padding: '4rem 1.5rem', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
            Mulai Glowing Journey-mu
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Temukan produk skincare yang tepat untuk kulitmu dan dapatkan harga terbaik melalui link Shopee resmi kami.
          </p>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ padding: '0.875rem 2.5rem', fontSize: '1rem' }}>
              🛍️ Explore Semua Produk
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
