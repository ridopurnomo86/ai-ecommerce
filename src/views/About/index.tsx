export default function AboutView() {
  return (
    <div className="bg-bg-primary min-h-screen text-text-primary py-16 md:py-24 px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="max-w-4xl mx-auto">
        <div className="badge badge-rose mb-8 inline-flex px-4 py-1 text-xs font-bold shadow-xl shadow-rose-500/10">
          ✨ Cerita Kami
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-black mb-10 tracking-tighter leading-tight">
          Misi Kami: <span className="gradient-text">Glowing</span> <br />Tanpa Ribet
        </h1>

        <div className="glow-card p-8 md:p-12 mb-16 shadow-2xl shadow-black/40">
          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            <p className="text-text-secondary leading-relaxed text-lg font-medium">
              Selamat datang di <strong className="text-primary font-black">GlowFind</strong>. Kami lahir dari
              kebingungan yang sama dengan Anda: memilih produk skincare di tengah
              ribuan pilihan yang tersedia.
            </p>
            <p className="text-text-secondary leading-relaxed text-lg font-medium">
              GlowFind menggunakan teknologi AI sederhana untuk membantu Anda
              memfilter produk berdasarkan jenis kulit, budget, dan kebutuhan
              spesifik Anda. Kami percaya bahwa perawatan kulit yang efektif tidak
              harus mahal, asalkan tepat sasaran.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/5">
            <div className="group">
              <div className="gradient-text text-xl font-black mb-3 group-hover:scale-105 transition-transform origin-left">
                Terpercaya
              </div>
              <p className="text-text-muted text-sm leading-relaxed font-medium">
                Hanya merekomendasikan produk yang sudah BPOM dan terjamin
                keasliannya dari official store.
              </p>
            </div>
            <div className="group">
              <div className="gradient-text text-xl font-black mb-3 group-hover:scale-105 transition-transform origin-left">
                Personal
              </div>
              <p className="text-text-muted text-sm leading-relaxed font-medium">
                Rekomendasi yang disesuaikan dengan profil kulit unik Anda,
                bukan sekadar tren.
              </p>
            </div>
            <div className="group">
              <div className="gradient-text text-xl font-black mb-3 group-hover:scale-105 transition-transform origin-left">
                Hemat
              </div>
              <p className="text-text-muted text-sm leading-relaxed font-medium">
                Kami membantu Anda menemukan "dupe" atau alternatif terjangkau
                dengan kualitas premium.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center py-12 relative">
          <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="font-serif text-3xl font-black mb-4 tracking-tighter">
            Punya Pertanyaan?
          </h2>
          <p className="text-text-secondary mb-10 font-medium max-w-md mx-auto">
            Kami selalu senang mendengar cerita perjalanan skincare Anda. Hubungi tim kami kapan saja.
          </p>
          <a href="mailto:hello@glowfind.ai" className="no-underline group">
            <button className="btn-primary py-4 px-12 text-lg font-black shadow-2xl shadow-primary/30 group-hover:-translate-y-1 active:translate-y-0 transition-all uppercase tracking-widest">
              Hubungi Kami
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
