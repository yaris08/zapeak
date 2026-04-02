

# Indicador de Instância nos Fluxos + Modal Novo Fluxo

## Arquivos

| Arquivo | Ação |
|---------|------|
| `src/pages/FlowsPage.tsx` | Editar — campo `instance` nos dados, badge na lista, modal novo fluxo |
| `src/components/flow/EditorHeader.tsx` | Editar — badge de instância ao lado de "Rascunho" |

## 1. FlowsPage.tsx

### Dados
Adicionar `instance` a cada fluxo:
- Boas-vindas → `"Principal"`
- Qualificação de Lead → `"Vendas"`
- Suporte Automático → `undefined` (não definida)
- Pesquisa de Satisfação → `"Principal"`
- Recuperação de Carrinho → `undefined` (não definida)

### Badge na lista
Entre o bloco de nome/stats e o bloco de status/more, inserir badge:
- Definida: `bg-[#2a2a2a] border border-[#333] text-[#9ca3af]` com `Smartphone` (10px) + nome
- Não definida: mesma estrutura mas texto `"Não definida"` com `text-yellow-500`

### Modal Novo Fluxo
- State: `showNewFlow`, `newFlowName`, `newFlowInstance`
- Botão "Novo Fluxo" abre o Dialog em vez de ser decorativo
- Campos: Input nome + Select instância (3 opções, Suporte desabilitada com title tooltip "Instância offline")
- Botões: Cancelar / Criar Fluxo (verde) → `navigate(/flows/new/editor)`
- Imports: `Dialog, DialogContent, DialogHeader, DialogTitle`, `Select, SelectTrigger, SelectContent, SelectItem, SelectValue`, `Smartphone`, `useNavigate`, `toast`

## 2. EditorHeader.tsx

### Badge de instância
Após o badge "Rascunho" (linha 48-50), adicionar badge com `Smartphone` (10px) + nome da instância.
- Prop opcional `instanceName?: string` e `instanceStatus?: "active" | "standby"`
- Verde (`text-green-400 border-green-800/50`) se active, amarelo (`text-yellow-400 border-yellow-800/50`) se standby
- Não renderiza se `instanceName` undefined

O `FlowEditor.tsx` que usa EditorHeader passará a prop — preciso verificar.

