import { User, Lock } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#a60301]">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
       <img
          src="/logo.png"
          className="h-20 w-auto"
        />
        <h1 className="text-2xl font-bold text-center mb-6">Fazer login</h1>

        <form className="w-full flex flex-col space-y-4">
          <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-[#ffd900]">
            <User className="text-gray-500 mr-2" size={20} />
            <input
              type="text"
              placeholder="Login"
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-[#ffd900]">
            <Lock className="text-gray-500 mr-2" size={20} />
            <input
              type="password"
              placeholder="Senha"
              className="w-full outline-none"
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

          <a href="/cadastro" className="text-center text-red-600 font-semibold hover:underline cursor-pointer">
            Criar uma conta
          </a>
        </form>
      </div>
    </div>
  );
}
