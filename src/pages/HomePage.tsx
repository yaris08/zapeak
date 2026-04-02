import React, { useState, useMemo } from "react";
import {
  GitBranch, MessageSquare, BarChart3, DollarSign,
  ShoppingCart, TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid,
} from "recharts";

type Period = "today" | "7d" | "30d";

const multipliers: Record<Period, number> = { today: 1, "7d": 5.2, "30d": 18 };

const baseHourly = [
  12, 8, 5, 3, 2, 4, 9, 18, 32, 45, 52, 48, 55, 60, 58, 50, 42, 35, 28, 22, 18, 15, 14, 13,
];

const baseCampaigns = [
  { name: "Páscoa 2024", investment: 500, sales: 23, revenue: 2209 },
  { name: "Black Friday", investment: 800, sales: 18, revenue: 1890 },
  { name: "Lead Quente", investment: 300, sales: 10, revenue: 791 },
];

const flows = [
  { name: "Boas-vindas", trigger: "Palavra-chave", sessions: 45, active: true },
  { name: "Qualificação Lead", trigger: "Palavra-chave", sessions: 38, active: true },
  { name: "Recuperação Carrinho", trigger: "Horário", sessions: 0, active: false },
];

const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const roasBadge = (roas: number) => {
  const color = roas >= 2 ? "bg-green-500/20 text-green-400" : roas >= 1 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400";
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${color}`}>{roas.toFixed(1)}x</span>;
};

const HomePage: React.FC = () => {
  const [period, setPeriod] = useState<Period>("today");
  const m = multipliers[period];

  const kpis = useMemo(() => [
    { label: "Fluxos Ativos", value: "3", icon: GitBranch, color: "#22c55e" },
    { label: "Sessões Hoje", value: Math.round(127 * m).toLocaleString(), icon: MessageSquare, color: "#3b82f6" },
    { label: "Taxa de Conclusão", value: `${Math.min(68 + (m > 1 ? 4 : 0), 100)}%`, icon: BarChart3, color: "#f97316" },
    { label: "Faturamento Real", value: fmt(4890 * m), icon: DollarSign, color: "#22c55e" },
    { label: "Total de Vendas", value: Math.round(51 * m).toLocaleString(), icon: ShoppingCart, color: "#a855f7" },
    { label: "ROAS Médio", value: "4.2x", icon: TrendingUp, color: "#22c55e" },
  ], [m]);

  const hourlyData = useMemo(
    () => baseHourly.map((v, i) => ({ hora: `${String(i).padStart(2, "0")}h`, sessoes: Math.round(v * m) })),
    [m],
  );

  const campaigns = useMemo(
    () => baseCampaigns.map((c) => {
      const s = Math.round(c.sales * m);
      const r = Math.round(c.revenue * m);
      const inv = Math.round(c.investment * m);
      return { ...c, sales: s, revenue: r, investment: inv, roas: +(r / inv).toFixed(1) };
    }),
    [m],
  );

  const periodButtons: { label: string; value: Period }[] = [
    { label: "Hoje", value: "today" },
    { label: "7 dias", value: "7d" },
    { label: "30 dias", value: "30d" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Visão geral das suas automações</p>
        </div>
        <div className="flex gap-1 bg-[#1a1a1a] rounded-lg p-1 border border-[#2a2a2a]">
          {periodButtons.map((b) => (
            <button
              key={b.value}
              onClick={() => setPeriod(b.value)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                period === b.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: k.color + "20" }}>
                <Icon size={20} style={{ color: k.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{k.value}</p>
                <p className="text-xs text-muted-foreground">{k.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
        <p className="text-sm font-medium text-foreground mb-4">Sessões nas últimas 24h</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="hora" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#fff" }}
              labelStyle={{ color: "#9ca3af" }}
            />
            <Line type="monotone" dataKey="sessoes" stroke="#f97316" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Campanhas */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
        <p className="text-sm font-medium text-foreground p-4 pb-2">Top Campanhas</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2a]">
              {["Campanha", "Investimento", "Vendas", "Faturamento", "ROAS"].map((h) => (
                <th key={h} className="px-4 py-2 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.name} className="border-b border-[#2a2a2a] last:border-0 hover:bg-[#222]">
                <td className="px-4 py-3 text-foreground">{c.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{fmt(c.investment)}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.sales}</td>
                <td className="px-4 py-3 text-muted-foreground">{fmt(c.revenue)}</td>
                <td className="px-4 py-3">{roasBadge(c.roas)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fluxos Ativos */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
        <p className="text-sm font-medium text-foreground p-4 pb-2">Fluxos Ativos</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2a]">
              {["Nome", "Gatilho", "Sessões hoje", "Status"].map((h) => (
                <th key={h} className="px-4 py-2 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {flows.map((f) => (
              <tr key={f.name} className="border-b border-[#2a2a2a] last:border-0 hover:bg-[#222]">
                <td className="px-4 py-3 text-foreground">{f.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{f.trigger}</td>
                <td className="px-4 py-3 text-muted-foreground">{Math.round(f.sessions * m)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${f.active ? "bg-green-500/20 text-green-400" : "bg-[#2a2a2a] text-muted-foreground"}`}>
                    {f.active ? "Ativo" : "Pausado"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
