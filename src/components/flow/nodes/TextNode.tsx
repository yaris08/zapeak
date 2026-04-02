import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { MessageSquare } from "lucide-react";

const TextNode: React.FC<NodeProps> = ({ selected }) => {
  return (
    <div
      className={`rounded-lg border-2 min-w-[220px] shadow-lg ${
        selected ? "ring-2 ring-primary" : ""
      }`}
      style={{
        backgroundColor: "#0a1a2a",
        borderColor: "#3b82f6",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-primary !border-2 !border-background"
      />
      <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: "#3b82f630" }}>
        <MessageSquare size={14} style={{ color: "#3b82f6" }} />
        <span className="text-sm font-medium text-foreground">Texto</span>
      </div>
      <div className="p-3">
        <p className="text-xs text-muted-foreground">Configure a mensagem...</p>
      </div>
      <div className="px-3 py-2 border-t flex items-center justify-end" style={{ borderColor: "#3b82f630" }}>
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

export default memo(TextNode);
