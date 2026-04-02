"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // sesuaikan path

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "incidents"));
      const result = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard K3</h1>

      {data.map(item => (
        <div key={item.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{item.judul}</h3>
          <p>📍 {item.lokasi}</p>
          <p>📅 {item.tanggal}</p>
          <p>{item.deskripsi}</p>
        </div>
      ))}
    </div>
  );
}
