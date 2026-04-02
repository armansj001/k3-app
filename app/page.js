"use client";

import { useEffect } from "react";
import { auth } from "../lib/firebaseAuth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Aplikasi K3</h1>
      <p>Selamat datang</p>

      <hr />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

        <button onClick={() => router.push("/report")}>
          Buat Laporan
        </button>

        <button onClick={() => router.push("/dashboard")}>
          Dashboard
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>
    </main>
  );
    }
