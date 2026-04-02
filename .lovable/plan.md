

# 3 Correções no FlowEditor

## 1. Duplicar nó sem sobrepor
**Arquivo:** `src/pages/FlowEditor.tsx`
- Em `handleDuplicateNode`: alterar offset para `x + 180, y + 80`
- Alterar geração de ID para `` `node_${Date.now()}` ``
- Também alterar ID no `onDrop` para consistência

## 2. Deletar conexão ao clicar
**Arquivos:** `src/pages/FlowEditor.tsx` + novo `src/components/flow/edges/CustomEdge.tsx`

### CustomEdge.tsx (novo)
- Edge customizado com `getBezierPath`
- Quando `selected`, renderiza botão circular vermelho com ícone `Trash2` no centro da edge
- Clique no botão remove a edge via `setEdges`

### FlowEditor.tsx
- Adicionar state `selectedEdgeId`
- Adicionar `onEdgeClick` handler (seleciona edge, limpa nó)
- Limpar `selectedEdgeId` no `onPaneClick`
- Registrar `edgeTypes = { custom: CustomEdge }` via `useMemo`
- Passar `edgeTypes` e `onEdgeClick` ao `<ReactFlow>`
- Alterar `defaultEdges` para usar `type: 'custom'`, `animated: false`, `style: { stroke: '#f97316' }`
- Alterar `onConnect` para usar `type: 'custom'`, `animated: false`

## 3. Nó Condição com 2 saídas
**Arquivo:** `src/components/flow/nodes/GenericNode.tsx`
- Quando `data.type === 'condition'`, substituir o handle source único por dois handles:
  - Handle `id="true"` posicionado no terço superior direito, com label "Sim" em verde `#22c55e`
  - Handle `id="false"` posicionado no terço inferior direito, com label "Não" em vermelho `#ef4444`
- Para todos os outros tipos, manter o handle source único atual

## Arquivos modificados
| Arquivo | Ação |
|---------|------|
| `src/pages/FlowEditor.tsx` | Editar (duplicar offset, IDs, edge types, handlers) |
| `src/components/flow/edges/CustomEdge.tsx` | Criar |
| `src/components/flow/nodes/GenericNode.tsx` | Editar (condição 2 saídas) |

