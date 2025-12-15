"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CadastroFilme() {
    const router = useRouter();

    const [form, setForm] = useState({
        nome_filme: "",
        duracao: "",
        sinopse: "",
        ano_lancamento: "",
        classificacao: "",
        foto_capa: null
    });

    const [atores, setAtores] = useState([]);
    const [atoresSelecionados, setAtoresSelecionados] = useState([""]);
    const [novoAtor, setNovoAtor] = useState({ nome: "" });
    const [mostrarNovoAtor, setMostrarNovoAtor] = useState(false);

    const [diretores, setDiretores] = useState([]);
    const [diretorSelecionado, setDiretorSelecionado] = useState("");
    const [novoDiretor, setNovoDiretor] = useState({ nome: "" });
    const [mostrarNovoDiretor, setMostrarNovoDiretor] = useState(false);

    const [generos, setGeneros] = useState([]);
    const [generosSelecionados, setGenerosSelecionados] = useState([""]);
    const [novoGenero, setNovoGenero] = useState({ nome: "" });
    const [mostrarNovoGenero, setMostrarNovoGenero] = useState(false);

    useEffect(() => {
        buscarAtores();
        buscarDiretores();
        buscarGeneros();
    }, []);

    async function buscarAtores() {
        const res = await fetch("http://localhost:3333/ator");
        setAtores(await res.json());
    }

    async function buscarDiretores() {
        const res = await fetch("http://localhost:3333/diretor");
        setDiretores(await res.json());
    }

    async function buscarGeneros() {
        const res = await fetch("http://localhost:3333/genero");
        setGeneros(await res.json());
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function handleFile(e) {
        setForm({ ...form, foto_capa: e.target.files[0] });
    }

    const adicionarAtor = () =>
        setAtoresSelecionados([...atoresSelecionados, ""]);

    const adicionarGenero = () =>
        setGenerosSelecionados([...generosSelecionados, ""]);

    const atualizarAtor = (i, value) => {
        const novos = [...atoresSelecionados];
        novos[i] = value;
        setAtoresSelecionados(novos);
    };

    const atualizarGenero = (i, value) => {
        const novos = [...generosSelecionados];
        novos[i] = value;
        setGenerosSelecionados(novos);
    };

    async function cadastrarAtor() {
        if (!novoAtor.nome.trim()) return alert("Preencha o nome do ator");

        await fetch("http://localhost:3333/ator", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome_ator: novoAtor.nome })
        });

        await buscarAtores();
        setNovoAtor({ nome: "" });
        setMostrarNovoAtor(false);
    }

    async function cadastrarDiretor() {
        if (!novoDiretor.nome.trim()) return alert("Preencha o nome do diretor");

        await fetch("http://localhost:3333/diretor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome_diretor: novoDiretor.nome })
        });

        await buscarDiretores();
        setNovoDiretor({ nome: "" });
        setMostrarNovoDiretor(false);
    }

    async function cadastrarGenero() {
        if (!novoGenero.nome.trim()) return alert("Preencha o nome do gênero");

        await fetch("http://localhost:3333/genero", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome_genero: novoGenero.nome })
        });

        await buscarGeneros();
        setNovoGenero({ nome: "" });
        setMostrarNovoGenero(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (
            !form.nome_filme ||
            !form.duracao ||
            !form.ano_lancamento ||
            !diretorSelecionado ||
            atoresSelecionados.some(a => !a) ||
            generosSelecionados.some(g => !g)
        ) {
            return alert("Preencha todos os campos obrigatórios.");
        }

        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value) data.append(key, value);
        });

        const res = await fetch("http://localhost:3333/filme", {
            method: "POST",
            body: data
        });

        const resposta = await res.json();

        const id_filme =
            resposta?.id_filme ||
            resposta?.filme?.id_filme ||
            resposta?.id;

        if (!id_filme) {
            console.error("Resposta do backend:", resposta);
            alert("Erro ao obter ID do filme");
            return;
        }

        for (const id_ator of atoresSelecionados) {
            await fetch("http://localhost:3333/ator-do-filme", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_filme,
                    id_ator,
                    is_ativo: true
                })
            });

        }

        await fetch("http://localhost:3333/diretor-do-filme", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_filme,
                id_diretor: diretorSelecionado,
                is_ativo: true
            })
        });


        for (const id_genero of generosSelecionados) {
            await fetch("http://localhost:3333/genero-do-filme", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_filme,
                    id_genero,
                    is_ativo: true
                })
            });

        }

        alert("Filme cadastrado com sucesso!");
        router.push("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#a60301]">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl text-[#a60301] font-bold text-center mb-6">
                    Cadastrar filme
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

                    <input name="nome_filme" placeholder="Nome filme"
                        onChange={handleChange}
                        className="rounded-lg p-2 bg-[#fff6f6]" />

                    <input name="duracao" type="number" placeholder="Duração"
                        onChange={handleChange}
                        className="rounded-lg p-2 bg-[#fff6f6]" />

                    <textarea
                        name="sinopse"
                        placeholder="Sinopse"
                        onChange={handleChange}
                        className="rounded-lg p-2 bg-[#fff6f6]"
                    />

                    <input name="ano_lancamento" type="number" placeholder="Ano de lançamento"
                        onChange={handleChange}
                        className="rounded-lg p-2 bg-[#fff6f6]" />

                    <input name="classificacao" placeholder="Classificação"
                        onChange={handleChange}
                        className="rounded-lg p-2 bg-[#fff6f6]" />


                    {/* DIRETOR */}
                    <select
                        value={diretorSelecionado}
                        onChange={(e) => setDiretorSelecionado(e.target.value)}
                        className="rounded-lg p-2 bg-[#fff6f6]"
                    >
                        <option value="">Selecione o diretor</option>
                        {diretores.map(d => (
                            <option key={d.id_diretor} value={d.id_diretor}>
                                {d.nome_diretor}
                            </option>
                        ))}
                    </select>

                    <button type="button"
                        onClick={() => setMostrarNovoDiretor(true)}
                        className="text-sm text-[#a60301] font-semibold">
                        + novo diretor
                    </button>

                    {mostrarNovoDiretor && (
                        <div className="flex gap-2">
                            <input
                                placeholder="Nome do diretor"
                                value={novoDiretor.nome}
                                onChange={e => setNovoDiretor({ nome: e.target.value })}
                                className="rounded-lg p-2 bg-[#fff6f6] w-full"
                            />
                            <button type="button"
                                onClick={cadastrarDiretor}
                                className="bg-[#ffd900a6] px-3 rounded-lg">
                                Salvar
                            </button>
                        </div>
                    )}

                    {/* ATORES */}
                    {atoresSelecionados.map((a, i) => (
                        <select key={i}
                            value={a}
                            onChange={(e) => atualizarAtor(i, e.target.value)}
                            className="rounded-lg p-2 bg-[#fff6f6]"
                        >
                            <option value="">Selecione ator</option>
                            {atores.map(at => (
                                <option key={at.id_ator} value={at.id_ator}>
                                    {at.nome_ator}
                                </option>
                            ))}
                        </select>
                    ))}

                    <button type="button"
                        onClick={adicionarAtor}
                        className="text-sm text-[#a60301] font-semibold">
                        + ator
                    </button>

                    <button type="button"
                        onClick={() => setMostrarNovoAtor(true)}
                        className="text-sm text-[#a60301] font-semibold">
                        + novo ator
                    </button>

                    {mostrarNovoAtor && (
                        <div className="flex gap-2">
                            <input
                                placeholder="Nome do ator"
                                value={novoAtor.nome}
                                onChange={e => setNovoAtor({ nome: e.target.value })}
                                className="rounded-lg p-2 bg-[#fff6f6] w-full"
                            />
                            <button type="button"
                                onClick={cadastrarAtor}
                                className="bg-[#ffd900a6] px-3 rounded-lg">
                                Salvar
                            </button>
                        </div>
                    )}

                    {/* GÊNEROS */}
                    {generosSelecionados.map((g, i) => (
                        <select key={i}
                            value={g}
                            onChange={(e) => atualizarGenero(i, e.target.value)}
                            className="rounded-lg p-2 bg-[#fff6f6]"
                        >
                            <option value="">Selecione gênero</option>
                            {generos.map(gen => (
                                <option key={gen.id_genero} value={gen.id_genero}>
                                    {gen.nome_genero}
                                </option>
                            ))}
                        </select>
                    ))}

                    <button type="button"
                        onClick={adicionarGenero}
                        className="text-sm text-[#a60301] font-semibold">
                        + gênero
                    </button>

                    <button type="button"
                        onClick={() => setMostrarNovoGenero(true)}
                        className="text-sm text-[#a60301] font-semibold">
                        + novo gênero
                    </button>

                    {mostrarNovoGenero && (
                        <div className="flex gap-2">
                            <input
                                placeholder="Nome do gênero"
                                value={novoGenero.nome}
                                onChange={e => setNovoGenero({ nome: e.target.value })}
                                className="rounded-lg p-2 bg-[#fff6f6] w-full"
                            />
                            <button type="button"
                                onClick={cadastrarGenero}
                                className="bg-[#ffd900a6] px-3 rounded-lg">
                                Salvar
                            </button>
                        </div>
                    )}

                    <input type="file" accept="image/*"
                        onChange={handleFile}
                        className="rounded-lg p-2 bg-[#fff6f6]" />

                    <button type="submit"
                        className="w-full bg-[#ffd900a6] py-2 rounded-xl font-semibold hover:bg-[#ffd900]">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}
