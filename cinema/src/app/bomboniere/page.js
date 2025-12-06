"use client";
import { useState } from "react";
import { CalendarClock, MapPinned, Search } from "lucide-react";

export default function Bomboniere() {
    const [categoria, setCategoria] = useState(null);

    const [qtdBebidas, setQtdBebidas] = useState({});
    const [qtdPipocas, setQtdPipocas] = useState({});

    const pegarNumero = (valor) => {
        return Number(valor.replace("R$", "").replace(",", ".").trim());
    };

    const [busca, setBusca] = useState("");

    const bebidas = [
        {
            id: 1,
            nome: "Refrigerante 350mL",
            descricao: "Coca-Cola, Kuat, Fanta Laranja, Fanta Uva, Sprite e Coca Zero",
            preco: "R$ 6,00",
            imagem: "/refri.png"
        },
        {
            id: 2,
            nome: "Água Mineral 500mL",
            descricao: "Com e sem gás",
            preco: "R$ 4,00",
            imagem: "/agua.png"
        }
    ];

    const pipocas = [
        {
            id: 1,
            nome: "Pipoca Salgada Grande",
            descricao: "",
            preco: "R$ 16,00",
            imagem: "/pipocagrande.webp"
        },
        {
            id: 2,
            nome: "Pipoca Salgada Média",
            descricao: "",
            preco: "R$ 10,00",
            imagem: "/pipocagrande.webp"
        },
        {
            id: 3,
            nome: "Pipoca Salgada Pequena",
            descricao: "",
            preco: "R$ 7,00",
            imagem: "/pipocagrande.webp"
        }
    ];

    const removerAcentos = (texto) => {
        return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    const bebidasFiltradas = bebidas.filter((item) =>
        removerAcentos(item.nome).includes(removerAcentos(busca))
    );

    const pipocasFiltradas = pipocas.filter((item) =>
        removerAcentos(item.nome).includes(removerAcentos(busca))
    );

    const totalBebidas = bebidas.reduce(
        (total, item) =>
            total + pegarNumero(item.preco) * (qtdBebidas[item.id] || 0),
        0
    );

    const totalPipocas = pipocas.reduce(
        (total, item) =>
            total + pegarNumero(item.preco) * (qtdPipocas[item.id] || 0),
        0
    );

    const totalGeral = totalBebidas + totalPipocas;


    return (
        <div className="min-h-[calc(100vh-110px)] w-full flex-col flex items-center px-2 sm:px-4">

            {/* ETAPAS */}
            <div className="flex mt-5 w-full justify-center flex-wrap gap-y-2">

                {[1, 2, 3, 4, 5, 6].map((n, i) => (
                    <>
                        <button
                            key={n}
                            className={`flex text-white w-9 h-9 sm:w-[50px] sm:h-[50px] lg:w-[60px] lg:h-[60px] rounded-xl items-center justify-center font-bold ${n <= 3 ? "bg-[#a60301]/50" : "bg-[#a60301]"}`}
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

            {/* BOTÕES TOPO */}
            <div className="flex flex-wrap justify-between w-full mt-4 gap-3">
                <button className="rotate-180 bg-black text-white text-4xl w-12 h-12 rounded-full ml-10 cursor-pointer transition-all duration-200 hover:bg-[#a60301] hover:scale-105">
                    ➜
                </button>


                <button className="bg-[#a60301] text-white font-bold w-[18%] h-12 rounded-full mr-10 cursor-pointer transition-all duration-200 hover:bg-[#c90401] hover:scale-105">
                    Continuar para pagamento
                </button>

            </div>

            <h1 className="font-bold text-lg sm:text-xl sm:ml-[20%] self-start mt-2">
                Escolha os produtos
            </h1>

            {/* CATEGORIAS */}
            {categoria === null && (
                <div className="flex w-full mt-3 justify-center items-center flex-wrap gap-6">
                    <button
                        onClick={() => setCategoria("bebidas")}
                        className="flex relative border border-[#a6a6a6] w-[200px] h-[220px] rounded-xl mt-3 mr-20 justify-center items-center flex-col cursor-pointer transition-all duration-200 hover:border-[#f5f5f5] hover:scale-105 hover:bg-[#f5f5f5]"
                    >

                        <div className="flex bg-[#d9d9d9] w-[120px] h-[120px] sm:w-40 sm:h-40 rounded-full justify-center items-center">
                            <img src="/bebida.png" className="h-20 sm:h-[120px]" />
                        </div>
                        <p className="font-bold mt-2">Bebidas</p>
                    </button>

                    <button
                        onClick={() => setCategoria("pipocas")}
                        className="flex relative border border-[#a6a6a6] w-[200px] h-[220px] rounded-xl mt-3 mr-20 justify-center items-center flex-col cursor-pointer transition-all duration-200 hover:border-[#f5f5f5] hover:scale-105 hover:bg-[#f5f5f5]"
                    >
                        <div className="flex bg-[#d9d9d9] w-[120px] h-[120px] sm:w-40 sm:h-40 rounded-full justify-center items-center">
                            <img src="/pipoca.png" className="h-20 sm:h-[120px]" />
                        </div>
                        <p className="font-bold mt-2">Pipocas</p>
                    </button>
                </div>
            )}

            {/* BEBIDAS */}
            {categoria === "bebidas" && (
                <div className="flex flex-col lg:flex-row w-full gap-6 mt-6">

                    <div className="flex flex-col sm:ml-20 gap-3">
                        <button onClick={() => setCategoria("bebidas")} className="cursor-pointer flex border text-white bg-[#a60301] w-full sm:w-[320px] h-[100px] rounded-xl">
                            <div className="flex items-center w-full h-full">
                                <div className="flex bg-[#d9d9d9] w-[85px] h-[85px] rounded-full justify-center items-center ml-2">
                                    <img src="/bebida.png" className="h-[78px]" />
                                </div>
                                <p className="font-bold text-xl ml-6">Bebidas</p>
                            </div>
                        </button>

                        <button onClick={() => setCategoria("pipocas")} className="cursor-pointer flex border border-[#d9d9d9] w-full sm:w-[320px] h-[100px] rounded-xl">
                            <div className="flex items-center w-full h-full">
                                <div className="flex bg-[#d9d9d9] w-[85px] h-[85px] rounded-full justify-center items-center ml-2">
                                    <img src="/pipoca.png" className="h-[78px]" />
                                </div>
                                <p className="font-bold text-xl ml-6">Pipocas</p>
                            </div>
                        </button>
                    </div>

                    <div className="flex border border-[#d9d9d9] h-auto rounded-xl mt-3 sm:ml-10 sm:mr-20 w-full flex-col overflow-x-auto">

                        <div className="grid grid-cols-[35%_1fr_1fr_1fr] min-w-[600px] w-full items-center px-4">
                            <div className="relative w-[80%] mt-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a6a6a6] w-4 h-4" />
                                <input
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                    className="w-full border border-[#d9d9d9] h-8 pl-10 pr-3 rounded-[50px]"
                                    placeholder="Encontre um produto"
                                />
                            </div>


                            <p className="font-bold text-center">Preço</p>
                            <p className="font-bold text-center">Quantidade</p>
                            <p className="font-bold text-center">Subtotal</p>
                        </div>

                        {bebidasFiltradas.map((item) => (
                            <div
                                key={item.id}
                                className="grid grid-cols-[35%_1fr_1fr_1fr] min-w-[600px] w-full items-center px-4"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={item.imagem}
                                        className="w-[60px] sm:w-20 md:w-[100px] h-auto object-contain"
                                        alt={item.nome}
                                    />

                                    <div className="w-[280px] ml-2">
                                        <h1 className="text-[#545454] font-bold">{item.nome}</h1>
                                        <p className="text-sm text-[#a6a6a6]">
                                            {item.descricao}
                                        </p>
                                    </div>
                                </div>

                                <p className="font-bold text-[#545454] text-center">
                                    {item.preco}
                                </p>

                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={() =>
                                            setQtdBebidas((prev) => ({
                                                ...prev,
                                                [item.id]: Math.max((prev[item.id] || 0) - 1, 0),
                                            }))
                                        }
                                        className="rounded-full bg-[#849bff] text-white font-bold w-6 h-6"
                                    >
                                        -
                                    </button>

                                    <div className="h-8 w-16 border border-[#a6a6a6] rounded-md mx-2 flex items-center justify-center">
                                        {qtdBebidas[item.id] || 0}
                                    </div>

                                    <button
                                        onClick={() =>
                                            setQtdBebidas((prev) => ({
                                                ...prev,
                                                [item.id]: (prev[item.id] || 0) + 1,
                                            }))
                                        }
                                        className="rounded-full bg-[#849bff] text-white font-bold w-6 h-6"
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="font-bold text-[#545454] text-center">
                                    R$ {(pegarNumero(item.preco) * (qtdBebidas[item.id] || 0))
                                        .toFixed(2)
                                        .replace(".", ",")}

                                </p>
                            </div>
                        ))}

                        <div className="grid grid-cols-[35%_1fr_1fr_1fr] min-w-[600px] w-full items-center px-4 mt-2 text-[#00a44d] h-[60px] rounded-b-xl">
                            <div className="col-span-3 text-right pr-6 font-bold text-lg">
                                Total
                            </div>

                            <div className="flex items-center justify-center font-bold text-lg">
                                <div className="text-center w-[50%] font-bold text-lg bg-[#7ed957]/58 rounded-md">
                                    R$ {totalGeral.toFixed(2).replace(".", ",")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* PIPOCAS */}
            {categoria === "pipocas" && (
                <div className="flex flex-col lg:flex-row w-full gap-6 mt-6">

                    <div className="flex flex-col sm:ml-20 gap-3">
                        <button onClick={() => setCategoria("bebidas")} className="flex border border-[#d9d9d9] w-full sm:w-[320px] h-[100px] rounded-xl cursor-pointer">
                            <div className="flex items-center w-full h-full">
                                <div className="flex bg-[#d9d9d9] w-[85px] h-[85px] rounded-full justify-center items-center ml-2">
                                    <img src="/bebida.png" className="h-[78px]" />
                                </div>
                                <p className="font-bold text-xl ml-6">Bebidas</p>
                            </div>
                        </button>

                        <button onClick={() => setCategoria("pipocas")} className="flex border text-white bg-[#a60301] w-full sm:w-[320px] h-[100px] rounded-xl cursor-pointer">
                            <div className="flex items-center w-full h-full">
                                <div className="flex bg-[#d9d9d9] w-[85px] h-[85px] rounded-full justify-center items-center ml-2">
                                    <img src="/pipoca.png" className="h-[78px]" />
                                </div>
                                <p className="font-bold text-xl ml-6">Pipocas</p>
                            </div>
                        </button>
                    </div>

                    <div className="flex border border-[#d9d9d9] h-auto rounded-xl mt-3 sm:ml-10 sm:mr-20 w-full flex-col overflow-x-auto">

                        <div className="grid grid-cols-[35%_1fr_1fr_1fr] min-w-[600px] w-full items-center px-4">
                            <div className="relative w-[80%] mt-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a6a6a6] w-4 h-4" />
                                <input
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                    className="w-full border border-[#d9d9d9] h-8 pl-10 pr-3 rounded-[50px]"
                                    placeholder="Encontre um produto"
                                />
                            </div>
                            <p className="font-bold text-center">Preço</p>
                            <p className="font-bold text-center">Quantidade</p>
                            <p className="font-bold text-center">Subtotal</p>
                        </div>

                        {pipocasFiltradas.map((item) => (
                            <div
                                key={item.id}
                                className="grid grid-cols-[35%_1fr_1fr_1fr] min-w-[600px] w-full items-center px-4"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={item.imagem}
                                        className="w-[60px] sm:w-20 md:w-[100px] h-auto object-contain"
                                        alt={item.nome}
                                    />

                                    <div className="w-[280px] ml-2">
                                        <h1 className="text-[#545454] font-bold">{item.nome}</h1>
                                        <p className="text-sm text-[#a6a6a6]">
                                            {item.descricao}
                                        </p>
                                    </div>
                                </div>

                                <p className="font-bold text-[#545454] text-center">
                                    {item.preco}
                                </p>

                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={() =>
                                            setQtdPipocas((prev) => ({
                                                ...prev,
                                                [item.id]: Math.max((prev[item.id] || 0) - 1, 0),
                                            }))
                                        }
                                        className="rounded-full bg-[#849bff] text-white font-bold w-6 h-6"
                                    >
                                        -
                                    </button>

                                    <div className="h-8 w-16 border border-[#a6a6a6] rounded-md mx-2 flex items-center justify-center">
                                        {qtdPipocas[item.id] || 0}
                                    </div>

                                    <button
                                        onClick={() =>
                                            setQtdPipocas((prev) => ({
                                                ...prev,
                                                [item.id]: (prev[item.id] || 0) + 1,
                                            }))
                                        }
                                        className="rounded-full bg-[#849bff] text-white font-bold w-6 h-6"
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="font-bold text-[#545454] text-center">
                                    R$ {(pegarNumero(item.preco) * (qtdPipocas[item.id] || 0))
                                        .toFixed(2)
                                        .replace(".", ",")}

                                </p>
                            </div>
                        ))}

                        <div className="grid grid-cols-[35%_1fr_1fr_1fr] min-w-[600px] w-full items-center px-4 mt-2 text-[#00a44d] h-[60px] rounded-b-xl">
                            <div className="col-span-3 text-right pr-6 font-bold text-lg">
                                Total
                            </div>

                            <div className="flex items-center justify-center font-bold text-lg">
                                <div className="text-center w-[50%] font-bold text-lg bg-[#7ed957]/58 rounded-md">
                                    R$ {totalGeral.toFixed(2).replace(".", ",")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* BARRA INFERIOR */}
            <div className="flex fixed bottom-0 w-full flex-col bg-white">
                <div className="border-t border-[#a6a6a6] w-full flex"></div>

                <div className="mt-4 ml-2 sm:ml-8 mb-2 flex flex-wrap">

                    {/* FILME */}
                    <div className="flex flex-row">
                        <div>
                            <img
                                src="/interestelar.jpeg"
                                alt=""
                                className="h-[90px] sm:h-[120px] rounded-md"
                            />
                        </div>

                        <div className="ml-5">
                            <p className="font-bold flex items-center">
                                Interestelar
                                <div className="bg-[#008000] rounded-lg w-6 h-6 flex items-center justify-center text-white font-bold ml-2">
                                    L
                                </div>
                            </p>
                            <p className="text-sm text-[#545454]">Ficção</p>
                            <p className="text-sm text-[#545454]">120min</p>
                        </div>
                    </div>

                    <div className="border-r border-[#a6a6a6] h-24 flex mr-3 ml-6 self-center"></div>

                    {/* SESSÃO */}
                    <div className="flex flex-col">
                        <p className="font-bold">Sessão</p>
                        <p className="text-sm text-[#545454] flex items-center">
                            <CalendarClock className="w-4 h-4 mr-1" />
                            02/10/2025 às 19h30
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

                    <div className="border-r border-[#a6a6a6] h-24 flex mr-3 ml-6 self-center"></div>

                    {/* ASSENTOS */}
                    <div className="flex flex-col">
                        <p className="font-bold">Assentos escolhidos</p>
                        <p className="text-sm text-[#a60301]">C3</p>
                    </div>

                    <div className="border-r border-[#a6a6a6] h-24 flex mr-3 ml-6 self-center"></div>

                    {/* INGRESSOS */}
                    <div className="flex flex-col">
                        <p className="font-bold">Tipos de ingresso</p>
                        <p className="text-sm">
                            1x Sala 01 - Preço único R$13,00
                        </p>
                        <p className="text-sm text-[#00a44d] font-bold mt-2">
                            Total R$13,00
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}
