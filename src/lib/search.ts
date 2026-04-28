import Fuse from 'fuse.js'
import { products } from '@/data/products'
import type { Product, FilterState, SearchIntent } from '@/types/product'

const fuse = new Fuse(products, {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'brand', weight: 0.2 },
    { name: 'description', weight: 0.2 },
    { name: 'shortDesc', weight: 0.1 },
    { name: 'tags', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
})

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return products
  const results = fuse.search(query)
  return results.map((r) => r.item)
}

export function filterProducts(filters: FilterState): Product[] {
  return products
    .filter((p) => {
      if (filters.category !== 'all' && p.category !== filters.category) return false
      if (filters.skinType !== 'all' && !p.skinTypes.includes(filters.skinType)) return false
      if (p.price > filters.maxPrice) return false
      if (p.rating < filters.minRating) return false
      if (filters.tags.length > 0 && !filters.tags.some((t) => p.tags.includes(t))) return false
      return true
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc': return a.price - b.price
        case 'price-desc': return b.price - a.price
        case 'rating': return b.rating - a.rating
        case 'newest': return 0
        case 'popular':
        default: return b.reviewCount - a.reviewCount
      }
    })
}

export function filterByIntent(intent: SearchIntent): Product[] {
  return products.filter((p) => {
    if (intent.maxPrice && p.price > intent.maxPrice) return false
    if (intent.category && p.category !== intent.category) return false
    if (intent.skinType && !p.skinTypes.includes(intent.skinType)) return false
    return true
  })
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && (
      p.category === product.category ||
      p.tags.some((t) => product.tags.includes(t))
    ))
    .sort(() => Math.random() - 0.5)
    .slice(0, limit)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function parseNaturalQuery(query: string): SearchIntent {
  const lower = query.toLowerCase()
  const intent: SearchIntent = { query, features: [] }

  const priceMatch = lower.match(/(?:di bawah|bawah|under|max|maksimal)\s*(?:rp\.?\s*)?(\d+(?:[.,]\d+)?)\s*(?:k|rb|ribu)?/)
  if (priceMatch) {
    let price = parseFloat(priceMatch[1].replace(',', '.'))
    if (lower.includes('k') || lower.includes('rb') || lower.includes('ribu')) price *= 1000
    intent.maxPrice = price
  }

  const cats = ['serum', 'moisturizer', 'sunscreen', 'cleanser', 'toner', 'mask'] as const
  for (const cat of cats) {
    if (lower.includes(cat)) { intent.category = cat; break }
  }
  if (lower.includes('sabun') || lower.includes('facial wash')) intent.category = 'cleanser'
  if (lower.includes('pelembap') || lower.includes('pelembab')) intent.category = 'moisturizer'

  if (lower.includes('berminyak') || lower.includes('minyak')) intent.skinType = 'oily'
  else if (lower.includes('kering')) intent.skinType = 'dry'
  else if (lower.includes('sensitif')) intent.skinType = 'sensitive'
  else if (lower.includes('kombinasi')) intent.skinType = 'combination'

  if (lower.includes('cerah') || lower.includes('brightening') || lower.includes('glowing')) intent.features.push('brightening')
  if (lower.includes('jerawat') || lower.includes('acne') || lower.includes('pimple')) intent.features.push('acne-care')
  if (lower.includes('lembap') || lower.includes('hydrat')) intent.features.push('hydrating')
  if (lower.includes('spf') || lower.includes('sunscreen')) intent.features.push('spf')

  return intent
}
