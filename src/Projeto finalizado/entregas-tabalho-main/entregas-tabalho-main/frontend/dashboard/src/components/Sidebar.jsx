import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg flex flex-col p-6 text-gray-800">
      <h2 className="text-xl font-semibold mb-6">Menu</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/overview" className="hover:text-pink-500 transition">
          Visão Geral
        </Link>
        <Link to="/dashboard" className="hover:text-pink-500 transition">
          Relatórios
        </Link>
        <Link to="/settings" className="hover:text-pink-500 transition">
          Configurações
        </Link>
      </nav>
    </aside>
  );
}
