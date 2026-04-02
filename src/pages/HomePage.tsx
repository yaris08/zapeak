import React, { useState, useMemo } from "react";
import {
  Users, MessageSquare, CheckCircle, MousePointer,
  ShoppingCart, DollarSign, TrendingUp, CreditCard,
  Target, Percent, Wallet, MessageCircle, UserCheck, ShoppingBag,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid,
} from "recharts";

type Period = "today" | "7d" | "30d";
const multipliers: Record<Period, number> = { today: 1, "7d": 5.2, "30d": 18 };

const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const roasColor = (r: number) =>
  r >= 2 ? "bg-green-500/20 text-green-400" : r >= 1.5 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400";

const confidenceColor = (c: number) =>
  c >= 80 ? "bg-green-500/20 text-green-400" : c >= 60 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400";

const baseHourly = [12,8,5,3,2,4,9,18,32,45,52,48,55,60,58,50,42,35,28,22,18,15,14,13];

const baseCampaigns = [
  { name: "Páscoa 2024", investment: 500, conversas: 220, sales: 23, revenue: 2209, ticket: 96, custCompra: 21.7, roas: 4.4 },
  { name: "Black Friday", investment: 800, conversas: 180, sales: 18, revenue: 1890, ticket: 105, custCompra: 44.4, roas: 2.4 },
  { name: "Lead Quente", investment: 300, conversas: 100, sales: 10, revenue: 791, ticket: 79, custCompra: 30, roas: 2.6 },
];

const baseSales = [
  { time: "14:32", name: "João Silva", campaign: "Páscoa 2024", value: 97, confidence: 94, pixel: true },
  { time: "13:15", name: "Maria Souza", campaign: "Black Friday", value: 197, confidence: 88, pixel: true },
  { time: "12:40", name: "Carlos Lima", campaign: "Lead Quente", value: 47, confidence: 76, pixel: true },
  { time: "11:22", name: "Ana Paula", campaign: "Páscoa 2024", value: 97, confidence: 91, pixel: true },
  { time: "10:05", name: "Pedro Costa", campaign: "Black Friday", value: 297, confidence: 62, pixel: false },
];

const KpiCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) => (
  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 flex items-center gap-3">
    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + "20" }}>
      <Icon size={20} style={{ color }} />
    </div>
    <div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  const [period, setPeriod] = useState<Period>("today");
  const m = multipliers[period];

  const traffic = useMemo(() => ({
    conversas: Math.round(500 * m),
    taxaResposta: 80,
    taxaConclusao: 68,
    custoConversa: +(800 * m / (500 * m)).toFixed(2),
  }), [m]);

  const vendas = useMemo(() => ({
    total: Math.round(51 * m),
    faturamento: Math.round(4890 * m),
    ticket: +(4890 * m / (51 * m)).toFixed(2),
    custoCompra: +(800 * m / (51 * m)).toFixed(2),
  }), [m]);

  const roasData = useMemo(() => ({
    roas: +(vendas.faturamento / (800 * m)).toFixed(1),
    taxaConversao: +((vendas.total / traffic.conversas) * 100).toFixed(1),
    investimento: Math.round(800 * m),
  }), [m, vendas, traffic]);

  const funnel = useMemo(() => {
    const c = traffic.conversas;
    const interagiram = Math.round(c * 0.8);
    const concluiram = Math.round(c * 0.544);
    const compraram = vendas.total;
    return [
      { label: "Conversas iniciadas", value: c, pct: 100, icon: MessageCircle },
      { label: "Interagiram com bot", value: interagiram, pct: +((interagiram / c) * 100).toFixed(1), icon: UserCheck },
      { label: "Concluíram o fluxo", value: concluiram, pct: +((concluiram / c) * 100).toFixed(1), icon: CheckCircle },
      { label: "Compraram", value: compraram, pct: +((compraram / c) * 100).toFixed(1), icon: ShoppingBag },
    ];
  }, [traffic, vendas]);

  const hourlyData = useMemo(
    () => baseHourly.map((v, i) => ({ hora: `${String(i).padStart(2, "0")}h`, sessoes: Math.round(v * m) })),
    [m],
  );

  const campaigns = useMemo(
    () => baseCampaigns.map((c) => ({
      ...c,
      investment: Math.round(c.investment * m),
      conversas: Math.round(c.conversas * m),
      sales: Math.round(c.sales * m),
      revenue: Math.round(c.revenue * m),
      ticket: Math.round(c.ticket),
      custCompra: +(c.investment * m / (c.sales * m)).toFixed(1),
      roas: +(c.revenue / c.investment).toFixed(1),
    })),
    [m],
  );

  const campaignTotals = useMemo(() => {
    const t = campaigns.reduce((a, c) => ({
      investment: a.investment + c.investment,
      conversas: a.conversas + c.conversas,
      sales: a.sales + c.sales,
      revenue: a.revenue + c.revenue,
    }), { investment: 0, conversas: 0, sales: 0, revenue: 0 });
    return { ...t, ticket: Math.round(t.revenue / t.sales), custCompra: +(t.investment / t.sales).toFixed(1), roas: +(t.revenue / t.investment).toFixed(1) };
  }, [campaigns]);

  const periodButtons: { label: string; value: Period }[] = [
    { label: "Hoje", value: "today" },
    { label: "7 dias", value: "7d" },
    { label: "30 dias", value: "30d" },
  ];

  const thClass = "px-4 py-2 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium";
  const tdClass = "px-4 py-3 text-muted-foreground";

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
                period === b.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs — 10 cards em grid 5x2 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <KpiCard icon={ShoppingCart} label="Vendas" value={vendas.total.toLocaleString()} color="#22c55e" />
        <KpiCard icon={CreditCard} label="CPA (Custo por Aquisição)" value={fmt(vendas.custoCompra)} color="#ef4444" />
        <KpiCard icon={TrendingUp} label="Lucro" value={fmt(vendas.faturamento - roasData.investimento)} color="#22c55e" />
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: (roasData.roas >= 2 ? "#22c55e" : roasData.roas >= 1.5 ? "#eab308" : "#ef4444") + "20" }}>
            <Target size={20} style={{ color: roasData.roas >= 2 ? "#22c55e" : roasData.roas >= 1.5 ? "#eab308" : "#ef4444" }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{roasData.roas}x</p>
            <p className="text-xs text-muted-foreground">ROI</p>
          </div>
        </div>
        <KpiCard icon={DollarSign} label="Faturamento" value={fmt(vendas.faturamento)} color="#22c55e" />
        <KpiCard icon={Wallet} label="Investimento Total" value={fmt(roasData.investimento)} color="#f97316" />
        <KpiCard icon={Percent} label="Taxa de Conversão" value={`${roasData.taxaConversao}%`} color="#3b82f6" />
        <KpiCard icon={Receipt} label="Ticket Médio" value={fmt(vendas.ticket)} color="#3b82f6" />
        <KpiCard icon={MessageSquare} label="Total de Conversas" value={traffic.conversas.toLocaleString()} color="#06b6d4" />
        <KpiCard icon={MousePointer} label="Custo por Conversa" value={fmt(traffic.custoConversa)} color="#a855f7" />
      </div>

      {/* Bloco 4 — Funil */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
        <p className="text-sm font-bold text-foreground mb-4">Funil de Conversão</p>
        <div className="space-y-4">
          {funnel.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded flex items-center justify-center bg-primary/20 shrink-0">
                  <Icon size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{step.label}</span>
                    <span className="text-sm text-muted-foreground">{step.value.toLocaleString()} ({step.pct}%)</span>
                  </div>
                  <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${step.pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bloco 5 — Gráfico */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
        <p className="text-sm font-bold text-foreground mb-4">Sessões nas últimas 24h</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="hora" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#fff" }} labelStyle={{ color: "#9ca3af" }} />
            <Line type="monotone" dataKey="sessoes" stroke="#f97316" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bloco 6 — Campanhas */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
        <p className="text-sm font-bold text-foreground p-4 pb-2">Campanhas</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                {["Campanha","Investimento","Conversas","Vendas","Faturamento","Ticket Médio","Custo/Compra","ROAS"].map((h) => (
                  <th key={h} className={thClass}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.name} className="border-b border-[#2a2a2a] hover:bg-[#222]">
                  <td className="px-4 py-3 text-foreground">{c.name}</td>
                  <td className={tdClass}>{fmt(c.investment)}</td>
                  <td className={tdClass}>{c.conversas.toLocaleString()}</td>
                  <td className={tdClass}>{c.sales}</td>
                  <td className={tdClass}>{fmt(c.revenue)}</td>
                  <td className={tdClass}>{fmt(c.ticket)}</td>
                  <td className={tdClass}>{fmt(c.custCompra)}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${roasColor(c.roas)}`}>{c.roas}x</span></td>
                </tr>
              ))}
              <tr className="border-t border-[#2a2a2a] font-bold">
                <td className="px-4 py-3 text-foreground">Total</td>
                <td className={tdClass}>{fmt(campaignTotals.investment)}</td>
                <td className={tdClass}>{campaignTotals.conversas.toLocaleString()}</td>
                <td className={tdClass}>{campaignTotals.sales}</td>
                <td className={tdClass}>{fmt(campaignTotals.revenue)}</td>
                <td className={tdClass}>{fmt(campaignTotals.ticket)}</td>
                <td className={tdClass}>{fmt(campaignTotals.custCompra)}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${roasColor(campaignTotals.roas)}`}>{campaignTotals.roas}x</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bloco 7 — Vendas Recentes */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
        <p className="text-sm font-bold text-foreground p-4 pb-2">Últimas Vendas Identificadas pela IA</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                {["Horário","Nome","Campanha","Valor","Confiança IA","Pixel"].map((h) => (
                  <th key={h} className={thClass}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {baseSales.map((s, i) => (
                <tr key={i} className="border-b border-[#2a2a2a] last:border-0 hover:bg-[#222]">
                  <td className={tdClass}>{s.time}</td>
                  <td className="px-4 py-3 text-foreground">{s.name}</td>
                  <td className={tdClass}>{s.campaign}</td>
                  <td className={tdClass}>{fmt(s.value)}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${confidenceColor(s.confidence)}`}>{s.confidence}%</span></td>
                  <td className="px-4 py-3">{s.pixel ? <span className="text-green-400">✅</span> : <span className="text-red-400">❌</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
