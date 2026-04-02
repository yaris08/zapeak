import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Users, DollarSign, TrendingUp, MessageCircle, Eye, Download, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const contacts = [
  { id: "1", name: "João Silva", initial: "J", phone: "(11) 98765-4321", wa: "https://wa.me/5511987654321", tags: ["pago", "cliente"], instance: "Principal", lastContact: "Hoje 14:32", status: "Pagou", conversations: 12, firstContact: "15/01/2025", flows: ["Boas-vindas", "Qualificação de Lead"] },
  { id: "2", name: "Maria Souza", initial: "M", phone: "(11) 91234-5678", wa: "https://wa.me/5511912345678", tags: ["lead"], instance: "Vendas", lastContact: "Hoje 13:15", status: "Não pagou", conversations: 3, firstContact: "20/02/2025", flows: ["Boas-vindas"] },
  { id: "3", name: "Carlos Lima", initial: "C", phone: "(11) 99876-5432", wa: "https://wa.me/5511998765432", tags: ["suporte"], instance: "Suporte", lastContact: "Hoje 12:40", status: "Não pagou", conversations: 7, firstContact: "10/03/2025", flows: ["Suporte Automático"] },
  { id: "4", name: "Ana Paula", initial: "A", phone: "(11) 92345-6789", wa: "https://wa.me/5511923456789", tags: ["pago"], instance: "Principal", lastContact: "Hoje 11:22", status: "Pagou", conversations: 5, firstContact: "05/01/2025", flows: ["Boas-vindas", "Qualificação de Lead"] },
  { id: "5", name: "Pedro Costa", initial: "P", phone: "(11) 98123-4567", wa: "https://wa.me/5511981234567", tags: ["lead"], instance: "Vendas", lastContact: "Ontem 22:05", status: "Não pagou", conversations: 2, firstContact: "25/03/2025", flows: ["Boas-vindas"] },
  { id: "6", name: "Fernanda Reis", initial: "F", phone: "(11) 93456-7890", wa: "https://wa.me/5511934567890", tags: ["cliente", "pago"], instance: "Principal", lastContact: "Ontem 18:30", status: "Pagou", conversations: 18, firstContact: "01/12/2024", flows: ["Boas-vindas", "Qualificação de Lead", "Suporte Automático"] },
  { id: "7", name: "Ricardo Melo", initial: "R", phone: "(11) 94567-8901", wa: "https://wa.me/5511945678901", tags: ["lead"], instance: "Vendas", lastContact: "Ontem 15:20", status: "Não pagou", conversations: 1, firstContact: "28/03/2025", flows: ["Boas-vindas"] },
  { id: "8", name: "Juliana Neves", initial: "J", phone: "(11) 95678-9012", wa: "https://wa.me/5511956789012", tags: ["pago"], instance: "Suporte", lastContact: "Ontem 10:45", status: "Pagou", conversations: 9, firstContact: "14/02/2025", flows: ["Boas-vindas", "Suporte Automático"] },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  pago: { bg: "#22c55e20", text: "#22c55e" },
  lead: { bg: "#3b82f620", text: "#3b82f6" },
  suporte: { bg: "#eab30820", text: "#eab308" },
  cliente: { bg: "#a855f720", text: "#a855f7" },
};

type Contact = typeof contacts[0];

const ContatosPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("all");
  const [instanceFilter, setInstanceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
      const matchTag = tagFilter === "all" || c.tags.includes(tagFilter);
      const matchInstance = instanceFilter === "all" || c.instance === instanceFilter;
      const matchStatus = statusFilter === "all" || (statusFilter === "pagou" ? c.status === "Pagou" : c.status === "Não pagou");
      return matchSearch && matchTag && matchInstance && matchStatus;
    });
  }, [search, tagFilter, instanceFilter, statusFilter]);

  const clearFilters = () => {
    setSearch("");
    setTagFilter("all");
    setInstanceFilter("all");
    setStatusFilter("all");
  };

  return (
    <div className="p-3 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Contatos</h1>
          <p className="text-sm text-[#9ca3af] mt-1">Todos os leads que interagiram com seu WhatsApp</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2a2a2a] text-[#9ca3af] text-sm hover:bg-[#222] transition-colors">
          <Download size={14} /> Exportar CSV
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou número..."
            className="pl-9 bg-[#1a1a1a] border-[#2a2a2a] text-white text-sm h-9"
          />
        </div>
        <Select value={tagFilter} onValueChange={setTagFilter}>
          <SelectTrigger className="w-[140px] bg-[#1a1a1a] border-[#2a2a2a] text-white text-sm h-9">
            <SelectValue placeholder="Etiqueta" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="pago">Pago</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="suporte">Suporte</SelectItem>
            <SelectItem value="cliente">Cliente</SelectItem>
          </SelectContent>
        </Select>
        <Select value={instanceFilter} onValueChange={setInstanceFilter}>
          <SelectTrigger className="w-[140px] bg-[#1a1a1a] border-[#2a2a2a] text-white text-sm h-9">
            <SelectValue placeholder="Instância" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Principal">Principal</SelectItem>
            <SelectItem value="Vendas">Vendas</SelectItem>
            <SelectItem value="Suporte">Suporte</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px] bg-[#1a1a1a] border-[#2a2a2a] text-white text-sm h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pagou">Pagou</SelectItem>
            <SelectItem value="nao_pagou">Não pagou</SelectItem>
          </SelectContent>
        </Select>
        <button onClick={clearFilters} className="text-[#9ca3af] text-sm hover:text-white transition-colors">
          Limpar filtros
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total de Contatos", value: "1.247", icon: Users, color: "#3b82f6" },
          { label: "Pagaram", value: "312", icon: DollarSign, color: "#22c55e" },
          { label: "Taxa de conversão", value: "25%", icon: TrendingUp, color: "#f97316" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${kpi.color}20` }}>
              <kpi.icon size={18} color={kpi.color} />
            </div>
            <div>
              <div className="text-xs text-[#9ca3af]">{kpi.label}</div>
              <div className="text-xl font-bold text-white">{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabela */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                <th className="px-4 py-3 text-left text-[10px] font-medium text-[#9ca3af] uppercase tracking-wider"></th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-[#9ca3af] uppercase tracking-wider">NOME</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-[#9ca3af] uppercase tracking-wider">TELEFONE</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-[#9ca3af] uppercase tracking-wider">ETIQUETAS</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-[#9ca3af] uppercase tracking-wider hidden md:table-cell">INSTÂNCIA</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-[#9ca3af] uppercase tracking-wider hidden md:table-cell">ÚLTIMO CONTATO</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-[#9ca3af] uppercase tracking-wider">STATUS</th>
                <th className="px-4 py-3 text-left text-[10px] font-medium text-[#9ca3af] uppercase tracking-wider">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-[#2a2a2a] hover:bg-[#222] transition-colors">
                  <td className="px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white text-xs font-medium">{c.initial}</div>
                  </td>
                  <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                  <td className="px-4 py-3">
                    <a href={c.wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5" style={{ color: "#22c55e", fontSize: "12px", textDecoration: "none" }}>
                      <MessageCircle size={12} />{c.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5 flex-wrap">
                      {c.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: tagColors[t]?.bg, color: tagColors[t]?.text }}>{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#9ca3af] text-xs hidden md:table-cell">{c.instance}</td>
                  <td className="px-4 py-3 text-[#9ca3af] text-xs hidden md:table-cell">{c.lastContact}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${c.status === "Pagou" ? "bg-[#22c55e20] text-[#22c55e]" : "bg-[#9ca3af20] text-[#9ca3af]"}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a href={c.wa} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded hover:bg-[#2a2a2a] transition-colors">
                        <MessageCircle size={14} color="#22c55e" />
                      </a>
                      <button onClick={() => setSelectedContact(c)} className="p-1.5 rounded hover:bg-[#2a2a2a] transition-colors">
                        <Eye size={14} color="#9ca3af" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#2a2a2a]">
          <span className="text-xs text-[#9ca3af]">Mostrando {filtered.length} de 1.247 contatos</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded text-xs text-[#9ca3af] hover:bg-[#2a2a2a] transition-colors">Anterior</button>
            {[1, 2, 3].map((p) => (
              <button key={p} className={`px-3 py-1.5 rounded text-xs transition-colors ${p === 1 ? "bg-[#22c55e] text-white" : "text-[#9ca3af] hover:bg-[#2a2a2a]"}`}>{p}</button>
            ))}
            <span className="text-[#9ca3af] text-xs px-1">...</span>
            <button className="px-3 py-1.5 rounded text-xs text-[#9ca3af] hover:bg-[#2a2a2a] transition-colors">Próximo</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Detalhes do Contato</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white text-xl font-bold">{selectedContact.initial}</div>
                <div>
                  <div className="font-semibold text-lg">{selectedContact.name}</div>
                  <a href={selectedContact.wa} target="_blank" rel="noopener noreferrer" style={{ color: "#22c55e", fontSize: "13px", textDecoration: "none" }}>{selectedContact.phone}</a>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#9ca3af]">Etiquetas</span>
                  <div className="flex gap-1.5">
                    {selectedContact.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: tagColors[t]?.bg, color: tagColors[t]?.text }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9ca3af]">Instância</span>
                  <span className="text-white">{selectedContact.instance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9ca3af]">Status</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${selectedContact.status === "Pagou" ? "bg-[#22c55e20] text-[#22c55e]" : "bg-[#9ca3af20] text-[#9ca3af]"}`}>{selectedContact.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9ca3af]">Histórico</span>
                  <span className="text-white">{selectedContact.conversations} conversas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9ca3af]">Primeiro contato</span>
                  <span className="text-white">{selectedContact.firstContact}</span>
                </div>
                <div>
                  <span className="text-[#9ca3af] text-xs">Fluxos que passou</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {selectedContact.flows.map((f) => (
                      <span key={f} className="px-2 py-0.5 rounded text-[10px] bg-[#2a2a2a] text-[#9ca3af]">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={() => { setSelectedContact(null); navigate("/atendimento"); }} className="flex-1 px-4 py-2 rounded-lg bg-[#22c55e] text-white text-sm font-medium hover:bg-[#22c55e]/90 transition-colors">
                  Abrir no Atendimento
                </button>
                <button onClick={() => setSelectedContact(null)} className="px-4 py-2 rounded-lg border border-[#2a2a2a] text-[#9ca3af] text-sm hover:bg-[#222] transition-colors">
                  Fechar
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContatosPage;
