import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface Props { data: any; onUpdate: (data: any) => void }

const PixProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const pixType = data.pixType || "phone";
  const pixKey = data.pixKey || "";
  const receiverName = data.receiverName || "";

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Enviar Chave PIX</p>

      <div>
        <Label className="text-xs text-muted-foreground">Tipo da Chave PIX</Label>
        <Select value={pixType} onValueChange={(v) => onUpdate({ ...data, pixType: v })}>
          <SelectTrigger className="mt-1 h-8 text-xs bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="random">Chave Aleatória (EVP)</SelectItem>
            <SelectItem value="cpf">CPF</SelectItem>
            <SelectItem value="cnpj">CNPJ</SelectItem>
            <SelectItem value="phone">Telefone</SelectItem>
            <SelectItem value="email">E-mail</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs text-muted-foreground">Chave PIX</Label>
        <div className="flex gap-1 mt-1">
          <Input
            className="h-8 text-xs bg-background flex-1"
            placeholder="Cole sua chave PIX aqui"
            value={pixKey}
            onChange={(e) => onUpdate({ ...data, pixKey: e.target.value })}
          />
          <button
            onClick={() => { navigator.clipboard.writeText(pixKey); toast("Chave copiada!"); }}
            className="h-8 w-8 flex items-center justify-center rounded-md border border-border bg-background hover:bg-accent"
          >
            <Copy size={14} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div>
        <Label className="text-xs text-muted-foreground">Nome do Recebedor</Label>
        <Input
          className="mt-1 h-8 text-xs bg-background"
          placeholder="Nome que aparecerá no pagamento"
          value={receiverName}
          onChange={(e) => onUpdate({ ...data, receiverName: e.target.value })}
        />
        <p className="text-[10px] text-muted-foreground mt-1">
          Nome que aparecerá para o cliente no momento do pagamento.
        </p>
      </div>
    </div>
  );
};

export default PixProperties;
