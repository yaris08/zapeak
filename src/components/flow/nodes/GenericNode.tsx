import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { componentItems } from "@/data/flowComponents";

const unitLabels: Record<string, string> = {
  seconds: "Segundos", minutes: "Minutos", hours: "Horas", days: "Dias",
};

const getPreview = (data: any): string => {
  const type = data.type;
  switch (type) {
    case "text":
      return data.message ? (data.message.length > 40 ? data.message.substring(0, 40) + "..." : data.message) : "Configure a mensagem...";
    case "ai-text":
      return data.prompt ? "Prompt configurado" : "Configure o prompt da IA...";
    case "image":
      return data.fileName || "Selecione uma imagem...";
    case "audio":
      return data.fileName || "Selecione um áudio...";
    case "video":
      return data.fileName || "Selecione um vídeo...";
    case "document":
      return data.fileName || "Selecione um documento...";
    case "delay":
      return data.delayValue ? `${data.delayValue} ${unitLabels[data.delayUnit || "seconds"]}` : "Configure o delay...";
    case "wait":
      return data.waitValue ? `Esperar ${data.waitValue} ${unitLabels[data.waitUnit || "minutes"]}` : "Configure a espera...";
    case "ai-respond":
      return data.prompt ? "IA configurada" : "Configure a IA...";
    case "condition":
      return data.condValue ? `Se ${data.condValue}` : "Configure a condição...";
    case "pixel":
      return data.pixelId ? `Pixel: ${data.pixelId}` : "Configure o pixel...";
    case "payment":
      return data.paymentTag ? `Tag: ${data.paymentTag}` : "Configure pagamento...";
    case "tags":
    case "wa-tag":
      return data.tagName ? `${data.tagAction === "remove" ? "Remover" : "Adicionar"}: ${data.tagName}` : "Configure a etiqueta...";
    case "connect-flow":
      return data.targetFlow || "Selecione um fluxo...";
    case "notify":
      return data.adminPhone || "Configure a notificação...";
    default:
      return "Configure este componente...";
  }
};

const GenericNode: React.FC<NodeProps> = ({ data, selected }) => {
  const componentDef = componentItems.find((c) => c.type === data.type);
  const Icon = componentDef?.icon;
  const color = data.color || componentDef?.color || "#3b82f6";
  const name = data.label || componentDef?.name || "Nó";
  const preview = getPreview(data);
  const hasData = preview !== "Configure este componente..." && !preview.includes("Configure") && !preview.includes("Selecione");

  return (
    <div
      className={`rounded-lg border-2 min-w-[200px] max-w-[260px] shadow-lg ${
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
        <p className={`text-xs ${hasData ? "text-foreground" : "text-muted-foreground"}`}>{preview}</p>
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
