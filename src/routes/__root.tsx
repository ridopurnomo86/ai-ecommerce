import * as React from 'react'
import { Link, Outlet, createRootRoute, useRouter } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

const NAV_LINKS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/products', label: 'Produk' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'Tentang' },
] as const

function RootComponent() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    setMenuOpen(false)
  }, [router.state.location.pathname])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav className="glass" style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: '1px solid rgba(244,63,94,0.1)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #f43f5e, #c084fc)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>✨</div>
            <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
              Glow<span className="gradient-text">Find</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="hidden-mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeProps={{ style: { color: 'var(--accent)', background: 'var(--accent-soft)' } }}
                activeOptions={{ exact: 'exact' in link ? link.exact : false }}
                style={{
                  padding: '0.5rem 1rem', borderRadius: 8, textDecoration: 'none',
                  color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem',
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                🛍️ Shop Now
              </button>
            </Link>
            <button
              id="nav-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              className="show-mobile"
              style={{
                background: 'var(--accent-soft)', border: '1px solid rgba(244,63,94,0.25)',
                borderRadius: 8, padding: '0.5rem', cursor: 'pointer', color: 'var(--accent)',
                fontSize: '1.2rem', lineHeight: 1,
              }}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)',
            padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeProps={{ style: { color: 'var(--accent)', background: 'var(--accent-soft)' } }}
                activeOptions={{ exact: 'exact' in link ? link.exact : false }}
                style={{
                  padding: '0.75rem 1rem', borderRadius: 8, textDecoration: 'none',
                  color: 'var(--text-secondary)', fontWeight: 500,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)',
        padding: '2.5rem 1.5rem',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'linear-gradient(135deg, #f43f5e, #c084fc)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                }}>✨</div>
                <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.1rem' }}>GlowFind</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Rekomendasi skincare terbaik dengan harga terjangkau. Powered by AI.
              </p>
            </div>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 12, fontSize: '0.9rem' }}>Navigasi</p>
              {NAV_LINKS.map((l) => (
                <div key={l.to} style={{ marginBottom: 8 }}>
                  <Link to={l.to} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>{l.label}</Link>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 12, fontSize: '0.9rem' }}>Kategori</p>
              {['Serum', 'Sunscreen', 'Moisturizer', 'Cleanser', 'Toner'].map((c) => (
                <div key={c} style={{ marginBottom: 8 }}>
                  <Link to="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>{c}</Link>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 12, fontSize: '0.9rem' }}>Info</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.7 }}>
                GlowFind adalah situs afiliasi Shopee untuk produk skincare & kecantikan Indonesia.
                Kami mendapat komisi dari setiap pembelian melalui link kami.
              </p>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 8, color: 'var(--text-muted)', fontSize: '0.8rem',
          }}>
            <span>© 2026 GlowFind. Semua hak dilindungi.</span>
            <span>Afiliasi Shopee Indonesia 🛍️</span>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
