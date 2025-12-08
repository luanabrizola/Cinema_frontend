"use client"

import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function carregarFilmes() {
      try {
        const res = await fetch("http://localhost:3333/filme");
        const data = await res.json();

        setMovies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
        setMovies([]);
      }
    }

    carregarFilmes();
  }, []);

  const scrollLeft = () => {
    const container = document.getElementById("carrossel");
    if (container) container.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = document.getElementById("carrossel");
    if (container) container.scrollBy({ left: 400, behavior: "smooth" });
  };


  const Modal = () => {
    if (!selectedMovie) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
        <div className="bg-[#ffd900] rounded-xl p-6 overflow-y-auto h-[90%] w-[80%] relative mt-5">

          <button
            onClick={() => setSelectedMovie(null)}
            className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full"
          >
            X
          </button>

          <div className="flex gap-8 h-full">

            <img
              src={`http://localhost:3333/${selectedMovie.foto_capa}`}
              className="w-[360px] h-[500px] object-cover rounded-xl"
            />

            <div className="flex flex-col justify-start overflow-y-auto pr-4">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold text-white">
                  {selectedMovie.nome_filme}
                </h1>

                <div className="bg-[#008000] rounded-lg p-2 h-10 flex items-center justify-center text-xl text-white font-bold">
                  {selectedMovie.classificacao || "L"}
                </div>
              </div>

              <p className="text-2xl font-semibold mt-3 text-white">
                {selectedMovie.genero} • {selectedMovie.duracao} min
              </p>

              <p className="mt-4 text-white mb-3">
                {selectedMovie.sinopse}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <ChevronRight size={30} color="white" />
                <p className="text-white font-bold text-2xl">Sessões</p>
              </div>

              <p className="text-white ml-5 mt-1">Sala 1 — 15h30</p>
              <p className="text-white ml-5 mt-1">Sala 1 — 20h00</p>

              <div className="flex items-start gap-6 mt-5 text-white">
                <div className="flex flex-col items-center">
                  <p className="font-bold">Ano</p>
                  <p>{selectedMovie.ano_lancamento}</p>
                </div>

                <div className="w-px h-10 bg-white/40"></div>

                <div className="flex flex-col items-center">
                  <p className="font-bold">Duração</p>
                  <p>{selectedMovie.duracao} min</p>
                </div>

                <div className="w-px h-10 bg-white/40"></div>

                <div className="flex flex-col items-center">
                  <p className="font-bold">Classificação</p>
                  <p>{selectedMovie.classificacao}</p>
                </div>
              </div>

              <a
                href="/sessoes"
                className="bg-[#a60301] w-[200px] h-[50px] rounded-2xl text-white font-bold flex items-center justify-center self-end mt-2"
              >
                Comprar ingresso
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Modal />

      <style>{`
        #carrossel::-webkit-scrollbar {
          display: none;
        }
        #carrossel {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="relative w-full h-[400px]">
        <img src="/ferraresi.jpeg" className="w-full h-full object-cover" />
      </div>

      <div className="bg-[#ffd900] w-full h-20 text-white font-bold flex items-center justify-center text-xl">
        Filmes em Cartaz
      </div>

      <div className="relative px-10 py-10">
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#a60301] text-white px-4 py-2 rounded-full shadow-lg transition z-10"
        >
          ◀
        </button>

        <div id="carrossel" className="overflow-x-auto whitespace-nowrap">
          <div className="flex gap-10">

            {movies.length === 0 ? (
              <p className="text-white text-xl">Carregando filmes...</p>
            ) : (
              movies.map((filme) => (
                <div
                  key={filme.id_filme}
                  onClick={() => setSelectedMovie(filme)}
                  className="bg-[#ffd900] h-[550px] w-80 rounded-xl inline-block flex-shrink-0 cursor-pointer"
                >
                  <div className="overflow-hidden rounded-xl w-full h-[380px] flex justify-center mt-3">
                    <img
                      src={`http://localhost:3333/${filme.foto_capa}`}
                      className="w-[260px] h-full object-cover"
                    />
                  </div>

                  <p className="text-white font-bold text-3xl mt-2 ml-3">
                    {filme.nome_filme}
                  </p>

                  <div className="flex items-center gap-3 ml-3 mt-1">
                    <p className="text-white font-bold text-xl">
                      {filme.genero}
                    </p>
                    <div className="bg-[#008000] rounded-lg p-2 h-10 flex items-center justify-center text-xl text-white font-bold">
                      {filme.classificacao || "L"}
                    </div>
                  </div>

                  <p className="text-white font-bold text-xl ml-3 mt-1">
                    {filme.duracao} min
                  </p>
                </div>
              ))
            )}

          </div>
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#a60301] text-white px-4 py-2 rounded-full shadow-lg transition z-10"
        >
          ▶
        </button>
      </div>
    </>
  );
}
