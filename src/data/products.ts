import type { Product } from '@/types/product'

export const products: Product[] = [
  {
    id: 'p001',
    name: 'Somethinc Niacinamide + Moisture Beet Serum',
    brand: 'Somethinc',
    category: 'serum',
    price: 89000,
    originalPrice: 119000,
    rating: 4.8,
    reviewCount: 12400,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: 'Niacinamide 10% untuk kulit cerah dan bebas pori',
    description: 'Serum niacinamide terlaris di Indonesia. Formulasi dengan 10% Niacinamide dan Moisture Beet untuk mencerahkan, mengecilkan pori, dan melembapkan kulit sepanjang hari.',
    skinTypes: ['oily', 'combination', 'normal'],
    tags: ['brightening', 'bestseller', 'local', 'bpom', 'budget'],
    volume: '20ml',
    inStock: true,
    commissionRate: 0.08,
  },
  {
    id: 'p002',
    name: 'Wardah UV Shield Essential Sunscreen Gel SPF 50',
    brand: 'Wardah',
    category: 'sunscreen',
    price: 55000,
    originalPrice: 72000,
    rating: 4.6,
    reviewCount: 8900,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: 'Sunscreen SPF 50 PA++++ tekstur ringan tanpa white cast',
    description: 'Perlindungan matahari tinggi SPF 50 PA++++ dengan tekstur gel yang ringan. Tidak meninggalkan white cast, cocok untuk kulit berminyak.',
    skinTypes: ['oily', 'combination', 'all'],
    tags: ['spf', 'local', 'bpom', 'bestseller', 'budget'],
    volume: '40ml',
    inStock: true,
    commissionRate: 0.07,
  },
  {
    id: 'p003',
    name: 'COSRX Advanced Snail 96 Mucin Power Essence',
    brand: 'COSRX',
    category: 'serum',
    price: 185000,
    originalPrice: 240000,
    rating: 4.9,
    reviewCount: 21000,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: '96% Snail Secretion Filtrate untuk regenerasi kulit',
    description: 'Essence ikonik dari Korea dengan 96% Snail Secretion Filtrate. Membantu regenerasi kulit, memudarkan bekas jerawat, dan memberikan hidrasi intens.',
    skinTypes: ['dry', 'combination', 'sensitive', 'normal'],
    tags: ['hydrating', 'anti-aging', 'korea', 'bestseller'],
    volume: '100ml',
    inStock: true,
    commissionRate: 0.1,
  },
  {
    id: 'p004',
    name: 'Cetaphil Gentle Skin Cleanser',
    brand: 'Cetaphil',
    category: 'cleanser',
    price: 125000,
    originalPrice: 155000,
    rating: 4.7,
    reviewCount: 15600,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: 'Pembersih wajah lembut untuk kulit sensitif',
    description: 'Sabun wajah dermatologis yang sangat lembut. Membersihkan tanpa menghilangkan kelembapan alami kulit. Direkomendasikan dermatologis untuk kulit sensitif.',
    skinTypes: ['sensitive', 'dry', 'normal', 'all'],
    tags: ['hydrating', 'bestseller', 'bpom'],
    volume: '250ml',
    inStock: true,
    commissionRate: 0.09,
  },
  {
    id: 'p005',
    name: 'Emina Ms. Pimple Acne Spot Gel',
    brand: 'Emina',
    category: 'serum',
    price: 27000,
    originalPrice: 35000,
    rating: 4.4,
    reviewCount: 6700,
    image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: 'Spot gel anti jerawat yang ampuh dan terjangkau',
    description: 'Gel spot treatment untuk jerawat dengan kandungan Salicylic Acid 0.5%. Mengurangi kemerahan dan ukuran jerawat dalam semalam.',
    skinTypes: ['oily', 'combination', 'acne'],
    tags: ['acne-care', 'local', 'bpom', 'budget'],
    volume: '9ml',
    inStock: true,
    commissionRate: 0.08,
  },
  {
    id: 'p006',
    name: 'The Ordinary Hyaluronic Acid 2% + B5',
    brand: 'The Ordinary',
    category: 'serum',
    price: 145000,
    originalPrice: 180000,
    rating: 4.7,
    reviewCount: 9300,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: 'Hyaluronic Acid 2% untuk hidrasi super dalam',
    description: 'Serum hyaluronic acid dengan formula multi-molecular untuk hidrasi berlapis. Dilengkapi Vitamin B5 untuk memperkuat skin barrier.',
    skinTypes: ['dry', 'normal', 'sensitive', 'all'],
    tags: ['hydrating', 'budget', 'vegan'],
    volume: '30ml',
    inStock: true,
    commissionRate: 0.1,
  },
  {
    id: 'p007',
    name: 'Innisfree No-Sebum Mineral Powder',
    brand: 'Innisfree',
    category: 'tools',
    price: 79000,
    originalPrice: 110000,
    rating: 4.5,
    reviewCount: 7200,
    image: 'https://images.unsplash.com/photo-1586495777744-4e6232bf2b6d?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: 'Bedak mineral kontrol minyak sepanjang hari',
    description: 'Bedak tabur mineral untuk kontrol minyak seharian. Formula tanpa alkohol, cocok untuk kulit berminyak dan kombinasi.',
    skinTypes: ['oily', 'combination'],
    tags: ['korea', 'bestseller', 'budget'],
    volume: '5g',
    inStock: true,
    commissionRate: 0.09,
  },
  {
    id: 'p008',
    name: 'Skintific 5X Ceramide Barrier Moisture Gel',
    brand: 'Skintific',
    category: 'moisturizer',
    price: 99000,
    originalPrice: 139000,
    rating: 4.8,
    reviewCount: 18500,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: '5 Ceramide untuk skin barrier kuat dan lembap',
    description: 'Moisturizer gel dengan 5 jenis ceramide untuk memperkuat skin barrier. Tekstur ringan, cepat meresap, cocok untuk semua jenis kulit.',
    skinTypes: ['oily', 'combination', 'normal', 'all'],
    tags: ['hydrating', 'local', 'bpom', 'bestseller'],
    volume: '30g',
    inStock: true,
    commissionRate: 0.08,
  },
  {
    id: 'p009',
    name: 'Laneige Water Sleeping Mask',
    brand: 'Laneige',
    category: 'mask',
    price: 325000,
    originalPrice: 420000,
    rating: 4.9,
    reviewCount: 31000,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: 'Sleeping mask legendaris untuk kulit kenyal dan cerah',
    description: 'Sleeping mask ikonik dari Korea yang dipakai saat tidur. Formula Moisture Wrap + White Sleeping Capsules untuk kulit kenyal dan glowing saat bangun tidur.',
    skinTypes: ['dry', 'normal', 'combination', 'all'],
    tags: ['hydrating', 'korea', 'bestseller', 'premium'],
    volume: '70ml',
    inStock: true,
    commissionRate: 0.12,
  },
  {
    id: 'p010',
    name: 'Hada Labo Gokujyun Ultimate Moisturizing Lotion',
    brand: 'Hada Labo',
    category: 'toner',
    price: 75000,
    originalPrice: 95000,
    rating: 4.7,
    reviewCount: 14200,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: 'Toner 5 HA untuk hidrasi maksimal kulit kering',
    description: 'Toner legendaris dari Jepang dengan 5 jenis Hyaluronic Acid. Formula yang sangat hydrating untuk kulit yang kering dan kusam.',
    skinTypes: ['dry', 'normal', 'sensitive'],
    tags: ['hydrating', 'bestseller', 'budget'],
    volume: '170ml',
    inStock: true,
    commissionRate: 0.08,
  },
  {
    id: 'p011',
    name: 'Azarine Hydrasoothe Sunscreen Gel SPF 45',
    brand: 'Azarine',
    category: 'sunscreen',
    price: 42000,
    originalPrice: 58000,
    rating: 4.6,
    reviewCount: 9800,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: 'Sunscreen gel murah tapi bagus, no white cast',
    description: 'Sunscreen gel dengan SPF 45 PA+++ formula ringan dan tidak lengket. Mengandung Panthenol untuk menenangkan kulit sensitif.',
    skinTypes: ['oily', 'combination', 'sensitive'],
    tags: ['spf', 'local', 'bpom', 'budget', 'bestseller'],
    volume: '50ml',
    inStock: true,
    commissionRate: 0.08,
  },
  {
    id: 'p012',
    name: 'Avoskin Your Skin Bae Retinol 0.5%',
    brand: 'Avoskin',
    category: 'serum',
    price: 155000,
    originalPrice: 200000,
    rating: 4.6,
    reviewCount: 5400,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: 'Retinol 0.5% untuk anti-aging dan kulit mulus',
    description: 'Serum retinol lokal yang efektif dengan konsentrasi 0.5%. Membantu mengurangi kerutan, mempercepat regenerasi sel, dan mencerahkan kulit.',
    skinTypes: ['normal', 'combination', 'dry'],
    tags: ['anti-aging', 'local', 'bpom', 'new'],
    volume: '20ml',
    inStock: true,
    commissionRate: 0.1,
  },
  {
    id: 'p013',
    name: 'BPOM Mugwort Pore Clarifying Toner',
    brand: 'Some By Mi',
    category: 'toner',
    price: 135000,
    originalPrice: 175000,
    rating: 4.5,
    reviewCount: 7100,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: 'Toner Mugwort Korea untuk pori-pori bersih',
    description: 'Toner dengan ekstrak Mugwort dari Korea untuk membersihkan pori dan menenangkan kulit bermasalah. Formula bebas alkohol dan paraben.',
    skinTypes: ['oily', 'combination', 'sensitive'],
    tags: ['acne-care', 'korea', 'budget'],
    volume: '150ml',
    inStock: true,
    commissionRate: 0.1,
  },
  {
    id: 'p014',
    name: 'Nacific Fresh Herb Origin Toner',
    brand: 'Nacific',
    category: 'toner',
    price: 165000,
    originalPrice: 215000,
    rating: 4.6,
    reviewCount: 4300,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: 'Toner herbal Korea untuk kulit cerah dan sehat',
    description: 'Toner dengan 15 jenis herbal segar dari Korea. Menenangkan, melembapkan, dan mempersiapkan kulit untuk penyerapan skincare selanjutnya.',
    skinTypes: ['normal', 'combination', 'sensitive'],
    tags: ['hydrating', 'korea', 'vegan'],
    volume: '150ml',
    inStock: true,
    commissionRate: 0.1,
  },
  {
    id: 'p015',
    name: 'Elsheskin Acne Serum AHA BHA PHA',
    brand: 'Elsheskin',
    category: 'serum',
    price: 115000,
    originalPrice: 149000,
    rating: 4.5,
    reviewCount: 8200,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: 'Triple exfoliant AHA BHA PHA untuk kulit mulus',
    description: 'Serum exfoliant dengan kombinasi AHA, BHA, dan PHA untuk mengangkat sel kulit mati, membersihkan pori, dan meratakan tekstur kulit.',
    skinTypes: ['oily', 'combination'],
    tags: ['acne-care', 'brightening', 'local', 'bpom'],
    volume: '15ml',
    inStock: true,
    commissionRate: 0.09,
  },
  {
    id: 'p016',
    name: 'Erha21 Basic Day Moisturizer SPF 30',
    brand: 'Erha21',
    category: 'moisturizer',
    price: 145000,
    originalPrice: 189000,
    rating: 4.4,
    reviewCount: 3600,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
    affiliateUrl: 'https://shopee.co.id/affiliate/glowfind',
    shortDesc: 'Moisturizer + SPF 30 dalam satu produk praktis',
    description: 'Pelembap siang hari dengan perlindungan SPF 30 dari brand dermatologis Indonesia. Praktis 2-in-1 untuk rutinitas pagi yang simpel.',
    skinTypes: ['normal', 'combination', 'sensitive'],
    tags: ['spf', 'hydrating', 'local', 'bpom'],
    volume: '50ml',
    inStock: true,
    commissionRate: 0.09,
  },
]

