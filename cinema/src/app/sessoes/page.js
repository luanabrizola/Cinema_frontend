export default function Sessoes(){
    return(
        <div className="min-h-[calc(100vh-110px)] w-full flex-col flex items-center">
            <div>
                <div className="flex mt-5 w-full justify-center">
                    <button className="flex bg-[#a60301] text-white w-[60px] h-[60px] rounded-xl items-center justify-center font-bold">
                        <p className="font-bold text-2xl">1</p>
                    </button>
                    <div className="border-t-2 border-[#545454] w-[100px] flex self-center"></div>

                    <button className="flex bg-[#a60301] text-white w-[60px] h-[60px] rounded-xl items-center justify-center font-bold">
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
            </div>
            <div className="flex w-full mt-16">
                <div className="flex w-[40%] ml-10">
                    <img src="/interestelar.jpeg" alt="" className="rounded-lg mb-4" />
                    <div className="ml-5">
                        <p className="font-bold text-xl flex items-center">
                            Interestelar 
                            <div className="bg-[#008000] rounded-lg w-8 h-8 flex items-center justify-center text-white font-bold ml-2">L</div>
                        </p>
                        <p className="">Ficção</p>
                        <p className="">120min</p>
                    </div>
                    
                </div>
                <div className="flex flex-col w-[60%]">
                    <h1 className="font-bold text-xl">Escolha uma sessão</h1>
                    <div className="flex border border-[#a6a6a6] w-[80%] h-[28%] rounded-xl mt-3 items-center">
                        <div className="flex bg-[#d9d9d9] w-[9%] h-[80%] ml-2.5 rounded-xl items-center justify-center">OUT</div>
                        <div className="flex w-[90%] h-full rounded-xl items-center justify-around mx-8">
                            <button className="flex bg-[#a60301] text-white w-[10%] h-[80%] rounded-xl items-center justify-center font-bold">
                                1 <br></br>
                                Qua.
                            </button>
                            <button className="flex w-[10%] h-[80%] rounded-xl items-center justify-center">
                                2 <br></br>
                                Qui.
                            </button>
                            <button className="flex w-[10%] h-[80%] rounded-xl items-center justify-center">
                                3 <br></br>
                                Sex.
                            </button>
                            <button className="flex w-[10%] h-[80%] rounded-xl items-center justify-center">
                                4 <br></br>
                                Sáb.
                            </button>
                            <button className="flex w-[10%] h-[80%] rounded-xl items-center justify-center">
                                5 <br></br>
                                Dom.
                            </button>
                            <button className="flex w-[10%] h-[80%] rounded-xl items-center justify-center">
                                6 <br></br>
                                Seg.
                            </button>
                            <button className="flex w-[10%] h-[80%] rounded-xl items-center justify-center">
                                7 <br></br>
                                Ter.
                            </button>
                        </div>
                    </div>
                    <div className="border border-[#a6a6a6] w-[80%] h-[40%] rounded-xl mt-5 flex items-center">
                        <div className="ml-2.5 border-l-2 border-[#a60301] h-[72px] flex items-center">
                            <p className="font-bold text-xl ml-3">Sala 1</p>
                        </div>
                        <button className="flex w-[20%] h-[80%] border border-[#a6a6a6] rounded-xl items-center justify-center flex-col ml-10 cursor-pointer">
                            <p>15h30</p>
                            <div className="flex w-full h-[50%] items-center justify-around">
                                <div className="bg-[#ffd900] rounded-xl w-[40%] h-[90%] flex items-center justify-center text-white font-bold">DUB</div>
                                <div className="bg-[#ffd900] rounded-xl w-[40%] h-[90%] flex items-center justify-center text-white font-bold">2D</div>
                            </div>
                        </button>
                        <button className="flex w-[20%] h-[80%] rounded-xl items-center justify-center flex-col ml-10 cursor-pointer">
                            <p>19h30</p>
                            <div className="flex w-full h-[50%] items-center justify-around">
                                <div className="bg-[#ffd900] rounded-xl w-[40%] h-[90%] flex items-center justify-center text-white font-bold">DUB</div>
                                <div className="bg-[#ffd900] rounded-xl w-[40%] h-[90%] flex items-center justify-center text-white font-bold">2D</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
