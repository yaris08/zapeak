

# Zerar Todos os Dados Fictícios

## Arquivos a alterar

| Arquivo | O que mudar |
|---------|-------------|
| `src/pages/ContatosPage.tsx` | Esvaziar array `contacts`, zerar KPIs, mostrar EmptyState |
| `src/pages/AtribuicaoPage.tsx` | Esvaziar `campaignsBase` e `salesBase`, zerar KPIs |
| `src/pages/RelatoriosPage.tsx` | Zerar `baseChart`, `baseFunnel`, `baseFlows`, `basePeaks`, KPIs |
| `src/pages/InstanciasPage.tsx` | Esvaziar `mockInstances`, KPIs zerados |
| `src/pages/AtendimentoPage.tsx` | Esvaziar `contacts`, `mockFlows`, `campaigns`, `instances` (manter "all") |
| `src/pages/FlowsPage.tsx` | Esvaziar array `flows` |

## Detalhes por arquivo

### 1. ContatosPage.tsx
- `contacts = []`
- KPIs: `"0"`, `"0"`, `"0%"`
- Tabela vazia já mostra EmptyState (lógica existente)
- Paginação: "Mostrando 0 de 0 contatos"

### 2. AtribuicaoPage.tsx
- `kpis`: todos com `base: 0`
- `campaignsBase = []`
- `salesBase = []`
- Onde ficavam as tabelas vazias: mostrar EmptyState com ícones Target/ShoppingCart

### 3. RelatoriosPage.tsx
- `baseChart`: 7 dias com `sessoes: 0`
- `baseFunnel`: todos com `value: 0, pct: 0`
- `baseFlows = []`
- `basePeaks = []`
- KPIs: "0", "0%", "0", "0s"
- Tabelas vazias: EmptyState

### 4. InstanciasPage.tsx
- `mockInstances = []`
- KPIs derivados já ficam 0 automaticamente
- Cards vazios já mostram EmptyState (lógica existente)

### 5. AtendimentoPage.tsx
- `contacts = []`
- `mockFlows = []`
- `campaigns = []`
- Manter `instances` com apenas o item "all"
- Lista vazia já mostra EmptyState (lógica existente)
- Ajustar estado inicial: `selectedIdx` sem contato, mostrar mensagem central no chat

### 6. FlowsPage.tsx
- `flows = []`
- Já tem EmptyState para lista vazia (verificar)

## Regras
- Nenhuma lógica de negócio alterada
- Estrutura e visual mantidos
- EmptyState reutilizado onde necessário
- Desktop e mobile inalterados

