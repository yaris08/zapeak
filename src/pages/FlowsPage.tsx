import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Play, Pause, MoreHorizontal, Smartphone, GitBranch } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const flows = [
  { id: "1", name: "Boas-vindas", status: "active", sessions: 245, completion: 72, instance: "Principal" },
  { id: "2", name: "Qualificação de Lead", status: "active", sessions: 89, completion: 54, instance: "Vendas" },
  { id: "3", name: "Suporte Automático", status: "draft", sessions: 0, completion: 0, instance: undefined },
  { id: "4", name: "Pesquisa de Satisfação", status: "active", sessions: 156, completion: 81, instance: "Principal" },
  { id: "5", name: "Recuperação de Carrinho", status: "draft", sessions: 0, completion: 0, instance: undefined },
];

const FlowsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showNewFlow, setShowNewFlow] = useState(false);
  const [newFlowName, setNewFlowName] = useState("");
  const [newFlowInstance, setNewFlowInstance] = useState("");

  const handleCreateFlow = () => {
    if (!newFlowName.trim()) return;
    toast.success("✓ Fluxo criado com sucesso");
    setShowNewFlow(false);
    setNewFlowName("");
    setNewFlowInstance("");
    navigate("/flows/new/editor");
  };

  return (
    <div className="p-3 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Fluxos</h1>
          <p className="text-sm text-muted-foreground">Gerencie suas automações</p>
        </div>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-xs w-full md:w-auto"
          onClick={() => setShowNewFlow(true)}
        >
          <Plus size={14} className="mr-1" /> Novo Fluxo
        </Button>
      </div>
      <div className="space-y-2">
        {flows.length === 0 ? (
          <EmptyState
            icon={GitBranch}
            title="Nenhum fluxo criado ainda"
            subtitle="Crie seu primeiro fluxo de automação e comece a atender no piloto automático"
            buttonLabel="Criar primeiro fluxo"
            onButtonClick={() => setShowNewFlow(true)}
          />
        ) : flows.map((flow) => (
          <Link
            key={flow.id}
            to={`/flows/${flow.id}/editor`}
            className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              {flow.status === "active" ? (
                <Play size={16} className="text-success" />
              ) : (
                <Pause size={16} className="text-muted-foreground" />
              )}
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {flow.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {flow.sessions} sessões · {flow.completion}% conclusão
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] ${
                  flow.instance
                    ? "bg-[#2a2a2a] border-[#333] text-[#9ca3af]"
                    : "bg-[#2a2a2a] border-[#333] text-yellow-500"
                }`}
              >
                <Smartphone size={10} />
                {flow.instance || "Não definida"}
              </div>
              <Badge
                variant="secondary"
                className={`text-[10px] ${
                  flow.status === "active"
                    ? "bg-success/10 text-success"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {flow.status === "active" ? "Ativo" : "Rascunho"}
              </Badge>
              <MoreHorizontal size={16} className="text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>

      <Dialog open={showNewFlow} onOpenChange={setShowNewFlow}>
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Novo Fluxo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Nome do fluxo</Label>
              <Input
                placeholder="Ex: Boas-vindas"
                value={newFlowName}
                onChange={(e) => setNewFlowName(e.target.value)}
                className="bg-[#0f0f0f] border-[#2a2a2a] text-foreground text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Instância</Label>
              <Select value={newFlowInstance} onValueChange={setNewFlowInstance}>
                <SelectTrigger className="bg-[#0f0f0f] border-[#2a2a2a] text-foreground text-sm">
                  <SelectValue placeholder="Selecione a instância" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <SelectItem value="principal" className="text-sm">
                    📱 Principal — (11) 99999-0001
                  </SelectItem>
                  <SelectItem value="vendas" className="text-sm">
                    📱 Vendas — (11) 99999-0002
                  </SelectItem>
                  <SelectItem value="suporte" disabled className="text-sm opacity-50" title="Instância offline">
                    📱 Suporte — (11) 99999-0003 (Standby)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-[#2a2a2a]"
                onClick={() => setShowNewFlow(false)}
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                className="text-xs bg-[#22c55e] hover:bg-[#22c55e]/90 text-white"
                onClick={handleCreateFlow}
                disabled={!newFlowName.trim()}
              >
                Criar Fluxo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FlowsPage;
