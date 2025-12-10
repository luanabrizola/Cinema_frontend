"use client";
import { useState } from "react";

export default function Cadastro() {
    const [form, setForm] = useState({
        nome_usuario: "",
        cpf: "",
        data_nascimento: "",
        telefone: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        tipo: "cliente",
        is_ativo: true
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (form.senha !== form.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3333/usuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome_usuario: form.nome_usuario,
                    cpf: form.cpf,
                    data_nascimento: form.data_nascimento,
                    telefone: form.telefone,
                    email: form.email,
                    senha: form.senha,
                    tipo: form.tipo,
                    is_ativo: form.is_ativo
                })
            });

            const data = await response.json();

            if (response.status === 201) {
                alert("Usuário criado com sucesso!");
                console.log("Usuário cadastrado:", data);
                setForm({
                    nome_usuario: "",
                    cpf: "",
                    data_nascimento: "",
                    telefone: "",
                    email: "",
                    senha: "",
                    confirmarSenha: "",
                    tipo: "cliente",
                    is_ativo: true
                });
            } else {
                alert("Erro: " + (data.error || data.message));
                console.error(data);
            }
        } catch (err) {
            console.error(err);
            alert("Erro ao conectar ao servidor.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#a60301]">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl text-[#a60301] font-bold text-center mb-6">
                    Criar uma conta
                </h1>

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nome_usuario"
                        placeholder="Nome"
                        value={form.nome_usuario}
                        onChange={handleChange}
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                        required
                    />

                    <input
                        type="text"
                        name="cpf"
                        placeholder="CPF"
                        value={form.cpf}
                        onChange={handleChange}
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                        required
                    />

                    <div className="flex space-x-4">
                        <input
                            type="date"
                            name="data_nascimento"
                            value={form.data_nascimento}
                            onChange={handleChange}
                            className="rounded-lg p-2 w-1/2 bg-[#fff6f6]"
                            required
                        />
                        <input
                            type="tel"
                            name="telefone"
                            placeholder="Telefone"
                            value={form.telefone}
                            onChange={handleChange}
                            className="rounded-lg p-2 w-1/2 bg-[#fff6f6]"
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={form.email}
                        onChange={handleChange}
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                        required
                    />

                    <input
                        type="password"
                        name="senha"
                        placeholder="Senha"
                        value={form.senha}
                        onChange={handleChange}
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                        required
                    />

                    <input
                        type="password"
                        name="confirmarSenha"
                        placeholder="Confirmar senha"
                        value={form.confirmarSenha}
                        onChange={handleChange}
                        className="rounded-lg p-2 w-full bg-[#fff6f6]"
                        required
                    />

                    <div className="flex justify-between pt-4">
                        <button
                            type="button"
                            className="w-[48%] bg-[#ffd900a6] text-black font-semibold py-2 rounded-xl hover:bg-[#ffd900] transition"
                            onClick={() =>
                                setForm({
                                    nome_usuario: "",
                                    cpf: "",
                                    data_nascimento: "",
                                    telefone: "",
                                    email: "",
                                    senha: "",
                                    confirmarSenha: "",
                                    tipo: "cliente",
                                    is_ativo: true
                                })
                            }
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="w-[48%] bg-[#ffd900a6] text-black font-semibold py-2 rounded-xl hover:bg-[#ffd900] transition"
                        >
                            Criar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
