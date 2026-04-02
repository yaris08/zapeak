

# Formulários Específicos no Painel de Propriedades

## Resumo
Reescrever o `PropertiesPanel` com formulários dedicados para cada tipo de nó, com state funcional que atualiza os dados do nó no canvas em tempo real.

## Arquitetura

### 1. Adicionar `onUpdateNode` callback ao FlowEditor
- Nova prop `onUpdateNode: (id: string, data: any) => void` no `PropertiesPanel`
- No `FlowEditor`, implementar `handleUpdateNode` que usa `setNodes` para atualizar `node.data`
- Manter `selectedNode` sincronizado: ao clicar num nó, buscar a versão atual do array `nodes`

### 2. Reescrever PropertiesPanel com formulários por tipo
Criar sub-componentes em `src/components/flow/properties/` para cada tipo de nó:

- **StartProperties** — Selects para gatilho/correspondência, input com chips de palavras-chave (Enter ou botão + adiciona, X remove)
- **TextProperties** — Textarea com contador 0/1000, chips clicáveis de variáveis que inserem no cursor
- **AITextProperties** (`ai-text`) — Textarea prompt, Select modelo, Toggle histórico
- **ImageProperties** (`image`) — Upload area dashed, input legenda
- **AudioProperties** (`audio`) — Upload area (MP3/OGG/M4A), input legenda
- **VideoProperties** (`video`) — Upload area (MP4/AVI/MOV), input legenda
- **DocumentProperties** (`document`) — Upload area (PDF/DOC/XLS), input legenda
- **DelayProperties** (`delay`) — Input numérico + Select unidade (Segundos/Minutos/Horas)
- **WaitResponseProperties** (`wait`) — Input numérico + Select unidade, Textarea timeout
- **AIRespondProperties** (`ai-respond`) — Textarea persona, 2 Toggles
- **ConditionProperties** (`condition`) — 3 campos (variável, operador, valor) + info texto
- **PixelProperties** (`pixel`) — Input ID, Select evento, Input valor, Select moeda, Toggle dados
- **PaymentProperties** (`payment`) — Toggle IA, Select ação, Input etiqueta
- **TagsProperties** (`tags`) — Input autocomplete, Toggle adicionar/remover
- **ConnectFlowProperties** (`connect-flow`) — Select com fluxos mockados
- **NotifyProperties** (`notify`) — Input tel, Textarea mensagem
- **DefaultProperties** — Fallback genérico com campo Nome

### 3. Atualizar nós do canvas para refletir dados
- **TextNode**: mostrar `data.message` truncado em vez de "Configure a mensagem..."
- **StartNode**: mostrar chips de palavras-chave do `data.keywords`
- **GenericNode**: mostrar preview contextual baseado em `data` (ex: delay mostra "5 Segundos")

### 4. Componentes UI utilizados
- `Select` (shadcn), `Input`, `Textarea`, `Switch` (como Toggle), `Badge` (para chips/tags)
- Tudo com state local sincronizado via `onUpdateNode` no `onChange`/`onBlur`

## Arquivos modificados/criados
| Arquivo | Ação |
|---------|------|
| `src/components/flow/properties/*.tsx` | Criar ~16 sub-componentes |
| `src/components/flow/PropertiesPanel.tsx` | Reescrever — mapear tipo → sub-componente |
| `src/pages/FlowEditor.tsx` | Adicionar `handleUpdateNode`, sincronizar `selectedNode` |
| `src/components/flow/nodes/TextNode.tsx` | Exibir `data.message` |
| `src/components/flow/nodes/StartNode.tsx` | Exibir `data.keywords` como chips |
| `src/components/flow/nodes/GenericNode.tsx` | Preview contextual por tipo |

## Fluxo de dados
```text
PropertiesPanel (form change)
  → onUpdateNode(nodeId, newData)
    → FlowEditor.setNodes(update node.data)
      → React Flow re-renders node
        → Node component reads updated data
```

