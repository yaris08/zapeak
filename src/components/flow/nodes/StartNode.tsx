import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StartNode: React.FC<NodeProps> = ({ data, selected }) => {
  const keywords: string[] = data.keywords || [];

  return (
    <div
      className={`rounded-lg border-2 min-w-[240px] shadow-lg ${
        selected ? "ring-2 ring-primary" : ""
      }`}
      style={{
        backgroundColor: "#0a2a1a",
        borderColor: "#22c55e",
      }}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: "#22c55e30" }}>
        <Zap size={14} className="text-success" />
        <span className="text-sm font-medium text-foreground">Iniciar</span>
      </div>
      <div className="p-3 space-y-2">
        <div>
          <label className="text-[10px] text-muted-foreground uppercase">Gatilho</label>
          <div className="bg-background rounded px-2 py-1 mt-1 border border-border">
            <span className="text-xs text-foreground">
              {data.triggerType === "keyword" ? "Palavra-chave" : data.triggerType === "schedule" ? "Horário" : data.triggerType === "webhook" ? "Webhook" : data.triggerType === "always" ? "Sempre" : "Palavra-chave"}
            </span>
          </div>
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase">Correspondência</label>
          <div className="bg-background rounded px-2 py-1 mt-1 border border-border">
            <span className="text-xs text-foreground">
              {data.matchType === "contains" ? "Contém" : data.matchType === "equals" ? "Igual a" : data.matchType === "starts" ? "Começa com" : data.matchType === "ends" ? "Termina com" : "Contém"}
            </span>
          </div>
        </div>
        {keywords.length > 0 && (
          <div>
            <label className="text-[10px] text-muted-foreground uppercase">Palavras-chave</label>
            <div className="flex flex-wrap gap-1 mt-1">
              {keywords.slice(0, 3).map((kw: string) => (
                <Badge key={kw} variant="secondary" className="text-[10px]">{kw}</Badge>
              ))}
              {keywords.length > 3 && (
                <Badge variant="secondary" className="text-[10px]">+{keywords.length - 3}</Badge>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="px-3 py-2 border-t flex items-center justify-between" style={{ borderColor: "#22c55e30" }}>
        <span className="text-[10px] text-muted-foreground">Próximo passo</span>
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-primary !border-2 !border-background"
          style={{ position: "relative", right: "-8px", top: 0, transform: "none" }}
        />
      </div>
    </div>
  );
};

export default memo(StartNode);
