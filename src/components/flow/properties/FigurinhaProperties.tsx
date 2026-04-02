import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface Props { data: any; onUpdate: (data: any) => void }

const FigurinhaProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const [mode, setMode] = useState<"upload" | "url">(data.stickerType || "url");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert("Arquivo muito grande. Máximo 1MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    onUpdate({ ...data, stickerUrl: url, stickerType: "upload", fileName: file.name });
  };

  const switchMode = (m: "upload" | "url") => {
    setMode(m);
    onUpdate({ ...data, stickerType: m });
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Figurinha</p>

      <div className="flex gap-1 p-0.5 bg-muted rounded-md">
        <button
          onClick={() => switchMode("upload")}
          className={`flex-1 text-xs py-1.5 rounded transition-colors ${mode === "upload" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          Upload
        </button>
        <button
          onClick={() => switchMode("url")}
          className={`flex-1 text-xs py-1.5 rounded transition-colors ${mode === "url" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          URL
        </button>
      </div>

      {mode === "upload" ? (
        <div>
          <Label className="text-xs text-muted-foreground">Enviar Figurinha</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-1 w-full border border-dashed border-[#2a2a2a] rounded-lg p-6 flex flex-col items-center gap-2 hover:border-primary/50 transition-colors"
          >
            <Upload size={20} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {data.fileName || "Clique para enviar WebP animado"}
            </span>
            <span className="text-[10px] text-muted-foreground">Máx 1MB</span>
          </button>
        </div>
      ) : (
        <div>
          <Label className="text-xs text-muted-foreground">
            URL da Figurinha (WebP animado)
          </Label>
          <Input
            className="mt-1 h-8 text-xs bg-background"
            placeholder="https://exemplo.com/sticker.webp"
            value={data.stickerUrl || ""}
            onChange={(e) => onUpdate({ ...data, stickerUrl: e.target.value, stickerType: "url" })}
          />
          <p className="text-[10px] text-muted-foreground mt-1">
            Insira a URL de uma imagem WebP animada.
          </p>
        </div>
      )}

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
