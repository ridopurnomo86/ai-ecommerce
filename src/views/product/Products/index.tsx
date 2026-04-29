import * as React from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { products } from "@/data/products";
import { formatPrice, searchProducts } from "@/lib/search";
import { trackClick } from "@/lib/analytics";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-amber-400 text-[0.7rem]">
      {"★".repeat(Math.floor(rating))}
      {"☆".repeat(5 - Math.floor(rating))}
      <span className="text-text-muted ml-1 font-medium">{rating}</span>
    </span>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id }}
      className="no-underline group h-full"
      onClick={() => trackClick(product.id)}
    >
      <div className="glow-card overflow-hidden h-full flex flex-col group transition-all duration-500 hover:border-primary/30">
        <div className="relative pt-[100%] bg-white overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {discount > 0 && (
            <span className="badge badge-rose absolute top-3 right-3 shadow-xl">
              -{discount}%
            </span>
          )}
          {product.tags.includes("bestseller") && (
            <span className="badge badge-purple absolute top-3 left-3 shadow-xl">
              🔥 Best
            </span>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col gap-1.5">
          <p className="text-text-muted text-[0.65rem] font-black uppercase tracking-widest">
            {product.brand}
          </p>
          <p className="font-bold text-sm text-text-primary leading-tight flex-1 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </p>
          <div className="flex items-center justify-between mt-1">
            <StarRating rating={product.rating} />
            <span className="text-[0.65rem] text-text-muted font-bold">
              {product.reviewCount}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
            <span className="font-black text-primary text-base">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-text-muted text-xs line-through opacity-50">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

const CATEGORIES = [
  { id: "all", label: "Semua Produk" },
  { id: "serum", label: "Serum" },
  { id: "sunscreen", label: "Sunscreen" },
  { id: "moisturizer", label: "Moisturizer" },
  { id: "cleanser", label: "Cleanser" },
  { id: "toner", label: "Toner" },
  { id: "mask", label: "Mask" },
];

export default function Products() {
  const search = useSearch({ from: "/products" }) as {
    category?: string;
    q?: string;
  };
  const [activeCategory, setActiveCategory] = React.useState(
    search.category || "all",
  );
  const [searchQuery, setSearchQuery] = React.useState(search.q || "");
  const [sortBy, setSortBy] = React.useState("popular");

  const filteredProducts = React.useMemo(() => {
    let result = searchQuery ? searchProducts(searchQuery) : products;

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (sortBy === "price-low")
      result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high")
      result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating")
      result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="bg-bg-primary min-h-screen">
      {/* Header Section */}
      <div className="bg-bg-card border-b border-white/5 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-black tracking-tighter mb-3">
                Katalog <span className="gradient-text">Skincare</span>
              </h1>
              <p className="text-text-secondary font-medium max-w-md">
                Temukan pilihan produk terbaik yang sudah dikurasi oleh AI kami
                untuk kebutuhan kulitmu.
              </p>
            </div>

            <div className="w-full max-w-md relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                🔍
              </span>
              <input
                type="text"
                placeholder="Cari brand atau jenis produk..."
                className="input-field pl-12 py-3.5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0 space-y-10">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6">
                Kategori
              </h3>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeCategory === cat.id
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5"
                        : "text-text-muted hover:text-text-primary hover:bg-white/5"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6">
                Urutkan
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
              >
                <option value="popular">Paling Populer</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-purple-500/5 border border-white/5">
              <p className="text-[0.6rem] font-black uppercase tracking-widest text-primary mb-3">
                Tips AI 🤖
              </p>
              <p className="text-xs text-text-muted leading-relaxed font-medium">
                Gunakan fitur pencarian natural di homepage untuk hasil yang
                lebih personal sesuai jenis kulitmu.
              </p>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-sm font-bold text-text-muted">
                Menampilkan{" "}
                <span className="text-text-primary">
                  {filteredProducts.length}
                </span>{" "}
                produk
              </p>
              <div className="h-px flex-1 mx-6 bg-white/5 hidden md:block" />
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-bg-card rounded-[3rem] border border-dashed border-white/10">
                <div className="text-5xl mb-6">🔍</div>
                <h3 className="text-xl font-bold mb-2">
                  Produk tidak ditemukan
                </h3>
                <p className="text-text-muted max-w-xs mx-auto">
                  Coba gunakan kata kunci lain atau reset filter kategori.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-8 btn-ghost text-primary font-black uppercase tracking-widest text-xs"
                >
                  Reset Semua Filter
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
