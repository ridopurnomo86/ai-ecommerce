import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { blogPosts } from '@/data/products'

const CATEGORIES = ['Semua', 'Review', 'Tips', 'Trending']

export default function BlogView() {
  const [activeCategory, setActiveCategory] = React.useState('Semua')

  const filtered = activeCategory === 'Semua'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory)

  const [featured, ...rest] = filtered

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <p className="text-primary font-black text-xs uppercase tracking-widest">
          📖 GlowFind Blog
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-black tracking-tighter">
          Tips & Review <span className="gradient-text">Skincare</span>
        </h1>
        <p className="text-text-secondary max-w-xl mx-auto leading-relaxed font-medium">
          Panduan skincare berbahasa Indonesia yang jujur dan terpercaya. Semua produk yang kami review tersedia di Shopee dengan harga terbaik.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
              activeCategory === cat 
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-bg-card border-border-subtle text-text-muted hover:border-primary/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Post */}
      {featured && (
        <Link to="/blog/$slug" params={{ slug: featured.slug }} className="no-underline block mb-16 group">
          <div className="glow-card grid grid-cols-1 lg:grid-cols-2 overflow-hidden hover:border-primary/30 transition-all shadow-2xl shadow-black/40">
            <div className="relative min-h-[300px] overflow-hidden">
              <img src={featured.image} alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="badge badge-rose shadow-xl">⭐ Featured Post</span>
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="badge badge-purple">{featured.category}</span>
                <span className="text-text-muted text-xs font-bold uppercase tracking-widest">
                  {featured.readTime} min read • {featured.publishedAt}
                </span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-black leading-tight mb-6 group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8 text-sm md:text-base font-medium line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {featured.tags.map((t) => (
                  <span key={t} className="text-[0.65rem] font-black uppercase tracking-tighter text-rose-400 bg-rose-500/10 px-2 py-1 rounded">#{t}</span>
                ))}
              </div>
              <div className="text-primary font-black text-sm group-hover:underline flex items-center gap-2">
                BACA SELENGKAPNYA <span>→</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rest.map((post) => (
          <Link key={post.id} to="/blog/$slug" params={{ slug: post.slug }} className="no-underline group">
            <div className="glow-card overflow-hidden h-full flex flex-col group hover:border-primary/20 transition-all">
              <div className="relative pt-[56%] overflow-hidden">
                <img src={post.image} alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              </div>
              <div className="p-6 flex flex-1 flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge badge-purple text-[0.65rem]">{post.category}</span>
                  <span className="text-text-muted text-[0.65rem] font-bold uppercase tracking-widest">
                    {post.readTime} min read
                  </span>
                </div>
                <h3 className="font-bold text-lg leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-2 font-medium">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-[0.7rem] font-black uppercase tracking-widest text-text-muted">
                  <span>{post.publishedAt}</span>
                  <span className="text-primary group-hover:underline">BACA →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
