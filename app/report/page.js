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
      // 🔥 lazy import (hindari error vercel)
      const { db, auth, serverTimestamp } = await import("../../lib/authClient");

      const user = auth.currentUser;

      await db.collection("reports").add({
        judul,
        lokasi,
        deskripsi,

        status: "open",

        // ✅ TIMESTAMP (SERVER)
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),

        // ✅ TRACEABILITY
        createdBy: {
          uid: user?.uid || "unknown",
          email: user?.email || "unknown",
        },

        updatedBy: {
          uid: user?.uid || "unknown",
          email: user?.email || "unknown",
        },
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
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
        />

        <input
          placeholder="Lokasi"
          value={lokasi}
          onChange={(e) => setLokasi(e.target.value)}
          required
        />

        <textarea
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          required
        />

        <button type="submit">Kirim Laporan</button>
      </form>
    </main>
  );
}
