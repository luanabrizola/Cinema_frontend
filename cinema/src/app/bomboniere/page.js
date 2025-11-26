export default function Bomboniere() {
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

                <button className="flex bg-[#a60301]/50 text-white w-[60px] h-[60px] rounded-xl items-center justify-center font-bold">
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
                    <button className="bg-[#a60301] text-white font-bold w-[18%] h-12 rounded-full mr-10">Continuar para pagamento</button>
                </div>

                <h1 className="font-bold text-xl ml-[20%]">Escolha os produtos</h1>
                <div className="flex w-full mt-3 justify-center items-center">
                    <button className="flex relative border border-[#a6a6a6] w-[200px] h-[220px] rounded-xl mt-3 mr-20 justify-center items-center flex-col">
                        <div className="flex flex-col items-center w-full h-full">
                            <div className="flex bg-[#a6a6a6] w-[160px] h-[160px] rounded-full justify-center items-center mt-auto mb-auto">
                                <img src="/bebida.png" alt="" className="h-[120px]" />
                            </div>
                            <p className="font-bold mb-2">Bebidas</p>
                        </div>
                    </button>
                    <button className="flex border border-[#a6a6a6] w-[200px] h-[220px] rounded-xl mt-3 mr-20 justify-center items-center flex-col">
                        <div className="flex flex-col items-center w-full h-full">
                            <div className="flex bg-[#a6a6a6] w-[160px] h-[160px] rounded-full justify-center items-center mt-auto mb-auto">
                                <img src="/pipoca.png" alt="" className="h-[120px]" />
                            </div>
                            <p className="font-bold mt-auto mb-2">Pipocas</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
