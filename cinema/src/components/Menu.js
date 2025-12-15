"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Menu() {
  const [usuario, setUsuario] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const userStorage = localStorage.getItem("usuario");
    if (userStorage) {
      setUsuario(JSON.parse(userStorage));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  return (
    <nav className="flex items-center justify-between bg-[#ffd900] px-8 py-4 relative">
      <div className="flex items-center gap-2">
        <img src="/logo.png" className="h-20 w-auto" />

        <ul className="flex gap-20 text-lg font-semibold text-black ml-25">
          <li>
            <Link href="/" className="text-2xl hover:text-[#a60301] transition">
              Em cartaz
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-2xl hover:text-[#a60301] transition">
              Sobre nós
            </Link>
          </li>
        </ul>
      </div>

      {!usuario ? (
        <Link
          href="/login"
          className="bg-[#a60301] text-white font-semibold px-5 py-2 rounded-full w-52 hover:bg-[#800200] transition cursor-pointer"
        >
          Fazer login
        </Link>
      ) : (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="bg-[#a60301] text-white font-semibold px-5 py-2 rounded-full w-52 cursor-pointer hover:bg-[#800200] transition "
          >
            Olá, {usuario.nome_usuario.split(" ")[0]}!
          </button>

          {open && (
            <div className="absolute right-0 mt-2 bg-white rounded-lg w-52 z-50">
              <Link
                href="/minhas-compras"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Minhas compras
              </Link>

              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
