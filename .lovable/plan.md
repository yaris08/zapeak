

# 3 Correções no Projeto

## 1. Áudio estilo WhatsApp no AtendimentoPage.tsx

**Arquivo:** `src/pages/AtendimentoPage.tsx`

### Interface Message
- Adicionar campo opcional `audio?: { duration: string }`

### Dados mockados do João (índice 0)
Substituir array de mensagens por 11 mensagens conforme especificado, incluindo 2 com áudio (id 4 do bot e id 10 do contato).

### AudioBubble inline
Componente funcional dentro do arquivo que renderiza:
- Botão play circular (32px) com ícone `Play` (já importado)
- Barra de progresso simulada (div 60% width, altura 3px)
- Duração à direita
- Largura fixa `w-[200px]`
- Cores adaptadas: contact → `bg-[#444]` botão / bot → `bg-[#444]` / agent → `bg-[#22c55e]`

### Renderização
No bloco de mensagens, verificar `msg.audio`: se presente, renderizar `AudioBubble` dentro da bolha ao invés do texto.

## 2. Auto-save com debounce no FlowEditor

**Arquivo:** `src/components/flow/PropertiesPanel.tsx`
- Remover o botão "Salvar" do header (linhas 103-105) — manter apenas o título "Propriedades"

**Arquivo:** `src/pages/FlowEditor.tsx`
- Adicionar `useEffect` com debounce de 1.5s que observa `nodes`, `edges`, `flowName`
- Quando `hasUnsavedChanges` é true, após 1.5s salva no localStorage silenciosamente (sem toast)
- O botão "Salvar" no `EditorHeader` continua funcionando com toast

## 3. Delay com valor padrão

**Arquivo:** `src/components/flow/nodes/GenericNode.tsx` (linha 156)
- Mudar `data.delayValue || "?"` para `data.delayValue ?? 5`
- Mudar `data.delayUnit || "seconds"` para `data.delayUnit ?? "seconds"`

**Arquivo:** `src/components/flow/properties/DelayProperties.tsx`
- Adicionar `useEffect` que seta valores padrão se `delayValue` for undefined

## Arquivos modificados
| Arquivo | Ação |
|---------|------|
| `src/pages/AtendimentoPage.tsx` | Editar (interface, dados, AudioBubble, renderização) |
| `src/components/flow/PropertiesPanel.tsx` | Editar (remover botão Salvar) |
| `src/pages/FlowEditor.tsx` | Editar (auto-save debounce) |
| `src/components/flow/nodes/GenericNode.tsx` | Editar (delay default) |
| `src/components/flow/properties/DelayProperties.tsx` | Editar (useEffect default) |

