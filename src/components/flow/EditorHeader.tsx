import React from "react";
import { ArrowLeft, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface EditorHeaderProps {
  flowName: string;
  onNameChange: (name: string) => void;
  instanceName?: string;
  instanceStatus?: "active" | "standby";
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ flowName, onNameChange, onSave, hasUnsavedChanges, instanceName, instanceStatus = "active" }) => {
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
        {instanceName && (
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] ${
            instanceStatus === "active"
              ? "text-green-400 border-green-800/50 bg-green-900/20"
              : "text-yellow-400 border-yellow-800/50 bg-yellow-900/20"
          }`}>
            <Smartphone size={10} />
            {instanceName}
          </div>
        )}
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
