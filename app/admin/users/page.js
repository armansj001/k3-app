"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    const { db, auth } = await import("../../../lib/authClient");

    const user = auth.currentUser;

    if (!user) {
      router.push("/login");
      return;
    }

    const snap = await db
      .collection("users")
      .where("email", "==", user.email)
      .get();

    let userRole = "user";

    snap.forEach((doc) => {
      userRole = doc.data().role;
    });

    if (userRole !== "admin") {
      alert("Akses ditolak ❌");
      router.push("/");
      return;
    }

    setRole(userRole);
    loadUsers();
  };

  const loadUsers = async () => {
    const { db } = await import("../../../lib/authClient");

    const snapshot = await db.collection("users").get();

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setUsers(data);
  };

  const updateRole = async (id, newRole) => {
    const { db } = await import("../../../lib/authClient");

    await db.collection("users").doc(id).update({
      role: newRole,
    });

    alert("Role diupdate ✅");
    loadUsers();
  };

  if (!role) return <p>Loading...</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Manajemen User</h1>

      {users.map((u) => (
        <div
          key={u.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <p><b>{u.email}</b></p>
          <p>Role: {u.role}</p>

          <button onClick={() => updateRole(u.id, "user")}>
            Set User
          </button>

          <button onClick={() => updateRole(u.id, "admin")}>
            Set Admin
          </button>
        </div>
      ))}
    </main>
  );
}
