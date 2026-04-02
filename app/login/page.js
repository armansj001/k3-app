"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/authClient";

export const dynamic = "force-dynamic";
export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      alert("Login berhasil ✅");
      router.push("/");
    } catch (err) {
      alert("Login gagal ❌");
      console.error(err);
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
}
