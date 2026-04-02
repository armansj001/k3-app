export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Aplikasi K3</h1>

      <p>
        Sistem pelaporan dan monitoring keselamatan kerja (K3)
      </p>

      <hr style={{ margin: "20px 0" }} />

      <h2>Menu</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <a href="/dashboard">
          <button style={{ padding: 10, width: "100%" }}>
            📊 Dashboard
          </button>
        </a>

        <a href="/report">
          <button style={{ padding: 10, width: "100%" }}>
            ➕ Buat Laporan
          </button>
        </a>
      </div>
    </main>
  );
}
