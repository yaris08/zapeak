import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props { data: any; onUpdate: (data: any) => void; }

const TagsProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const tagName = data.tagName || "";
  const tagAction = data.tagAction || "add";

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Etiquetas</p>
      <div>
        <Label className="text-xs text-muted-foreground">Etiqueta</Label>
        <Input className="mt-1 h-8 text-xs bg-background" placeholder="Nome da etiqueta..." value={tagName}
          onChange={(e) => onUpdate({ ...data, tagName: e.target.value })} />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Ação</Label>
        <div className="flex rounded-md border border-border overflow-hidden">
          <button
            className={`flex-1 text-xs py-2 transition-colors ${tagAction === "add" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-accent"}`}
            onClick={() => onUpdate({ ...data, tagAction: "add" })}
          >
            Adicionar
          </button>
          <button
            className={`flex-1 text-xs py-2 transition-colors ${tagAction === "remove" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-accent"}`}
            onClick={() => onUpdate({ ...data, tagAction: "remove" })}
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagsProperties;
