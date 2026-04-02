import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface Props { data: any; onUpdate: (data: any) => void }

const IdentificadorPassagemProperties: React.FC<Props> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Identificador de Passagem</p>
      <p className="text-[10px] text-muted-foreground">
        Registra que o contato passou por este ponto do fluxo.
        Útil para análise e segmentação.
      </p>
      <div>
        <Label className="text-xs text-muted-foreground">Nome do identificador</Label>
        <Input
          className="mt-1 h-8 text-xs bg-background"
          placeholder="Ex: passou_oferta_1"
          value={data.passageLabel || ""}
          onChange={(e) => onUpdate({ ...data, passageLabel: e.target.value })}
        />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Etiqueta a aplicar (opcional)</Label>
        <Input
          className="mt-1 h-8 text-xs bg-background"
          placeholder="Ex: viu_oferta"
          value={data.passageTag || ""}
          onChange={(e) => onUpdate({ ...data, passageTag: e.target.value })}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">
          Contar apenas primeira passagem
        </Label>
        <Switch
          checked={data.countOnce ?? false}
          onCheckedChange={(v) => onUpdate({ ...data, countOnce: v })}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">
          Disparar evento no Pixel
        </Label>
        <Switch
          checked={data.firePixel ?? false}
          onCheckedChange={(v) => onUpdate({ ...data, firePixel: v })}
        />
      </div>
    </div>
  );
};

export default IdentificadorPassagemProperties;
