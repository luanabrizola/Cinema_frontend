"use client";
import { useState } from "react";
import { CalendarClock, MapPinned } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Ingressos() {
    const params = useSearchParams();
    const assentosSelecionados = params.get("assentosSelecionados") || "";
    const selected = assentosSelecionados.split(",").filter(Boolean);
    const maxIngressos = selected.length;

    const [meiaQtd, setMeiaQtd] = useState(0);
    const [inteiraQtd, setInteiraQtd] = useState(0);

    const precoMeia = 13;
    const precoInteira = 26;
    const subtotalMeia = meiaQtd * precoMeia;
    const subtotalInteira = inteiraQtd * precoInteira;
    const total = subtotalMeia + subtotalInteira;
    const totalSelecionado = meiaQtd + inteiraQtd;

    const incrementarMeia = () => {
        if (totalSelecionado < maxIngressos) setMeiaQtd(prev => prev + 1);
    };
    const incrementarInteira = () => {
        if (totalSelecionado < maxIngressos) setInteiraQtd(prev => prev + 1);
    };

    // --- Dados de exemplo para o rodapé ---
    const filme = {
        nome_filme: "Filme Exemplo",
        foto_capa: null,
        classificacao: "L",
        genero: "Ação",
        duracao: 120
    };
    const sessao = {
        data: "2025-12-10",
        horario: "19:30",
        id_sala: "1"
    };
    const horarioSelecionado = {
        hora: "19:30",
        tipo: ["Português", "2D"]
    };
    const horariosDoDia = [
        { id: 1, hora: "17:00", tipo: ["Português", "2D"] },
        { id: 2, hora: "19:30", tipo: ["Português", "2D"] },
        { id: 3, hora: "22:00", tipo: ["Legendado", "3D"] }
    ];

    return (
        <div className="min-h-[calc(100vh-110px)] w-full flex-col flex items-center px-2 sm:px-4">

            {/* Barra de progresso */}
            <div className="flex mt-5 w-full justify-center flex-wrap gap-y-2">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="flex items-center">
                        <button className={`flex text-white w-9 h-9 sm:w-[50px] sm:h-[50px] lg:w-[60px] lg:h-[60px] rounded-xl items-center justify-center font-bold ${n <= 2 ? "bg-[#a60301]/50" : "bg-[#a60301]"}`}>
                            <p className="font-bold text-base sm:text-xl lg:text-2xl">{n}</p>
                        </button>
                        {n < 6 && <div className="border-t-2 border-[#545454] w-[35px] sm:w-[70px] lg:w-[100px] flex self-center"></div>}
                    </div>
                ))}
            </div>

            {/* Etapas */}
            <div className="flex w-full justify-center overflow-x-auto mt-3">
                {["Sessões", "Assentos", "Ingressos", "Bomboniere", "Pagamento", "Confirmação"].map((t) => (
                    <div key={t} className="w-[90px] sm:w-40 text-center font-bold text-xs sm:text-base">{t}</div>
                ))}
            </div>

            {/* Seleção de ingressos */}
            <div className="flex flex-col w-full mt-6">
                <div className="flex justify-between w-full mb-4">
                    <Link href="/assentos">
                        <button className="rotate-180 bg-black text-white text-4xl w-12 h-12 rounded-full ml-10 cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-black/80">➜</button>
                    </Link>
                    <Link href="/bomboniere" className="mr-10 w-[18%]">
                        <button className="bg-[#a60301] text-white font-bold w-full h-12 rounded-full cursor-pointer transition-all duration-200 hover:bg-[#c90401] hover:scale-105">
                            Continuar para bomboniere
                        </button>
                    </Link>
                </div>

                <h1 className="font-bold text-xl ml-[15%]">Escolha o tipo do ingresso:</h1>

                <div className="flex w-full mt-3 justify-center items-center pb-[180px]">
                    <div className="flex relative border border-[#a6a6a6] w-[1000px] h-[200px] rounded-xl flex-col p-2">

                        {/* Cabeçalho */}
                        <div className="flex justify-evenly w-full py-3 font-bold">
                            <p className="w-1/4 text-center">Tipo de ingresso</p>
                            <p className="w-1/4 text-center">Preço</p>
                            <p className="w-1/4 text-center">Quantidade</p>
                            <p className="w-1/4 text-center">Subtotal</p>
                        </div>

                        {/* Meia */}
                        <div className="flex justify-evenly w-full py-2 font-bold">
                            <p className="w-1/4 text-center">Meia</p>
                            <p className="w-1/4 text-center">R$ 13,00</p>
                            <div className="w-1/4 flex justify-center items-center gap-4">
                                <button className="bg-gray-300 px-3 rounded-full" onClick={() => setMeiaQtd(prev => Math.max(0, prev - 1))}>-</button>
                                <p className="w-6 text-center">{meiaQtd}</p>
                                <button className="bg-gray-300 px-3 rounded-full" onClick={incrementarMeia} disabled={totalSelecionado >= maxIngressos}>+</button>
                            </div>
                            <p className="w-1/4 text-center">R$ {subtotalMeia.toFixed(2)}</p>
                        </div>

                        {/* Inteira */}
                        <div className="flex justify-evenly w-full py-2 font-bold">
                            <p className="w-1/4 text-center">Inteira</p>
                            <p className="w-1/4 text-center">R$ 26,00</p>
                            <div className="w-1/4 flex justify-center items-center gap-4">
                                <button className="bg-gray-300 px-3 rounded-full" onClick={() => setInteiraQtd(prev => Math.max(0, prev - 1))}>-</button>
                                <p className="w-6 text-center">{inteiraQtd}</p>
                                <button className="bg-gray-300 px-3 rounded-full" onClick={incrementarInteira} disabled={totalSelecionado >= maxIngressos}>+</button>
                            </div>
                            <p className="w-1/4 text-center">R$ {subtotalInteira.toFixed(2)}</p>
                        </div>

                        {/* Total */}
                        <div className="flex justify-evenly w-full py-2 font-bold">
                            <p className="w-1/4"></p>
                            <p className="w-1/4"></p>
                            <p className="w-1/4 text-center text-green-600">Total</p>
                            <div className="w-1/4 text-center bg-[#7ed957]/50 text-green-600 rounded-full py-1">
                                R$ {total.toFixed(2)}
                            </div>
                        </div>

                        {/* Aviso limite */}
                        <p className="text-red-600 font-bold mt-2 text-center">
                            Você pode selecionar até {maxIngressos} ingressos.
                        </p>
                    </div>
                </div>
            </div>

            {filme && sessao && (
                <div className="flex fixed bottom-0 w-full flex-col bg-white border-t border-[#a6a6a6]">
                    <div className="flex flex-wrap mt-2 mb-2 ml-2 sm:ml-8 items-center gap-4">

                        <div className="flex flex-row items-center gap-4">
                            <img
                                src={filme.foto_capa ? `http://localhost:3333/${filme.foto_capa}` : "/placeholder.jpg"}
                                alt={filme.nome_filme}
                                className="h-[90px] sm:h-[120px] rounded-md object-cover"
                            />

                            <div className="flex flex-col">
                                <div className="flex items-center font-bold">
                                    {filme.nome_filme}
                                    <div className="rounded-lg w-8 h-8 flex items-center justify-center text-white font-bold ml-2">
                                        {(filme.classificacao || "L").replace(/\D/g, "")}
                                    </div>
                                </div>
                                <span className="text-sm text-[#545454]">{filme.genero}</span>
                                <span className="text-sm text-[#545454]">{filme.duracao} min</span>
                            </div>
                        </div>

                        <div className="border-r border-[#a6a6a6] h-24 mx-6" />

                        <div className="flex flex-col">
                            <span className="font-bold">Sessão</span>
                            <span className="text-sm text-[#545454] flex items-center">
                                <CalendarClock className="w-4 h-4 mr-1" />
                                {new Date(sessao.data).toLocaleDateString("pt-BR")} às {sessao.horario}
                            </span>
                            <span className="text-sm text-[#545454] flex items-center mt-1">
                                <MapPinned className="w-4 h-4 mr-1" />
                                CineAJL, sala {sessao.id_sala}
                            </span>

                            <div className="flex mt-1 gap-1">
                                {horariosDoDia.map((h) => {
                                    if (h.hora === horarioSelecionado.hora) {
                                        const idiomaBadge = h.tipo[0].toLowerCase().includes("português") ? "DUB" : "LEG";
                                        const tipoSessao = h.tipo[1] || "2D";

                                        return (
                                            <div className="flex gap-1" key={h.id}>
                                                <div className="bg-[#a60301] rounded-lg w-7 h-6 flex items-center justify-center text-white font-bold">
                                                    {tipoSessao}
                                                </div>
                                                <div className="bg-[#ffd900] rounded-lg w-8 h-6 flex items-center justify-center text-white font-bold">
                                                    {idiomaBadge}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>

                        <div className="border-l border-[#a6a6a6] h-24 mx-6" />

                        <div className="flex flex-col">
                            <span className="font-bold">Assentos selecionados</span>
                            <span className="text-sm text-[#545454]">
                                {selected.length > 0 ? selected.join(", ") : "Nenhum"}
                            </span>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
