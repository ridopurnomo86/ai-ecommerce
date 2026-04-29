import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { products, blogPosts } from '@/data/products'
import { formatPrice, searchProducts, parseNaturalQuery } from '@/lib/search'

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
    <span className="flex items-center gap-0.5 text-amber-400 text-[0.75rem]">
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <span className="text-text-muted ml-1 font-medium">{rating}</span>
    </span>
  )
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <Link to="/products/$productId" params={{ productId: product.id }} className="no-underline group">
      <div className="glow-card overflow-hidden h-full flex flex-col group">
        <div className="relative pt-[100%] bg-bg-elevated overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {discount > 0 && (
            <span className="badge badge-rose absolute top-3 right-3 shadow-lg">
              -{discount}%
            </span>
          )}
          {product.tags.includes('bestseller') && (
            <span className="badge badge-purple absolute top-3 left-3 shadow-lg">
              🔥 Bestseller
            </span>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col gap-1.5">
          <p className="text-text-muted text-[0.72rem] font-bold uppercase tracking-widest">
            {product.brand}
          </p>
          <p className="font-semibold text-sm text-text-primary leading-snug flex-1 group-hover:text-primary transition-colors">
            {product.name}
          </p>
          <StarRating rating={product.rating} />
          <p className="text-[0.7rem] text-text-muted font-medium">
            {product.reviewCount.toLocaleString('id-ID')} ulasan
          </p>
          <div className="flex items-center gap-2 mt-auto pt-2">
            <span className="font-bold text-primary text-[1rem]">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-text-muted text-[0.8rem] line-through decoration-rose-500/30">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function HomeView() {
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
    <div className="bg-bg-primary text-text-primary">
      {/* Hero */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-top-8 duration-1000">
          <div className="badge badge-rose mb-8 py-1.5 px-4 text-xs font-bold shadow-xl shadow-rose-500/10 inline-flex">
            ✨ Powered by AI · Shopee Affiliate
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tighter">
            Temukan Skincare <br />
            <span className="gradient-text">Terbaik</span> untuk Kulitmu
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
            AI kami membantu menemukan produk skincare yang tepat berdasarkan jenis kulit, budget, dan kebutuhanmu. Hemat lebih banyak dengan link Shopee Affiliate resmi.
          </p>

          {/* AI Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1 group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl group-focus-within:scale-110 transition-transform">🤖</span>
              <input
                id="hero-search"
                type="text"
                className="input-field pl-14 py-4 text-lg"
                placeholder='Coba: "serum murah untuk kulit berminyak"'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary py-4 px-10 text-lg shadow-2xl shadow-primary/30 active:scale-95 transition-all">
              Cari Sekarang
            </button>
          </form>

          {/* Search hints */}
          <div className="flex gap-2 justify-center flex-wrap">
            {['serum vitamin c', 'sunscreen spf 50', 'moisturizer kulit kering', 'toner korea'].map((hint) => (
              <button
                key={hint}
                onClick={() => setSearchQuery(hint)}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-muted hover:text-white hover:bg-white/10 hover:border-primary/50 text-xs font-bold transition-all"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mt-24 text-center border-t border-white/5 pt-16">
          {[
            { num: '100+', label: 'Produk Dikurasi' },
            { num: '⚡', label: 'Link Resmi Shopee' },
            { num: 'AI', label: 'Smart Search' },
          ].map((s) => (
            <div key={s.label} className="group">
              <div className="gradient-text text-3xl font-black group-hover:scale-110 transition-transform">{s.num}</div>
              <div className="text-text-muted text-xs font-bold uppercase tracking-widest mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Search Results */}
      {hasSearched && (
        <section className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-border-subtle">
            <div>
              <h2 className="text-2xl font-black tracking-tight">
                Hasil untuk <span className="text-primary">"{searchQuery}"</span>
              </h2>
              <p className="text-text-muted text-sm font-medium mt-1">{searchResults.length} produk ditemukan</p>
            </div>
            <button onClick={() => { setHasSearched(false); setSearchQuery('') }} className="btn-ghost flex items-center gap-2">
              <span>✕</span> Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-primary font-black text-xs uppercase tracking-widest mb-2">Discovery</p>
          <h2 className="text-4xl font-black tracking-tight mb-2">Kategori Produk</h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to="/products" search={{ category: cat.id }} className="no-underline group">
              <div className="glow-card p-8 text-center cursor-pointer flex flex-col items-center gap-3 transition-all group-hover:-translate-y-2 group-hover:border-primary/30">
                <div className="text-4xl group-hover:scale-125 transition-transform duration-500">{cat.icon}</div>
                <div className="font-bold text-sm text-text-primary">{cat.label}</div>
                <div className="text-text-muted text-[0.65rem] font-bold uppercase tracking-widest group-hover:text-primary">{cat.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-bg-card/30 rounded-[3rem] border border-white/5 my-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <p className="text-primary font-black text-xs uppercase tracking-widest mb-2">🔥 Hot Picks</p>
            <h2 className="text-4xl font-black tracking-tight mb-2">Bestseller Bulan Ini</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full" />
          </div>
          <Link to="/products" className="no-underline">
            <button className="btn-ghost group">
              Lihat Semua <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Budget Picks */}
      <section className="bg-bg-card border-y border-white/5 py-24 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <p className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-2">💚 Hemat & Efektif</p>
              <h2 className="text-4xl font-black tracking-tight mb-2">Budget Picks Terbaik</h2>
              <div className="h-1.5 w-20 bg-emerald-500/50 rounded-full" />
            </div>
            <Link to="/products" className="no-underline">
              <button className="btn-ghost group text-emerald-400 hover:bg-emerald-500/10">
                Explore Budget <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {budgetPicks.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <p className="text-purple-400 font-black text-xs uppercase tracking-widest mb-2">📖 Skincare Bible</p>
            <h2 className="text-4xl font-black tracking-tight mb-2">Artikel & Tips Terbaru</h2>
            <div className="h-1.5 w-20 bg-purple-500/50 rounded-full" />
          </div>
          <Link to="/blog" className="no-underline">
            <button className="btn-ghost group text-purple-400 hover:bg-purple-500/10">
              Semua Artikel <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post) => (
            <Link key={post.id} to="/blog/$slug" params={{ slug: post.slug }} className="no-underline group">
              <div className="glow-card overflow-hidden h-full flex flex-col group hover:border-purple-500/30">
                <div className="relative overflow-hidden h-52">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-purple shadow-xl">{post.category}</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4 text-xs font-bold text-text-muted">
                    <span>{post.readTime} min read</span>
                    <span>•</span>
                    <span className="uppercase tracking-widest">Tutorial</span>
                  </div>
                  <h3 className="font-bold text-xl leading-snug text-text-primary group-hover:text-purple-400 transition-colors mb-4">
                    {post.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-xs font-black text-purple-400 group-hover:underline">
                    BACA SELENGKAPNYA <span>↗</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-32 bg-gradient-to-br from-rose-500/10 via-purple-500/10 to-transparent border-y border-white/5 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-6xl mb-8 animate-bounce">✨</div>
          <h2 className="font-serif text-4xl md:text-5xl font-black mb-8 tracking-tighter">
            Siap untuk Kulit <span className="gradient-text">Glowing?</span>
          </h2>
          <p className="text-lg text-text-secondary mb-12 leading-relaxed font-medium">
            Mulai journey skincare-mu hari ini. Temukan produk yang benar-benar bekerja untukmu dan dapatkan penawaran terbaik melalui link Shopee resmi kami.
          </p>
          <Link to="/products" className="no-underline">
            <button className="btn-primary py-5 px-12 text-lg shadow-2xl shadow-primary/30 hover:-translate-y-1 active:translate-y-0 transition-all font-black uppercase tracking-widest">
              🛍️ Mulai Explore
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
