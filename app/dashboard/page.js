"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "incidents"));
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(list);
    }

    fetchData();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>Dashboard K3</h1>

      {data.length === 0 ? (
        <p>Belum ada data</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <b>{item.title}</b>
              <br />
              <small>
                {item.createdAt?.seconds
                  ? new Date(item.createdAt.seconds * 1000).toLocaleString()
                  : "-"}
              </small>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}        ))
      )}
    </div>
  );
              }
