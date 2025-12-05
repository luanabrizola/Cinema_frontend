"use client"

import { useState } from "react";

export default function Page() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const scrollLeft = () => {
    const container = document.getElementById("carrossel");
    if (container) container.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = document.getElementById("carrossel");
    if (container) container.scrollBy({ left: 400, behavior: "smooth" });
  };

  const movies = [
    {
      id: 1,
      title: "Interestelar",
      genre: "Ficção",
      time: "120min",
      image: "/interestelar.jpeg",
      description:
        "Um épico espacial que explora buracos negros, viagem interestelar e a força do amor."
    },
  ];

  const Modal = () => {
    if (!selectedMovie) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
        <div className="bg-[#ffd900] rounded-xl p-6 overflow-y-auto h-[90%] w-[80%] relative mt-5">

          <button
            onClick={() => setSelectedMovie(null)}
            className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded"
          >
            Fechar
          </button>

          <div className="flex gap-8 h-full">

            <img
              src={selectedMovie.image}
              className="w-[360px] h-[600px] object-cover rounded-xl"
            />

            <div className="flex flex-col justify-start overflow-y-auto pr-4">

              <h1 className="text-4xl font-bold text-black">
                {selectedMovie.title}
              </h1>

              <p className="text-2xl font-semibold mt-3 text-black">
                {selectedMovie.genre} • {selectedMovie.time}
              </p>

              <p className="mt-4 text-lg text-black">
                {selectedMovie.description}
              </p>

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
        Filmes em cartaz
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                onClick={() => setSelectedMovie(movies[0])}
                className="bg-[#ffd900] h-[550px] w-80 rounded-xl inline-block flex-shrink-0 cursor-pointer"
              >
                <div className="overflow-hidden rounded-xl w-full h-[380px] flex justify-center mt-3">
                  <img
                    src="/interestelar.jpeg"
                    className="w-[260px] h-full object-cover"
                  />
                </div>

                <p className="text-white font-bold text-3xl mt-2 ml-3">
                  Interestelar
                </p>

                <div className="flex items-center gap-2 ml-3">
                  <p className="text-white font-bold text-xl">Ficção</p>
                  <div className="bg-[#008000] rounded-lg w-10 h-10 flex items-center justify-center text-xl text-white font-bold">
                    L
                  </div>
                </div>

                <p className="text-white font-bold text-xl ml-3">120min</p>
              </div>
            ))}
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
