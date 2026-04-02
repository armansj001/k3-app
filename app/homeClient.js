"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/authClient";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function HomeClient() {
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

      <button onClick={() => router.push("/report")}>
        Buat Laporan
      </button>

      <br /><br />

      <button onClick={() => router.push("/dashboard")}>
        Dashboard
      </button>

      <br /><br />

      <button onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}
