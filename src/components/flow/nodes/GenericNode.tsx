import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { Copy, Video, FileText } from "lucide-react";
import { toast } from "sonner";
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
    case "pix":
      return data.pixKey || "Configure a chave PIX...";
    case "sticker":
      return data.stickerUrl ? "Figurinha configurada" : "Selecione uma figurinha...";
    case "randomizer": {
      const pc = data.randomPaths?.length ?? 2;
      return `${pc} caminhos | ${Math.round(100 / pc)}% cada`;
    }
    case "passage-id":
      return data.passageLabel || "Configure o identificador...";
    default:
      return "Configure este componente...";
  }
};

const getFileExtension = (fileName: string): string => {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "FILE";
};

const truncate = (str: string, len: number): string =>
  str.length > len ? str.substring(0, len) + "..." : str;

const GenericNode: React.FC<NodeProps> = ({ data, selected }) => {
  const componentDef = componentItems.find((c) => c.type === data.type);
  const Icon = componentDef?.icon;
  const color = data.color || componentDef?.color || "#3b82f6";
  const name = data.label || componentDef?.name || "Nó";
  const preview = getPreview(data);
  const hasData = preview !== "Configure este componente..." && !preview.includes("Configure") && !preview.includes("Selecione");

  const isImageWithFile = data.type === "image" && data.fileUrl;

  const renderContent = () => {
    // Image with preview
    if (data.type === "image" && data.fileUrl) {
      return <img src={data.fileUrl} className="w-full h-24 object-cover rounded-md mt-1" alt="preview" />;
    }

    // Audio with WhatsApp-style player
    if (data.type === "audio" && data.fileUrl) {
      return (
        <div className="mt-1">
          <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg p-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const audio = document.getElementById(`audio-${data.fileUrl}`) as HTMLAudioElement;
                if (audio) audio.paused ? audio.play() : audio.pause();
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#f97316" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
            <div className="flex-1 min-w-0">
              <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                <div className="h-full w-0 rounded-full" style={{ backgroundColor: "#f97316" }} />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-muted-foreground">0:00</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                  {data.audioType === "recorded" ? "🎙 Voz" : "🎵 Áudio"}
                </span>
              </div>
            </div>
          </div>
          <audio id={`audio-${data.fileUrl}`} src={data.fileUrl} className="hidden" />
        </div>
      );
    }

    // Video with file info
    if (data.type === "video" && data.fileName) {
      const ext = getFileExtension(data.fileName);
      return (
        <div className="flex items-center gap-1.5">
          <Video size={12} className="text-muted-foreground shrink-0" />
          <span className="text-xs text-foreground truncate">{truncate(data.fileName, 20)}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0">{ext}</span>
        </div>
      );
    }

    // Document with file info
    if (data.type === "document" && data.fileName) {
      const ext = getFileExtension(data.fileName);
      return (
        <div className="flex items-center gap-1.5">
          <FileText size={12} className="text-muted-foreground shrink-0" />
          <span className="text-xs text-foreground truncate">{truncate(data.fileName, 20)}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0">{ext}</span>
        </div>
      );
    }

    // PIX key
    if (data.type === "pix" && data.pixKey) {
      return (
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-foreground truncate">{truncate(data.pixKey, 20)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(data.pixKey);
              toast("Chave copiada!");
            }}
            className="p-0.5 rounded hover:bg-muted shrink-0"
          >
            <Copy size={12} className="text-muted-foreground" />
          </button>
        </div>
      );
    }

    // Delay with visual time
    if (data.type === "delay") {
      const val = data.delayValue ?? 5;
      const unit = data.delayUnit ?? "seconds";
      const unitMap: Record<string, string> = { seconds: "seg", minutes: "min", hours: "h" };
      return (
        <div className="flex items-center justify-center gap-1.5 py-1">
          <span className="text-lg font-bold text-foreground">{val}</span>
          <span className="text-xs text-muted-foreground">{unitMap[unit] || unit}</span>
        </div>
      );
    }

    if (data.type === "wait") {
      const val = data.waitValue ?? 2;
      const unit = data.waitUnit || "hours";
      const unitMap: Record<string, string> = { minutes: "Min", hours: "Horas", days: "Dias" };
      const groups = data.responseGroups?.length || 1;
      return (
        <div className="space-y-1 py-1">
          <p className="text-xs text-foreground font-medium">Esperar {val} {unitMap[unit] || unit}</p>
          <p className="text-[10px] text-muted-foreground">{groups} grupo{groups > 1 ? "s" : ""} de respostas</p>
        </div>
      );
    }

    // Sticker preview
    if (data.type === "sticker") {
      return data.stickerUrl ? (
        <img src={data.stickerUrl} alt="figurinha" className="w-10 h-10 object-contain mx-auto" onError={(e) => (e.currentTarget.style.display = "none")} />
      ) : (
        <p className="text-xs text-muted-foreground">Selecione uma figurinha...</p>
      );
    }

    // Randomizer preview
    if (data.type === "randomizer") {
      const pc = data.randomPaths?.length ?? 2;
      return <p className="text-xs text-foreground">{pc} caminhos | {Math.round(100 / pc)}% cada</p>;
    }

    // Passage ID preview
    if (data.type === "passage-id") {
      return <p className={`text-xs ${data.passageLabel ? "text-foreground" : "text-muted-foreground"}`}>{data.passageLabel || "Configure o identificador..."}</p>;
    }

    // Default text preview
    return <p className={`text-xs ${hasData ? "text-foreground" : "text-muted-foreground"}`}>{preview}</p>;
  };

  const hasDualOutput = data.type === "condition" || data.type === "payment";

  return (
    <div
      className={`rounded-lg border-2 min-w-[200px] ${isImageWithFile ? "max-w-[280px]" : "max-w-[260px]"} shadow-lg ${
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
        {renderContent()}
      </div>
      {data.type === "condition" ? (
        <div className="px-3 py-2 border-t flex flex-col gap-2" style={{ borderColor: color + "30" }}>
          <div className="flex items-center justify-end gap-1 relative">
            <span className="text-[10px] font-medium" style={{ color: "#22c55e" }}>Sim</span>
            <Handle
              type="source"
              position={Position.Right}
              id="true"
              className="!w-3 !h-3 !border-2 !border-background"
              style={{ backgroundColor: "#22c55e", position: "relative", right: "-8px", top: 0, transform: "none" }}
            />
          </div>
          <div className="flex items-center justify-end gap-1 relative">
            <span className="text-[10px] font-medium" style={{ color: "#ef4444" }}>Não</span>
            <Handle
              type="source"
              position={Position.Right}
              id="false"
              className="!w-3 !h-3 !border-2 !border-background"
              style={{ backgroundColor: "#ef4444", position: "relative", right: "-8px", top: 0, transform: "none" }}
            />
          </div>
        </div>
      ) : data.type === "payment" ? (
        <div className="px-3 py-2 border-t flex flex-col gap-2" style={{ borderColor: color + "30" }}>
          <div className="flex items-center justify-end gap-1 relative">
            <span className="text-[10px] font-medium" style={{ color: "#22c55e" }}>✓ Pagou</span>
            <Handle
              type="source"
              position={Position.Right}
              id="paid"
              className="!w-3 !h-3 !border-2 !border-background"
              style={{ backgroundColor: "#22c55e", position: "relative", right: "-8px", top: 0, transform: "none" }}
            />
          </div>
          <div className="flex items-center justify-end gap-1 relative">
            <span className="text-[10px] font-medium" style={{ color: "#ef4444" }}>✗ Não Pagou</span>
            <Handle
              type="source"
              position={Position.Right}
              id="unpaid"
              className="!w-3 !h-3 !border-2 !border-background"
              style={{ backgroundColor: "#ef4444", position: "relative", right: "-8px", top: 0, transform: "none" }}
            />
          </div>
        </div>
      ) : data.type === "randomizer" ? (
        <div className="px-3 py-2 border-t flex flex-col gap-2" style={{ borderColor: color + "30" }}>
          {(data.randomPaths || ["Caminho A", "Caminho B"]).map((path: string, i: number) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">{path}</span>
              <Handle
                type="source"
                position={Position.Right}
                id={`path-${i}`}
                className="!w-3 !h-3 !border-2 !border-background"
                style={{ backgroundColor: color, position: "relative", right: "-8px", top: 0, transform: "none" }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="px-3 py-2 border-t flex items-center justify-end" style={{ borderColor: color + "30" }}>
          <Handle
            type="source"
            position={Position.Right}
            className="!w-3 !h-3 !bg-primary !border-2 !border-background"
            style={{ position: "relative", right: "-8px", top: 0, transform: "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default memo(GenericNode);
