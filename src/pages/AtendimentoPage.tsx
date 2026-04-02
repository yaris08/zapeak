import React, { useState, useRef, useEffect } from "react";
import { Search, Send, Paperclip, Mic, Phone, Tag, Clock, ArrowRight, CheckCircle, Plus, StopCircle, Play, DollarSign, Bot } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface Message {
  id: number;
  sender: "bot" | "contact" | "agent" | "system";
  text: string;
  time: string;
  audio?: { duration: string };
}

interface Contact {
  name: string;
  phone: string;
  lastMsg: string;
  time: string;
  unread: number;
  badge?: { label: string; color: string };
  messages: Message[];
  tags: { label: string; color: string }[];
  history: { convos: number; firstContact: string; flow: string };
}

const contacts: Contact[] = [
  {
    name: "João Silva",
    phone: "(11) 9xxxx-1234",
    lastMsg: "Acabei de fazer o pix!",
    time: "14:32",
    unread: 2,
    badge: { label: "pago", color: "bg-green-500/20 text-green-400" },
    tags: [
      { label: "pago", color: "bg-green-500/20 text-green-400" },
      { label: "cliente", color: "bg-blue-500/20 text-blue-400" },
    ],
    history: { convos: 3, firstContact: "01/04/2026", flow: "Boas-vindas" },
    messages: [
      { id: 1, sender: "bot", text: "Olá João! 👋 Bem-vindo. Como posso te ajudar?", time: "14:20" },
      { id: 2, sender: "contact", text: "Quero comprar o produto", time: "14:21" },
      { id: 3, sender: "bot", text: "Perfeito! O valor é R$ 97,00. Vou te enviar a chave PIX.", time: "14:21" },
      { id: 4, sender: "bot", text: "Chave PIX: 11999999999", time: "14:22" },
      { id: 5, sender: "contact", text: "Paguei! Segue o comprovante 📎", time: "14:31" },
      { id: 6, sender: "system", text: "✅ Pagamento de R$ 97,00 identificado pela IA (94% confiança)", time: "14:32" },
      { id: 7, sender: "bot", text: "✅ Pagamento confirmado! Obrigado João!", time: "14:32" },
      { id: 8, sender: "agent", text: "Olá João! Vi que você pagou. Vou processar seu pedido agora.", time: "14:35" },
    ],
  },
  {
    name: "Maria Souza",
    phone: "(11) 9xxxx-5678",
    lastMsg: "Qual o prazo de entrega?",
    time: "14:15",
    unread: 1,
    badge: { label: "lead", color: "bg-blue-500/20 text-blue-400" },
    tags: [{ label: "lead", color: "bg-blue-500/20 text-blue-400" }],
    history: { convos: 1, firstContact: "02/04/2026", flow: "Qualificação" },
    messages: [
      { id: 1, sender: "bot", text: "Olá Maria! Como posso ajudar?", time: "14:10" },
      { id: 2, sender: "contact", text: "Qual o prazo de entrega?", time: "14:15" },
    ],
  },
  {
    name: "Carlos Lima",
    phone: "(11) 9xxxx-9012",
    lastMsg: "Olá, tudo bem?",
    time: "13:40",
    unread: 0,
    tags: [],
    history: { convos: 2, firstContact: "28/03/2026", flow: "Suporte" },
    messages: [
      { id: 1, sender: "contact", text: "Olá, tudo bem?", time: "13:40" },
    ],
  },
  {
    name: "Ana Paula",
    phone: "(11) 9xxxx-3456",
    lastMsg: "Quero saber mais sobre...",
    time: "13:22",
    unread: 0,
    badge: { label: "pago", color: "bg-green-500/20 text-green-400" },
    tags: [{ label: "pago", color: "bg-green-500/20 text-green-400" }],
    history: { convos: 5, firstContact: "15/03/2026", flow: "Boas-vindas" },
    messages: [
      { id: 1, sender: "contact", text: "Quero saber mais sobre o curso", time: "13:22" },
    ],
  },
  {
    name: "Pedro Costa",
    phone: "(11) 9xxxx-7890",
    lastMsg: "Não recebi o produto",
    time: "12:05",
    unread: 3,
    badge: { label: "suporte", color: "bg-yellow-500/20 text-yellow-400" },
    tags: [{ label: "suporte", color: "bg-yellow-500/20 text-yellow-400" }],
    history: { convos: 4, firstContact: "20/03/2026", flow: "Suporte Automático" },
    messages: [
      { id: 1, sender: "contact", text: "Não recebi o produto", time: "12:05" },
    ],
  },
  {
    name: "Fernanda Reis",
    phone: "(11) 9xxxx-4321",
    lastMsg: "Obrigada!",
    time: "11:30",
    unread: 0,
    tags: [],
    history: { convos: 1, firstContact: "02/04/2026", flow: "Pesquisa" },
    messages: [
      { id: 1, sender: "contact", text: "Obrigada!", time: "11:30" },
    ],
  },
];

