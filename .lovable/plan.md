
# GenericNode.tsx — Previews ricos por tipo de nó

## Arquivo único
`src/components/flow/nodes/GenericNode.tsx`

## Alterações

### Imports
- Adicionar `Copy, Video, FileText` de `lucide-react`
- Adicionar `toast` de `sonner`

### Largura condicional (item 7)
- No container principal: `max-w-[260px]` → condicional: `max-w-[280px]` quando `data.type === "image" && data.fileUrl`, senão `max-w-[260px]`

### Conteúdo do `<div className="p-3">` — substituir por renderização condicional

Em vez de sempre renderizar `<p>{preview}</p>`, usar uma função `renderContent()` que retorna JSX específico por tipo:

1. **image** com `data.fileUrl`: `<img src={data.fileUrl} className="w-full h-24 object-cover rounded-md mt-1" alt="preview" />`; sem fileUrl: texto fallback

2. **audio** com `data.fileUrl`: `<audio controls src={data.fileUrl} className="w-full h-8 mt-1" style={{accentColor:"#f97316"}} />` + badge "🎙 Voz" ou "🎵 Áudio"; sem fileUrl: texto fallback

3. **video** com `data.fileName`: ícone `Video` (12px) + nome truncado 20 chars + badge com extensão (extraída do fileName); sem fileName: texto fallback

4. **document** com `data.fileName`: ícone `FileText` (12px) + nome truncado 20 chars + badge extensão; sem fileName: texto fallback

5. **pix** (`data.type === "pix"`) com `data.pixKey`: chave truncada + botão `Copy` (12px) que chama `navigator.clipboard.writeText` + `toast("Chave copiada!")`; sem pixKey: texto fallback

6. **payment**: preview texto normal (mantido), mas no rodapé do nó adicionar duas saídas como condição — "✓ Pagou" handle verde `id="paid"` e "✗ Não Pagou" handle vermelho `id="unpaid"`

7. **Todos os outros tipos**: mantém o `<p>` com `getPreview()` atual

### Rodapé — handles de saída
Expandir a lógica condicional existente para 3 casos:
- `condition` → 2 handles (Sim/Não) — já existe
- `payment` → 2 handles (✓ Pagou verde `id="paid"` / ✗ Não Pagou vermelho `id="unpaid"`)
- demais → handle único — já existe

### Lógica existente preservada
- `getPreview()` mantida intacta
- Handles de entrada mantidos
- Header do nó mantido
- Lógica de `hasData` e cores mantida para tipos não-mídia
