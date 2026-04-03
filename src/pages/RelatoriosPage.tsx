import React, { useState } from "react";
import { Activity, CheckCircle, MessageSquare, Clock, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

type Period = "today" | "7d" | "30d";
const multipliers: Record<Period, number> = { today: 1, "7d": 5.2, "30d": 18 };

const KpiCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) => (
  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon size={18} style={{ color }} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <p className="text-xl font-bold text-foreground">{value}</p>
  </div>
);

const baseChart = [
  { dia: "27/03", sessoes: 0 },
  { dia: "28/03", sessoes: 0 },
  { dia: "29/03", sessoes: 0 },
  { dia: "30/03", sessoes: 0 },
  { dia: "31/03", sessoes: 0 },
  { dia: "01/04", sessoes: 0 },
  { dia: "02/04", sessoes: 0 },
];

const baseFunnel = [
  { label: "Sessões iniciadas", value: 0, pct: 0 },
  { label: "Chegaram ao meio", value: 0, pct: 0 },
  { label: "Concluíram", value: 0, pct: 0 },
  { label: "Converteram", value: 0, pct: 0 },
];

const baseFlows: any[] = [];

const basePeaks = [
  { hora: "10:00 - 11:00", msgs: 342 },
  { hora: "14:00 - 15:00", msgs: 298 },
  { hora: "09:00 - 10:00", msgs: 276 },
  { hora: "15:00 - 16:00", msgs: 241 },
  { hora: "11:00 - 12:00", msgs: 198 },
];

const conclusaoBadge = (val: number) => {
  const cls = val >= 70 ? "bg-green-500/10 text-green-500" : val >= 50 ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500";
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls}`}>{val}%</span>;
};

const RelatoriosPage: React.FC = () => {
  const [period, setPeriod] = useState<Period>("today");
  const m = multipliers[period];

  const s = (v: number) => Math.round(v * m);
  const fmt = (v: number) => v.toLocaleString("pt-BR");

  const chartData = baseChart.map(d => ({ ...d, sessoes: s(d.sessoes) }));
  const funnelData = baseFunnel.map(d => ({ ...d, value: s(d.value) }));
  const peaksData = basePeaks.map(d => ({ ...d, msgs: s(d.msgs) }));
  const flowsData = baseFlows.map(f => ({ ...f, sessoes: s(f.sessoes), msgs: s(f.msgs), conversoes: s(f.conversoes) }));
  const maxPeak = Math.max(...peaksData.map(p => p.msgs));

  const handleExport = () => {
    const header = "Fluxo,Sessões,Conclusão %,Msgs Enviadas,Tempo Médio,Conversões,Último Disparo";
    const rows = flowsData.map(f => `${f.name},${f.sessoes},${f.conclusao}%,${f.msgs},${f.tempo},${f.conversoes},${f.ultimo}`);
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio-fluxos.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exportado com sucesso!");
  };

  return (
    <div className="p-3 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Relatórios</h1>
          <p className="text-sm text-muted-foreground">Análise de desempenho das automações</p>
        </div>
        <div className="flex gap-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-1">
          {([["today", "Hoje"], ["7d", "7 dias"], ["30d", "30 dias"]] as [Period, string][]).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setPeriod(k)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${period === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={Activity} label="Total de Sessões" value={fmt(s(127))} color="#3b82f6" />
        <KpiCard icon={CheckCircle} label="Taxa de Conclusão" value="68%" color="#22c55e" />
        <KpiCard icon={MessageSquare} label="Mensagens Enviadas" value={fmt(s(1847))} color="#06b6d4" />
        <KpiCard icon={Clock} label="Tempo Médio de Fluxo" value="4m 32s" color="#f97316" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
          <h2 className="text-sm font-bold text-foreground mb-4">Sessões por dia</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="dia" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="sessoes" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Funnel */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
          <h2 className="text-sm font-bold text-foreground mb-4">Funil de Conclusão</h2>
          <div className="space-y-3">
            {funnelData.map((step, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{step.label}</span>
                  <span className="text-foreground font-medium">{fmt(step.value)} ({step.pct}%)</span>
                </div>
                <div className="h-6 bg-[#2a2a2a] rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${step.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance table */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-foreground">Desempenho por Fluxo</h2>
          <button onClick={handleExport} className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#2a2a2a] rounded-md text-muted-foreground hover:text-foreground transition-colors">
            <Download size={14} /> Exportar CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                {["Fluxo", "Sessões", "Conclusão %", "Msgs Enviadas", "Tempo Médio", "Conversões", "Último Disparo"].map(h => (
                  <th key={h} className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium text-left py-2 px-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {flowsData.map((f, i) => (
                <tr key={i} className="border-b border-[#2a2a2a] last:border-0 hover:bg-[#222] transition-colors">
                  <td className="py-2.5 px-3 text-sm text-foreground">{f.name}</td>
                  <td className="py-2.5 px-3 text-sm text-foreground">{fmt(f.sessoes)}</td>
                  <td className="py-2.5 px-3">{conclusaoBadge(f.conclusao)}</td>
                  <td className="py-2.5 px-3 text-sm text-foreground">{fmt(f.msgs)}</td>
                  <td className="py-2.5 px-3 text-sm text-muted-foreground">{f.tempo}</td>
                  <td className="py-2.5 px-3 text-sm text-foreground">{fmt(f.conversoes)}</td>
                  <td className="py-2.5 px-3 text-sm text-muted-foreground">{f.ultimo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Peak messages table */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
        <h2 className="text-sm font-bold text-foreground mb-4">Pico de Mensagens</h2>
        <div className="space-y-3">
          {peaksData.map((p, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground w-28 shrink-0">{p.hora}</span>
              <div className="flex-1 h-3 bg-[#2a2a2a] rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(p.msgs / maxPeak) * 100}%` }} />
              </div>
              <span className="text-xs text-foreground font-medium w-24 text-right">{fmt(p.msgs)} msgs</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatoriosPage;
