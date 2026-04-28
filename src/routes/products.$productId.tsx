import * as React from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getProductById, getRelatedProducts, formatPrice } from '@/lib/search'
import { trackClick } from '@/lib/analytics'

export const Route = createFileRoute('/products/$productId')({
  loader: ({ params }) => {
    const product = getProductById(params.productId)
    if (!product) throw notFound()
    return { product, related: getRelatedProducts(product, 4) }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} — GlowFind` },
      { name: 'description', content: loaderData?.product.shortDesc },
    ],
  }),
  component: ProductDetailPage,
})

function StarRating({ rating, large = false }: { rating: number; large?: boolean }) {
  return (
    <span className="stars" style={{ fontSize: large ? '1.1rem' : '0.8rem' }}>
      {'★'.repeat(Math.floor(rating))}
      {'☆'.repeat(5 - Math.floor(rating))}
      <span style={{ color: 'var(--text-muted)', marginLeft: 6, fontSize: large ? '1rem' : '0.8rem' }}>{rating}</span>
    </span>
  )
}

function ProductDetailPage() {
  const { product, related } = Route.useLoaderData()
  const [activeTab, setActiveTab] = React.useState<'desc' | 'howto' | 'ingredients'>('desc')
  const [clicked, setClicked] = React.useState(false)
  const [showChatbot, setShowChatbot] = React.useState(false)
  const [chatMessages, setChatMessages] = React.useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: `Hai! Saya asisten GlowFind 💕 Ada pertanyaan tentang **${product.name}**? Saya siap membantu!` }
  ])
  const [chatInput, setChatInput] = React.useState('')
  const [chatLoading, setChatLoading] = React.useState(false)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleBuyClick = () => {
    trackClick({
      productId: product.id,
      productName: product.name,
      price: product.price,
      category: product.category,
    })
    setClicked(true)
    window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer')
    setTimeout(() => setClicked(false), 3000)
  }

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Cek produk ini di GlowFind 🌟\n${product.name} — ${formatPrice(product.price)}\n${window.location.href}`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || chatLoading) return

    const userMsg = chatInput.trim()
    setChatInput('')
    setChatMessages((prev) => [...prev, { role: 'user', text: userMsg }])
    setChatLoading(true)

    // Simulate AI response (replace with real Claude API call)
    await new Promise((r) => setTimeout(r, 1200))
    const aiReply = generateLocalAIReply(userMsg, product)
    setChatMessages((prev) => [...prev, { role: 'ai', text: aiReply }])
    setChatLoading(false)
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link to="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Produk</Link>
        <span>›</span>
        <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
      </nav>

      {/* Product Main */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        {/* Image */}
        <div>
          <div style={{
            borderRadius: 20, overflow: 'hidden', background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)', position: 'relative',
          }}>
            <img src={product.image} alt={product.name}
              style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
            {discount > 0 && (
              <div className="badge badge-rose" style={{ position: 'absolute', top: 16, right: 16, fontSize: '0.9rem', padding: '0.4rem 1rem' }}>
                Hemat {discount}%
              </div>
            )}
          </div>

          {/* Share */}
          <div style={{ display: 'flex', gap: 10, marginTop: '1rem' }}>
            <button onClick={handleWhatsAppShare}
              style={{
                flex: 1, padding: '0.75rem', borderRadius: 10, cursor: 'pointer',
                background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)',
                color: '#25d166', fontWeight: 600, fontSize: '0.875rem',
              }}>
              📲 Share WhatsApp
            </button>
            <button onClick={() => setShowChatbot(!showChatbot)}
              style={{
                flex: 1, padding: '0.75rem', borderRadius: 10, cursor: 'pointer',
                background: 'var(--accent-soft)', border: '1px solid rgba(244,63,94,0.3)',
                color: 'var(--accent)', fontWeight: 600, fontSize: '0.875rem',
              }}>
              🤖 Tanya AI
            </button>
          </div>
        </div>

        {/* Info */}
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge badge-rose" style={{ fontSize: '0.72rem' }}>{tag}</span>
            ))}
            {product.tags.includes('bpom') && <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>✓ BPOM</span>}
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
            {product.brand}
          </p>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2rem)', lineHeight: 1.25, marginBottom: '1rem' }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
            <StarRating rating={product.rating} large />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              ({product.reviewCount.toLocaleString('id-ID')} ulasan)
            </span>
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.925rem' }}>
            {product.shortDesc}
          </p>

          {/* Price */}
          <div style={{
            background: 'var(--bg-elevated)', borderRadius: 14, padding: '1.25rem',
            border: '1px solid var(--border-subtle)', marginBottom: '1.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {discount > 0 && (
              <p style={{ color: '#34d399', fontSize: '0.85rem', marginTop: 4, fontWeight: 600 }}>
                💚 Hemat {formatPrice((product.originalPrice ?? 0) - product.price)} ({discount}% off)
              </p>
            )}
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 6 }}>
              Via Shopee Affiliate · Komisi {Math.round(product.commissionRate * 100)}%
            </p>
          </div>

          {/* Specs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1.5rem' }}>
            {product.volume && (
              <div style={{ background: 'var(--bg-elevated)', borderRadius: 10, padding: '0.75rem 1rem', border: '1px solid var(--border-subtle)' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Volume</p>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: 2 }}>{product.volume}</p>
              </div>
            )}
            <div style={{ background: 'var(--bg-elevated)', borderRadius: 10, padding: '0.75rem 1rem', border: '1px solid var(--border-subtle)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Kategori</p>
              <p style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: 2, textTransform: 'capitalize' }}>{product.category}</p>
            </div>
            <div style={{ background: 'var(--bg-elevated)', borderRadius: 10, padding: '0.75rem 1rem', border: '1px solid var(--border-subtle)', gridColumn: product.volume ? 'auto' : 'span 2' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cocok untuk</p>
              <p style={{ fontWeight: 600, fontSize: '0.875rem', marginTop: 2, textTransform: 'capitalize' }}>
                {product.skinTypes.join(', ')}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button id={`buy-${product.id}`} onClick={handleBuyClick} className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem', borderRadius: 12 }}>
              {clicked ? '✓ Redirecting ke Shopee...' : '🛍️ Beli di Shopee'}
            </button>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
              🔒 Link resmi Shopee Affiliate · Harga sama, kamu support kami gratis!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-subtle)', marginBottom: '3rem', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)' }}>
          {([
            { key: 'desc', label: '📋 Deskripsi' },
            { key: 'howto', label: '💡 Cara Pakai' },
            { key: 'ingredients', label: '🔬 Kandungan' },
          ] as const).map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1, padding: '1rem', border: 'none', cursor: 'pointer',
                background: activeTab === tab.key ? 'var(--accent-soft)' : 'transparent',
                color: activeTab === tab.key ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: activeTab === tab.key ? 700 : 400, fontSize: '0.875rem',
                borderBottom: activeTab === tab.key ? '2px solid var(--accent)' : '2px solid transparent',
              }}>
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ padding: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.925rem' }}>
          {activeTab === 'desc' && <p>{product.description}</p>}
          {activeTab === 'howto' && (
            <p>{product.howToUse ?? 'Gunakan 2-3 tetes pada wajah yang sudah dibersihkan. Tepuk-tepuk lembut hingga meresap. Gunakan pagi dan malam hari untuk hasil optimal.'}</p>
          )}
          {activeTab === 'ingredients' && (
            product.ingredients ? (
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {product.ingredients.map((ing) => (
                  <li key={ing} className="badge badge-rose" style={{ fontSize: '0.8rem' }}>{ing}</li>
                ))}
              </ul>
            ) : <p>Kandungan lengkap tersedia di halaman produk Shopee.</p>
          )}
        </div>
      </div>

      {/* AI Chatbot Widget */}
      {showChatbot && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, width: 340, zIndex: 200,
          background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', overflow: 'hidden',
        }}>
          <div style={{
            padding: '1rem 1.25rem', background: 'linear-gradient(135deg, rgba(244,63,94,0.2), rgba(192,132,252,0.15))',
            borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>🤖 GlowFind AI</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Asisten skincare online</p>
            </div>
            <button onClick={() => setShowChatbot(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
          </div>
          <div style={{ height: 280, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: msg.role === 'user' ? 'linear-gradient(135deg, #f43f5e, #e11d48)' : 'var(--bg-elevated)',
                color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                padding: '0.6rem 0.9rem', borderRadius: 12, fontSize: '0.82rem', lineHeight: 1.5,
              }}>
                {msg.text}
              </div>
            ))}
            {chatLoading && (
              <div style={{ alignSelf: 'flex-start', background: 'var(--bg-elevated)', padding: '0.6rem 1rem', borderRadius: 12 }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>⏳ Memproses...</span>
              </div>
            )}
          </div>
          <form onSubmit={handleChatSubmit} style={{ padding: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 8 }}>
            <input id="chatbot-input" type="text" className="input-field"
              placeholder="Tanya tentang produk ini..." value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.82rem' }} />
            <button type="submit" className="btn-primary" style={{ padding: '0.5rem 0.75rem' }}>➤</button>
          </form>
        </div>
      )}

      {/* Related Products */}
      <div>
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.5rem' }}>Produk Serupa</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {related.map((p) => (
            <Link key={p.id} to="/products/$productId" params={{ productId: p.id }} style={{ textDecoration: 'none' }}>
              <div className="glow-card" style={{ overflow: 'hidden' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: 150, objectFit: 'cover' }} loading="lazy" />
                <div style={{ padding: '0.875rem' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>{p.brand}</p>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem', marginTop: 4, lineHeight: 1.4 }}>{p.name}</p>
                  <p style={{ color: 'var(--accent)', fontWeight: 700, marginTop: 6 }}>{formatPrice(p.price)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function generateLocalAIReply(query: string, product: ReturnType<typeof getProductById>): string {
  if (!product) return 'Maaf, saya tidak dapat menemukan informasi produk ini.'
  const q = query.toLowerCase()
  if (q.includes('harga') || q.includes('mahal') || q.includes('murah')) {
    return `${product.name} dijual seharga ${formatPrice(product.price)}. ${product.originalPrice ? `Hemat ${formatPrice(product.originalPrice - product.price)} dari harga asli ${formatPrice(product.originalPrice)}!` : 'Harga sudah sangat terjangkau!'} 💰`
  }
  if (q.includes('cocok') || q.includes('jenis kulit') || q.includes('kulit')) {
    return `${product.name} cocok untuk kulit ${product.skinTypes.join(', ')}. ${product.skinTypes.includes('sensitive') ? 'Formula lembut untuk kulit sensitif!' : 'Pastikan coba patch test dulu ya! 😊'}`
  }
  if (q.includes('cara pakai') || q.includes('penggunaan') || q.includes('how to')) {
    return `Cara pakai ${product.name}: bersihkan wajah terlebih dahulu, lalu aplikasikan ${product.volume ?? 'secukupnya'}. Tepuk lembut hingga meresap. Gunakan pagi dan malam untuk hasil optimal! ✨`
  }
  if (q.includes('aman') || q.includes('bpom') || q.includes('bahaya')) {
    return product.tags.includes('bpom')
      ? `${product.name} sudah terdaftar BPOM sehingga aman digunakan. Tetap lakukan patch test jika baru pertama pakai ya! 🛡️`
      : `Selalu lakukan patch test sebelum penggunaan penuh. Hentikan jika terjadi iritasi dan konsultasikan ke dermatologis. 💕`
  }
  return `${product.name} adalah produk ${product.category} dari ${product.brand} dengan rating ${product.rating}⭐ dan ${product.reviewCount.toLocaleString('id-ID')} ulasan. ${product.shortDesc} Ada pertanyaan lain? 😊`
}
