import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StartPropertiesProps {
  data: any;
  onUpdate: (data: any) => void;
}

const StartProperties: React.FC<StartPropertiesProps> = ({ data, onUpdate }) => {
  const [keywordInput, setKeywordInput] = useState("");
  const triggerType = data.triggerType || "keyword";
  const matchType = data.matchType || "contains";
  const keywords: string[] = data.keywords || [];

  const addKeyword = () => {
    const word = keywordInput.trim();
    if (word && !keywords.includes(word)) {
      onUpdate({ ...data, keywords: [...keywords, word] });
      setKeywordInput("");
    }
  };

  const removeKeyword = (kw: string) => {
    onUpdate({ ...data, keywords: keywords.filter((k: string) => k !== kw) });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Configuração do Gatilho</p>

      <div>
        <Label className="text-xs text-muted-foreground">Tipo de Gatilho</Label>
        <Select value={triggerType} onValueChange={(v) => onUpdate({ ...data, triggerType: v })}>
          <SelectTrigger className="mt-1 h-8 text-xs bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="keyword">Palavra-chave</SelectItem>
            <SelectItem value="schedule">Horário</SelectItem>
            <SelectItem value="webhook">Webhook</SelectItem>
            <SelectItem value="always">Sempre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs text-muted-foreground">Correspondência</Label>
        <Select value={matchType} onValueChange={(v) => onUpdate({ ...data, matchType: v })}>
          <SelectTrigger className="mt-1 h-8 text-xs bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contains">Contém</SelectItem>
            <SelectItem value="equals">Igual a</SelectItem>
            <SelectItem value="starts">Começa com</SelectItem>
            <SelectItem value="ends">Termina com</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs text-muted-foreground">Palavras-chave</Label>
        <div className="flex items-center gap-1 mt-1">
          <Input
            className="h-8 text-xs bg-background flex-1"
            placeholder="Digite e pressione Enter..."
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={addKeyword}
            className="w-8 h-8 rounded bg-success/20 flex items-center justify-center hover:bg-success/30 transition-colors shrink-0"
          >
            <Plus size={14} className="text-success" />
          </button>
        </div>
        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {keywords.map((kw: string) => (
              <Badge key={kw} variant="secondary" className="text-xs gap-1 pr-1">
                {kw}
                <X size={12} className="cursor-pointer hover:text-destructive" onClick={() => removeKeyword(kw)} />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StartProperties;
