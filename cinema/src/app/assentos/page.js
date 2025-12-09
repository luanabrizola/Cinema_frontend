"use client";
import { useEffect, useState } from "react";
import { Star, Accessibility } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Assentos() {
    const params = useSearchParams();
    const idSala = params.get("id_sala");

    const [assentos, setAssentos] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 Busca do backend
    async function carregarAssentos() {
        try {
            const resp = await fetch(`http://localhost:3333/assento?id_sala=${idSala}`);
            const data = await resp.json();

            setAssentos(data);
        } catch (err) {
            console.error("Erro ao carregar assentos:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (idSala) carregarAssentos();
    }, [idSala]);

    // 🔠 Agrupa os assentos pela fila
    const fileiras = assentos.reduce((acc, a) => {
        if (!acc[a.fila]) acc[a.fila] = [];
        acc[a.fila].push(a);
        return acc;
    }, {});

    // 🔤 Ordena por número
    Object.keys(fileiras).forEach(fila => {
        fileiras[fila].sort((a, b) => a.numero - b.numero);
    });

    // 🔘 Função de seleção
    function toggleSeat(code, tipo) {
        if (tipo === "R") return;

        setSelected(prev =>
            prev.includes(code)
                ? prev.filter(s => s !== code)
                : [...prev, code]
        );
    }

    // 🎨 Render de cada assento individual
    function Seat({ assento }) {
        const code = `${assento.fila}${assento.numero}`;
        const isSelected = selected.includes(code);

        let style = "w-10 h-10 rounded-md flex items-center justify-center cursor-pointer transition text-white";

        switch (assento.tipo) {
            case "N":
                style += isSelected ? " bg-red-600" : " bg-neutral-600 hover:bg-neutral-500";
                break;
            case "S":
                style += " bg-red-600";
                break;
            case "R":
                style += " bg-yellow-500 cursor-not-allowed";
                break;
            case "CD":
                style += isSelected ? " bg-red-600" : " bg-neutral-600 hover:bg-neutral-500";
                break;
            case "V":
                style += isSelected ? " bg-red-600" : " bg-neutral-600 hover:bg-neutral-500";
                break;
        }

        return (
            <button
                className={style}
                onClick={() => toggleSeat(code, assento.tipo)}
                disabled={assento.tipo === "R"}
            >
                {assento.tipo === "CD" && <Accessibility size={18} />}
                {assento.tipo === "V" && <Star size={18} />}
            </button>
        );
    }

    // if (loading) {
    //     return (
    //         <div className="w-full min-h-[70vh] flex items-center justify-center text-2xl font-bold">
    //             Carregando assentos...
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-[calc(100vh-110px)] w-full flex flex-col items-center">
            <div className="flex mt-5 w-full justify-center flex-wrap gap-y-2">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="flex items-center">
                        <button className={`flex text-white w-9 h-9 sm:w-[50px] sm:h-[50px] lg:w-[60px] lg:h-[60px] rounded-xl items-center justify-center font-bold ${n <= 2 ? "bg-[#a60301]/50" : "bg-[#a60301]"}`}>
                            <p className="font-bold text-base sm:text-xl lg:text-2xl">{n}</p>
                        </button>

                        {n < 6 && (
                            <div className="border-t-2 border-[#545454] w-[35px] sm:w-[70px] lg:w-[100px] flex self-center"></div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex w-full justify-center overflow-x-auto">
                {["Sessões", "Assentos", "Ingressos", "Bomboniere", "Pagamento", "Confirmação"].map((t) => (
                    <div key={t} className="w-[90px] sm:w-40 text-center font-bold text-xs sm:text-base">
                        {t}
                    </div>
                ))}
            </div>

            <div className="w-full max-w-[1200px] mt-10 flex items-center gap-4">
                <Link href="/sessoes">
                    <button className="cursor-pointer rotate-180 bg-black text-white text-4xl w-12 h-12 rounded-full ml-10 hover:scale-105 hover:bg-black/80">➜</button>
                </Link>
                <span className="text-xl font-bold">Comprar ingresso</span>
            </div>

            <div className="w-full max-w-[1200px] mt-10 flex justify-between">
                <div className="flex flex-col items-center w-[65%]">

                    <div className="flex flex-col gap-3">
                        {Object.entries(fileiras).map(([fila, seats]) => (
                            <div key={fila} className="flex gap-2 justify-center items-center">
                                <span className="w-4 font-bold">{fila}</span>

                                <div className="flex gap-2">
                                    {seats.map((assento) => (
                                        <Seat key={assento.id_assento} assento={assento} />
                                    ))}
                                </div>

                                <span className="w-4 font-bold">{fila}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-lg font-bold">
                        Assentos selecionados: {selected.join(", ") || "nenhum"}
                    </div>
                </div>

                <div className="w-[30%] border-l pl-6 flex flex-col">
                    <Link href="/ingressos">
                        <button className="bg-[#a60301] cursor-pointer hover:bg-[#c90401] text-white p-2 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3">
                            Continuar para ingressos ➜
                        </button>
                    </Link>

                    <div className="mt-8 flex flex-col gap-4 text-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-neutral-600 rounded" />
                            <span>Disponível</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-red-600 rounded" />
                            <span>Selecionado</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-yellow-500 rounded" />
                            <span>Reservado</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Accessibility size={20} />
                            <span>Cadeirante</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Star size={20} />
                            <span>Vip</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
