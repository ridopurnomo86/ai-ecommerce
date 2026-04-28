import * as React from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { products } from '@/data/products'
import { filterProducts, formatPrice, searchProducts, parseNaturalQuery } from '@/lib/search'
import type { FilterState, ProductCategory, SkinType } from '@/types/product'

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
})

export const Route = createFileRoute('/products')({
  validateSearch: searchSchema,
  component: ProductsPage,
})

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  skinType: 'all',
  maxPrice: 500000,
  minRating: 0,
  tags: [],
  sortBy: 'popular',
}

const CATEGORIES = ['all', 'serum', 'moisturizer', 'sunscreen', 'cleanser', 'toner', 'mask', 'eye-cream', 'body-care'] as const
const SKIN_TYPES = ['all', 'oily', 'dry', 'combination', 'sensitive', 'normal'] as const
const SORT_OPTIONS = [
  { value: 'popular', label: '🔥 Terpopuler' },
  { value: 'price-asc', label: '💰 Harga Terendah' },
  { value: 'price-desc', label: '💎 Harga Tertinggi' },
  { value: 'rating', label: '⭐ Rating Tertinggi' },
  { value: 'newest', label: '🆕 Terbaru' },
] as const

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="stars" style={{ fontSize: '0.75rem' }}>
      {'★'.repeat(Math.floor(rating))}
      {'☆'.repeat(5 - Math.floor(rating))}
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
          <img src={product.image} alt={product.name}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          {discount > 0 && (
            <span className="badge badge-rose" style={{ position: 'absolute', top: 8, right: 8 }}>-{discount}%</span>
          )}
          {product.tags.includes('bestseller') && (
            <span className="badge badge-purple" style={{ position: 'absolute', top: 8, left: 8 }}>🔥</span>
          )}
        </div>
        <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{product.brand}</p>
          <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.4, flex: 1 }}>{product.name}</p>
          <StarRating rating={product.rating} />
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{product.reviewCount.toLocaleString('id-ID')} ulasan</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '0.95rem' }}>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textDecoration: 'line-through' }}>{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

function ProductsPage() {
  const { category: urlCategory, q: urlQ } = Route.useSearch()
  const navigate = useNavigate({ from: '/products' })

  const [filters, setFilters] = React.useState<FilterState>({
    ...DEFAULT_FILTERS,
    category: (urlCategory as ProductCategory) ?? 'all',
  })
  const [searchQuery, setSearchQuery] = React.useState(urlQ ?? '')
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filtered = React.useMemo(() => {
    let base = searchQuery.trim()
      ? searchProducts(searchQuery)
      : products

    const intent = searchQuery.trim() ? parseNaturalQuery(searchQuery) : null
    const activeFilters: FilterState = {
      ...filters,
      category: intent?.category ?? filters.category,
      skinType: intent?.skinType ?? filters.skinType,
    }
    return filterProducts(activeFilters).filter((p) => base.includes(p))
  }, [filters, searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    void navigate({ search: { q: searchQuery, category: filters.category === 'all' ? undefined : filters.category } })
  }

  const Sidebar = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Category */}
      <div>
        <p style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 10 }}>Kategori</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => updateFilter('category', cat as ProductCategory | 'all')}
              style={{
                textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: 8, border: 'none',
                background: filters.category === cat ? 'var(--accent-soft)' : 'transparent',
                color: filters.category === cat ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: filters.category === cat ? 600 : 400,
                cursor: 'pointer', fontSize: '0.875rem', textTransform: 'capitalize',
              }}>
              {cat === 'all' ? '🌟 Semua Kategori' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skin Type */}
      <div>
        <p style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 10 }}>Jenis Kulit</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {SKIN_TYPES.map((st) => (
            <button key={st} onClick={() => updateFilter('skinType', st as SkinType | 'all')}
              style={{
                textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: 8, border: 'none',
                background: filters.skinType === st ? 'var(--accent-soft)' : 'transparent',
                color: filters.skinType === st ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: filters.skinType === st ? 600 : 400,
                cursor: 'pointer', fontSize: '0.875rem', textTransform: 'capitalize',
              }}>
              {st === 'all' ? 'Semua Kulit' : st === 'oily' ? '✦ Berminyak' : st === 'dry' ? '✦ Kering' : st === 'combination' ? '✦ Kombinasi' : st === 'sensitive' ? '✦ Sensitif' : '✦ Normal'}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 10 }}>
          Harga Maks: <span style={{ color: 'var(--accent)' }}>{formatPrice(filters.maxPrice)}</span>
        </p>
        <input type="range" min={25000} max={500000} step={25000} value={filters.maxPrice}
          onChange={(e) => updateFilter('maxPrice', parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
          <span>Rp25k</span><span>Rp500k</span>
        </div>
      </div>

      {/* Min Rating */}
      <div>
        <p style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 10 }}>Rating Minimum</p>
        <div style={{ display: 'flex', gap: 6 }}>
          {[0, 3, 4, 4.5].map((r) => (
            <button key={r} onClick={() => updateFilter('minRating', r)}
              style={{
                padding: '0.4rem 0.75rem', borderRadius: 8, border: '1px solid',
                borderColor: filters.minRating === r ? 'var(--accent)' : 'var(--border-subtle)',
                background: filters.minRating === r ? 'var(--accent-soft)' : 'transparent',
                color: filters.minRating === r ? 'var(--accent)' : 'var(--text-secondary)',
                cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
              }}>
              {r === 0 ? 'All' : `${r}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button onClick={() => setFilters(DEFAULT_FILTERS)} className="btn-ghost" style={{ width: '100%' }}>
        ↺ Reset Filter
      </button>
    </div>
  )

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: 8 }}>Semua Produk Skincare</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {filtered.length} produk tersedia · Link Shopee Resmi dengan Komisi Afiliasi
        </p>
      </div>

      {/* Search + Sort bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <form onSubmit={handleSearch} style={{ flex: 1, minWidth: 200, display: 'flex', gap: 8 }}>
          <input id="products-search" type="text" className="input-field" placeholder="Cari produk..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 1 }} />
          <button type="submit" className="btn-primary" style={{ padding: '0.625rem 1rem' }}>🔍</button>
        </form>
        <select id="sort-select" value={filters.sortBy}
          onChange={(e) => updateFilter('sortBy', e.target.value as FilterState['sortBy'])}
          className="input-field" style={{ width: 'auto', minWidth: 180 }}>
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="btn-ghost show-mobile">
          🎛️ Filter
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem' }}>
        {/* Desktop Sidebar */}
        <aside className="hidden-mobile" style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 16, padding: '1.5rem', height: 'fit-content', position: 'sticky', top: 80,
        }}>
          <Sidebar />
        </aside>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.7)',
          }} onClick={() => setSidebarOpen(false)}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 280,
              background: 'var(--bg-card)', padding: '1.5rem', overflowY: 'auto',
            }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <p style={{ fontWeight: 700 }}>Filter</p>
                <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
              </div>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 8 }}>Produk tidak ditemukan</p>
              <p style={{ fontSize: '0.875rem' }}>Coba ubah filter atau kata kunci pencarian</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: block !important; }
        }
      `}</style>
    </div>
  )
}
