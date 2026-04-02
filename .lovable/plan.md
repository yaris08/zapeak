

# 2 Correções: Randomizador multi-saída + Figurinha upload

## Arquivos

| Arquivo | Ação |
|---------|------|
| `src/components/flow/nodes/GenericNode.tsx` | Editar — randomizer com múltiplos handles |
| `src/components/flow/properties/FigurinhaProperties.tsx` | Editar — adicionar upload de arquivo |

## 1. GenericNode.tsx — Randomizador com múltiplas saídas

### Rodapé do nó (linhas 236-291)

Adicionar `data.type === "randomizer"` como novo branch no ternário, entre `payment` e o default (linha 282):

```tsx
) : data.type === "randomizer" ? (
  <div className="px-3 py-2 border-t flex flex-col gap-2" style={{ borderColor: color + "30" }}>
    {(data.randomPaths || ["Caminho A", "Caminho B"]).map((path: string, i: number) => (
      <div key={i} className="flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">{path}</span>
        <Handle
          type="source"
          position={Position.Right}
          id={`path-${i}`}
          className="!w-3 !h-3 !border-2 !border-background"
          style={{ backgroundColor: color, position: "relative", right: "-8px", top: 0, transform: "none" }}
        />
      </div>
    ))}
  </div>
) : (
```

O randomizer não usará mais o handle único padrão.

## 2. FigurinhaProperties.tsx — Upload + URL com tabs

### Substituir conteúdo completo por:

- Imports: `useRef`, `useState`, `Upload` de lucide-react, `Label`, `Input`
- State local: `mode` = `data.stickerType || "url"` (controlado por dois botões tipo tab)
- `fileUrlRef` para ger