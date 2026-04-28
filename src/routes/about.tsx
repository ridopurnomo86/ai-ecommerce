import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div
      className="hero-bg"
      style={{ minHeight: "calc(100vh - 64px)", padding: "4rem 1.5rem" }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div className="badge badge-rose" style={{ marginBottom: "1.5rem" }}>
          ✨ Cerita Kami
        </div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
            fontWeight: 700,
            marginBottom: "2rem",
          }}
        >
          Misi Kami: <span className="gradient-text">Glowing</span> Tanpa Ribet
        </h1>

        <div
          className="glow-card"
          style={{ padding: "2.5rem", marginBottom: "3rem" }}
        >
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}
          >
            Selamat datang di <strong>GlowFind</strong>. Kami lahir dari
            kebingungan yang sama dengan Anda: memilih produk skincare di tengah
            ribuan pilihan yang tersedia.
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}
          >
            GlowFind menggunakan teknologi AI sederhana untuk membantu Anda
            memfilter produk berdasarkan jenis kulit, budget, dan kebutuhan
            spesifik Anda. Kami percaya bahwa perawatan kulit yang efektif tidak
            harus mahal, asalkan tepat sasaran.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              marginTop: "3rem",
            }}
          >
            <div>
              <div
                className="gradient-text"
                style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}
              >
                Terpercaya
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Hanya merekomendasikan produk yang sudah BPOM dan terjamin
                keasliannya dari official store.
              </p>
            </div>
            <div>
              <div
                className="gradient-text"
                style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}
              >
                Personal
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Rekomendasi yang disesuaikan dengan profil kulit unik Anda,
                bukan sekadar tren.
              </p>
            </div>
            <div>
              <div
                className="gradient-text"
                style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}
              >
                Hemat
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Kami membantu Anda menemukan "dupe" atau alternatif terjangkau
                dengan kualitas premium.
              </p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.75rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Punya Pertanyaan?
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
            Kami selalu senang mendengar cerita perjalanan skincare Anda.
          </p>
          <a href="mailto:hello@glowfind.ai" style={{ textDecoration: "none" }}>
            <button
              className="btn-primary"
              style={{ padding: "0.875rem 2.5rem" }}
            >
              Hubungi Kami
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
