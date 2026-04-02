"use client";

import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../lib/firebase";

export default function Home() {
  const [title, setTitle] = useState("");

  const submit = async () => {
    const db = getFirestore(app);

    await addDoc(collection(db, "incidents"), {
      title: title,
      createdAt: new Date()
    });

    alert("Laporan berhasil dikirim!");
    setTitle("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Aplikasi K3</h1>

      <input
        placeholder="Judul kejadian"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <button onClick={submit}>
        Kirim Laporan
      </button>
    </div>
  );
}
