"use client";
import { useState } from "react";
import { User, Lock, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation"; 

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          senha: form.senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("usuario", JSON.stringify(data));
        alert("Login realizado com sucesso!");
        router.push("/")
      } else {
        alert(data.error || "Usuário ou senha incorretos!");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#a60301]">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <a
          href="/"
          className="bg-[#ffd900] h-8 w-8 rounded-full flex items-center justify-center self-start mb-4"
        >
          <ChevronLeft size={20} />
        </a>

        <img src="/logo.png" className="h-20 w-auto mb-4" />
        <h1 className="text-2xl font-bold text-center mb-6">Fazer login</h1>

        <form className="w-full flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-[#ffd900]">
            <User className="text-gray-500 mr-2" size={20} />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-[#ffd900]">
            <Lock className="text-gray-500 mr-2" size={20} />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={form.senha}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          <p className="text-sm text-right text-gray-600 hover:underline cursor-pointer">
            Esqueceu a senha?
          </p>

          <button
            type="submit"
            className="bg-[#ffd900a6] text-black font-semibold py-2 rounded-xl hover:bg-[#ffd900] transition"
          >
            Entrar
          </button>

          <a
            href="/cadastro"
            className="text-center text-red-600 font-semibold hover:underline cursor-pointer"
          >
            Criar uma conta
          </a>
        </form>
      </div>
    </div>
  );
}
