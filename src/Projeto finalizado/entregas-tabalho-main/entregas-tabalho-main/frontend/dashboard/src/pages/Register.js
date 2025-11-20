import { useState } from "react";
import api from "../config/axios"; // ⬅️ usa a instância configurada
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await api.post("/register", {
        username,
        password,
        role,
      });

      setMsg(res.data.msg || "Usuário criado com sucesso!");
      setError("");

      // redireciona após 1.5s
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Erro ao registrar:", err);
      setMsg("");
      setError(err.response?.data?.msg || "Erro ao registrar");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-orange-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Criar Conta</h2>

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>

        {msg && <p className="text-green-500 text-center mb-3">{msg}</p>}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded transition"
        >
          Cadastrar
        </button>

        <p className="text-center mt-4 text-gray-600">
          Já tem conta?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Faça login
          </Link>
        </p>
      </form>
    </div>
  );
}
import { useState } from "react";
import api from "../config/axios"; // ⬅️ usa a instância configurada
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await api.post("/register", {
        username,
        password,
        role,
      });

      setMsg(res.data.msg || "Usuário criado com sucesso!");
      setError("");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Erro ao registrar:", err);
      setMsg("");
      setError(err.response?.data?.msg || "Erro ao registrar");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-orange-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Criar Conta</h2>

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>

        {msg && <p className="text-green-500 text-center mb-3">{msg}</p>}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded transition"
        >
          Cadastrar
        </button>

        <p className="text-center mt-4 text-gray-600">
          Já tem conta?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Faça login
          </Link>
        </p>
      </form>
    </div>
  );
}
