

# Página de Atribuição — AtribuicaoPage.tsx

## Arquivos a modificar/criar

| Arquivo | Ação |
|---------|------|
| `src/pages/AtribuicaoPage.tsx` | Criar |
| `src/App.tsx` | Editar — adicionar rota `/atribuicao` |
| `src/components/layout/AppLayout.tsx` | Editar — adicionar "Atribuição" em navItems e sidebarItems |

## Estrutura do componente

### State
- `period: "today" | "7d" | "30d"` com multiplicadores `{today: 1, "7d": 5.2, "30d": 18}` (mesmo padrão da HomePage)
- `showModal: boolean` para modal de nova campanha
- `campaignName: string`, `investment: string`, `startDate: string`, `endDate: string` para o formulário do modal
- `ref` derivado automaticamente do nome: `campaignName.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"_")`

### KPIs — 4 cards (grid-cols-4)
Componente `KpiCard` inline (mesmo padrão da HomePage):
- Faturamento Real: R$4.890, DollarSign, `#22c55e`
- Total de Vendas: 51, ShoppingCart, `#22c55e`
- Ticket Médio: R$95,88, TrendingUp, `#3b82f6`
- Custo por Compra: R$15,69, CreditCard, `#f97316`

Valores escalados por multiplicador do período.

### Tabela Campanhas
- Header com título "Campanhas" + botão "Nova Campanha" laranja
- 3 linhas mockadas com dados fornecidos
- Linha de totais em negrito no footer
- ROAS badge: `>=2` verde, `>=1.5` amarelo, `<1.5` vermelho

### Modal Nova Campanha
- Dialog (shadcn) com campos: nome, ref (auto-gerado, readonly), link `wa.me/5511999999999?ref={REF}` (readonly + botão copiar), investimento, data início, data fim
- Botões: Cancelar | Criar Campanha (laranja)

### Tabela Vendas Identificadas
- Header com título + botão "Exportar CSV" outline
- 5 linhas mockadas com dados fornecidos
- Confiança IA badge: `>=80%` verde, `>=60%` amarelo, `<60%` vermelho
- Pixel: ✅ verde / ❌ vermelho
- Botão "Marcar como venda" outline em cada linha

### Navegação
- `AppLayout.tsx`: adicionar `{ label: "Atribuição", path: "/atribuicao", icon: Target }` em `navItems` e `sidebarItems`
- `App.tsx`: importar `AtribuicaoPage` e adicionar `<Route path="/atribuicao" element={<AtribuicaoPage />} />`

### Estilo
- Mesmos padrões: bg `#1a1a1a`, bordas `#2a2a2a`, hover `#222`, headers tabela `text-[10px] uppercase`, padding `p-6`, `space-y-6`

