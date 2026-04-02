import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props { data: any; onUpdate: (data: any) => void; }

const AITextProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const prompt = data.prompt || "";
  const model = data.model || "claude-sonnet";
  const useHistory = data.useHistory ?? true;

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Texto com IA</p>
      <div>
        <Label className="text-xs text-muted-foreground">Prompt da IA</Label>
        <textarea
          className="mt-1 w-full h-24 rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Ex: Você é um assistente de vendas..."
          value={prompt}
          onChange={(e) => onUpdate({ ...data, prompt: e.target.value })}
        />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Modelo</Label>
        <Select value={model} onValueChange={(v) => onUpdate({ ...data, model: v })}>
          <SelectTrigger className="mt-1 h-8 text-xs bg-background"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="claude-sonnet">Claude Sonnet</SelectItem>
            <SelectItem value="claude-haiku">Claude Haiku</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">Usar histórico da conversa</Label>
        <Switch checked={useHistory} onCheckedChange={(v) => onUpdate({ ...data, useHistory: v })} />
      </div>
    </div>
  );
};

export default AITextProperties;
