import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props { data: any; onUpdate: (data: any) => void }

const FigurinhaProperties: React.FC<Props> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Figurinha</p>
      <div>
        <Label className="text-xs text-muted-foreground">
          URL da Figurinha (WebP animado)
        </Label>
        <Input
          className="mt-1 h-8 text-xs bg-background"
          placeholder="https://exemplo.com/sticker.webp"
          value={data.stickerUrl || ""}
          onChange={(e) => onUpdate({ ...data, stickerUrl: e.target.value })}
        />
        <p className="text-[10px] text-muted-foreground mt-1">
          Insira a URL de uma imagem WebP animada.
        </p>
      </div>
      {data.stickerUrl && (
        <div className="flex justify-center p-2 bg-muted/30 rounded-lg">
          <img
            src={data.stickerUrl}
            alt="Preview figurinha"
            className="w-20 h-20 object-contain"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      )}
    </div>
  );
};

export default FigurinhaProperties;
