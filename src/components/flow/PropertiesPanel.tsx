import React from "react";
import { Copy, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Node } from "reactflow";

interface PropertiesPanelProps {
  node: Node | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  onDuplicate: (node: Node) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ node, onClose, onDelete, onDuplicate }) => {
  if (!node) return null;

  const nodeType = node.type || "generic";
  const nodeLabel = node.data?.label || "Nó";

  return (
    <div className="w-[280px] min-w-[280px] h-full border-l border-border bg-card overflow-y-auto flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Propriedades</h3>
        <Button size="sm" className="h-7 bg-success hover:bg-success/90 text-success-foreground text-xs">
          Salvar
        </Button>
      </div>

      <div className="flex-1 p-4 space-y-4">
        <div>
          <label className="text-xs text-muted-foreground">Tipo</label>
          <p className="text-sm text-foreground mt-1">{nodeLabel}</p>
        </div>

        {nodeType === "image" || node.data?.type === "image" ? (
          <div className="space-y-3">
            <p className="text-xs font-medium text-foreground">Enviar Imagem</p>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
              <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-xs text-foreground">Escolher arquivo</p>
              <p className="text-[10px] text-muted-foreground mt-1">Nenhum selecionado</p>
              <p className="text-[10px] text-muted-foreground">Clique para selecionar (máx 50MB)</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Legenda (opcional)</label>
              <Input className="mt-1 h-8 text-xs bg-background" placeholder="Digite uma legenda..." />
            </div>
          </div>
        ) : nodeType === "start" ? (
          <div className="space-y-3">
            <p className="text-xs font-medium text-foreground">Configuração do Gatilho</p>
            <div>
              <label className="text-xs text-muted-foreground">Tipo de gatilho</label>
              <Input className="mt-1 h-8 text-xs bg-background" value="Palavra-chave" readOnly />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Correspondência</label>
              <Input className="mt-1 h-8 text-xs bg-background" value="Contém" readOnly />
            </div>
          </div>
        ) : nodeType === "textNode" ? (
          <div className="space-y-3">
            <p className="text-xs font-medium text-foreground">Mensagem de Texto</p>
            <div>
              <label className="text-xs text-muted-foreground">Conteúdo</label>
              <textarea
                className="mt-1 w-full h-24 rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Digite sua mensagem..."
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-medium text-foreground">Configurações</p>
            <div>
              <label className="text-xs text-muted-foreground">Nome</label>
              <Input className="mt-1 h-8 text-xs bg-background" defaultValue={nodeLabel} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs"
          onClick={() => onDuplicate(node)}
        >
          <Copy size={14} className="mr-1" /> Duplicar
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="flex-1 text-xs"
          onClick={() => onDelete(node.id)}
        >
          <Trash2 size={14} className="mr-1" /> Excluir
        </Button>
      </div>
    </div>
  );
};

export default PropertiesPanel;
