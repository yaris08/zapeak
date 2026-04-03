import React, { useState } from "react";
import { Smartphone, Wifi, WifiOff, QrCode, Plus, MoreVertical, MessageSquare, RefreshCw, Trash2, Edit, Eye } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface Instance {
  id: string;
  name: string;
  number: string;
  status: "connected" | "standby";
  sessions: number;
  errors: number;
  lastActivity: string;
  type: string;
}

const mockInstances: Instance[] = [
  { id: "1", name: "Principal", number: "(11) 99999-0001", status: "connected", sessions: 245, errors: 0, lastActivity: "Agora", type: "Principal" },
  { id: "2", name: "Vendas", number: "(11) 99999-0002", status: "connected", sessions: 89, errors: 2, lastActivity: "2 min atrás", type: "Vendas" },
  { id: "3", name: "Suporte", number: "(11) 99999-0003", status: "standby", sessions: 0, errors: 0, lastActivity: "Há 3 dias", type: "Suporte" },
];

const typeOptions = ["Principal", "Vendas", "Suporte", "Marketing", "Outro"];

const KpiCard = ({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) => (
  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 flex items-center gap-2 min-w-0 overflow-hidden">
    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
      <Icon size={16} />
    </div>
    <div className="min-w-0 flex-1 overflow-hidden">
      <p className="text-xl md:text-2xl font-bold text-foreground truncate">{value}</p>
      <p className="text-[10px] md:text-xs text-muted-foreground leading-tight">{label}</p>
    </div>
  </div>
);

const InstanciasPage: React.FC = () => {
  const navigate = useNavigate();
  const [showNewModal, setShowNewModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrInstance, setQrInstance] = useState<Instance | null>(null);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newType, setNewType] = useState("");

  const connected = mockInstances.filter((i) => i.status === "connected").length;
  const standby = mockInstances.filter((i) => i.status === "standby").length;

  const handleCreate = () => {
    if (!newName.trim()) return;
    toast.success("✓ Instância criada! Escaneie o QR Code.");
    setShowNewModal(false);
    setNewName("");
    setNewDesc("");
    setNewType("");
  };

  const openQr = (inst: Instance) => {
    setQrInstance(inst);
    setShowQrModal(true);
  };

  return (
    <div className="p-3 md:p-6 space-y-6 bg-[#0f0f0f] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Instâncias</h1>
          <p className="text-sm text-muted-foreground">Gerencie seus números de WhatsApp</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22c55e] text-white text-sm font-medium hover:bg-[#16a34a] transition-colors"
        >
          <Plus size={16} /> Nova Instância
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard icon={Smartphone} label="Total de Instâncias" value={mockInstances.length} color="bg-blue-500/20 text-blue-400" />
        <KpiCard icon={Wifi} label="Conectadas" value={connected} color="bg-green-500/20 text-green-400" />
        <KpiCard icon={WifiOff} label="Em Standby" value={standby} color="bg-yellow-500/20 text-yellow-400" />
      </div>

      {/* Instance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockInstances.map((inst) => (
          <div
            key={inst.id}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5 hover:border-[#3a3a3a] transition-colors space-y-4"
          >
            {/* Top: badge + menu */}
            <div className="flex items-center justify-between">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  inst.status === "connected"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {inst.status === "connected" ? "Conectada" : "Standby"}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <DropdownMenuItem className="text-xs gap-2 text-foreground hover:bg-[#2a2a2a] cursor-pointer">
                    <Edit size={12} /> Renomear
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openQr(inst)} className="text-xs gap-2 text-foreground hover:bg-[#2a2a2a] cursor-pointer">
                    <QrCode size={12} /> Ver QR Code
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs gap-2 text-foreground hover:bg-[#2a2a2a] cursor-pointer">
                    <RefreshCw size={12} /> Reiniciar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs gap-2 text-red-400 hover:bg-[#2a2a2a] cursor-pointer">
                    <Trash2 size={12} /> Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Icon + info */}
            <div className="flex flex-col items-center text-center space-y-2">
              <MessageSquare
                size={36}
                className={inst.status === "connected" ? "text-[#22c55e]" : "text-gray-500"}
              />
              <div>
                <p className="text-sm font-bold text-foreground">{inst.name}</p>
                <p className="text-xs text-muted-foreground">{inst.number}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>
                {inst.sessions} sessões hoje
                {inst.errors > 0 && <span className="text-red-400"> | {inst.errors} erros</span>}
              </p>
              <p>Última atividade: {inst.lastActivity}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/atendimento")}
                className="flex-1 text-xs py-2 rounded-md border border-[#2a2a2a] text-muted-foreground hover:text-foreground transition-colors"
              >
                Ver Conversas
              </button>
              {inst.status === "connected" ? (
                <button className="flex-1 text-xs py-2 rounded-md border border-red-500/30 text-red-400 hover:text-red-300 transition-colors">
                  Desconectar
                </button>
              ) : (
                <>
                  <button className="flex-1 text-xs py-2 rounded-md bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors">
                    Conectar
                  </button>
                  <button className="text-xs py-2 px-3 rounded-md border border-red-500/30 text-red-400 hover:text-red-300 transition-colors">
                    Excluir
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal — Nova Instância */}
      <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle>Nova Instância</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Crie uma nova instância de WhatsApp
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Nome da instância</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex: Vendas, Suporte..."
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Descrição (opcional)</label>
              <input
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Descrição da instância..."
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Tipo de uso</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              >
                <option value="">Selecione...</option>
                {typeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3 text-xs text-blue-300">
              Após criar, você receberá um QR Code para escanear e conectar o número de WhatsApp desejado.
            </div>
          </div>
          <DialogFooter className="gap-2">
            <button
              onClick={() => setShowNewModal(false)}
              className="text-xs px-4 py-2 rounded-md border border-[#2a2a2a] text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreate}
              disabled={!newName.trim()}
              className="text-xs px-4 py-2 rounded-md bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors disabled:opacity-40"
            >
              Criar Instância
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal — QR Code */}
      <Dialog open={showQrModal} onOpenChange={setShowQrModal}>
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-foreground max-w-sm">
          <DialogHeader>
            <DialogTitle>Conectar {qrInstance?.name}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Escaneie o QR Code com seu WhatsApp
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="w-[200px] h-[200px] bg-[#0f0f0f] border-2 border-dashed border-[#2a2a2a] rounded-lg flex items-center justify-center">
              <QrCode size={64} className="text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Abra o WhatsApp → Dispositivos conectados → Conectar dispositivo → Escaneie este QR Code
            </p>
            <span className="text-xs text-yellow-400 animate-pulse">Aguardando leitura...</span>
          </div>
          <DialogFooter>
            <button
              onClick={() => setShowQrModal(false)}
              className="text-xs px-4 py-2 rounded-md border border-[#2a2a2a] text-muted-foreground hover:text-foreground transition-colors w-full"
            >
              Fechar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstanciasPage;
