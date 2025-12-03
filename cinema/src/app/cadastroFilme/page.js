export default function CadastroFilme() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#a60301]">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl text-[#a60301] font-bold text-center mb-6">Cadastrar filme  </h1>

                <form className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Nome filme"
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <input
                        type="number"
                        placeholder="Duração"
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <input
                        type="text"
                        placeholder="Sinopse"
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <input
                        type="number"
                        placeholder="Ano de lançamento"
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <input
                        type="text"
                        placeholder="Classificação"
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <input
                        type="file"
                        accept="image/*"
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
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}