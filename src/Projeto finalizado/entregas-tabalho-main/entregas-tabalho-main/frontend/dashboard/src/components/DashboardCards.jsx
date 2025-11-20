// frontend/dashboard/src/components/DashboardCards.jsx
import { useEffect, useState } from "react";
import api from "../services/api";

export default function DashboardCards() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/dashboard/metrics")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Erro ao buscar métricas:", err));
  }, []);

  if (!data) return <p>Carregando métricas...</p>;

  const cards = [
    {
      title: "Campanhas Totais",
      value: data.total_campaigns,
      color: "from-pink-500 to-orange-400",
    },
    {
      title: "Taxa Média de Abertura",
      value: `${data.avg_open}%`,
      color: "from-orange-400 to-pink-400",
    },
    {
      title: "Taxa Média de Cliques",
      value: `${data.avg_click}%`,
      color: "from-pink-400 to-orange-500",
    },
    {
      title: "Melhor Dia (Open Rate)",
      value: Object.entries(data.by_day).sort((a, b) => b[1] - a[1])[0][0],
      color: "from-orange-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`p-6 rounded-2xl shadow-md text-white bg-gradient-to-r ${card.color} transition transform hover:scale-105`}
        >
          <h3 className="text-lg font-medium mb-2">{card.title}</h3>
          <p className="text-3xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
