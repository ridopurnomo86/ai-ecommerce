import * as React from 'react'
import { getTotalClicks, getTopClicked } from '@/lib/analytics'
import { getProductById, formatPrice } from '@/lib/search'

export default function AdminView() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-700">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Admin <span className="gradient-text">Dashboard</span></h1>
        <p className="text-text-secondary">Statistik klik afiliasi dan performa produk GlowFind.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="glow-card p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">Total Klik Link</p>
            <h3 className="text-4xl font-black gradient-text">{totalClicks.toLocaleString('id-ID')}</h3>
          </div>
          <p className="text-xs text-emerald-400 mt-4 font-medium flex items-center gap-1">
            <span className="animate-pulse">●</span> Real-time updates
          </p>
        </div>

        <div className="glow-card p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">Estimasi Revenue</p>
            <h3 className="text-4xl font-black text-text-primary">{formatPrice(totalClicks * 5000)}</h3>
          </div>
          <p className="text-xs text-text-muted mt-4">*Berdasarkan avg commission</p>
        </div>

        <div className="glow-card p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">Top Product Score</p>
            <h3 className="text-4xl font-black text-purple-400">{topProducts[0]?.count || 0}</h3>
          </div>
          <p className="text-xs text-text-muted mt-4">Klik pada produk nomor #1</p>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="glow-card overflow-hidden">
        <div className="px-6 py-5 border-b border-border-subtle flex justify-between items-center bg-bg-card/50">
          <h2 className="text-lg font-bold">Produk Paling Populer</h2>
          <span className="badge badge-purple">Top 5 Hits</span>
        </div>
        
        {topProducts.length === 0 ? (
          <div className="px-6 py-16 text-center text-text-muted italic">
            Belum ada data klik yang tercatat.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-elevated/30">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-muted">Produk</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-muted text-center">Klik</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-muted text-right">Harga</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {topProducts.map((p, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-semibold text-sm group-hover:text-primary transition-colors">{p.name}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {p.count} klik
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-right text-primary">{formatPrice(p.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
          Data dashboard ini disimpan secara lokal di browser Anda untuk demonstrasi fitur analitik GlowFind.
        </p>
      </div>
    </div>
  )
}
