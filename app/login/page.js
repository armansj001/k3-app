"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 🔥 import hanya saat klik login (client only)
      const { signInWithEmailAndPassword, getAuth } = await import("firebase/auth");
      const { default: app } = await import("../../lib/firebase");

      const auth = getAuth(app);

      await signInWithEmailAndPassword(auth, email, password);

      alert("Login berhasil ✅");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Login gagal ❌: " + err.message);
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Login K3</h1>

      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </main>
  );
        }          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </main>
  );
}
