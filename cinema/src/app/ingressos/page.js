"use client";
import { useState } from "react"
import { CalendarClock, MapPinned } from "lucide-react";

export default function Ingressos() {

    const [meiaQtd, setMeiaQtd] = useState(0)
    const [inteiraQtd, setInteiraQtd] = useState(0)

    const precoMeia = 13
    const precoInteira = 26

    const subtotalMeia = meiaQtd * precoMeia
    const subtotalInteira = inteiraQtd * precoInteira
    const total = subtotalMeia + subtotalInteira

    return (
        <div className="min-h-[calc(100vh-110px)] w-full flex-col flex items-center">

            <div className="flex mt-5 w-full justify-center">
                <button className="flex bg-[#a60301]/50 text-white w-[60px] h-[60px] rounded-xl items-center justify-center font-bold">
                    <p className="font-bold text-2xl">1</p>
                </button>
                <div className="border-t-2 border-[#545454] w-[100px] flex self-center"></div>

                <button className="flex bg-[#a60301]/50 text-white w-[60px] h-[60px] rounded-xl items-center justify-center font-bold">
                    <p className="font-bold text-2xl">2</p>
                </button>
                <div className="border-t-2 border-[#545454] w-[100px] flex self-center"></div>

                <button className="flex bg-[#a60301] text-white w-[60px] h-[60px] rounded-xl items-center justify-center font-bold">
                    <p className="font-bold text-2xl">3</p>
                </button>
                <div className="border-t-2 border-[#545454] w-[100px] flex self-center"></div>

                <button className="flex bg-[#a60301] text-white w-[60px] h-[60px] rounded-xl items-center justify-center font-bold">
                    <p className="font-bold text-2xl">4</p>
                </button>
                <div className="border-t-2 border-[#545454] w-[100px] flex self-center"></div>

                <button className="flex bg-[#a60301] text-white w-[60px] h-[60px] rounded-xl items-center justify-center font-bold">
                    <p className="font-bold text-2xl">5</p>
                </button>
                <div className="border-t-2 border-[#545454] w-[100px] flex self-center"></div>

                <button className="flex bg-[#a60301] text-white w-[60px] h-[60px] rounded-xl items-center justify-center font-bold">
                    <p className="font-bold text-2xl">6</p>
                </button>
            </div>

            <div className="flex w-full justify-center">
                <div className="w-40 text-center font-bold">Sessões</div>
                <div className="w-40 text-center font-bold">Assentos</div>
                <div className="w-40 text-center font-bold">Ingressos</div>
                <div className="w-40 text-center font-bold">Bomboniere</div>
                <div className="w-40 text-center font-bold">Pagamento</div>
                <div className="w-40 text-center font-bold">Confirmação</div>
            </div>

            <div className="flex flex-col w-full mt-4">
                <div className="flex justify-between w-full">
                    <button className="rotate-180 bg-black text-white text-4xl w-12 h-12 rounded-full ml-10">➜</button>
                    <button className="bg-[#a60301] text-white font-bold w-[18%] h-12 rounded-full mr-10">
                        Continuar para Bomboniere
                    </button>
                </div>

                <h1 className="font-bold text-xl ml-[15%]">Escolha o tipo do ingresso:</h1>
                <div className="flex w-full mt-3 justify-center items-center pb-[180px]">
                    <div className="flex relative border border-[#a6a6a6] w-[1000px] h-[200px] rounded-xl mt-2 ml-20 flex-col p-2">

                        <div className="flex flex-row justify-evenly w-full py-3">
                            <p className="w-1/4 text-center">Tipo de ingresso</p>
                            <p className="w-1/4 text-center">Preço</p>
                            <p className="w-1/4 text-center">Quantidade</p>
                            <p className="w-1/4 text-center">Subtotal</p>
                        </div>

                        <div className="flex flex-row justify-evenly w-full py-2 font-bold">
                            <p className="w-1/4 text-center">Meia</p>
                            <p className="w-1/4 text-center">R$ 13,00</p>
                            <div className="w-1/4 text-center flex justify-center items-center gap-4">
                                <button
                                    className="bg-gray-300 px-3 rounded-full"
                                    onClick={() => setMeiaQtd(prev => Math.max(0, prev - 1))}
                                >
                                    -
                                </button>

                                <p className="w-6 text-center">{meiaQtd}</p>

                                <button
                                    className="bg-gray-300 px-3 rounded-full"
                                    onClick={() => setMeiaQtd(prev => prev + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <p className="w-1/4 text-center">
                                R$ {subtotalMeia.toFixed(2)}
                            </p>
                        </div>

                        <div className="flex flex-row justify-evenly w-full py-2 font-bold">
                            <p className="w-1/4 text-center">Inteira</p>
                            <p className="w-1/4 text-center">R$ 26,00</p>
                            <div className="w-1/4 text-center flex justify-center items-center gap-4">
                                <button
                                    className="bg-gray-300 px-3 rounded-full"
                                    onClick={() => setInteiraQtd(prev => Math.max(0, prev - 1))}
                                >
                                    -
                                </button>

                                <p className="w-6 text-center">{inteiraQtd}</p>

                                <button
                                    className="bg-gray-300 px-3 rounded-full"
                                    onClick={() => setInteiraQtd(prev => prev + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <p className="w-1/4 text-center">
                                R$ {subtotalInteira.toFixed(2)}
                            </p>
                        </div>

                        <div className="flex flex-row justify-evenly w-full py-2 font-bold">
                            <p className="w-1/4 text-center"></p>
                            <p className="w-1/4 text-center"></p>
                            <p className="w-1/4 text-center text-green-600 ">Total</p>
                            <div className="w-1/4 text-center bg-[#7ed957]/50 text-green-600 rounded-full py-1">
                                R$ {total.toFixed(2)}
                            </div>
                        </div>

                    </div>

                </div>

                 <div className="flex fixed bottom-0 w-full flex-col">
                    <div className="border-t-2 border-[#545454] w-full flex"></div>
                    <div className="mt-2 ml-8 mb-2 flex">
                        <div className="flex flex-row">
                            <div><img src="/interestelar.jpeg" alt="" className="h-[120px] rounded-md" /></div>
                            <div className="ml-5">
                                <p className="font-bold flex items-center">
                                    Interestelar
                                    <div className="bg-[#008000] rounded-lg w-6 h-6 flex items-center justify-center text-white font-bold ml-2">L</div>
                                </p>
                                <p className="text-sm text-[#545454]">Ficção</p>
                                <p className="text-sm text-[#545454]">120min</p>
                            </div>
                        </div>

                        <div className="border-r-2 border-[#545454] flex mr-3 ml-6"></div>

                        <div className="flex flex-col">
                            <p className="font-bold">Sessão</p>
                            <p className="text-sm text-[#545454] flex items-center"><CalendarClock />02/10/2025 às 19h30</p>
                            <p className="text-sm text-[#545454] flex items-center mt-1"><MapPinned />CineAJL, sala 1</p>
                            <div className="flex mt-1">
                                <div className="bg-[#a60301] rounded-lg w-7 h-6 flex items-center justify-center text-white font-bold mr-1">3D</div>
                                <div className="bg-[#ffd900] rounded-lg w-8 h-6 flex items-center justify-center text-white font-bold">DUB</div>
                            </div>
                        </div>

                        <div className="border-r-2 border-[#545454] flex mr-3 ml-6"></div>

                        <div className="flex flex-col">
                            <p className="font-bold">Assentos escolhidos</p>
                            <p className="text-sm text-[#a60301]">C3</p>
                        </div>

                        <div className="border-r-2 border-[#545454] flex mr-3 ml-6"></div>

                        <div className="flex flex-col">
                            <p className="font-bold">Tipos de ingresso</p>
                            <p className="text-sm">1x Sala 01 - Preço único R$13,00</p>
                            <p className="text-sm text-[#00a44d] font-bold mt-2">Total R$13,00</p>
                        </div>
                    </div>
                </div>




            </div>

        </div>
    );
}
