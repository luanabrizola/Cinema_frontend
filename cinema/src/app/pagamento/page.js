import Link from "next/link"
export default function Pagamento() {
    return (
        <div className="min-h-[calc(100vh-110px)] w-full flex flex-col items-center">
            {/* ETAPAS */}
            <div className="flex mt-5 w-full justify-center flex-wrap gap-y-2">

                {[1, 2, 3, 4, 5, 6].map((n, i) => (
                    <>
                        <button
                            key={n}
                            className={`flex text-white w-9 h-9 sm:w-[50px] sm:h-[50px] lg:w-[60px] lg:h-[60px] rounded-xl items-center justify-center font-bold ${n <= 4 ? "bg-[#a60301]/50" : "bg-[#a60301]"}`}
                        >
                            <p className="font-bold text-base sm:text-xl lg:text-2xl">{n}</p>
                        </button>

                        {n < 6 && (
                            <div
                                className="border-t-2 border-[#545454]
                w-[35px] sm:w-[70px] lg:w-[100px]
                flex self-center"
                            ></div>
                        )}
                    </>
                ))}

            </div>

            {/* TÍTULOS */}
            <div className="flex w-full justify-center overflow-x-auto">
                {["Sessões", "Assentos", "Ingressos", "Bomboniere", "Pagamento", "Confirmação"].map((t) => (
                    <div key={t} className="w-[90px] sm:w-40 text-center font-bold text-xs sm:text-base">
                        {t}
                    </div>
                ))}
            </div>

            <div className="w-full max-w-[1200px] mt-10 flex items-center gap-4">
                <Link href="/bomboniere">
                    <button className="rotate-180 bg-black text-white text-4xl w-12 h-12 rounded-full ml-10">
                        ➜
                    </button>
                </Link>
                <span className="text-xl font-bold">Escolha forma de pagamento</span>
            </div>

            <div className="w-full max-w-[1200px] mt-6 flex gap-6">

                <div className="flex-1 flex flex-col gap-4 bg-[#f6f6f6] p-6 rounded-xl shadow">

                    <div className="bg-white p-5 rounded-xl shadow border border-gray-300 flex flex-col items-center text-center">
                        <h1 className="font-bold text-lg">PIX</h1>

                        <img src="/pix.png" className="w-10 h-10 mt-2" />

                        <p className="text-sm mt-2 text-gray-700">
                            O pagamento é instantâneo e só pode ser à vista.<br />
                            Pague apontando sua câmera para o QR Code que você verá ao escolher essa opção.
                        </p>
                    </div>


                    <div className="bg-white p-5 rounded-xl shadow border border-gray-300 flex flex-col items-center text-center">
                        <h1 className="font-bold text-lg">Cartões de crédito</h1>
                        <img
                            src="/cartoesCredito.png"
                            className="h-20 w-auto mt-3"
                        />
                    </div>

                    <div className="flex items-center gap-2 bg-white p-4 rounded-xl shadow border border-gray-300">
                        <p className="text-sm font-semibold">Adicionar cupom de desconto?</p>

                        <input
                            type="text"
                            className="flex-1 border rounded-lg px-3 py-1 outline-none bg-gray-100"
                        />

                        <button className="bg-[#a60301] text-white rounded-2xl px-4 py-1 font-semibold">
                            Aplicar
                        </button>
                    </div>

                </div>

                <div className="w-[380px] bg-white shadow p-5 rounded-xl border border-gray-200 flex flex-col gap-4">

                    <span className="font-bold text-xl">Carrinho</span>

                    <div className="flex gap-3">
                        <img
                            src="/interstellar.jpg"
                            alt="Poster"
                            className="w-24 h-32 rounded-md object-cover"
                        />
                        <div className="flex flex-col">
                            <h2 className="font-bold">Interestelar</h2>
                            <span className="text-green-600 font-bold">L</span>
                            <p className="text-sm text-gray-600">Ficção • 120min</p>
                            <p className="text-xs text-gray-600 mt-1">
                                02/10/2025 às 19:30 <br />
                                CineAJL sala 8 — <b>3D</b> • <b>DUB</b>
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold">Assentos escolhidos</h3>
                        <p className="text-sm">C3</p>
                    </div>

                    <div>
                        <h3 className="font-bold">Tipo de ingresso</h3>
                        <p className="flex justify-between text-sm">
                            <span>1x 3D - Meia</span>
                            <span>R$10,00</span>
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold">Produtos</h3>

                        <p className="flex justify-between text-sm">
                            <span>2x Água mineral 500ml</span>
                            <span>R$5,00</span>
                        </p>
                        <p className="flex justify-between text-sm">
                            <span>1x Pipoca média</span>
                            <span>R$10,00</span>
                        </p>
                    </div>

                    <div className="border-t pt-4">
                        <p className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>R$30,00</span>
                        </p>
                    </div>

                </div>

            </div>

        </div>

    )
}