const tabs = [
  { key: "todas", label: "Todas" },
  { key: "aguardando", label: "Aguardando" },
  { key: "resolvidas", label: "Resolvidas" },
] as const;

const mockFlows = [
  { name: "Boas-vindas", trigger: "Palavra-chave", sessions: 245 },
  { name: "Qualificação Lead", trigger: "Palavra-chave", sessions: 89 },
  { name: "Suporte Automático", trigger: "Horário", sessions: 67 },
  { name: "Recuperação Carrinho", trigger: "Horário", sessions: 34 },
];

const campaigns = ["Páscoa 2024", "Black Friday", "Lead Quente", "Sem campanha"];

const AtendimentoPage: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<"todas" | "aguardando" | "resolvidas">("todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessages, setChatMessages] = useState<Record<number, Message[]>>(
    Object.fromEntries(contacts.map((c, i) => [i, [...c.messages]]))
  );
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // New states
  const [showFlowModal, setShowFlowModal] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<number | null>(null);
  const [showStopModal, setShowStopModal] = useState(false);
  const [activeFlow, setActiveFlow] = useState<string | null>("Boas-vindas");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentValue, setPaymentValue] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const [paymentCampaign, setPaymentCampaign] = useState("");
  const [contactTags, setContactTags] = useState<Record<number, { label: string; color: string }[]>>(
    Object.fromEntries(contacts.map((c, i) => [i, [...c.tags]]))
  );

  const selected = contacts[selectedIdx];
  const currentMessages = chatMessages[selectedIdx] || [];
  const currentTags = contactTags[selectedIdx] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages.length]);

  const getNow = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  };

  const addSystemMessage = (text: string) => {
    setChatMessages((prev) => ({
      ...prev,
      [selectedIdx]: [
        ...(prev[selectedIdx] || []),
        { id: Date.now(), sender: "system", text, time: getNow() },
      ],
    }));
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setChatMessages((prev) => ({
      ...prev,
      [selectedIdx]: [
        ...(prev[selectedIdx] || []),
        { id: Date.now(), sender: "agent", text, time: getNow() },
      ],
    }));
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleStartFlow = () => {
    if (selectedFlow === null) return;
    const flow = mockFlows[selectedFlow];
    setActiveFlow(flow.name);
    toast.success(`✓ Fluxo disparado para ${selected.name}`);
    addSystemMessage(`🤖 Fluxo '${flow.name}' iniciado manualmente`);
    setShowFlowModal(false);
    setSelectedFlow(null);
  };

  const handleStopFlow = () => {
    setActiveFlow(null);
    toast.success("✓ Fluxo pausado");
    addSystemMessage("⏹ Fluxo interrompido manualmente");
    setShowStopModal(false);
  };

  const handlePayment = () => {
    const val = paymentValue.trim();
    if (!val) return;
    const formatted = parseFloat(val).toFixed(2).replace(".", ",");
    toast.success(`✓ Pagamento de R$ ${formatted} registrado`);
    addSystemMessage(`💰 Pagamento de R$ ${formatted} registrado manualmente`);
    // Add "pago" tag if not present
    const tags = contactTags[selectedIdx] || [];
    if (!tags.some((t) => t.label === "pago")) {
      setContactTags((prev) => ({
        ...prev,
        [selectedIdx]: [...(prev[selectedIdx] || []), { label: "pago", color: "bg-green-500/20 text-green-400" }],
      }));
    }
    setShowPaymentModal(false);
    setPaymentValue("");
    setPaymentNote("");
    setPaymentCampaign("");
  };

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-56px)] bg-[#0f0f0f]">
      {/* Left — Contact List */}
      <div className="w-[280px] min-w-[280px] border-r border-[#2a2a2a] flex flex-col">
        <div className="p-4 space-y-3">
          <h1 className="text-lg font-bold text-foreground">Atendimento</h1>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md pl-8 pr-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
            />
          </div>
          <div className="flex gap-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex-1 text-xs py-1.5 border-b-2 transition-colors ${
                  activeTab === t.key
                    ? "border-[#22c55e] text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((c, i) => {
            const realIdx = contacts.indexOf(c);
            const tags = contactTags[realIdx] || [];
            const hasPago = tags.some((t) => t.label === "pago");
            const displayBadge = hasPago
              ? { label: "pago", color: "bg-green-500/20 text-green-400" }
              : c.badge;
            return (
              <button
                key={i}
                onClick={() => setSelectedIdx(realIdx)}
                className={`w-full flex items-start gap-3 px-4 py-3 border-b border-[#2a2a2a] text-left transition-colors ${
                  realIdx === selectedIdx
                    ? "bg-[#1a1a1a] border-l-2 border-l-[#22c55e]"
                    : "hover:bg-[#1f1f1f] border-l-2 border-l-transparent"
                }`}
              >
                <div className="w-9 h-9 min-w-[36px] rounded-full bg-[#2a2a2a] flex items-center justify-center text-sm font-semibold text-foreground">
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground truncate">{c.name}</span>
                    <span className="text-[10px] text-muted-foreground ml-2 shrink-0">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMsg}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {displayBadge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${displayBadge.color}`}>
                        {displayBadge.label}
                      </span>
                    )}
                    {c.unread > 0 && (
                      <span className="ml-auto w-5 h-5 rounded-full bg-[#22c55e] text-[10px] font-bold flex items-center justify-center text-white">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Center — Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="px-4 py-3 border-b border-[#2a2a2a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center text-sm font-semibold text-foreground">
                {selected.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{selected.name}</span>
                  {selected.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selected.badge.color}`}>
                      {selected.badge.label}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{selected.phone}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1.5 rounded-md border border-[#2a2a2a] text-muted-foreground hover:text-foreground transition-colors">
                Transferir
              </button>
              {activeFlow && (
                <button
                  onClick={() => setShowStopModal(true)}
                  className="text-xs px-3 py-1.5 rounded-md border border-[#2a2a2a] text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                >
                  <StopCircle size={12} /> Parar Fluxo
                </button>
              )}
              <button className="text-xs px-3 py-1.5 rounded-md bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors">
                Resolver
              </button>
            </div>
          </div>
          {/* Active flow indicator */}
          <div className="flex items-center gap-1.5 mt-1.5 ml-12">
            <Bot size={12} className={activeFlow ? "text-[#22c55e]" : "text-gray-500"} />
            <span className="text-[11px] text-muted-foreground">
              {activeFlow ? `Fluxo ativo: ${activeFlow}` : "Sem fluxo ativo"}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentMessages.map((msg, index) => {
            const prevMsg = index > 0 ? currentMessages[index - 1] : null;
            const showLabel = prevMsg?.sender !== msg.sender;

            if (msg.sender === "system") {
              return (
                <div key={msg.id} className="flex justify-center mb-3">
                  <span className="text-[11px] text-muted-foreground italic bg-[#1a1a1a] px-3 py-1 rounded-full">
                    {msg.text}
                  </span>
                </div>
              );
            }

            if (msg.sender === "contact") {
              return (
                <div key={msg.id} className="flex items-start gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[11px] font-bold text-foreground shrink-0 mt-0.5">
                    {selected.name.charAt(0)}
                  </div>
                  <div>
                    {showLabel && (
                      <span className="text-[10px] text-muted-foreground font-medium mb-0.5 block">{selected.name.split(" ")[0]}</span>
                    )}
                    <div className="bg-[#2a2a2a] text-foreground max-w-xs lg:max-w-md rounded-2xl rounded-tl-sm px-3 py-2 text-sm">
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 block">{msg.time}</span>
                  </div>
                </div>
              );
            }

            if (msg.sender === "bot") {
              return (
                <div key={msg.id} className="flex items-start gap-2 mb-3">
                  <div className="w-7 shrink-0" />
                  <div>
                    {showLabel && (
                      <span className="text-[10px] text-[#22c55e] font-medium mb-0.5 block">Bot</span>
                    )}
                    <div className="bg-[#1e2a1e] text-foreground max-w-xs lg:max-w-md rounded-2xl rounded-tl-sm px-3 py-2 text-sm">
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 block">{msg.time}</span>
                  </div>
                </div>
              );
            }

            // agent
            return (
              <div key={msg.id} className="flex items-start justify-end gap-2 mb-3">
                <div className="flex flex-col items-end">
                  <div className="bg-[#22c55e]/20 border border-[#22c55e]/30 text-foreground max-w-xs lg:max-w-md rounded-2xl rounded-tr-sm px-3 py-2 text-sm">
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1">{msg.time}</span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-[#2a2a2a]">
          <div className="flex items-end gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite uma mensagem..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none min-h-[24px] max-h-[96px]"
            />
            <div className="flex items-center gap-1 shrink-0">
              <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <Paperclip size={16} />
              </button>
              <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <Mic size={16} />
              </button>
              <button
                onClick={handleSend}
                className="p-1.5 bg-[#22c55e] rounded-lg text-white hover:bg-[#16a34a] transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Profile */}
      <div className="w-[260px] min-w-[260px] border-l border-[#2a2a2a] overflow-y-auto">
        <div className="p-4 space-y-5">
          <h2 className="text-sm font-semibold text-foreground">Perfil do Contato</h2>

          {/* Avatar + Info */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#2a2a2a] flex items-center justify-center text-2xl font-bold text-foreground">
              {selected.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{selected.name}</p>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Phone size={10} /> {selected.phone}
              </p>
            </div>
            {selected.badge && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${selected.badge.color}`}>
                {selected.badge.label}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Etiquetas</h3>
            <div className="flex flex-wrap gap-1.5">
              {currentTags.map((t, i) => (
                <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full ${t.color}`}>
                  {t.label}
                </span>
              ))}
              <button className="text-[10px] px-2 py-0.5 rounded-full border border-[#2a2a2a] text-muted-foreground hover:text-foreground flex items-center gap-0.5 transition-colors">
                <Plus size={8} /> Adicionar
              </button>
            </div>
          </div>

          {/* History */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Histórico</h3>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p className="flex items-center gap-1.5"><Clock size={10} /> {selected.history.convos} conversas anteriores</p>
              <p className="flex items-center gap-1.5"><Tag size={10} /> Primeiro contato: {selected.history.firstContact}</p>
              <p className="flex items-center gap-1.5"><ArrowRight size={10} /> Fluxo: {selected.history.flow}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={() => { setSelectedFlow(null); setShowFlowModal(true); }}
              className="w-full text-xs py-2 rounded-md border border-[#2a2a2a] text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5"
            >
              <Play size={12} /> Iniciar Fluxo
            </button>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="w-full text-xs py-2 rounded-md border border-[#22c55e]/40 text-green-400 hover:text-green-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <DollarSign size={12} /> Marcar como Pago
            </button>
            <button className="w-full text-xs py-2 rounded-md bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors flex items-center justify-center gap-1.5">
              <CheckCircle size={12} /> Marcar como Resolvido
            </button>
          </div>
        </div>
      </div>

      {/* Modal — Iniciar Fluxo */}
      <Dialog open={showFlowModal} onOpenChange={setShowFlowModal}>
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle>Iniciar Fluxo</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Selecione qual fluxo disparar para {selected.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            {mockFlows.map((f, i) => (
              <button
                key={i}
                onClick={() => setSelectedFlow(i)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                  selectedFlow === i
                    ? "border-[#22c55e] bg-[#1a2a1a]"
                    : "border-[#2a2a2a] hover:border-[#3a3a3a]"
                }`}
              >
                <Play size={16} className="text-[#22c55e] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{f.name}</p>
                  <p className="text-[11px] text-muted-foreground">{f.trigger} | {f.sessions} sessões</p>
                </div>
              </button>
            ))}
          </div>
          <DialogFooter className="gap-2">
            <button
              onClick={() => setShowFlowModal(false)}
              className="text-xs px-4 py-2 rounded-md border border-[#2a2a2a] text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleStartFlow}
              disabled={selectedFlow === null}
              className="text-xs px-4 py-2 rounded-md bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors disabled:opacity-40"
            >
              Disparar Fluxo
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal — Parar Fluxo */}
      <AlertDialog open={showStopModal} onOpenChange={setShowStopModal}>
        <AlertDialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-foreground">
          <AlertDialogHeader>
            <AlertDialogTitle>Parar Fluxo</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Tem certeza que deseja parar o fluxo ativo desta conversa?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-[#2a2a2a] text-muted-foreground hover:text-foreground hover:bg-[#2a2a2a]">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleStopFlow}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Parar Fluxo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal — Marcar como Pago */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-foreground max-w-sm">
          <DialogHeader>
            <DialogTitle>Registrar Pagamento</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Registre o pagamento manualmente para {selected.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Valor pago</label>
              <input
                type="number"
                value={paymentValue}
                onChange={(e) => setPaymentValue(e.target.value)}
                placeholder="R$ 0,00"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Observação</label>
              <input
                type="text"
                value={paymentNote}
                onChange={(e) => setPaymentNote(e.target.value)}
                placeholder="Ex: PIX confirmado"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Campanha</label>
              <select
                value={paymentCampaign}
                onChange={(e) => setPaymentCampaign(e.target.value)}
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              >
                <option value="">Selecione...</option>
                {campaigns.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="text-xs px-4 py-2 rounded-md border border-[#2a2a2a] text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handlePayment}
              disabled={!paymentValue.trim()}
              className="text-xs px-4 py-2 rounded-md bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors disabled:opacity-40"
            >
              Confirmar Pagamento
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AtendimentoPage;
