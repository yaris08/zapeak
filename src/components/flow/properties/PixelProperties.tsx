import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface Pixel {
  id: string;
  name: string;
  pixelId: string;
}

interface Props { data: any; onUpdate: (data: any) => void; }

const PixelProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const navigate = useNavigate();
  const [pixels, setPixels] = useState<Pixel[]>([
    { id: "principal", name: "Pixel Principal", pixelId: "1234567890" },
    { id: "vendas", name: "Pixel Vendas", pixelId: "9876543210" },
  ]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("zapeak_settings_pixels");
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved)) {
          setPixels(saved.map((p: any) => ({ id: p.id, name: p.name, pixelId: p.pixelId })));
        }
      }
    } catch {}
  }, []);

  const selectedPixelId = data.selectedPixelId || "";
  const event = data.pixelEvent || "Lead";
  const value = data.pixelValue || "";
  const currency = data.pixelCurrency || "BRL";
  const useContactData = data.useContactData ?? false;

  const handlePixelSelect = (val: string) => {
    if (val === "new") {
      navigate("/configuracoes");
      return;
    }
    onUpdate({ ...data, selectedPixelId: val });
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Pixel</p>

      <div>
        <Label className="text-xs text-muted-foreground">Selecionar Pixel</Label>
        <Select value={selectedPixelId} onValueChange={handlePixelSelect}>
          <SelectTrigger className="mt-1 h-8 text-xs bg-background"><SelectValue placeholder="Escolha um pixel" /></SelectTrigger>
          <SelectContent>
            {pixels.map(p => (
              <SelectItem key={p.id} value={p.id}>{p.name} ({p.pixelId})</SelectItem>
            ))}
            <SelectItem value="new">+ Cadastrar novo pixel →</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs text-muted-foreground">Evento</Label>
        <Select value={event} onValueChange={(v) => onUpdate({ ...data, pixelEvent: v })}>
          <SelectTrigger className="mt-1 h-8 text-xs bg-background"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Purchase">Purchase</SelectItem>
            <SelectItem value="Lead">Lead</SelectItem>
            <SelectItem value="InitiateCheckout">InitiateCheckout</SelectItem>
            <SelectItem value="ViewContent">ViewContent</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs text-muted-foreground">Valor (opcional)</Label>
        <Input type="number" className="mt-1 h-8 text-xs bg-background" value={value}
          onChange={(e) => onUpdate({ ...data, pixelValue: e.target.value })} />
      </div>

      <div>
        <Label className="text-xs text-muted-foreground">Moeda</Label>
        <Select value={currency} onValueChange={(v) => onUpdate({ ...data, pixelCurrency: v })}>
          <SelectTrigger className="mt-1 h-8 text-xs bg-background"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="BRL">BRL</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">Usar dados do contato (hasheados)</Label>
        <Switch checked={useContactData} onCheckedChange={(v) => onUpdate({ ...data, useContactData: v })} />
      </div>
    </div>
  );
};

export default PixelProperties;
