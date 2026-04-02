import React, { useState } from "react";
import { DollarSign, ShoppingCart, TrendingUp, CreditCard, Copy, Plus, Download, Target } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Period = "today" | "7d" | "30d";
const multipliers: Record<Period, number> = { today: 1, "7d": 5.2, "30d": 18 };

const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtDec = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

const kpis = [
  { label: "Faturamento Real", base: 4890, icon: DollarSign, color: "#22c55e", format: fmt },
  { label: "Total de Vendas", base: 51, icon: ShoppingCart, color: "#22c55e", format: (v: number) => Math.round(v).toString() },
  { label: "Ticket Médio", base: 95.88, icon: TrendingUp, color: "#3b82f6", format: fmtDec },
  { label: "Custo por Compra", base: 15.69, icon: CreditCard, color: "#f97316", format: fmtDec },
];

const campaignsBase = [
  { name: "Páscoa 2024", investment: 500, conversas: 220, vendas: 23, faturamento: 2209, ticket: 96, custoCompra: 21.7, roas: 4.4 },
  { name: "Black Friday", investment: 800, conversas: 180, vendas: 18, faturamento: 1890, ticket: 105, custoCompra: 44.4, roas: 2.4 },
  { name: "Lead Quente", investment: 300, conversas: 100, vendas: 10, faturamento: 791, ticket: 79, custoCompra: 30, roas: 2.6 },
];

const salesBase = [
  { date: "02/04 14:32", name: "João Silva", phone: "(11) 9xxxx-1234", campaign: "Páscoa 2024", valor: 97, confianca: 94, pixel: true },
  { date: "02/04 13:15", name: "Maria Souza", phone: "(11) 9xxxx-5678", campaign: "Black Friday", valor: 197, confianca: 88, pixel: true },
  { date: "02/04 12:40", name: "Carlos Lima", phone: "(11) 9xxxx-9012", campaign: "Lead Quente", valor: 47, confianca: 76, pixel: true },
  { date: "02/04 11:22", name: "Ana Paula", phone: "(11) 9xxxx-3456", campaign: "Páscoa 2024", valor: 97, confianca: 91, pixel: true },
  { date: "02/04 10:05", name: "Pedro Costa", phone: "(11) 9xxxx-7890", campaign: "Black Friday", valor: 297, confianca: 62, pixel: false },
];

const roasBadge = (v: number) => {
  if (v >= 2) return <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: "#22c55e20", color: "#22c55e" }}>{v.toFixed(1)}x</span>;
  if (v >= 1.5) return <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: "#eab30820", color: "#eab308" }}>{v.toFixed(1)}x</span>;
  return <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: "#ef444420", color: "#ef4444" }}>{v.toFixed(1)}x</span>;
};

const confBadge = (v: number) => {
  const color = v >= 80 ? "#22c55e" : v >= 60 ? "#eab308" : "#ef4444";
  return <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: color + "20", color }}>{v}%</span>;
};

