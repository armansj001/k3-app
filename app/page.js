"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    // 🔥 import firebase auth DI CLIENT SAJA
    const loadAuth = async () => {
      const { getAuth, onAuthStateChanged, signOut } = await import("firebase/auth");
      const { default: app } = await import("../lib/firebase");

      const authInstance = getAuth(app);
      setAuth({ authInstance, onAuthStateChanged, signOut });

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
                 }        </button>

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
