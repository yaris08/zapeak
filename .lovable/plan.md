

# Remover botão Salvar e indicador "Não salvo"

## Arquivos

| Arquivo | Ação |
|---------|------|
| `src/components/flow/EditorHeader.tsx` | Editar — remover botão Salvar, props onSave/hasUnsavedChanges, indicador |
| `src/pages/FlowEditor.tsx` | Editar — remover props onSave/hasUnsavedChanges do EditorHeader, remover handleSave |

## 1. EditorHeader.tsx

- Remover `Save` do import lucide-react (linha 2)
- Remover `onSave` e `hasUnsavedChanges` da interface e destructuring (linhas 10-11, 16)
- Remover bloco `{hasUnsavedChanges && ...}` (linhas 47-49)
- Remover botão Salvar (linhas 67-73)
- Manter apenas botão "Publicar"

## 2. FlowEditor.tsx

- Remover `handleSave` callback (linhas 227-231)
- Remover props `onSave={handleSave}` e `hasUnsavedChanges={hasUnsavedChanges}` do `<EditorHeader>` (linhas 311-312)
- Manter `hasUnsavedChanges` state e `markDirty` — usados pelo auto-save debounce (linhas 235-242)
- O auto-save silencioso continua funcionando sem alterações

