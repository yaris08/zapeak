import React, { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface TextPropertiesProps {
  data: any;
  onUpdate: (data: any) => void;
}

const variables = ["{{nome}}", "{{telefone}}", "{{email}}"];

const TextProperties: React.FC<TextPropertiesProps> = ({ data, onUpdate }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const message = data.message || "";

  const insertVariable = (variable: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const newMsg = message.substring(0, start) + variable + message.substring(end);
    onUpdate({ ...data, message: newMsg });
    setTimeout(() => {
      ta.focus();
      const pos = start + variable.length;
      ta.setSelectionRange(pos, pos);
    }, 0);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Mensagem de Texto</p>

      <div>
        <Label className="text-xs text-muted-foreground">Mensagem</Label>
        <textarea
          ref={textareaRef}
          className="mt-1 w-full h-24 rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => onUpdate({ ...data, message: e.target.value })}
          maxLength={1000}
        />
        <p className="text-[10px] text-muted-foreground text-right">{message.length} / 1000</p>
      </div>

      <div>
        <Label className="text-xs text-muted-foreground">Variáveis disponíveis</Label>
        <div className="flex flex-wrap gap-1 mt-1">
          {variables.map((v) => (
            <Badge
              key={v}
              variant="outline"
              className="text-[10px] cursor-pointer hover:bg-accent transition-colors"
              onClick={() => insertVariable(v)}
            >
              {v}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextProperties;
