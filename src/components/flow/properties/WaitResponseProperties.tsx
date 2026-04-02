import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props { data: any; onUpdate: (data: any) => void; }

const WaitResponseProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const value = data.waitValue ?? 30;
  const unit = data.waitUnit || "minutes";
  const timeoutMsg = data.timeoutMessage || "";

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Aguardar Resposta</p>
      <div>
        <Label className="text-xs text-muted-foreground">Tempo máximo de espera</Label>
        <div className="flex gap-2 mt-1">
          <Input type="number" min={1} className="h-8 text-xs bg-background w-20" value={value}
            onChange={(e) => onUpdate({ ...data, waitValue: Math.max(1, Number(e.target.value)) })} />
          <Select value={unit} onValueChange={(v) => onUpdate({ ...data, waitUnit: v })}>
            <SelectTrigger className="h-8 text-xs bg-background flex-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="minutes">Minutos</SelectItem>
              <SelectItem value="hours">Horas</SelectItem>
              <SelectItem value="days">Dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Mensagem de timeout</Label>
        <textarea
          className="mt-1 w-full h-20 rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Mensagem enviada se o usuário não responder..."
          value={timeoutMsg}
          onChange={(e) => onUpdate({ ...data, timeoutMessage: e.target.value })}
        />
      </div>
    </div>
  );
};

export default WaitResponseProperties;
