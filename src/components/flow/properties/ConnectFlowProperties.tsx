import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props { data: any; onUpdate: (data: any) => void; }

const ConnectFlowProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const targetFlow = data.targetFlow || "";

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Conectar Fluxo</p>
      <div>
        <Label className="text-xs text-muted-foreground">Selecionar fluxo destino</Label>
        <Select value={targetFlow} onValueChange={(v) => onUpdate({ ...data, targetFlow: v })}>
          <SelectTrigger className="mt-1 h-8 text-xs bg-background"><SelectValue placeholder="Selecione..." /></SelectTrigger>
          <SelectContent>
            <SelectItem value="boas-vindas">Boas-vindas</SelectItem>
            <SelectItem value="qualificacao">Qualificação de Lead</SelectItem>
            <SelectItem value="suporte">Suporte Automático</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ConnectFlowProperties;
