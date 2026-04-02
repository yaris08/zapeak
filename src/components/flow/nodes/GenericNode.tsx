import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { componentItems } from "@/data/flowComponents";

const GenericNode: React.FC<NodeProps> = ({ data, selected }) => {
  const componentDef = componentItems.find((c) => c.type === data.type);
  const Icon = componentDef?.icon;
  const color = data.color || componentDef?.color || "#3b82f6";
  const name = data.label || componentDef?.name || "Nó";

  return (
    <div
      className={`rounded-lg border-2 min-w-[200px] shadow-lg ${
        selected ? "ring-2 ring-primary" : ""
      }`}
      style={{
        backgroundColor: color + "10",
        borderColor: color,
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-primary !border-2 !border-background"
      />
      <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: color + "30" }}>
        {Icon && <Icon size={14} style={{ color }} />}
        <span className="text-sm font-medium text-foreground">{name}</span>
      </div>
      <div className="p-3">
        <p className="text-xs text-muted-foreground">Configure este componente...</p>
      </div>
      <div className="px-3 py-2 border-t flex items-center justify-end" style={{ borderColor: color + "30" }}>
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

export default memo(GenericNode);
