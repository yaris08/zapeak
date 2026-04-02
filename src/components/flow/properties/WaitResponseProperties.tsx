import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Trash2 } from "lucide-react";

interface ResponseGroup {
  id: string;
  keywords: string[];
}

interface Props { data: any; onUpdate: (data: any) => void; }

const WaitResponseProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const waitValue = data.waitValue ?? 2;
  const waitUnit = data.waitUnit || "hours";
  const noResponseAction = data.noResponseAction || "continue";
  const noResponseMsg = data.noResponseMessage || "";
  const saveResponse = data.saveResponse ?? false;
  const responseGroups: ResponseGroup[] = data.responseGroups || [
    { id: "1", keywords: [] },
  ];
  const [newKeywords, setNewKeywords] = useState<Record<string, string>>({});

  const updateGroups = (groups: ResponseGroup[]) =>
    onUpdate({ ...data, responseGroups: groups });

  const addKeyword = (groupId: string) => {
    const kw = (newKeywords[groupId] || "").trim();
    if (!kw) return;
    const groups = responseGroups.map(g =>
      g.id === groupId ? { ...g, keywords: [...g.keywords, kw] } : g
    );
    updateGroups(groups);
    setNewKeywords(prev => ({ ...prev, [groupId]: "" }));
  };

  const removeKeyword = (groupId: string, kw: string) => {
    const groups = responseGroups.map(g =>
      g.id === groupId
        ? { ...g, keywords: g.keywords.filter(k => k !== kw) }
        : g
    );
    updateGroups(groups);
  };

  const addGroup = () => {
    updateGroups([
      ...responseGroups,
      { id: Date.now().toString(), keywords: [] },
    ]);
  };

  const removeGroup = (groupId: string) => {
    if (responseGroups.length <= 1) return;
    updateGroups(responseGroups.filter(g => g.id !== groupId));
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium text-foreground">Aguardar Resposta</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Escolha o tempo de espera desejado!
        </p>
      </div>

      {/* Tempo de espera */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Aguardar resposta por</Label>
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="text-[10px] text-muted-foreground">Tempo</Label>
            <Input
              type="number"
              min={1}
              className="h-8 text-xs bg-background mt-1"
              value={waitValue}
              onChange={(e) => onUpdate({ ...data, waitValue: Math.max(1, Number(e.target.value)) })}
            />
          </div>
          <div className="flex-1">
            <Label className="text-[10px] text-muted-foreground">Medida</Label>
            <Select value={waitUnit} onValueChange={(v) => onUpdate({ ...data, waitUnit: v })}>
              <SelectTrigger className="h-8 text-xs bg-background mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minutes">Minutos</SelectItem>
                <SelectItem value="hours">Horas</SelectItem>
                <SelectItem value="days">Dias</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Caso o cliente não responda */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">
          * Caso o cliente não responda
        </Label>
        <div className="space-y-2">
          <div>
            <Label className="text-[10px] text-muted-foreground">Ação</Label>
            <Select value={noResponseAction} onValueChange={(v) => onUpdate({ ...data, noResponseAction: v })}>
              <SelectTrigger className="h-8 text-xs bg-background mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="continue">Continuar funil</SelectItem>
                <SelectItem value="manual">Encaminhar para Atendimento Manual</SelectItem>
                <SelectItem value="finish">Finalizar funil</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <textarea
            className="w-full h-16 rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Mensagem de timeout (opcional)..."
            value={noResponseMsg}
            onChange={(e) => onUpdate({ ...data, noResponseMessage: e.target.value })}
          />
        </div>
      </div>

      {/* Salvar resposta */}
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">
          Salvar resposta do lead?
        </Label>
        <Switch
          checked={saveResponse}
          onCheckedChange={(v) => onUpdate({ ...data, saveResponse: v })}
        />
      </div>

      {/* Análise de respostas */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">
          Análise de respostas
        </Label>
        <div className="space-y-3">
          {responseGroups.map((group, idx) => (
            <div key={group.id} className="p-2 rounded-md border border-border bg-background space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground font-medium">
                  Respostas
                </span>
                {responseGroups.length > 1 && (
                  <button
                    onClick={() => removeGroup(group.id)}
                    className="p-0.5 rounded hover:bg-destructive/20"
                  >
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </button>
                )}
              </div>

              {/* Keywords chips */}
              <div className="flex flex-wrap gap-1">
                {group.keywords.map(kw => (
                  <span key={kw} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px]">
                    {kw}
                    <button onClick={() => removeKeyword(group.id, kw)}>
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add keyword */}
              <div className="flex gap-1">
                <Input
                  className="h-7 text-[11px] bg-background flex-1"
                  placeholder="Adicionar palavra-chave..."
                  value={newKeywords[group.id] || ""}
                  onChange={(e) => setNewKeywords(prev => ({
                    ...prev, [group.id]: e.target.value
                  }))}
                  onKeyDown={e => {
                    if (e.key === "Enter") { e.preventDefault(); addKeyword(group.id); }
                  }}
                />
              </div>
            </div>
          ))}

          {/* Outras respostas */}
          <div className="p-2 rounded-md border border-dashed border-border">
            <span className="text-[10px] text-muted-foreground">
              Outras respostas
            </span>
          </div>

          {/* Adicionar grupo */}
          <button
            onClick={addGroup}
            className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Adicionar grupo de respostas
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitResponseProperties;
