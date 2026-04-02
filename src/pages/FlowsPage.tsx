import React from "react";
import { Link } from "react-router-dom";
import { Plus, Play, Pause, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const flows = [
  { id: "1", name: "Boas-vindas", status: "active", sessions: 245, completion: 72 },
  { id: "2", name: "Qualificação de Lead", status: "active", sessions: 89, completion: 54 },
  { id: "3", name: "Suporte Automático", status: "draft", sessions: 0, completion: 0 },
  { id: "4", name: "Pesquisa de Satisfação", status: "active", sessions: 156, completion: 81 },
  { id: "5", name: "Recuperação de Carrinho", status: "draft", sessions: 0, completion: 0 },
];

const FlowsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Fluxos</h1>
          <p className="text-sm text-muted-foreground">Gerencie suas automações</p>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs">
          <Plus size={14} className="mr-1" /> Novo Fluxo
        </Button>
      </div>
      <div className="space-y-2">
        {flows.map((flow) => (
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
    </div>
  );
};

export default FlowsPage;
