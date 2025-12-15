"use client";

import { useEffect, useState } from "react";
import { CalendarClock, MapPinned } from "lucide-react";

export default function MinhasCompras() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarCompras() {
      try {
        const res = await fetch("/api/minhas-compras", {
          credentials: "include",
        });

        const data = await res.json();

        const agrupado = {};

        data.forEach((item) => {
          if (!agrupado[item.id_pedido]) {
            agrupado[item.id_pedido] = {
              id_pedido: item.id_pedido,
              filme: item.filme,
              poster: item.poster,
              cinema: item.cinema,
              nome_sala: item.nome_sala,
              data: item.data,
              hora: item.hora,
              assentos: [],
            };
          }

          agrupado[item.id_pedido].assentos.push(item.assento);
        });

        setPedidos(Object.values(agrupado));
      } catch (error) {
        console.error("Erro ao carregar compras", error);
      } finally {
        setLoading(false);
      }
    }

    carregarCompras();
  }, []);

  if (loading) {
    return <p className="ml-[5%] mt-5">Carregando compras...</p>;
  }

  if (pedidos.length === 0) {
    return (
      <p className="ml-[5%] mt-5">
        Você ainda não realizou nenhuma compra.
      </p>
    );
  }

  return (
    <>
      <h1 className="font-bold text-xl ml-[5%] border-b border-gray-300 w-[90%] mt-3">
        Minhas Compras
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-5 justify-items-center pb-20">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id_pedido}
            className="flex border border-[#a6a6a6] w-[580px] h-[300px] rounded-xl flex-col p-2"
          >
            <div className="flex flex-row mt-4 ml-2">
              <img
                src={pedido.poster}
                alt={pedido.filme}
                className="h-[240px] rounded-md"
              />

              <div className="ml-4 pr-4 w-full">
                <div className="flex justify-between items-center w-full">
                  <p className="font-bold text-xl">{pedido.filme}</p>
                  <p className="text-blue-700 text-sm underline cursor-pointer">
                    Ver mais
                  </p>
                </div>

                <p className="text-sm text-[#545454] flex items-center mt-1">
                  <MapPinned className="mr-1" size={16} />
                  {pedido.cinema}, {pedido.nome_sala}
                </p>

                <p className="text-sm text-[#545454] flex items-center">
                  <CalendarClock className="mr-1" size={16} />
                  {pedido.data} às {pedido.hora}
                </p>

                <div className="border-b mt-3 border-gray-300"></div>

                <p className="text-sm text-[#545454] mt-2">
                  Assentos escolhidos:
                </p>

                <div className="flex flex-row gap-2 flex-wrap">
                  {pedido.assentos.map((assento, index) => (
                    <span
                      key={index}
                      className="text-sm font-bold text-[#00a44d]"
                    >
                      {assento}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
