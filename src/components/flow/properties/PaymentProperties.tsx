import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props { data: any; onUpdate: (data: any) => void; }

const PaymentProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const aiEnabled = data.aiEnabled ?? true;
  const action = data.paymentAction || "tag";
  const tagLabel = data.paymentTag || "";

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Identificar Pagamento</p>
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">Reconhecimento por IA ativado</Label>
        <Switch checked={aiEnabled} onCheckedChange={(v) => onUpdate({ ...data, aiEnabled: v })} />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Ação ao identificar pagamento</Label>
        <Select value={action} onValueChange={(v) => onUpdate({ ...data, paymentAction: v })}>
          <SelectTrigger className="mt-1 h-8 text-xs bg-background"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="tag">Etiquetar contato</SelectItem>
            <SelectItem value="pixel">Disparar Pixel</SelectItem>
            <SelectItem value="both">Ambos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Etiqueta a aplicar</Label>
        <Input className="mt-1 h-8 text-xs bg-background" placeholder="ex: pago" value={tagLabel}
          onChange={(e) => onUpdate({ ...data, paymentTag: e.target.value })} />
      </div>
    </div>
  );
};

export default PaymentProperties;
