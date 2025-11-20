import { useState } from "react";
import api from "../../services/api"; // ✅ Importa a instância configurada
import { useNavigate, Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/login", {
        username,
        password,
      });

      const token = res.data.access_token;

      if (!token) {
        setError("Erro ao obter token. Tente novamente.");
        return;
      }

      // ✅ Salva o token no localStorage
      localStorage.setItem("token", token);

      // Chama o callback (caso o App precise do token)
      if (onLogin) onLogin(token);

      // ✅ Redireciona pro dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-orange-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

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

        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded transition"
        >
          Entrar
        </button>

        <p className="text-center mt-4 text-gray-600">
          Não tem conta?{" "}
          <Link to="/register" className="text-orange-500 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}