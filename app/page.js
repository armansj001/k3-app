export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Aplikasi K3</h1>

      <input placeholder="Judul kejadian" />
      <br /><br />

      <button>Kirim Laporan</button>

      <hr style={{ margin: "20px 0" }} />

      <a href="/dashboard">
        <button>Lihat Dashboard</button>
      </a>
    </main>
  );
}
