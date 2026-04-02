import React from "react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props { data: any; onUpdate: (data: any) => void; }

const ConditionProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const variable = data.condVariable || "response";
  const operator = data.condOperator || "contains";
  const value = data.condValue || "";

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Condição</p>
      <div>
        <Label className="text-xs text-muted-foreground">Variável</Label>
        <Select value={variable} onValueChange={(v) => onUpdate({ ...data, condVariable: v })}>
          <SelectTrigger className="mt-1 h-8 text-xs bg-background"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="response">Resposta do usuário</SelectItem>
            <SelectItem value="tag">Etiqueta</SelectItem>
            <SelectItem value="custom">Campo personalizado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Operador</Label>
        <Select value={operator} onValueChange={(v) => onUpdate({ ...data, condOperator: v })}>
          <SelectTrigger className="mt-1 h-8 text-xs bg-background"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="contains">Contém</SelectItem>
            <SelectItem value="equals">Igual a</SelectItem>
            <SelectItem value="greater">Maior que</SelectItem>
            <SelectItem value="less">Menor que</SelectItem>
            <SelectItem value="exists">Existe</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Valor</Label>
        <Input className="mt-1 h-8 text-xs bg-background" value={value}
          onChange={(e) => onUpdate({ ...data, condValue: e.target.value })} placeholder="Digite o valor..." />
      </div>
      <div className="flex items-start gap-2 p-2 rounded bg-accent/50 border border-border">
        <Info size={14} className="text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-[10px] text-muted-foreground">Este nó cria 2 saídas: Verdadeiro e Falso</p>
      </div>
    </div>
  );
};

export default ConditionProperties;
