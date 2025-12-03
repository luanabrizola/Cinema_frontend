"use client"

export default function Page() {
  const scrollLeft = () => {
    const container = document.getElementById("carrossel");
    if (container) container.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = document.getElementById("carrossel");
    if (container) container.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative w-full h-[400px]">
        <img src="/ferraresi.jpeg" className="w-full h-full object-cover" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#ffd900] text-white px-8 py-4 rounded-lg text-5xl font-bold shadow-lg text-center">
            Filmes em cartaz e promoções
          </div>
        </div>
      </div>

      <div className="bg-[#ffd900] w-full h-20 text-white font-bold flex items-center justify-center text-xl">
        Filmes em cartaz
      </div>

      <div className="relative px-10 py-10">
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#ffd900] text-white px-4 py-2 rounded-full shadow-lg hover:scale-110 transition z-10"
        >
          ◀
        </button>

        <div
          id="carrossel"
          className="overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-[#ffd900] scrollbar-track-transparent"
        >
          <div className="flex gap-10">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-[#ffd900] h-[550px] w-80 rounded-xl inline-block flex-shrink-0 cursor-pointer group"
              >
                <div className="overflow-hidden rounded-xl w-full h-[380px] flex justify-center mt-3">
                  <img
                    src="/interestelar.jpeg"
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
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
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ffd900] text-white px-4 py-2 rounded-full shadow-lg hover:scale-110 transition z-10"
        >
          ▶
        </button>
      </div>
    </>
  );
}

