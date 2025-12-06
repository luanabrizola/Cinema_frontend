"use client";
import { useState } from "react";
import { Star, Accessibility} from "lucide-react";
import Link from "next/link";

export default function Assentos() {

    const rows = {
        A: ["CD", "CD", "CD", "CD", "N", "N", "N", "N", "CD"],
        B: ["N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N"],
        C: ["N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N"],
        D: ["N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N"],
        E: ["N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N"],
        F: ["N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N"],
        G: ["N", "N", "V", "V", "V", "V", "V", "V", "V", "V", "N", "N", "N", "N", "N"],
        H: ["N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N"],
    };

    const [selected, setSelected] = useState([]);

    function toggleSeat(code, type) {
        if (type === "R") return;

        setSelected(prev =>
            prev.includes(code)
                ? prev.filter(s => s !== code)
                : [...prev, code]
        );
    }

    function Seat({ row, index, type }) {
        const code = `${row}${index + 1}`;
        const isSelected = selected.includes(code);

        let base = "w-10 h-10 rounded-md flex items-center justify-center cursor-pointer transition text-white";
        let style = "";

        switch (type) {
            case "N":
                style = isSelected ? "bg-red-600" : "bg-neutral-600 hover:bg-neutral-500";
                break;
            case "S":
                style = "bg-red-600";
                break;
            case "R":
                style = "bg-yellow-500 cursor-not-allowed";
                break;
            case "CD":
                style = isSelected ? "bg-red-600" : "bg-neutral-600 hover:bg-neutral-500";
                break;
            case "V":
                style = isSelected ? "bg-red-600" : "bg-neutral-700 hover:bg-neutral-600";
                break;
        }

        return (
            <button
                className={`${base} ${style}`}
                onClick={() => toggleSeat(code, type)}
                disabled={type === "R"}
            >
                {type === "CD" && <Accessibility size={18} />}
                {type === "V" && <Star size={18} />}
            </button>
        );
    }

    return (
        <div className="min-h-[calc(100vh-110px)] w-full flex flex-col items-center">
            {/* ETAPAS */}
            <div className="flex mt-5 w-full justify-center flex-wrap gap-y-2">

                {[1, 2, 3, 4, 5, 6].map((n, i) => (
                    <div key={n} className="flex items-center">
                        <button
                            className={`flex text-white w-9 h-9 sm:w-[50px] sm:h-[50px] lg:w-[60px] lg:h-[60px] rounded-xl items-center justify-center font-bold ${n <= 1 ? "bg-[#a60301]/50" : "bg-[#a60301]"}`}
                        >
                            <p className="font-bold text-base sm:text-xl lg:text-2xl">{n}</p>
                        </button>

                        {n < 6 && (
                            <div className="border-t-2 border-[#545454] w-[35px] sm:w-[70px] lg:w-[100px] flex self-center"></div>
                        )}
                    </div>
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
                <Link href="/sessoes" className="flex items-center justify-center">
                    <button className="cursor-pointer rotate-180 bg-black text-white text-4xl w-12 h-12 rounded-full ml-10 hover:scale-105 hover:bg-black/80">➜</button>
                </Link>
                <span className="text-xl font-bold">Comprar ingresso</span>
            </div>

            <div className="w-full max-w-[1200px] mt-10 flex justify-between">

                <div className="flex flex-col items-center w-[65%]">

                    <div className="flex flex-col gap-3">
                        {Object.entries(rows).map(([rowLabel, seats]) => (
                            <div key={rowLabel} className="flex gap-2 justify-center items-center">
                                <span className="w-4 font-bold">{rowLabel}</span>

                                <div className="flex gap-2">
                                    {seats.map((type, idx) => (
                                        <Seat key={idx} row={rowLabel} index={idx} type={type} />
                                    ))}
                                </div>

                                <span className="w-4 font-bold">{rowLabel}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-lg font-bold">
                        Assentos selecionados: {selected.join(", ") || "nenhum"}
                    </div>
                </div>

                <div className="w-[30%] border-l pl-6 flex flex-col">
                    <Link href="/ingressos">
                        <button className="bg-[#a60301] cursor-pointer hover:bg-[#c90401] hover:scale-105 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3">
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
