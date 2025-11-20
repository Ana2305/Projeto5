import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import api from "../config/axios"; // ✅ instância com baseURL + token

export default function Settings() {

  // Estados dos Inputs
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // -------- SALVAR DADOS DA EMPRESA ----------
  async function salvarAlteracoes() {
    const dados = {
      nomeEmpresa,
      cnpj,
      email,
      telefone,
    };

    try {
      const resposta = await api.post("/settings/api/empresa", dados);

      if (resposta.status < 200 || resposta.status >= 300) {
        throw new Error("Erro ao salvar os dados");
      }

      alert("Dados salvos com sucesso!");
    } catch (erro) {
      console.error(erro);
      alert("Erro ao salvar. Tente novamente.");
    }
  }

  // -------- ATUALIZAR SENHA ----------
  async function atualizarSenha() {
    if (!novaSenha || !confirmarSenha) {
      return alert("Preencha todos os campos.");
    }

    if (novaSenha !== confirmarSenha) {
      return alert("As senhas não coincidem.");
    }

    try {
      const resposta = await api.post("/settings/update_password", {
        novaSenha,
      });

      if (resposta.status < 200 || resposta.status >= 300) {
        throw new Error("Erro ao atualizar a senha");
      }

      alert("Senha atualizada com sucesso!");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (erro) {
      console.error(erro);
      alert("Erro ao atualizar senha.");
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-pink-50 to-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 bg-gradient-to-b from-pink-50 to-white pb-12">

        {/* Header */}
        <Header />

        <main className="max-w-5xl mx-auto px-6 mt-10 space-y-8">

          {/* Título */}
          <h1 className="text-2xl font-bold text-gray-700">
            Configurações do Sistema ⚙️
          </h1>

          {/* --- Dados da Empresa --- */}
          <Card title="Dados da Empresa">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <Input
                label="Nome da Empresa"
                placeholder="Ilonnac Delivery"
                value={nomeEmpresa}
                onChange={setNomeEmpresa}
              />

              <Input
                label="CNPJ"
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={setCnpj}
              />

              <Input
                label="E-mail de Contato"
                placeholder="contato@empresa.com"
                value={email}
                onChange={setEmail}
              />

              <Input
                label="Telefone"
                placeholder="(11) 99999-0000"
                value={telefone}
                onChange={setTelefone}
              />

            </div>

            <button
              onClick={salvarAlteracoes}
              className="mt-6 px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
            >
              Salvar alterações
            </button>
          </Card>

          {/* --- Preferências --- */}
          <Card title="Preferências do Sistema">
            <div className="flex flex-col gap-4">
              <Toggle label="Enviar alertas por e-mail" />
              <Toggle label="Backup automático semanal" />
            </div>
          </Card>

          {/* --- Alterar senha (se quiser deixar no layout também) --- */}
          <Card title="Alterar Senha">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nova Senha"
                type="password"
                placeholder="Digite a nova senha"
                value={novaSenha}
                onChange={setNovaSenha}
              />
              <Input
                label="Confirmar Nova Senha"
                type="password"
                placeholder="Repita a nova senha"
                value={confirmarSenha}
                onChange={setConfirmarSenha}
              />
            </div>

            <button
              onClick={atualizarSenha}
              className="mt-6 px-4 py-2 bg-orange-400 text-white rounded-xl hover:bg-orange-500"
            >
              Atualizar senha
            </button>
          </Card>

        </main>

        {/* Rodapé */}
        <footer className="max-w-5xl mx-auto px-6 mt-12 text-xs text-gray-400">
          Ilonnac Dashboard • Configurações • © {new Date().getFullYear()}
        </footer>

      </div>
    </div>
  );
}

/* -------------------- COMPONENTES REUTILIZÁVEIS -------------------- */

function Card({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-white/60">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
}

function Input({ label, placeholder, type = "text", value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-3 border rounded-xl focus:ring-2 ring-pink-300 outline-none"
      />
    </div>
  );
}

function Toggle({ label }) {
  return (
    <label className="flex items-center justify-between p-3 border rounded-xl bg-white cursor-pointer">
      <span className="text-gray-700">{label}</span>
      <input type="checkbox" className="toggle-checkbox" />
    </label>
  );
}
