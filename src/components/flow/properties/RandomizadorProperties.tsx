import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface Props { data: any; onUpdate: (data: any) => void }

const RandomizadorProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const paths = data.randomPaths || ["Caminho A", "Caminho B"];

  const addPath = () => {
    onUpdate({ ...data, randomPaths: [...paths, `Caminho ${String.fromCharCode(65 + paths.length)}`] });
  };

  const removePath = (i: number) => {
    if (paths.length <= 2) return;
    onUpdate({ ...data, randomPaths: paths.filter((_: any, idx: number) => idx !== i) });
  };

  const updatePath = (i: number, val: string) => {
    const newPaths = [...paths];
    newPaths[i] = val;
    onUpdate({ ...data, randomPaths: newPaths });
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Randomizador</p>
      <p className="text-[10px] text-muted-foreground">
        O fluxo seguirá aleatoriamente por um dos caminhos abaixo
        com probabilidade igual entre eles.
      </p>
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Caminhos</Label>
        {paths.map((path: string, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground w-4 text-center shrink-0">
              {i + 1}
            </span>
            <Input
              className="h-8 text-xs bg-background flex-1"
              value={path}
              onChange={(e) => updatePath(i, e.target.value)}
            />
            <button
              onClick={() => removePath(i)}
              disabled={paths.length <= 2}
              className="p-1 rounded hover:bg-destructive/20 disabled:opacity-30"
            >
              <Trash2 size={12} className="text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addPath}
        className="flex items-center gap-1 text-xs text-primary hover:underline"
      >
        <Plus size={12} /> Adicionar caminho
      </button>
      <div className="bg-muted/30 rounded-lg p-2">
        <p className="text-[10px] text-muted-foreground text-center">
          Probabilidade: {Math.round(100 / paths.length)}% por caminho
        </p>
      </div>
    </div>
  );
};

export default RandomizadorProperties;
