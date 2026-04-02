"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const firebase = await import("../lib/firebase");
      const authModule = await import("firebase/auth");

      const auth = authModule.getAuth(firebase.default);

      authModule.onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push("/login");
        }
      });
    };

    init();
  }, []);

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
    </main>
  );
}
