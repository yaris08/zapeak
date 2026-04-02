import React from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface EditorHeaderProps {
  flowName: string;
  onNameChange: (name: string) => void;
  onSave: () => void;
  hasUnsavedChanges: boolean;
  instanceName?: string;
  instanceStatus?: "active" | "standby";
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ flowName, onNameChange, onSave, hasUnsavedChanges }) => {
  const navigate = useNavigate();
  const [editing, setEditing] = React.useState(false);

  return (
    <div className="h-12 border-b border-border bg-card flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/flows")}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Fluxos
        </button>
        <div className="w-px h-5 bg-border" />
        {editing ? (
          <input
            className="text-sm font-medium bg-transparent border-b border-primary text-foreground outline-none"
            value={flowName}
            onChange={(e) => onNameChange(e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
            autoFocus
          />
        ) : (
          <span
            className="text-sm font-medium text-foreground cursor-pointer hover:text-primary transition-colors"
            onClick={() => setEditing(true)}
          >
            {flowName}
          </span>
        )}
        {hasUnsavedChanges && (
          <span className="text-xs text-primary font-medium">● Não salvo</span>
        )}
        <Badge variant="secondary" className="text-[10px] bg-muted text-muted-foreground">
          Rascunho
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground">0 sessões | 0% finalizaram</span>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="h-8 text-xs bg-primary hover:bg-primary/90"
            onClick={onSave}
          >
            <Save size={14} className="mr-1" /> Salvar
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            Publicar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
