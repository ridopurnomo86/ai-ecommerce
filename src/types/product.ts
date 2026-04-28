export type ProductCategory =
  | 'serum'
  | 'moisturizer'
  | 'sunscreen'
  | 'cleanser'
  | 'toner'
  | 'mask'
  | 'eye-cream'
  | 'lip-care'
  | 'body-care'
  | 'tools'

export type SkinType = 'oily' | 'dry' | 'combination' | 'sensitive' | 'normal' | 'all'

export type ProductTag =
  | 'brightening'
  | 'anti-aging'
  | 'acne-care'
  | 'hydrating'
  | 'whitening'
  | 'spf'
  | 'vegan'
  | 'bpom'
  | 'korea'
  | 'local'
  | 'bestseller'
  | 'new'
  | 'budget'
  | 'premium'

export interface Product {
  id: string
  name: string
  brand: string
  category: ProductCategory
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  affiliateUrl: string
  description: string
  shortDesc: string
  skinTypes: SkinType[]
  tags: ProductTag[]
  ingredients?: string[]
  howToUse?: string
  volume?: string
  inStock: boolean
  commissionRate: number
}

export interface SearchIntent {
  query: string
  maxPrice?: number
  category?: ProductCategory
  skinType?: SkinType
  features: string[]
}

export type FilterState = {
  category: ProductCategory | 'all'
  skinType: SkinType | 'all'
  maxPrice: number
  minRating: number
  tags: ProductTag[]
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  publishedAt: string
  readTime: number
  image: string
  author: string
}
