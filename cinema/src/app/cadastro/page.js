export default function Cadastro(){
    return(
        <div className="min-h-screen flex items-center justify-center bg-[#a60301]">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl text-[#a60301] font-bold text-center mb-6">Criar uma conta</h1>

                <form className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Nome"
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <input
                        type="text"
                        placeholder="CPF"
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <div className="flex space-x-4">
                        <input
                            type="date"
                            placeholder="Data Nasc"
                            className="rounded-lg p-2 w-1/2 bg-[#fff6f6]"
                        />
                        <input
                            type="tel"
                            placeholder="Telefone"
                            className="rounded-lg p-2 w-1/2 bg-[#fff6f6]"
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="E-mail"
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <input
                        type="password"
                        placeholder="Confirmar senha"
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <div className="flex justify-between pt-4">
                        <button
                            type="button"
                            className="w-[48%] bg-[#ffd900a6] text-black font-semibold py-2 rounded-xl hover:bg-[#ffd900] transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="w-[48%] bg-[#ffd900a6] text-black font-semibold py-2 rounded-xl hover:bg-[#ffd900] transition"
                        >
                            Criar
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}