const AtribuicaoPage: React.FC = () => {
  const [period, setPeriod] = useState<Period>("today");
  const [showModal, setShowModal] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [investment, setInvestment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const m = multipliers[period];
  const ref = campaignName.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_");
  const link = `wa.me/5511999999999?ref=${ref}`;

  const campaigns = campaignsBase.map(c => ({
    ...c,
    investment: Math.round(c.investment * m),
    conversas: Math.round(c.conversas * m),
    vendas: Math.round(c.vendas * m),
    faturamento: Math.round(c.faturamento * m),
    ticket: Math.round(c.ticket),
    custoCompra: +(c.custoCompra * (m > 1 ? 0.9 + Math.random() * 0.2 : 1)).toFixed(2),
  }));

  const totals = campaigns.reduce((acc, c) => ({
    investment: acc.investment + c.investment,
    conversas: acc.conversas + c.conversas,
    vendas: acc.vendas + c.vendas,
    faturamento: acc.faturamento + c.faturamento,
  }), { investment: 0, conversas: 0, vendas: 0, faturamento: 0 });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target size={20} className="text-primary" />
          <h1 className="text-lg font-bold text-foreground">Atribuição</h1>
        </div>
        <div className="flex gap-1 rounded-lg p-1" style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}>
          {([["today", "Hoje"], ["7d", "7 dias"], ["30d", "30 dias"]] as [Period, string][]).map(([k, l]) => (
            <button key={k} onClick={() => setPeriod(k)}
              className="px-3 py-1 text-xs rounded-md font-medium transition-colors"
              style={period === k ? { backgroundColor: "hsl(142.1, 71.8%, 45.3%)", color: "#fff" } : { color: "#999" }}
            >{l}</button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map(k => {
          const Icon = k.icon;
          const val = k.label === "Ticket Médio" || k.label === "Custo por Compra" ? k.base : k.base * m;
          return (
            <div key={k.label} className="rounded-lg p-4" style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}>
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} style={{ color: k.color }} />
                <span className="text-[11px] text-muted-foreground">{k.label}</span>
              </div>
              <p className="text-xl font-bold text-foreground">{k.format(val)}</p>
            </div>
          );
        })}
      </div>

      {/* Campanhas */}
      <div className="rounded-lg" style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "#2a2a2a" }}>
          <span className="text-sm font-bold text-foreground">Campanhas</span>
          <Button size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90" onClick={() => setShowModal(true)}>
            <Plus size={14} /> Nova Campanha
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2a2a" }}>
                {["Campanha", "Investimento", "Conversas", "Vendas", "Faturamento", "Ticket Médio", "Custo/Compra", "ROAS"].map(h => (
                  <th key={h} className="px-4 py-2 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => (
                <tr key={i} className="transition-colors" style={{ borderBottom: "1px solid #2a2a2a" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#222")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <td className="px-4 py-2.5 text-foreground font-medium">{campaignsBase[i].name}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{fmt(c.investment)}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{c.conversas}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{c.vendas}</td>
                  <td className="px-4 py-2.5 text-foreground font-medium">{fmt(c.faturamento)}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{fmt(c.ticket)}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{fmtDec(c.custoCompra)}</td>
                  <td className="px-4 py-2.5">{roasBadge(campaignsBase[i].roas)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "1px solid #2a2a2a" }}>
                <td className="px-4 py-2.5 text-foreground font-bold">Total</td>
                <td className="px-4 py-2.5 text-foreground font-bold">{fmt(totals.investment)}</td>
                <td className="px-4 py-2.5 text-foreground font-bold">{totals.conversas}</td>
                <td className="px-4 py-2.5 text-foreground font-bold">{totals.vendas}</td>
                <td className="px-4 py-2.5 text-foreground font-bold">{fmt(totals.faturamento)}</td>
                <td className="px-4 py-2.5" />
                <td className="px-4 py-2.5" />
                <td className="px-4 py-2.5" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Vendas Identificadas */}
      <div className="rounded-lg" style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "#2a2a2a" }}>
          <span className="text-sm font-bold text-foreground">Vendas Identificadas</span>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            <Download size={14} /> Exportar CSV
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2a2a" }}>
                {["Data/Hora", "Nome", "Telefone", "Campanha", "Valor", "Confiança IA", "Pixel", ""].map(h => (
                  <th key={h} className="px-4 py-2 text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {salesBase.map((s, i) => (
                <tr key={i} className="transition-colors" style={{ borderBottom: "1px solid #2a2a2a" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#222")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <td className="px-4 py-2.5 text-muted-foreground">{s.date}</td>
                  <td className="px-4 py-2.5 text-foreground">{s.name}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{s.phone}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{s.campaign}</td>
                  <td className="px-4 py-2.5 text-foreground font-medium">{fmtDec(s.valor * m)}</td>
                  <td className="px-4 py-2.5">{confBadge(s.confianca)}</td>
                  <td className="px-4 py-2.5">{s.pixel ? <span style={{ color: "#22c55e" }}>✅</span> : <span style={{ color: "#ef4444" }}>❌</span>}</td>
                  <td className="px-4 py-2.5">
                    <Button variant="outline" size="sm" className="h-6 text-[10px] px-2" onClick={() => toast("Marcado como venda!")}>
                      Marcar como venda
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nova Campanha */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md" style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}>
          <DialogHeader>
            <DialogTitle className="text-foreground">Nova Campanha</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">Nome da campanha</Label>
              <Input className="mt-1 h-8 text-xs bg-background" value={campaignName} onChange={e => setCampaignName(e.target.value)} placeholder="Ex: Páscoa 2024" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Parâmetro ref</Label>
              <Input className="mt-1 h-8 text-xs bg-background" value={ref} readOnly />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Link gerado</Label>
              <div className="flex gap-1 mt-1">
                <Input className="h-8 text-xs bg-background flex-1" value={ref ? link : ""} readOnly />
                <button onClick={() => { navigator.clipboard.writeText(link); toast("Link copiado!"); }}
                  className="h-8 w-8 flex items-center justify-center rounded-md border border-border bg-background hover:bg-accent">
                  <Copy size={14} className="text-muted-foreground" />
                </button>
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Investimento total</Label>
              <Input className="mt-1 h-8 text-xs bg-background" type="number" value={investment} onChange={e => setInvestment(e.target.value)} placeholder="R$ 0,00" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">Data início</Label>
                <Input className="mt-1 h-8 text-xs bg-background" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Data fim</Label>
                <Input className="mt-1 h-8 text-xs bg-background" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button size="sm" className="text-xs" style={{ backgroundColor: "#f97316" }} onClick={() => { setShowModal(false); toast("Campanha criada!"); setCampaignName(""); setInvestment(""); setStartDate(""); setEndDate(""); }}>
                Criar Campanha
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AtribuicaoPage;
