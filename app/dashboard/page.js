"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { db } = await import("../../lib/authClient");

    const snapshot = await db.collection("reports").get();

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setReports(data);
  };

  const updateStatus = async (id, status) => {
    try {
      const { db, auth, serverTimestamp, arrayUnion } = await import("../../lib/authClient");

      const user = auth.currentUser;

      await db.collection("reports").doc(id).update({
        status,

        // ✅ TIMESTAMP
        updatedAt: serverTimestamp(),

        // ✅ SIAPA YANG UPDATE
        updatedBy: {
          uid: user?.uid || "unknown",
          email: user?.email || "unknown",
        },

        // ✅ HISTORY LOG (AUDIT TRAIL)
        history: arrayUnion({
          action: "status_update",
          status,
          at: new Date(), // boleh client time untuk log tambahan
          by: user?.email || "unknown",
        }),
      });

      alert("Status diupdate ✅");

      // 🔄 reload data
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal update status ❌");
    }
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

          {/* ✅ INFO TRACEABILITY */}
          <p style={{ fontSize: 12, color: "gray" }}>
            Dibuat oleh: {r.createdBy?.email || "-"}
          </p>

          <p style={{ fontSize: 12, color: "gray" }}>
            Terakhir update: {r.updatedBy?.email || "-"}
          </p>

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
