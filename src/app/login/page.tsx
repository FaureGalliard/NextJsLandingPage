"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/clients";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      alert("Credenciales incorrectas");
    } else {
      router.push("/dashboard");
      router.refresh(); // ← importante para que el middleware detecte la sesión
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <h1 className="text-black text-2xl font-serif text-center mb-2">Iniciar sesión</h1>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-black border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" text-black border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}