import React, { useRef } from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  data: any;
  onUpdate: (data: any) => void;
  title: string;
  accept: string;
  acceptLabel: string;
}

const MediaUploadProperties: React.FC<Props> = ({ data, onUpdate, title, accept, acceptLabel }) => {
  const caption = data.caption || "";
  const fileName = data.fileName || "";
  const isAudio = title === "Enviar Áudio";
  const audioType = data.audioType || "forwarded";
  const fileUrlRef = useRef<string | null>(data.fileUrl || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
      const url = URL.createObjectURL(file);
      fileUrlRef.current = url;
      onUpdate({ ...data, fileName: file.name, fileUrl: url });
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">{title}</p>

      {isAudio && (
        <div>
          <Label className="text-xs text-muted-foreground">Tipo de áudio</Label>
          <Select value={audioType} onValueChange={(v) => onUpdate({ ...data, audioType: v })}>
            <SelectTrigger className="mt-1 h-8 text-xs bg-background"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="recorded">Gravado (mensagem de voz)</SelectItem>
              <SelectItem value="forwarded">Encaminhado (arquivo de áudio)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <label className="block border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
        <input type="file" accept={accept} className="hidden" onChange={handleFileChange} />
        <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
        <p className="text-xs text-foreground">{fileName || "Escolher arquivo"}</p>
        <p className="text-[10px] text-muted-foreground mt-1">{fileName ? "Clique para trocar" : "Nenhum selecionado"}</p>
        <p className="text-[10px] text-muted-foreground">Clique para selecionar (máx 50MB)</p>
        <p className="text-[10px] text-muted-foreground mt-1">Aceita: {acceptLabel}</p>
      </label>

      {isAudio && fileName && data.fileUrl && (
        <div>
          <audio controls src={data.fileUrl} className="w-full h-8" />
          <p className="text-[10px] text-muted-foreground mt-1">Preview do áudio</p>
        </div>
      )}

      <div>
        <Label className="text-xs text-muted-foreground">Legenda (opcional)</Label>
        <Input
          className="mt-1 h-8 text-xs bg-background"
          placeholder="Digite uma legenda..."
          value={caption}
          onChange={(e) => onUpdate({ ...data, caption: e.target.value })}
        />
      </div>
    </div>
  );
};

export default MediaUploadProperties;
