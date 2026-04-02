"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../../lib/firebase";

const db = getFirestore(app);

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "incidents")); // nanti kita cek ini
      const result = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(result);
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard K3</h1>

      {data.length === 0 ? (
        <p>Belum ada data...</p>
      ) : (
        data.map(item => (
          <pre key={item.id}>
            {JSON.stringify(item, null, 2)}
          </pre>
        ))
      )}
    </div>
  );
              }
