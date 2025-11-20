import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PieChartComponent from "../components/PieChartComponent";
import BarChartComponent from "../components/BarChartComponent";
import AreaChartComponent from "../components/AreaChartComponent";

export default function OverviewPage() {
  // Mock de dados
  const kpis = [
    { title: "Pedidos (mês)", value: "324", delta: "+8%" },
    { title: "Crescimento (mês)", value: "+8%", delta: "+2pp" },
    { title: "Ticket Médio", value: "R$ 48,50", delta: "-1%" },
    { title: "Clientes Ativos", value: "210", delta: "+5%" },
    { title: "Satisfação", value: "4.6/5", delta: "+0.1" },
  ];

  const engines = [
    { name: "DirectOrder", value: 520 },
    { name: "CannoliEngine", value: 480 },
    { name: "KDSPro", value: 450 },
    { name: "IfoodBridge", value: 430 },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-pink-50 to-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 pb-12 flex flex-col">
        {/* Header */}
        <Header />

        <main className="max-w-7xl mx-auto px-6 mt-8 flex-1">
          {/* KPI Cards */}
          <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 shadow-sm border border-white/60"
              >
                <div className="text-xs text-gray-400">{kpi.title}</div>
                <div className="flex items-baseline gap-3 mt-2">
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <div className="text-sm text-gray-500">{kpi.delta}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Gráficos principais */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* COLUNA ESQUERDA */}
            <div className="space-y-6">
              <Card title="Resumo de Vendas">
                <BarChartComponent />
              </Card>

              <Card title="Tendência semanal">
                <AreaChartComponent />
              </Card>
            </div>

            {/* COLUNA DIREITA */}
            <div className="space-y-6">
              <Card title="Distribuição de Clientes">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-65 flex items-center justify-center text-gray-400/70">
                    <PieChartComponent />
                  </div>

                  <div className="h-48 flex flex-col gap-2 justify-center">
                    <small className="text-xs text-gray-400">
                      Top Engines usados
                    </small>
                    <div className="space-y-2">
                      {engines.map((e) => (
                        <div key={e.name} className="flex items-center gap-3">
                          <div className="w-24 text-sm">{e.name}</div>
                          <div className="flex-1 bg-pink-100 rounded-full h-3 overflow-hidden">
                            <div
                              style={{
                                width: `${Math.min(
                                  100,
                                  (e.value / 600) * 100
                                )}%`,
                              }}
                              className="h-full rounded-full bg-pink-400"
                            />
                          </div>
                          <div className="w-12 text-sm text-right">
                            {e.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* PREVISÃO DE VENDAS */}
              <Card title="Previsão de Vendas para Amanhã">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500">
                    Estimativa com base na tendência semanal:
                  </p>

                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-extrabold text-pink-600">
                      247
                    </span>
                    <span className="text-sm text-gray-500">
                      pedidos previstos
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    Aproximadamente{" "}
                    <span className="text-green-600 font-semibold">+6%</span> em
                    relação à média dos últimos 7 dias.
                  </p>

                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-xs text-pink-700">
                    <span className="w-2 h-2 rounded-full bg-pink-500" />
                    Projeção simulada para fins de teste
                  </div>
                </div>
              </Card>

              {/* NOVO CARD: INDICADORES DE RISCO */}
              <Card title="Indicadores de Risco Operacional">
                <div className="space-y-4 text-sm">
                  <RiskRow
                    label="Taxa de cancelamento"
                    value="4,2%"
                    level="médio"
                    barWidth={42}
                    color="bg-orange-400"
                  />
                  <RiskRow
                    label="Pedidos com atraso"
                    value="7,5%"
                    level="alto"
                    barWidth={75}
                    color="bg-red-500"
                  />
                  <RiskRow
                    label="Reclamações nos últimos 7 dias"
                    value="18"
                    level="estável"
                    barWidth={30}
                    color="bg-pink-400"
                  />

                  <p className="text-xs text-gray-400 mt-2">
                    Dados simulados para avaliação visual do painel. Podem ser
                    conectados ao backend futuramente.
                  </p>
                </div>
              </Card>
            </div>
          </section>
        </main>

        <footer className="max-w-7xl mx-auto px-6 mt-10 text-xs text-gray-400">
          Ilonnac Dashboard • Versão 1.0 • © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

// Card reutilizável
function Card({ children, title, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-white/60 ${className}`}
    >
      {title && <h3 className="text-sm text-gray-600 mb-3">{title}</h3>}
      <div>{children}</div>
    </div>
  );
}

// Linha de indicador de risco
function RiskRow({ label, value, level, barWidth, color }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full ${color}`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 capitalize">{level}</span>
      </div>
    </div>
  );
}
