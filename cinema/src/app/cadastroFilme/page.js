"use client"
import { useState } from "react";

export default function CadastroFilme() {
    const [form, setForm] = useState({
        nome_filme: "",
        duracao: "",
        sinopse: "",
        ano_lancamento: "",
        classificacao: "",
        foto_capa: null
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function handleFile(e) {
        setForm({ ...form, foto_capa: e.target.files[0] });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();
        data.append("nome_filme", form.nome_filme);
        data.append("duracao", form.duracao);
        data.append("sinopse", form.sinopse);
        data.append("ano_lancamento", form.ano_lancamento);
        data.append("classificacao", form.classificacao);
        if (form.foto_capa) {
            data.append("foto_capa", form.foto_capa);
        }

        const resposta = await fetch("http://localhost:3333/filme", {
            method: "POST",
            body: data // sem headers!
        });

        const resultado = await resposta.json();
        console.log(resultado);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#a60301]">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl text-[#a60301] font-bold text-center mb-6">Cadastrar filme</h1>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        name="nome_filme"
                        type="text"
                        placeholder="Nome filme"
                        onChange={handleChange}
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <input
                        name="duracao"
                        type="number"
                        placeholder="Duração"
                        onChange={handleChange}
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <input
                        name="sinopse"
                        type="text"
                        placeholder="Sinopse"
                        onChange={handleChange}
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <input
                        name="ano_lancamento"
                        type="number"
                        placeholder="Ano de lançamento"
                        onChange={handleChange}
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <input
                        name="classificacao"
                        type="text"
                        placeholder="Classificação"
                        onChange={handleChange}
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                    />

                    <button
                        type="submit"
                        className="w-full bg-[#ffd900a6] text-black font-semibold py-2 rounded-xl hover:bg-[#ffd900] transition"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}
