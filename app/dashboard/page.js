"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { db } = await import("../../lib/authClient");

      const snapshot = await db.collection("reports").get();

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReports(data);
    };

    loadData();
  }, []);

  const updateStatus = async (id, status) => {
    const { db } = await import("../../lib/authClient");

    await db.collection("reports").doc(id).update({
      status,
    });

    alert("Status diupdate ✅");

    // refresh data
    const snapshot = await db.collection("reports").get();
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReports(data);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Dashboard K3</h1>

      {reports.map((r) => (
        <div
          key={r.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{r.judul}</h3>
          <p><b>Lokasi:</b> {r.lokasi}</p>
          <p>{r.deskripsi}</p>
          <p>Status: <b>{r.status}</b></p>

          {r.status === "open" && (
            <button onClick={() => updateStatus(r.id, "closed")}>
              Tandai Selesai
            </button>
          )}
        </div>
      ))}
    </main>
  );
}
