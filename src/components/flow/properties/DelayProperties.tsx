import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props { data: any; onUpdate: (data: any) => void; }

const DelayProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const value = data.delayValue ?? 5;
  const unit = data.delayUnit || "seconds";

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Delay</p>
      <div>
        <Label className="text-xs text-muted-foreground">Aguardar por</Label>
        <div className="flex gap-2 mt-1">
          <Input
            type="number"
            min={1}
            className="h-8 text-xs bg-background w-20"
            value={value}
            onChange={(e) => onUpdate({ ...data, delayValue: Math.max(1, Number(e.target.value)) })}
          />
          <Select value={unit} onValueChange={(v) => onUpdate({ ...data, delayUnit: v })}>
            <SelectTrigger className="h-8 text-xs bg-background flex-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="seconds">Segundos</SelectItem>
              <SelectItem value="minutes">Minutos</SelectItem>
              <SelectItem value="hours">Horas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DelayProperties;
