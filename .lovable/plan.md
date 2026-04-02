

# 3 Correções no Editor de Fluxo

## 1. Pixel — Campo Token de Acesso
**Arquivo:** `src/components/flow/properties/PixelProperties.tsx`
- Adicionar campo `pixelToken` logo após o campo "Pixel ID" (linha 23)
- Input text com placeholder "EAAxxxxxxxxxxxxxxx"
- Texto de ajuda cinza abaixo: "Necessário para envio de eventos server-side"

## 2. Áudio — Tipo e Player Preview
**Arquivo:** `src/components/flow/properties/MediaUploadProperties.tsx`
- Adicionar prop opcional `isAudio?: boolean` (ou detectar via `title === "Enviar Áudio"`)
- **Antes do upload:** Select com 2 opções — "Gravado (mensagem de voz)" / "Encaminhado (arquivo de áudio)", salva em `data.audioType`, padrão `"forwarded"`
- **Após upload:** Guardar `file` como Object URL em `data.fileUrl` via `URL.createObjectURL(file)`. Se `fileName` existir e `isAudio`, renderizar `<audio controls src={data.fileUrl} />` com texto "Preview do áudio"
- Atualizar `handleFileChange` para gerar e salvar a URL do blob

## 3. Salvar Fluxo — Persistência localStorage
**Arquivos:** `src/pages/FlowEditor.tsx` + `src/components/flow/EditorHeader.tsx`

### FlowEditor.tsx
- Extrair `flowId` de `useParams()` (rota já é `/flows/:id/editor`)
- No mount (`useEffect`), checar `localStorage.getItem("flowzap_flow_{id}")` — se existir, restaurar `nodes`, `edges` e `flowName` via `setNodes`/`setEdges`
- Criar `handleSave` que serializa `{ nodes, edges, flowName }` no localStorage e exibe `toast.success("✓ Fluxo salvo com sucesso")`
- Adicionar state `hasUnsavedChanges` (boolean) — set `true` em qualquer `onNodesChange`, `onEdgesChange`, `onConnect`, `onDrop`, `handleUpdateNode`, `handleDeleteNode`, `handleDuplicateNode`; set `false` após salvar
- Passar `onSave`, `hasUnsavedChanges` como props ao `EditorHeader`

### EditorHeader.tsx
- Receber props `onSave: () => void` e `hasUnsavedChanges: boolean`
- Botão "Salvar" chama `onSave` em vez de toast direto
- Se `hasUnsavedChanges`, exibir `<span className="text-primary">● Não salvo</span>` ao lado do nome do fluxo

