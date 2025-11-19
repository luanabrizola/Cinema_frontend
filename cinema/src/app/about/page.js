import {Instagram, Github} from "lucide-react";

export default function About(){
    return(
        <div className="bg-[#a60301] min-h-[calc(100vh-110px)] w-full flex justify-center items-center gap-x-14">

            <div className="bg-[#f1f779] w-[300px] min-h-[380px] rounded-xl flex flex-col items-center p-6 text-center shadow-lg">
                <img src="/juliette.jpg" alt="" className="h-24 w-24 rounded-full mb-4" />
                <p className="text-xl font-semibold mb-2">Ana Julia Defendi</p>
                <p className="text-sm break-words w-24">
                    aaaaa
                </p>
                <div className="flex felx-nowrap">
                <a
                        href="https://instagram.com/anajuliadefendi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-600"
                    >
                        <Instagram size={28} />
                    </a>
                    <a
                        href="https://github.com/defendii"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-600"
                    >
                        <Github size={28} />
                    </a>
                </div>
                
            </div>

            <div className="bg-[#f1f779] w-[300px] min-h-[380px] rounded-xl flex flex-col items-center p-6 text-center shadow-lg">
                <img src="/taylor.jpeg" alt="" className="h-24 w-24 rounded-full mb-4" />
                <p className="text-xl font-semibold mb-2">Ana Julia Menegasso</p>
                <p className="text-sm break-words w-24">Conteúdo</p>
                <div className="flex felx-nowrap">
                <a
                        href="https://instagram.com/anajuliamcruz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-600"
                    >
                        <Instagram size={28} />
                    </a>
                    <a
                        href="https://github.com/AnaMenegasso"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-600"
                    >
                        <Github size={28} />
                    </a>
                </div>
            </div>

            <div className="bg-[#f1f779] w-[300px] min-h-[380px] rounded-xl flex flex-col items-center p-6 text-center shadow-lg">
                <img src="/ferraresi.jpeg" alt="" className="h-24 w-24 rounded-full mb-4" />
                <p className="text-xl font-semibold mb-2">Luana Brizola</p>
                <p className="text-sm break-words w-24">
                    loren biehbgejhbgeurgberigbrbgrubrubgurgburbgurbgur
                </p>
                <div className="flex felx-nowrap">
                <a
                        href="https://instagram.com/luanabrizolaa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-600"
                    >
                        <Instagram size={28} />
                    </a>
                    <a
                        href="https://github.com/luanabrizola"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-600"
                    >
                        <Github size={28} />
                    </a>
                </div>
            </div>
            
        </div>
    )
}
