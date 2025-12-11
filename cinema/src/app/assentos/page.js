"use client";
import { useEffect, useState } from "react";
import { Star, Accessibility, CalendarClock, MapPinned } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Assentos() {
    const params = useSearchParams();
    const idSala = params.get("id_sala");
    const idSessao = params.get("id_sessao");
    const idFilme = params.get("id_filme");

    const [assentos, setAssentos] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filme, setFilme] = useState(null);
    const [sessao, setSessao] = useState(null);
    const [horarioSelecionado, setHorarioSelecionado] = useState(null);
    const [horariosDoDia, setHorariosDoDia] = useState([]);
    const [nomeSala, setNomeSala] = useState("");


    async function carregarSessao() {
        if (!idSessao) return;
        try {
            const resp = await fetch(`http://localhost:3333/sessao/${idSessao}`);
            const data = await resp.json();

            const formattedHora = data.horario ? String(data.horario).split(":").slice(0, 2).join(":") : data.horario;

            let formattedData = "";
            if (data.data) {
                if (/^\d{4}-\d{2}-\d{2}$/.test(data.data)) {
                    const [year, month, day] = data.data.split("-").map(Number);
                    const d = new Date(year, month - 1, day);
                    formattedData = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
                } else {
                    const d = new Date(data.data);
                    if (!isNaN(d.getTime())) formattedData = d.toLocaleDateString("pt-BR");
                }
            }

            setSessao({ ...data, horarioFormatado: formattedHora, dataFormatada: formattedData });

            setHorarioSelecionado({
                id: data.id_sessao,
                hora: formattedHora,
                tipo: [data.idioma, data.dimensao],
                id_sala: data.id_sala
            });
            setHorariosDoDia([{
                id: data.id_sessao,
                hora: formattedHora,
                tipo: [data.idioma, data.dimensao],
                id_sala: data.id_sala
            }]);
        } catch (err) {
            console.error("Erro ao carregar sessão:", err);
        }
    }

    async function carregarSala() {
        if (!idSala) return;

        try {
            const resp = await fetch(`http://localhost:3333/sala/${idSala}`);
            const data = await resp.json();
            setNomeSala(data.nome_sala);
        } catch (err) {
            console.error("Erro ao carregar sala:", err);
        }
    }

    async function carregarFilme() {
        if (!idFilme) return;
        try {
            const resp = await fetch(`http://localhost:3333/filme/${idFilme}`);
            const data = await resp.json();
            setFilme(data);
        } catch (err) {
            console.error("Erro ao carregar filme:", err);
        }
    }

    async function carregarAssentos() {
        if (!idSala) {
            console.warn("Nenhum id_sala recebido na URL.");
            setLoading(false);
            return;
        }

        try {
            const resp = await fetch(`http://localhost:3333/assento?id_sala=${idSala}`);
            const data = await resp.json();
            setAssentos(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Erro ao carregar assentos:", err);
            setAssentos([]);
        } finally {
            setLoading(false);
        }
    }

    function formatarData(dataStr) {
        if (!dataStr) return "Data inválida";

        if (/^\d{4}-\d{2}-\d{2}$/.test(dataStr)) {
            const [year, month, day] = dataStr.split("-").map(Number);
            const d = new Date(year, month - 1, day);
            return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
        }

        const d = new Date(dataStr);
        if (isNaN(d.getTime())) return "Data inválida";
        return d.toLocaleDateString("pt-BR");
    }

    useEffect(() => {
        carregarAssentos();
        carregarFilme();
        carregarSala();
        carregarSessao();
    }, [idSala, idSessao, idFilme]);

    useEffect(() => {
        if (!idFilme) return;

        async function carregarGenero() {
            try {
                const res = await fetch(`http://localhost:3333/genero-do-filme/filme/${idFilme}`);
                const data = await res.json();

                if (Array.isArray(data) && data.length > 0) {
                    const idGenero = data[0].id_genero;
                    const resGenero = await fetch(`http://localhost:3333/genero/${idGenero}`);
                    const generoData = await resGenero.json();

                    setFilme((prev) => {
                        if (prev) return { ...prev, genero: generoData.nome_genero };
                        return { genero: generoData.nome_genero };
                    });
                } else {
                    setFilme((prev) => (prev ? { ...prev, genero: "Gênero não informado" } : { genero: "Gênero não informado" }));
                }
            } catch (error) {
                console.error("Erro ao carregar gênero do filme:", error);
            }
        }

        carregarGenero();
    }, [idFilme]);

    const fileiras = Array.isArray(assentos)
        ? assentos.reduce((acc, a) => {
            if (!acc[a.fila]) acc[a.fila] = [];
            acc[a.fila].push(a);
            return acc;
        }, {})
        : {};

    Object.keys(fileiras).forEach((fila) => {
        fileiras[fila].sort((a, b) => a.numero - b.numero);
    });

    function toggleSeat(code, tipo) {
        if (tipo === "R") return;
        setSelected((prev) =>
            prev.includes(code) ? prev.filter((s) => s !== code) : [...prev, code]
        );
    }

    function Seat({ assento }) {
        const code = `${assento.fila}${assento.numero}`;
        const isSelected = selected.includes(code);

        let style = "w-10 h-10 rounded-md flex items-center justify-center cursor-pointer transition text-white";

        switch (assento.tipo) {
            case "N":
            case "CD":
            case "V":
                style += isSelected ? " bg-red-600" : " bg-neutral-600 hover:bg-neutral-500";
                break;
            case "S":
                style += " bg-red-600";
                break;
            case "R":
                style += " bg-yellow-500 cursor-not-allowed";
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

    function getClassColor(classificacao) {
        const cores = {
            "L": "#00A000",
            "10": "#0072BB",
            "12": "#E6B400",
            "14": "#E65100",
            "16": "#C62828",
            "18": "#000000"
        };
        const key = (classificacao || "L").replace(/\D/g, "");
        return cores[key] || "#00A000";
    }

    if (loading) return <p>Carregando...</p>;
    if (!filme) return <p>Filme não encontrado.</p>;

    const dataFormatada = sessao
        ? (sessao.dataFormatada || (sessao.data ? formatarData(sessao.data) : ""))
        : "";

    return (
        <div className="min-h-[calc(100vh-110px)] w-full flex flex-col items-center px-2 sm:px-4">
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

            {/* TÍTULOS */}
            <div className="flex w-full justify-center overflow-x-auto">
                {["Sessões", "Assentos", "Ingressos", "Bomboniere", "Pagamento", "Confirmação"].map((t) => (
                    <div key={t} className="w-[90px] sm:w-40 text-center font-bold text-xs sm:text-base">{t}</div>
                ))}
            </div>

            {/* ASSENTOS */}
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
                </div>

                <div className="w-[30%] border-l pl-6 flex flex-col">
                    <Link
                        href={{
                            pathname: "/ingressos",
                            query: {
                                assentosSelecionados: selected.join(","),
                                id_filme: filme.id_filme,
                                id_sessao: sessao.id_sessao,
                                data: sessao.data,
                                horario: sessao.horario,
                                sala: sessao.id_sala,
                            },
                        }}
                    >
                        <button className="bg-[#a60301] cursor-pointer hover:bg-[#c90401] text-white p-2 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 ">
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
                                    <div
                                        className="rounded-lg w-8 h-8 flex items-center justify-center text-white font-bold ml-2"
                                        style={{ backgroundColor: getClassColor(filme.classificacao) }}
                                    >
                                        {(filme.classificacao || "L").replace(/\D/g, "")}
                                    </div>
                                </div>
                                <span className="text-sm text-[#545454]">{filme.genero || "Gênero não informado"}</span>
                                <span className="text-sm text-[#545454]">{filme.duracao ? `${filme.duracao} min` : "Duração não informada"}</span>
                            </div>
                        </div>

                        <div className="border-r border-[#a6a6a6] h-24 mx-6" />

                        <div className="flex flex-col">
                            <span className="font-bold">Sessão</span>

                            <p className="text-sm text-[#545454] flex items-center">
                                <CalendarClock className="w-4 h-4 mr-1" />
                                {dataFormatada} às {horarioSelecionado.hora}

                            </p>

                            <span className="text-sm text-[#545454] flex items-center mt-1">
                                <MapPinned className="w-4 h-4 mr-1" />
                                CineAJL, {nomeSala}
                            </span>

                            <div className="flex mt-1 gap-1">
                                {horariosDoDia.map((h) => {
                                    if (h.hora === horarioSelecionado?.hora) {
                                        const idiomaBadge = h.tipo[0]?.toLowerCase().includes("português") ? "DUB" : "LEG";
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
                            <span className="text-sm text-[#545454]">{selected.length > 0 ? selected.join(", ") : "Nenhum"}</span>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
