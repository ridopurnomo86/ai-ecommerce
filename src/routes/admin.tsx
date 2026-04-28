import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { getTotalClicks, getTopClicked } from '@/lib/analytics'
import { getProductById, formatPrice } from '@/lib/search'

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const [topProducts, setTopProducts] = React.useState<{ name: string; count: number; price: number }[]>([])
  const [totalClicks, setTotalClicks] = React.useState(0)

  React.useEffect(() => {
    const total = getTotalClicks()
    setTotalClicks(total)

    const top = getTopClicked(5)
    const enriched = top.map(item => {
      const product = getProductById(item.productId)
      return {
        name: product?.name ?? 'Unknown',
        count: item.count,
        price: product?.price ?? 0
      }
    })
    setTopProducts(enriched)
  }, [])

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontWeight: 800, fontSize: '2rem' }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Statistik klik dan performa afiliasi (Local Data)</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glow-card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Total Klik Link</p>
          <p className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: 8 }}>{totalClicks}</p>
          <p style={{ fontSize: '0.8rem', color: '#34d399', marginTop: 4 }}>↑ Real-time update</p>
        </div>
        <div className="glow-card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Estimasi Revenue</p>
          <p style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: 8 }}>{formatPrice(totalClicks * 5000)}</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>*Berdasarkan avg commission</p>
        </div>
      </div>

      <div className="glow-card" style={{ padding: '2rem', overflow: 'hidden' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Produk Paling Populer (Klik)</h2>
        {topProducts.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Belum ada data klik.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>PRODUK</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>KLIK</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>HARGA</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{p.name}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge badge-purple">{p.count} klik</span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--accent)' }}>{formatPrice(p.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Data ini disimpan secara lokal di browser Anda untuk keperluan demonstrasi.
        </p>
      </div>
    </div>
  )
}
