"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarClock, MapPinned } from "lucide-react";
import Link from "next/link";

export default function Sessoes() {
    const diasSemana = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."];

    const hoje = new Date();

    const proximos7Dias = Array.from({ length: 7 }, (_, i) => {
        const data = new Date();
        data.setDate(hoje.getDate() + i);

        const dia = String(data.getDate()).padStart(2, "0");
        const semana = diasSemana[data.getDay()];

        return { dia, semana };
    });

    const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

    const mesAtual = meses[hoje.getMonth()];

    const [diaSelecionado, setDiaSelecionado] = useState(0);

    const [horarioSelecionado, setHorarioSelecionado] = useState(null);

    const horarios = [
        { id: 1, hora: "15:30", tipo: ["DUB", "2D"] },
        { id: 2, hora: "19:30", tipo: ["DUB", "2D"] }
    ];

    const dataSelecionada = diaSelecionado !== null ? proximos7Dias[diaSelecionado] : null;

    const dataFormatada = dataSelecionada ? `${dataSelecionada.dia}/${String(hoje.getMonth() + 1).padStart(2, "0")}/${hoje.getFullYear()}` : "";

    const [filme, setFilme] = useState(null);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        if (!id) return;

        async function carregarFilme() {
            try {
                const res = await fetch(`http://localhost:3333/filme/${id}`);
                const data = await res.json();

                console.log("Filme carregado:", data);

                setFilme(data);
            } catch (error) {
                console.error("Erro ao carregar filme:", error);
            } finally {
                setLoading(false);
            }
        }

        carregarFilme();
    }, [id]);

    if (loading) return <p>Carregando filme...</p>;
    if (!filme) return <p>Filme não encontrado.</p>;

    const getClassColor = (classificacao) => {
        if (!classificacao) return "#00A000";

        const value = classificacao
            .toString()
            .trim()
            .toUpperCase()
            .replace(/\D/g, "");

        const key = value === "" ? "L" : value;

        const cores = {
            "L": "#00A000",
            "10": "#0072BB",
            "12": "#E6B400",
            "14": "#E65100",
            "16": "#C62828",
            "18": "#000000"
        };

        return cores[key] || "#00A000";
    };

    return (
        <div className="min-h-[calc(100vh-110px)] w-full flex-col flex items-center px-2 sm:px-4">
            {/* ETAPAS */}
            <div className="flex mt-5 w-full justify-center flex-wrap gap-y-2">

                {[1, 2, 3, 4, 5, 6].map((n, i) => (
                    <>
                        <button
                            className={'flex text-white w-9 h-9 sm:w-[50px] sm:h-[50px] lg:w-[60px] lg:h-[60px] rounded-xl items-center justify-center font-bold bg-[#a60301]'}
                        >
                            <p className="font-bold text-base sm:text-xl lg:text-2xl">{n}</p>
                        </button>

                        {n < 6 && (
                            <div className="border-t-2 border-[#545454] w-[35px] sm:w-[70px] lg:w-[100px] flex self-center"></div>
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

            {/* Avançar para assentos */}
            <div className="flex flex-wrap justify-end w-full mt-4 gap-3">
                <Link className="w-[18%] mr-10" href="/assentos">
                    <button className="bg-[#a60301] text-white font-bold w-full h-12 rounded-full cursor-pointer transition-all duration-200 hover:bg-[#c90401] hover:scale-105">
                        Continuar para assentos
                    </button>
                </Link>
            </div>

            {/* COnteúdos da sessão */}
            <div className="flex w-full mt-16">
                <div className="flex w-[40%] ml-10">
                    <img
                        src={filme.foto_capa ? `http://localhost:3333/${filme.foto_capa}` : "/placeholder.jpg"}
                        alt={filme.nome_filme}
                        className="rounded-lg mb-4 w-40 h-auto object-cover"
                    />

                    <div className="ml-5">
                        <p className="font-bold text-xl flex items-center">
                            {filme.nome_filme}

                            <div className="rounded-lg w-8 h-8 flex items-center justify-center text-white font-bold ml-2"
                                style={{ backgroundColor: getClassColor(filme.classificacao) }}
                            >
                                {(filme.classificacao || "L").replace(/\D/g, "")}
                            </div>

                        </p>

                        <p>{filme.genero || "Gênero não informado"}</p>
                        <p>{filme.duracao ? `${filme.duracao} min` : "Duração não informada"}</p>
                    </div>


                </div>
                <div className="flex flex-col w-[60%]">
                    <h1 className="font-bold text-xl">Escolha uma sessão</h1>
                    <div className="flex border border-[#a6a6a6] w-[80%] h-[28%] rounded-xl mt-3 items-center">
                        <div className="flex bg-[#d9d9d9] w-[9%] h-[80%] ml-2.5 rounded-xl items-center justify-center">
                            {mesAtual}
                        </div>
                        <div className="flex w-[90%] h-full rounded-xl items-center justify-around mx-8">
                            {proximos7Dias.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setDiaSelecionado(index)}
                                    className={`flex w-[10%] h-[80%] rounded-xl items-center justify-center transition-all duration-200 cursor-pointer ${diaSelecionado === index
                                        ? "bg-[#a60301] font-bold text-white"
                                        : "bg-transparent text-black"
                                        }`}
                                >
                                    {item.dia}
                                    <br />
                                    {item.semana}
                                </button>
                            ))}

                        </div>
                    </div>
                    <div className="border border-[#a6a6a6] w-[80%] h-[40%] rounded-xl mt-5 flex items-center">
                        <div className="ml-2.5 border-l-2 border-[#a60301] h-[72px] flex items-center">
                            <p className="font-bold text-xl ml-3">Sala 1</p>
                        </div>
                        {horarios.map((horario) => (
                            <button
                                key={horario.id}
                                onClick={() => setHorarioSelecionado(horario.hora)}
                                className={`flex w-[20%] h-[80%] rounded-xl items-center justify-center flex-col ml-10 cursor-pointer transition-all ${horarioSelecionado === horario.hora
                                    ? "border border-[#a6a6a6] scale-105"
                                    : ""
                                    }`}
                            >
                                <p>{horario.hora}</p>

                                <div className="flex w-full h-[50%] items-center justify-around">
                                    {horario.tipo.map((tipo, index) => (
                                        <div
                                            key={index}
                                            className="bg-[#ffd900] rounded-xl w-[40%] h-[90%] flex items-center justify-center text-white font-bold"
                                        >
                                            {tipo}
                                        </div>
                                    ))}
                                </div>
                            </button>
                        ))}

                    </div>
                </div>
            </div>

            {/* Rodapé */}
            {diaSelecionado !== null && horarioSelecionado !== null && filme && (
                <div className="flex fixed bottom-0 w-full flex-col bg-white">
                    <div className="border-t border-[#a6a6a6] w-full flex"></div>

                    <div className="mt-4 ml-2 sm:ml-8 mb-2 flex flex-wrap">

                        {/* FILME */}
                        <div className="flex flex-row">
                            <div>
                                <img
                                    src={
                                        filme.foto_capa
                                            ? `http://localhost:3333/${filme.foto_capa}`
                                            : "/placeholder.jpg"
                                    }
                                    alt={filme.nome_filme}
                                    className="h-[90px] sm:h-[120px] rounded-md object-cover"
                                />
                            </div>

                            <div className="ml-5">
                                <p className="font-bold flex items-center">
                                    {filme.nome_filme}

                                    <div className="rounded-lg w-8 h-8 flex items-center justify-center text-white font-bold ml-2"
                                        style={{ backgroundColor: getClassColor(filme.classificacao) }}
                                    >
                                        {(filme.classificacao || "L").replace(/\D/g, "")}
                                    </div>
                                </p>

                                <p className="text-sm text-[#545454]">
                                    {filme.genero || "Gênero não informado"}
                                </p>

                                <p className="text-sm text-[#545454]">
                                    {filme.duracao ? `${filme.duracao} min` : "Duração não informada"}
                                </p>
                            </div>
                        </div>

                        <div className="border-r border-[#a6a6a6] h-24 flex mr-3 ml-6 self-center"></div>

                        {/* SESSÃO */}
                        <div className="flex flex-col">
                            <p className="font-bold">Sessão</p>

                            <p className="text-sm text-[#545454] flex items-center">
                                <CalendarClock className="w-4 h-4 mr-1" />
                                {dataFormatada} às {horarioSelecionado}
                            </p>

                            <p className="text-sm text-[#545454] flex items-center mt-1">
                                <MapPinned className="w-4 h-4 mr-1" />
                                CineAJL, sala 1
                            </p>

                            <div className="flex mt-1">
                                <div className="bg-[#a60301] rounded-lg w-7 h-6 flex items-center justify-center text-white font-bold mr-1">
                                    3D
                                </div>
                                <div className="bg-[#ffd900] rounded-lg w-8 h-6 flex items-center justify-center text-white font-bold">
                                    DUB
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}
