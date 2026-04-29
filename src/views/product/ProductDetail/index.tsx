import { useState } from "react";
import { getRouteApi, Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/search";

const route = getRouteApi("/products/$productId");

export default function ProductDetail() {
  const { product, related } = route.useLoaderData();
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(
    product.volume || "Standard",
  );

  const displayImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div className="bg-bg-primary min-h-screen text-text-primary animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-12">
          <Link to="/" className="hover:text-primary transition-colors no-underline">
            Home
          </Link>
          <span className="opacity-30">/</span>
          <Link to="/products" className="hover:text-primary transition-colors no-underline">
            Products
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-text-secondary font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left Column: Images */}
          <div className="flex flex-col gap-6">
            <div className="bg-bg-card border border-border-subtle rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-12 shadow-2xl shadow-black/40 group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`aspect-square bg-bg-card border-2 rounded-2xl p-3 transition-all ${
                    selectedImage === img && idx === 0
                      ? "border-primary shadow-lg shadow-primary/20"
                      : "border-border-subtle hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col pt-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="badge badge-rose">
                {product.category.toUpperCase()}
              </span>
              <span className="text-xs font-bold text-text-muted uppercase tracking-widest">
                {product.brand}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
              {product.name}
            </h1>
            
            <div className="text-3xl font-black text-primary mb-8 flex items-baseline gap-2">
              {formatPrice(product.price)}
              {product.originalPrice && (
                <span className="text-lg text-text-muted font-bold line-through decoration-rose-500/30 ml-2">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-lg leading-relaxed text-text-secondary mb-10 max-w-xl">
              {product.description}
            </p>

            <div className="mb-10 p-6 bg-bg-card border border-border-subtle rounded-2xl shadow-xl shadow-black/10">
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm font-bold text-text-primary">Ketersediaan Stok</div>
                <div className={`text-xs font-black uppercase tracking-widest ${product.inStock ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {product.inStock ? "Tersedia" : "Stok Habis"}
                </div>
              </div>
              <div className="h-2 bg-bg-elevated rounded-full overflow-hidden w-full">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-purple-500 transition-all duration-1000"
                  style={{ width: product.inStock ? "65%" : "0%" }}
                ></div>
              </div>
              <p className="text-[0.7rem] text-text-muted mt-3 italic">
                *Pesanan biasanya diproses dalam 24 jam kerja.
              </p>
            </div>

            <div className="mb-10">
              <div className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4 px-1">Ukuran Tersedia</div>
              <div className="flex flex-wrap gap-3">
                {[
                  product.volume || "Standard",
                  "Value Size",
                  "Travel Size",
                ].map((size) => (
                  <button
                    key={size}
                    className={`px-8 py-4 rounded-2xl border-2 transition-all text-sm font-bold ${
                      selectedSize === size
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                        : "bg-bg-card border-border-subtle text-text-secondary hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                className="btn-primary flex-1 py-5 rounded-2xl text-lg font-black tracking-tight shadow-2xl shadow-primary/30 group"
                onClick={() => window.open(product.affiliateUrl, "_blank")}
              >
                <span>Beli di Shopee</span>
                <span className="group-hover:translate-x-1 transition-transform">🛍️</span>
              </button>
              <button className="flex items-center justify-center w-16 h-16 rounded-2xl bg-bg-card border-2 border-border-subtle text-text-muted hover:border-primary/50 hover:text-primary transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Cross Sell */}
            <div className="glow-card p-6 bg-gradient-to-br from-bg-card to-bg-elevated border-primary/10">
              <div className="flex justify-between items-center mb-5">
                <div className="text-sm font-black uppercase tracking-tighter text-primary">Sering Dibeli Bersama</div>
                <div className="flex gap-1">
                  <div className="w-4 h-1 rounded-full bg-primary"></div>
                  <div className="w-2 h-1 rounded-full bg-white/10"></div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-xl bg-white p-2 shadow-lg">
                  <img
                    src={related[0]?.image}
                    alt="Recommended"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-text-primary line-clamp-1">
                    {related[0]?.name || "Recommended Product"}
                  </div>
                  <div className="text-xs font-black text-emerald-400 mt-1">
                    {related[0] ? formatPrice(related[0].price) : ""}
                  </div>
                </div>
                <Link
                  to="/products/$productId"
                  params={{ productId: related[0]?.id || '' }}
                  className="btn-ghost py-2 px-4 text-xs font-black rounded-lg no-underline"
                >
                  LIHAT
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <section className="border-t border-border-subtle pt-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black mb-3 tracking-tighter">Produk <span className="gradient-text">Terkait</span></h2>
              <p className="text-text-muted font-medium">
                Pilihan lain yang mungkin Anda sukai
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-1 rounded-full bg-primary"></div>
              <div className="w-4 h-1 rounded-full bg-white/10"></div>
              <div className="w-4 h-1 rounded-full bg-white/10"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((prod) => (
              <div key={prod.id} className="flex flex-col group">
                <Link
                  to="/products/$productId"
                  params={{ productId: prod.id }}
                  className="bg-bg-card border border-border-subtle rounded-3xl aspect-square mb-6 overflow-hidden p-8 flex items-center justify-center transition-all duration-500 group-hover:border-primary/30 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/5 no-underline"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>
                <div className="px-2">
                  <span className="text-[0.65rem] font-black text-text-muted uppercase tracking-widest mb-2 block">
                    {prod.category}
                  </span>
                  <h3 className="text-base font-bold mb-2 text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                    {prod.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-primary">
                      {formatPrice(prod.price)}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-text-muted line-through text-xs font-bold">
                        {formatPrice(prod.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
