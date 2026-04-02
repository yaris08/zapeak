import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { Zap, ChevronDown, Plus } from "lucide-react";

const StartNode: React.FC<NodeProps> = ({ selected }) => {
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
          <div className="flex items-center justify-between bg-background rounded px-2 py-1 mt-1 border border-border">
            <span className="text-xs text-foreground">Palavra-chave</span>
            <ChevronDown size={12} className="text-muted-foreground" />
          </div>
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase">Correspondência</label>
          <div className="flex items-center justify-between bg-background rounded px-2 py-1 mt-1 border border-border">
            <span className="text-xs text-foreground">Contém</span>
            <ChevronDown size={12} className="text-muted-foreground" />
          </div>
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase">Palavras-chave</label>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex-1 bg-background rounded px-2 py-1 border border-border">
              <span className="text-xs text-muted-foreground">Adicionar...</span>
            </div>
            <button className="w-6 h-6 rounded bg-success/20 flex items-center justify-center hover:bg-success/30 transition-colors">
              <Plus size={12} className="text-success" />
            </button>
          </div>
        </div>
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
