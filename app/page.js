"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const loadAuth = async () => {
      const { getAuth, onAuthStateChanged, signOut } = await import("firebase/auth");
      const { default: app } = await import("../lib/firebase");

      const authInstance = getAuth(app);

      setAuth({
        authInstance,
        signOut,
      });

      onAuthStateChanged(authInstance, (user) => {
        if (!user) {
          router.push("/login");
        }
      });
    };

    loadAuth();
  }, []);

  const handleLogout = async () => {
    if (!auth) return;
    await auth.signOut(auth.authInstance);
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
