import { CalendarClock, MapPinned } from "lucide-react";

export default function MinhasCompras() {
    return (
        <>
            <h1 className="font-bold text-xl ml-[5%] border-b border-gray-300 w-[90%] mt-3">
                Minhas Compras
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-5 justify-items-center pb-20">

                <div className="flex relative border border-[#a6a6a6] w-[580px] h-[300px] rounded-xl flex-col p-2">
                    <div className="flex flex-row mt-4 ml-2">
                        <img src="/interestelar.jpeg" alt="" className="h-[240px] rounded-md" />
                        <div className="ml-4 pr-4 w-full">
                            <div className="flex justify-between items-center w-full">
                                <p className="font-bold text-xl">Interestelar</p>
                                <p className="text-blue-700 text-sm underline cursor-pointer">Ver mais</p>
                            </div>
                            <p className="text-sm text-[#545454] flex items-center mt-1">
                                <MapPinned className="mr-1" /> CineAJL, sala 1
                            </p>
                            <p className="text-sm text-[#545454] flex items-center">
                                <CalendarClock className="mr-1" /> 02/10/2025 às 19h30
                            </p>
                            <div className="flex gap-2 mt-2">
                                <div className="bg-[#008000] rounded-lg w-6 h-6 flex items-center justify-center text-white font-bold">L</div>
                                <div className="bg-[#a60301] rounded-lg w-7 h-6 flex items-center justify-center text-white font-bold">3D</div>
                                <div className="bg-[#ffd900] rounded-lg w-8 h-6 flex items-center justify-center text-white font-bold">DUB</div>
                            </div>
                            <div className="border-b mt-2 border-gray-300"></div>
                            <p className="text-sm text-[#545454] mt-1"> Assentos escolhidos:</p>
                            <div className="flex flex-row gap-2">
                                <p className="text-sm font-bold text-[#00a44d] mt-1">C1</p>
                                <p className="text-sm font-bold text-[#00a44d] mt-1">C2</p>
                                <p className="text-sm font-bold text-[#00a44d] mt-1">C3</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex relative border border-[#a6a6a6] w-[580px] h-[300px] rounded-xl flex-col p-2">
                    <div className="flex flex-row mt-4 ml-2">
                        <img src="/interestelar.jpeg" alt="" className="h-[240px] rounded-md" />
                        <div className="ml-4 pr-4 w-full">
                            <div className="flex justify-between items-center w-full">
                                <p className="font-bold text-xl">Interestelar</p>
                                <p className="text-blue-700 text-sm underline cursor-pointer">Ver mais</p>
                            </div>
                            <p className="text-sm text-[#545454] flex items-center mt-1">
                                <MapPinned className="mr-1" /> CineAJL, sala 1
                            </p>
                            <p className="text-sm text-[#545454] flex items-center">
                                <CalendarClock className="mr-1" /> 02/10/2025 às 19h30
                            </p>
                            <div className="flex gap-2 mt-2">
                                <div className="bg-[#008000] rounded-lg w-6 h-6 flex items-center justify-center text-white font-bold">L</div>
                                <div className="bg-[#a60301] rounded-lg w-7 h-6 flex items-center justify-center text-white font-bold">3D</div>
                                <div className="bg-[#ffd900] rounded-lg w-8 h-6 flex items-center justify-center text-white font-bold">DUB</div>
                            </div>
                            <div className="border-b mt-2 border-gray-300"></div>
                            <p className="text-sm text-[#545454] mt-1"> Assentos escolhidos:</p>
                            <div className="flex flex-row gap-2">
                                <p className="text-sm font-bold text-[#00a44d] mt-1">C1</p>
                                <p className="text-sm font-bold text-[#00a44d] mt-1">C2</p>
                                <p className="text-sm font-bold text-[#00a44d] mt-1">C3</p>
                            </div>
                        </div>
                    </div>
                </div>

               
            </div>
        </>
    )
}