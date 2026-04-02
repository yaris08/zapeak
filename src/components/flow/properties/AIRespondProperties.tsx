import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Props { data: any; onUpdate: (data: any) => void; }

const AIRespondProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const prompt = data.prompt || "";
  const endFlow = data.endFlow ?? false;
  const transferHuman = data.transferHuman ?? false;

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">IA Responder</p>
      <div>
        <Label className="text-xs text-muted-foreground">Persona / Prompt</Label>
        <textarea
          className="mt-1 w-full h-24 rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Você é um assistente..."
          value={prompt}
          onChange={(e) => onUpdate({ ...data, prompt: e.target.value })}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">Encerrar fluxo após responder</Label>
        <Switch checked={endFlow} onCheckedChange={(v) => onUpdate({ ...data, endFlow: v })} />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">Transferir para humano se necessário</Label>
        <Switch checked={transferHuman} onCheckedChange={(v) => onUpdate({ ...data, transferHuman: v })} />
      </div>
    </div>
  );
};

export default AIRespondProperties;
