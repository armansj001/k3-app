"use client";

import { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Home() {
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    if (!title) {
      alert("Judul tidak boleh kosong");
      return;
    }

    try {
      await addDoc(collection(db, "incidents"), {
        title: title,
        createdAt: serverTimestamp(),
      });

      alert("Berhasil disimpan ✅");
      setTitle("");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan ❌");
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Aplikasi K3</h1>

      <input
        placeholder="Judul kejadian"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Kirim Laporan
      </button>

      <hr style={{ margin: "20px 0" }} />

      <a href="/dashboard">
        <button>Lihat Dashboard</button>
      </a>
    </main>
  );
    }
