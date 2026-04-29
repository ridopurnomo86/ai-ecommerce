import { Link } from '@tanstack/react-router'
import { blogPosts } from '@/data/products'
import { Route } from '@/routes/blog.$slug'

export default function BlogPostView() {
  const { post } = Route.useLoaderData()
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  const contentLines = post.content.split('\n').filter(Boolean)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-700">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-bold text-text-muted mb-10 uppercase tracking-widest">
        <Link to="/" className="hover:text-primary transition-colors no-underline">Home</Link>
        <span className="opacity-30">/</span>
        <Link to="/blog" className="hover:text-primary transition-colors no-underline">Blog</Link>
        <span className="opacity-30">/</span>
        <span className="text-text-primary truncate max-w-[150px] md:max-w-xs">{post.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Main Article */}
        <article className="lg:col-span-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="badge badge-purple">{post.category}</span>
            <div className="flex items-center gap-2 text-xs font-black text-text-muted uppercase tracking-tighter">
              <span>{post.readTime} min read</span>
              <span className="opacity-30">•</span>
              <span>{post.publishedAt}</span>
              <span className="opacity-30">•</span>
              <span className="text-primary">{post.author}</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-black leading-tight mb-10 tracking-tighter text-text-primary">
            {post.title}
          </h1>

          <div className="relative h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden mb-12 shadow-2xl shadow-black/40 border border-white/5">
            <img src={post.image} alt={post.title}
              className="absolute inset-0 w-full h-full object-cover" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((t) => (
              <span key={t} className="text-[0.65rem] font-black uppercase tracking-tighter text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-500/20">#{t}</span>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-8 text-text-secondary text-lg leading-relaxed font-medium">
            {contentLines.map((line, i) => {
              if (line.startsWith('## ')) {
                return (
                  <h2 key={i} className="font-serif text-2xl md:text-3xl font-black text-text-primary pt-10 pb-2 tracking-tighter border-b border-white/5">
                    {line.replace('## ', '')}
                  </h2>
                )
              }
              if (line.startsWith('### ')) {
                return (
                  <h3 key={i} className="text-xl font-black text-text-primary pt-6 tracking-tight">
                    {line.replace('### ', '')}
                  </h3>
                )
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <p key={i} className="font-black text-text-primary text-xl">
                    {line.replace(/\*\*/g, '')}
                  </p>
                )
              }
              if (line.match(/^\d+\. /)) {
                return (
                  <div key={i} className="flex gap-4 p-6 bg-bg-card/50 rounded-2xl border border-white/5">
                    <span className="text-primary font-black text-xl">→</span>
                    <p className="flex-1 text-text-primary font-bold">
                      {line.replace(/^\d+\. /, '')}
                    </p>
                  </div>
                )
              }
              return <p key={i}>{line}</p>
            })}
          </div>

          {/* CTA Card */}
          <div className="mt-20 p-10 rounded-[2.5rem] bg-gradient-to-br from-rose-500/10 via-purple-500/10 to-transparent border border-white/5 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors" />
            <div className="relative z-10">
              <p className="font-black text-2xl mb-3 tracking-tighter">
                Siap Mulai Skincare Journey-mu?
              </p>
              <p className="text-text-secondary font-medium mb-10 max-w-md mx-auto">
                Temukan produk yang benar-benar bekerja untukmu dengan harga terbaik di Shopee Affiliate kami.
              </p>
              <Link to="/products" className="no-underline">
                <button className="btn-primary py-4 px-10 text-lg font-black shadow-2xl shadow-primary/30 hover:-translate-y-1 active:translate-y-0 transition-all uppercase tracking-widest">
                  🛍️ Explore Semua Produk
                </button>
              </Link>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8 sticky top-24 hidden lg:block">
          <div className="glow-card p-8 shadow-2xl shadow-black/40">
            <p className="font-black text-xs uppercase tracking-widest text-primary mb-8">Artikel Terkait</p>
            <div className="space-y-6">
              {otherPosts.map((p) => (
                <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="no-underline group flex gap-4 items-start">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold leading-tight text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                      {p.title}
                    </p>
                    <p className="text-[0.65rem] font-black uppercase tracking-widest text-text-muted">
                      {p.readTime} min • {p.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="glow-card p-8 bg-gradient-to-br from-bg-card to-bg-elevated border-emerald-500/20 shadow-2xl shadow-black/40">
            <p className="font-black text-xs uppercase tracking-widest text-emerald-400 mb-4">💎 Kurasi Spesial</p>
            <p className="text-text-muted text-sm font-medium leading-relaxed mb-8">
              Produk skincare terbaik dengan harga terjangkau, dikurasi khusus oleh tim GlowFind.
            </p>
            <Link to="/products" className="no-underline">
              <button className="btn-ghost w-full py-4 text-xs font-black uppercase tracking-widest text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/30">
                LIHAT TOP PICKS →
              </button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
