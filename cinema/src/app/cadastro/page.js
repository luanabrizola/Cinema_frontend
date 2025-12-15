"use client";
import { useState } from "react";
import Link from "next/link";

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

    function maskCPF(value) {
        value = value.replace(/\D/g, "").slice(0, 11);

        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        return value;
    }

    function maskTelefone(value) {
        value = value.replace(/\D/g, "").slice(0, 11);

        if (value.length <= 10) {
            return value
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{4})(\d)/, "$1-$2");
        }

        return value
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2");
    }

    function handleChange(e) {
        const { name, value } = e.target;

        if (name === "cpf") {
            setForm({ ...form, cpf: maskCPF(value) });
            return;
        }

        if (name === "telefone") {
            setForm({ ...form, telefone: maskTelefone(value) });
            return;
        }

        setForm({ ...form, [name]: value });
    }


    async function handleSubmit(e) {
        e.preventDefault();

        let errosMsg = [];

        const cpfLimpo = form.cpf.replace(/\D/g, "");
        if (cpfLimpo.length !== 11) {
            errosMsg.push("CPF deve conter 11 dígitos.");
        }

        if (form.senha !== form.confirmarSenha) {
            errosMsg.push("As senhas não coincidem.");
        }

        if (form.senha.length < 8) {
            errosMsg.push("A senha deve ter no mínimo 8 caracteres.");
        } else {
            if (!/\d/.test(form.senha))
                errosMsg.push("A senha deve conter pelo menos um número.");
            if (!/[A-Z]/.test(form.senha))
                errosMsg.push("A senha deve conter pelo menos uma letra maiúscula.");
            if (!/[a-z]/.test(form.senha))
                errosMsg.push("A senha deve conter pelo menos uma letra minúscula.");
            if (!/[!@#$%^&*]/.test(form.senha))
                errosMsg.push("A senha deve conter pelo menos um caractere especial (!@#$%^&*).");
        }

        const telefoneNumeros = form.telefone.replace(/\D/g, "");
        if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
            errosMsg.push("Telefone deve conter 10 ou 11 números.");
        }

        if (errosMsg.length > 0) {
            alert(errosMsg.join("\n"));
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
                    telefone: telefoneNumeros,
                    email: form.email,
                    senha: form.senha,
                    tipo: form.tipo,
                    is_ativo: form.is_ativo
                })
            });

            const data = await response.json();

            if (response.status === 201) {
                alert("Usuário criado com sucesso!");
            } else {
                alert("Erro: " + (data.error || data.message));
            }
        } catch (err) {
            alert("Erro ao conectar ao servidor.");
            console.error(err);
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
                            required
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

                        <Link
                            href="/login"
                            className="w-[48%] bg-[#ffd900a6] text-black font-semibold py-2 rounded-xl hover:bg-[#ffd900] text-center transition"
                        >
                            Cancelar
                        </Link>

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
