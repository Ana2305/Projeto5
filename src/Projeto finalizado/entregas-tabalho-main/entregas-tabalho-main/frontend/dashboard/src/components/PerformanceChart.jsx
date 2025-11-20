import { useEffect, useState } from "react";
import api from "../config/axios"; // ✅ instância com baseURL + token
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function PerformanceChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    api
      .get("/dashboard/metrics")
      .then((res) => {
        const byDay = res.data.by_day || {};
        // Converte o objeto { "Segunda": 48.5, "Terça": 50.2 } para array
        const formatted = Object.entries(byDay).map(([day, value]) => ({
          name: day.substring(0, 3), // "Seg", "Ter", etc
          openRate: value,
        }));
        setChartData(formatted);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados de desempenho:", err);
      });
  }, []);

  if (chartData.length === 0) {
    return (
      <div className="mt-10 bg-white rounded-2xl shadow-md p-6 text-center text-gray-500">
        Carregando dados de desempenho...
      </div>
    );
  }

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Desempenho Semanal 📈
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="openRate"
            name="Taxa de Abertura (%)"
            stroke="#ec4899"
            strokeWidth={3}
            dot={{ r: 5, fill: "#f97316" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
