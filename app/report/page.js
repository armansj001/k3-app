"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Report() {
  const router = useRouter();

  const [judul, setJudul] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 lazy import (penting)
      const { db, auth } = await import("../../lib/authClient");

      await db.collection("reports").add({
        judul,
        lokasi,
        deskripsi,
        user: auth.currentUser?.email || "unknown",
        createdAt: new Date(),
        status: "open"
      });

      alert("Laporan berhasil dikirim ✅");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Gagal kirim laporan ❌");
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Buat Laporan K3</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <input
          placeholder="Judul Bahaya"
          onChange={(e) => setJudul(e.target.value)}
        />

        <input
          placeholder="Lokasi"
          onChange={(e) => setLokasi(e.target.value)}
        />

        <textarea
          placeholder="Deskripsi"
          onChange={(e) => setDeskripsi(e.target.value)}
        />

        <button type="submit">Kirim Laporan</button>
      </form>
    </main>
  );
}