export const blogPosts = [
  {
    id: 'b001',
    slug: '5-serum-terbaik-2026-di-bawah-100rb',
    title: '5 Serum Terbaik 2026 di Bawah Rp100.000 — Cocok untuk Pemula',
    excerpt: 'Mau mulai skincare tapi budget terbatas? Tenang, kami sudah kurasi 5 serum terbaik yang ampuh tapi ramah di kantong.',
    category: 'Review',
    tags: ['serum', 'budget', 'pemula'],
    publishedAt: '2026-04-10',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=450&fit=crop',
    author: 'GlowFind Team',
    content: `## 5 Serum Terbaik 2026 di Bawah Rp100.000

Memulai rutinitas skincare tidak harus mahal. Ada banyak serum berkualitas tinggi yang bisa kamu dapatkan dengan budget di bawah Rp100.000.

### 1. Somethinc Niacinamide 10% (Rp89.000)
Serum niacinamide terlaris di Indonesia dengan formulasi yang sudah terbukti efektif. Cocok untuk semua jenis kulit, terutama kulit berminyak dan berjerawat.

### 2. Emina Ms. Pimple Spot Gel (Rp27.000)
Spot treatment terjangkau untuk jerawat membandel. Salicylic acid 0.5% bekerja semalam untuk mengurangi peradangan.

### 3. Azarine Vitamin C Brightening Serum (Rp65.000)
Serum Vitamin C lokal yang efektif untuk mencerahkan kulit kusam dengan harga sangat terjangkau.

### 4. Elsheskin Bright Serum (Rp79.000)
Formula brightening dengan niacinamide dan alpha arbutin untuk kulit lebih cerah dalam 2 minggu.

### 5. Skintific Ceramide Serum (Rp89.000)
Serum dengan ceramide untuk kulit kering yang membutuhkan hidrasi ekstra.

**Tips**: Mulai dengan 1-2 serum dulu, jangan langsung banyak produk!`,
  },
  {
    id: 'b002',
    slug: 'review-sunscreen-wardah-uv-shield',
    title: 'Review Sunscreen Wardah UV Shield — Worth It?',
    excerpt: 'Wardah UV Shield jadi sunscreen terlaris di Shopee. Tapi apakah benar-benar worth it? Kami test selama 2 minggu.',
    category: 'Review',
    tags: ['sunscreen', 'wardah', 'review'],
    publishedAt: '2026-04-15',
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&h=450&fit=crop',
    author: 'GlowFind Team',
    content: `## Review Wardah UV Shield SPF 50 PA++++

Setelah 2 minggu pemakaian intensif, ini hasil review jujur kami.

### Kelebihan
- Tekstur gel yang super ringan
- Tidak meninggalkan white cast
- SPF 50 PA++++ perlindungan tinggi
- Harga terjangkau (Rp55.000)
- Sudah BPOM

### Kekurangan
- Perlu re-apply setiap 2-3 jam
- Sedikit lengket di cuaca sangat panas

### Verdict: 8.5/10 — Worth It!
Untuk harganya yang sangat terjangkau, Wardah UV Shield memberikan perlindungan yang sangat baik.`,
  },
  {
    id: 'b003',
    slug: 'skincare-routine-kulit-berminyak',
    title: 'Skincare Routine Pagi & Malam untuk Kulit Berminyak',
    excerpt: 'Kulit berminyak bukan berarti tidak butuh moisturizer! Pelajari routine yang tepat untuk kontrol minyak optimal.',
    category: 'Tips',
    tags: ['routine', 'kulit berminyak', 'tips'],
    publishedAt: '2026-04-20',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=450&fit=crop',
    author: 'GlowFind Team',
    content: `## Skincare Routine untuk Kulit Berminyak

### Routine Pagi (AM)
1. **Cleanser** — Gentle foam cleanser
2. **Toner** — Toner bebas alkohol
3. **Serum** — Niacinamide 10%
4. **Moisturizer** — Gel moisturizer ringan
5. **Sunscreen** — SPF 50 tekstur gel

### Routine Malam (PM)
1. **Double Cleanse** — Oil cleanser + foam cleanser
2. **Toner** — Exfoliating toner (2-3x seminggu)
3. **Treatment** — Acne spot gel (jika ada jerawat)
4. **Serum** — Hyaluronic acid atau niacinamide
5. **Moisturizer** — Gel cream ringan`,
  },
  {
    id: 'b004',
    slug: 'moisturizer-murah-tapi-bagus',
    title: 'Moisturizer Murah Tapi Bagus — Top 5 Pilihan di Shopee',
    excerpt: 'Budget skincare terbatas? Ini 5 moisturizer di bawah Rp100.000 yang efektivitasnya tidak kalah dengan produk mahal.',
    category: 'Review',
    tags: ['moisturizer', 'budget', 'shopee'],
    publishedAt: '2026-04-22',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=450&fit=crop',
    author: 'GlowFind Team',
    content: `## Top 5 Moisturizer Budget Terbaik

### 1. Skintific 5X Ceramide (Rp99.000)
Moisturizer gel dengan 5 ceramide untuk barrier kulit yang kuat.

### 2. Hada Labo Gokujyun Milk (Rp85.000)
Tekstur susu yang ringan, cocok untuk kulit berminyak yang butuh hidrasi.

### 3. Cetaphil Moisturizing Cream (Rp95.000)
Classic dermatologis untuk kulit sensitif dan kering.

### 4. Wardah Intensive Moisturizing Cream (Rp45.000)
Lokal, terjangkau, dan efektif untuk kulit kering.

### 5. Emina Rich Moisture Face Cream (Rp35.000)
Budget paling terjangkau dengan hasil yang cukup baik.`,
  },
  {
    id: 'b005',
    slug: 'produk-skincare-korea-terlaris-shopee-2026',
    title: 'Produk Skincare Korea Terlaris di Shopee 2026',
    excerpt: 'K-beauty masih mendominasi pasar skincare Indonesia. Ini produk Korea paling laris dan worth it untuk dicoba.',
    category: 'Trending',
    tags: ['korea', 'kbeauty', 'trending', 'shopee'],
    publishedAt: '2026-04-25',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=450&fit=crop',
    author: 'GlowFind Team',
    content: `## K-Beauty Terlaris di Shopee 2026

K-beauty terus mendominasi pasar skincare global, termasuk Indonesia.

### Top K-Beauty Picks
1. **COSRX Snail Mucin Essence** — Bestseller sepanjang masa
2. **Laneige Water Sleeping Mask** — Sleeping mask legendaris
3. **Some By Mi AHA BHA PHA Toner** — Exfoliant triple action
4. **Innisfree Green Tea Serum** — Antioksidan alami
5. **Nacific Fresh Herb Toner** — Herbal alami

### Kenapa K-Beauty Populer?
- Inovasi formula yang canggih
- Packaging yang estetik
- Harga kompetitif
- Hasil yang terbukti efektif`,
  },
]
