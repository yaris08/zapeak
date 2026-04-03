import React, { useState, useMemo } from "react";
import {
  Users, MessageSquare, MousePointer, Bot, CheckCircle,
  ShoppingCart, DollarSign, TrendingUp, CreditCard,
  Target, Percent, Wallet, Receipt, MessageCircle,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid,
} from "recharts";
import EmptyState from "@/components/ui/EmptyState";

type Period = "today" | "7d" | "30d";

const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const KpiCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) => (
  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 flex items-center gap-2 min-w-0 overflow-hidden">
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: color + "20" }}>
      <Icon size={16} style={{ color }} />
    </div>
    <div className="min-w-0 flex-1 overflow-hidden">
      <p className="text-sm md:text-lg font-bold text-foreground truncate">{value}</p>
      <p className="text-[10px] md:text-xs text-muted-foreground leading-tight">{label}</p>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  const [period, setPeriod] = useState<Period>("today");

  const hourlyData = useMemo(
    () => Array.from({ length: 24 }, (_, i) => ({ hora: `${String(i).padStart(2, "0")}h`, sessoes: 0 })),
    [],
  );

  const periodButtons: { label: string; value: Period }[] = [
    { label: "Hoje", value: "today" },
    { label: "7 dias", value: "7d" },
    { label: "30 dias", value: "30d" },
  ];

  return (
    <div className="p-3 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
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

      {/* KPIs — all zeroed */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <KpiCard icon={ShoppingCart} label="Vendas" value="0" color="#22c55e" />
        <KpiCard icon={CreditCard} label="CPA (Custo por Aquisição)" value="R$ 0,00" color="#ef4444" />
        <KpiCard icon={TrendingUp} label="Lucro" value="R$ 0,00" color="#22c55e" />
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 flex items-center gap-2 min-w-0 overflow-hidden">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#22c55e20" }}>
            <Target size={16} style={{ color: "#22c55e" }} />
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="text-sm md:text-lg font-bold text-foreground truncate">0x</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">ROI</p>
          </div>
        </div>
        <KpiCard icon={DollarSign} label="Faturamento" value="R$ 0,00" color="#22c55e" />
        <KpiCard icon={Wallet} label="Investimento Total" value="R$ 0,00" color="#f97316" />
        <KpiCard icon={Percent} label="Taxa de Conversão" value="0%" color="#3b82f6" />
        <KpiCard icon={Receipt} label="Ticket Médio" value="R$ 0,00" color="#3b82f6" />
        <KpiCard icon={MessageSquare} label="Total de Conversas" value="0" color="#06b6d4" />
        <KpiCard icon={MousePointer} label="Custo por Conversa" value="R$ 0,00" color="#a855f7" />
      </div>

      {/* Funil — all zeroed */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
        <p className="text-sm font-bold text-foreground mb-4">Funil de Conversão</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div className="overflow-hidden" style={{ background: "#22c55e14", border: "0.5px solid #22c55e40", borderRadius: "8px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
            <Users size={14} color="#22c55e" style={{ flexShrink: 0 }} />
            <div className="min-w-0 flex-1" style={{ fontSize: "13px" }}>Conversas iniciadas</div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div className="w-16 md:w-[120px]" style={{ height: "6px", background: "#ffffff10", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ width: "0%", height: "100%", background: "#22c55e", borderRadius: "3px" }} />
              </div>
              <div className="shrink-0" style={{ fontSize: "13px", fontWeight: 500, color: "#22c55e", minWidth: "32px", textAlign: "right" }}>0</div>
              <div className="shrink-0" style={{ fontSize: "11px", color: "#9ca3af", minWidth: "36px", textAlign: "right" }}>0%</div>
            </div>
          </div>
          <div className="ml-2 md:ml-3" style={{ width: "1px", height: "6px", background: "#22c55e", opacity: 0.3 }} />
          <div className="overflow-hidden ml-1 md:ml-2" style={{ background: "#22c55e0e", border: "0.5px solid #22c55e30", borderRadius: "8px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
            <Bot size={14} color="#22c55e" style={{ opacity: 0.8, flexShrink: 0 }} />
            <div className="min-w-0 flex-1" style={{ fontSize: "13px" }}>Interagiram com bot</div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div className="w-16 md:w-[120px]" style={{ height: "6px", background: "#ffffff10", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ width: "0%", height: "100%", background: "#22c55e", opacity: 0.8, borderRadius: "3px" }} />
              </div>
              <div className="shrink-0" style={{ fontSize: "13px", fontWeight: 500, color: "#22c55e", minWidth: "32px", textAlign: "right" }}>0</div>
              <div className="shrink-0" style={{ fontSize: "11px", color: "#9ca3af", minWidth: "36px", textAlign: "right" }}>0%</div>
            </div>
          </div>
          <div className="ml-3 md:ml-6" style={{ width: "1px", height: "6px", background: "#22c55e", opacity: 0.3 }} />
          <div className="overflow-hidden ml-2 md:ml-4" style={{ background: "#22c55e08", border: "0.5px solid #22c55e20", borderRadius: "8px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
            <CheckCircle size={14} color="#22c55e" style={{ opacity: 0.6, flexShrink: 0 }} />
            <div className="min-w-0 flex-1" style={{ fontSize: "13px" }}>Concluíram o fluxo</div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div className="w-16 md:w-[120px]" style={{ height: "6px", background: "#ffffff10", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ width: "0%", height: "100%", background: "#22c55e", opacity: 0.6, borderRadius: "3px" }} />
              </div>
              <div className="shrink-0" style={{ fontSize: "13px", fontWeight: 500, color: "#22c55e", minWidth: "32px", textAlign: "right" }}>0</div>
              <div className="shrink-0" style={{ fontSize: "11px", color: "#9ca3af", minWidth: "36px", textAlign: "right" }}>0%</div>
            </div>
          </div>
          <div className="ml-4 md:ml-9" style={{ width: "1px", height: "6px", background: "#22c55e", opacity: 0.3 }} />
          <div className="overflow-hidden ml-3 md:ml-6" style={{ background: "#22c55e05", border: "0.5px solid #22c55e15", borderRadius: "8px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
            <ShoppingCart size={14} color="#22c55e" style={{ opacity: 0.4, flexShrink: 0 }} />
            <div className="min-w-0 flex-1" style={{ fontSize: "13px" }}>Compraram</div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div className="w-16 md:w-[120px]" style={{ height: "6px", background: "#ffffff10", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ width: "0%", height: "100%", background: "#22c55e", opacity: 0.4, borderRadius: "3px" }} />
              </div>
              <div className="shrink-0" style={{ fontSize: "13px", fontWeight: 500, color: "#22c55e", minWidth: "32px", textAlign: "right" }}>0</div>
              <div className="shrink-0" style={{ fontSize: "11px", color: "#9ca3af", minWidth: "36px", textAlign: "right" }}>0%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico — zeroed */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
        <p className="text-sm font-bold text-foreground mb-4">Sessões nas últimas 24h</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="hora" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#fff" }} labelStyle={{ color: "#9ca3af" }} />
            <Line type="monotone" dataKey="sessoes" stroke="#22c55e" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Campanhas — empty */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
        <p className="text-sm font-bold text-foreground p-4 pb-2">Campanhas</p>
        <EmptyState
          icon={Target}
          title="Nenhuma campanha ainda"
          subtitle="Crie sua primeira campanha na página de Atribuição"
        />
      </div>

      {/* Vendas — empty */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
        <p className="text-sm font-bold text-foreground p-4 pb-2">Últimas Vendas Identificadas pela IA</p>
        <EmptyState
          icon={ShoppingCart}
          title="Nenhuma venda identificada"
          subtitle="As vendas identificadas pela IA aparecerão aqui"
        />
      </div>
    </div>
  );
};

export default HomePage;
