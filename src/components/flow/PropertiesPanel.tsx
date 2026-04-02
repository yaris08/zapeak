import React from "react";
import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Node } from "reactflow";

import StartProperties from "./properties/StartProperties";
import TextProperties from "./properties/TextProperties";
import AITextProperties from "./properties/AITextProperties";
import MediaUploadProperties from "./properties/MediaUploadProperties";
import DelayProperties from "./properties/DelayProperties";
import WaitResponseProperties from "./properties/WaitResponseProperties";
import AIRespondProperties from "./properties/AIRespondProperties";
import ConditionProperties from "./properties/ConditionProperties";
import PixelProperties from "./properties/PixelProperties";
import PaymentProperties from "./properties/PaymentProperties";
import TagsProperties from "./properties/TagsProperties";
import ConnectFlowProperties from "./properties/ConnectFlowProperties";
import NotifyProperties from "./properties/NotifyProperties";
import PixProperties from "./properties/PixProperties";
import FigurinhaProperties from "./properties/FigurinhaProperties";
import RandomizadorProperties from "./properties/RandomizadorProperties";
import IdentificadorPassagemProperties from "./properties/IdentificadorPassagemProperties";

interface PropertiesPanelProps {
  node: Node | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  onDuplicate: (node: Node) => void;
  onUpdateNode: (id: string, data: any) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ node, onClose, onDelete, onDuplicate, onUpdateNode }) => {
  if (!node) return null;

  const nodeType = node.type || "generic";
  const dataType = node.data?.type || "";
  const nodeLabel = node.data?.label || "Nó";

  const handleUpdate = (newData: any) => {
    onUpdateNode(node.id, newData);
  };

  const renderForm = () => {
    // For start node
    if (nodeType === "start") {
      return <StartProperties data={node.data} onUpdate={handleUpdate} />;
    }
    // For textNode (built-in type)
    if (nodeType === "textNode") {
      return <TextProperties data={node.data} onUpdate={handleUpdate} />;
    }

    // For generic nodes, use data.type
    switch (dataType) {
      case "text":
        return <TextProperties data={node.data} onUpdate={handleUpdate} />;
      case "ai-text":
        return <AITextProperties data={node.data} onUpdate={handleUpdate} />;
      case "image":
        return <MediaUploadProperties data={node.data} onUpdate={handleUpdate} title="Enviar Imagem" accept=".jpg,.jpeg,.png,.gif,.webp" acceptLabel="JPG, PNG, GIF, WEBP" />;
      case "audio":
        return <MediaUploadProperties data={node.data} onUpdate={handleUpdate} title="Enviar Áudio" accept=".mp3,.ogg,.m4a" acceptLabel="MP3, OGG, M4A" />;
      case "video":
        return <MediaUploadProperties data={node.data} onUpdate={handleUpdate} title="Enviar Vídeo" accept=".mp4,.avi,.mov" acceptLabel="MP4, AVI, MOV" />;
      case "document":
        return <MediaUploadProperties data={node.data} onUpdate={handleUpdate} title="Enviar Documento" accept=".pdf,.doc,.docx,.xls,.xlsx" acceptLabel="PDF, DOC, DOCX, XLS, XLSX" />;
      case "delay":
        return <DelayProperties data={node.data} onUpdate={handleUpdate} />;
      case "wait":
        return <WaitResponseProperties data={node.data} onUpdate={handleUpdate} />;
      case "ai-respond":
        return <AIRespondProperties data={node.data} onUpdate={handleUpdate} />;
      case "condition":
        return <ConditionProperties data={node.data} onUpdate={handleUpdate} />;
      case "pixel":
        return <PixelProperties data={node.data} onUpdate={handleUpdate} />;
      case "payment":
        return <PaymentProperties data={node.data} onUpdate={handleUpdate} />;
      case "tags":
      case "wa-tag":
        return <TagsProperties data={node.data} onUpdate={handleUpdate} />;
      case "connect-flow":
        return <ConnectFlowProperties data={node.data} onUpdate={handleUpdate} />;
      case "notify":
        return <NotifyProperties data={node.data} onUpdate={handleUpdate} />;
      case "pix":
        return <PixProperties data={node.data} onUpdate={handleUpdate} />;
      case "sticker":
        return <FigurinhaProperties data={node.data} onUpdate={handleUpdate} />;
      case "randomizer":
        return <RandomizadorProperties data={node.data} onUpdate={handleUpdate} />;
      case "passage-id":
        return <IdentificadorPassagemProperties data={node.data} onUpdate={handleUpdate} />;
      default:
        return (
          <div className="space-y-3">
            <p className="text-xs font-medium text-foreground">Configurações</p>
            <div>
              <label className="text-xs text-muted-foreground">Nome</label>
              <Input className="mt-1 h-8 text-xs bg-background" defaultValue={nodeLabel} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-[280px] min-w-[280px] h-full border-l border-border bg-card overflow-y-auto flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Propriedades</h3>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div>
          <label className="text-xs text-muted-foreground">Tipo</label>
          <p className="text-sm text-foreground mt-1">{nodeLabel}</p>
        </div>
        {renderForm()}
      </div>

      <div className="p-4 border-t border-border flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => onDuplicate(node)}>
          <Copy size={14} className="mr-1" /> Duplicar
        </Button>
        <Button variant="destructive" size="sm" className="flex-1 text-xs" onClick={() => onDelete(node.id)}>
          <Trash2 size={14} className="mr-1" /> Excluir
        </Button>
      </div>
    </div>
  );
};

export default PropertiesPanel;
