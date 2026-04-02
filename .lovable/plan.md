

# 2 Alterações: KPIs Reorganizados + Cor Primária Verde

## 1. Reorganizar KPIs do Dashboard

**Arquivo:** `src/pages/HomePage.tsx` — reescrita dos blocos de KPI

### Remover
- Bloco 1 "Tráfego" (linhas 149-158)
- Bloco 2 "Vendas" (linhas 160-169)
- Bloco 3 "ROAS" (linhas 171-192)

### Substituir por
Um único grid `grid-cols-5` com 10 KPIs, sem títulos de seção:

**Linha 1:** Vendas (51, ShoppingCart, verde), CPA (R$15,69, CreditCard, vermelho #ef4444), Lucro (R$3.290, TrendingUp, verde), ROI (4.1x, Target, cor condicional como ROAS), Faturamento (R$4.890, DollarSign, verde)

**Linha 2:** Investimento Total (R$800, Wallet, laranja #f97316), Taxa de Conversão (10.2%, Percent, azul), Ticket Médio (R$95,88, Receipt, azul), Total de Conversas (500, MessageSquare, ciano), Custo por Conversa (R$1,60, MousePointer, roxo)

- Adicionar import `Receipt` de lucide-react
- Lucro calculado: `faturamento - investimento`
- ROI calculado: `faturamento / investimento`
- ROI badge cor: `>=2` verde, `1.5-1.9` amarelo, `<1.5` vermelho
- Todos escalados por multiplicador de período
- Responsivo: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`

### Manter intactos
- Funil, Gráfico, Campanhas, Vendas Recentes

## 2. Alterar Cor Primária para Verde

**HSL de `#22c55e`:** aproximadamente `142 71% 45%`

### Arquivo: `src/index.css`
Alterar todas as ocorrências de `24.6 95.2% 53.1%` (orange) para `142.1 71.8% 45.3%` (green) nas variáveis:
- `--primary`
- `--ring`
- `--sidebar-primary`
- `--sidebar-ring`

Isso automaticamente afeta todos os componentes que usam `bg-primary`, `text-primary`, etc.:
- Botão "Salvar" no EditorHeader (usa `bg-primary`)
- Botão "Novo Fluxo" no FlowsPage (usa `bg-primary`)
- Badge ativo na navegação lateral (usa `text-primary`, `bg-primary/10`)
- Indicador "● Não salvo" (usa `text-primary`)
- Logo Zap (usa `text-primary`)

### Arquivo: `src/components/flow/edges/CustomEdge.tsx`
- Linha 29: `#f97316` → `#22c55e`
- Linha 29: `#ff6b35` → `#16a34a`

### Arquivo: `src/pages/FlowEditor.tsx`
- defaultEdges style `stroke: "#f97316"` → `"#22c55e"`
- onConnect style `stroke: "#f97316"` → `"#22c55e"`
- MiniMap nodeColor `"#f97316"` → `"#22c55e"`

### Arquivo: `src/pages/HomePage.tsx`
- Gráfico recharts `Line stroke="#f97316"` → `"#22c55e"`
- Funil: já usa `bg-primary` — mudará automaticamente

### Arquivo: `src/pages/AtribuicaoPage.tsx`
- Seletor de período: usa `bg-[#F97316]` hardcoded → mudar para `bg-primary` ou `#22c55e`
- Botão "Nova Campanha": usa `bg-[#F97316]` hardcoded → mudar para `bg-primary` ou `#22c55e`

### Arquivo: `src/pages/HomePage.tsx`
- Seletor de período: já usa `bg-primary` — mudará automaticamente

### NÃO alterar
- Badges de ROAS/confiança IA (cores próprias condicionais)
- Handles de condição/pagamento (verde/vermelho semântico)
- Ícone do Delay (laranja intencional)
- KpiCard colors individuais (esses são cores por ícone, não primária)

## Arquivos modificados
| Arquivo | Alteração |
|---------|-----------|
| `src/index.css` | CSS vars primary/ring → verde |
| `src/pages/HomePage.tsx` | Reorganizar KPIs em grid 5x2 + chart stroke verde |
| `src/components/flow/edges/CustomEdge.tsx` | Stroke colors → verde |
| `src/pages/FlowEditor.tsx` | Edge/minimap colors → verde |
| `src/pages/AtribuicaoPage.tsx` | Hardcoded orange → verde |

