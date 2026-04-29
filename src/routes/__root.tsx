import * as React from "react";
import {
  Link,
  Outlet,
  createRootRoute,
  useRouter,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

const NAV_LINKS = [
  { to: "/", label: "Home", exact: true },
  { to: "/products", label: "Produk" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "Tentang" },
] as const;

function RootComponent() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setMenuOpen(false);
  }, [router.state.location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-bg-card/80 backdrop-blur-xl border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 no-underline group">
              <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-purple-400 rounded-xl flex items-center justify-center text-lg shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
                ✨
              </div>
              <span className="font-serif font-bold text-xl tracking-tight">
                Glow<span className="gradient-text">Find</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  activeOptions={{ exact: link.exact }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-all no-underline [&.active]:text-primary [&.active]:bg-primary/10 [&.active]:font-bold"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA & Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/products" className="no-underline">
                <button className="btn-primary py-2 px-4 text-[0.85rem]">
                  🛍️ Shop Now
                </button>
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg bg-primary/15 border border-primary/25 text-primary hover:bg-primary/25 transition-all text-xl"
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64 border-t border-border-subtle" : "max-h-0"}`}
        >
          <div className="px-4 py-6 space-y-1 bg-bg-card">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.exact }}
                className="block px-4 py-3 rounded-xl text-base font-medium text-text-secondary hover:text-primary hover:bg-primary/5 transition-all no-underline [&.active]:text-primary [&.active]:bg-primary/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-bg-card border-t border-border-subtle pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-purple-400 rounded-lg flex items-center justify-center text-base">
                  ✨
                </div>
                <span className="font-serif font-bold text-lg">GlowFind</span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed max-w-xs">
                Rekomendasi skincare terbaik dengan harga terjangkau. Powered by
                AI.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm uppercase tracking-widest text-text-primary mb-6">
                Navigasi
              </h4>
              <ul className="space-y-3 list-none p-0 m-0">
                {NAV_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-text-muted hover:text-primary no-underline transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm uppercase tracking-widest text-text-primary mb-6">
                Kategori
              </h4>
              <ul className="space-y-3 list-none p-0 m-0">
                {["Serum", "Sunscreen", "Moisturizer", "Cleanser", "Toner"].map(
                  (c) => (
                    <li key={c}>
                      <Link
                        to="/products"
                        className="text-sm text-text-muted hover:text-primary no-underline transition-colors"
                      >
                        {c}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm uppercase tracking-widest text-text-primary mb-6">
                Info
              </h4>
              <p className="text-sm text-text-muted leading-relaxed">
                GlowFind adalah situs afiliasi Shopee untuk produk skincare &
                kecantikan Indonesia. Kami mendapat komisi dari setiap pembelian
                melalui link kami.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted">
            <p>© 2026 GlowFind. Semua hak dilindungi.</p>
            <div className="flex items-center gap-4">
              <span>Afiliasi Shopee Indonesia 🛍️</span>
              <Link
                to="/admin"
                className="hover:text-primary transition-colors no-underline uppercase tracking-widest font-bold"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
