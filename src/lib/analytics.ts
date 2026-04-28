const CLICK_KEY = 'glowfind_clicks'

interface ClickRecord {
  productId: string
  productName: string
  timestamp: number
  price: number
  category: string
}

export function trackClick(record: Omit<ClickRecord, 'timestamp'>): void {
  try {
    const existing: ClickRecord[] = JSON.parse(localStorage.getItem(CLICK_KEY) ?? '[]')
    existing.push({ ...record, timestamp: Date.now() })
    localStorage.setItem(CLICK_KEY, JSON.stringify(existing.slice(-500)))
  } catch {
    // silently ignore storage errors
  }
}

export function getTopClicked(limit = 10): { productId: string; count: number }[] {
  try {
    const clicks: ClickRecord[] = JSON.parse(localStorage.getItem(CLICK_KEY) ?? '[]')
    const counts: Record<string, number> = {}
    for (const c of clicks) {
      counts[c.productId] = (counts[c.productId] ?? 0) + 1
    }
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([productId, count]) => ({ productId, count }))
  } catch {
    return []
  }
}

export function getTotalClicks(): number {
  try {
    const clicks: ClickRecord[] = JSON.parse(localStorage.getItem(CLICK_KEY) ?? '[]')
    return clicks.length
  } catch {
    return 0
  }
}
