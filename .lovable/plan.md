

# Dashboard Completo — HomePage.tsx (Reescrita)

## Arquivo único
`src/pages/HomePage.tsx` — substituição completa

## Estrutura

### State e dados
- `period`: `"today" | "7d" | "30d"` com multiplicadores `{today: 1, "7d": 5.2, "30d": 18}`
- Todos os valores base escalados por multiplicador ao trocar período
- Helper `fmt()` para BRL, `roasColor()` para regra de cores ROAS (vermelho < 1.5, amarelo 1.5-1.9, verde >= 2.0), `confidenceColor()` para IA (verde >= 80%, amarelo 60-79%, vermelho < 60%)

### Layout (7 blocos, top-down)

1. **Header** — "Dashboard" + seletor período (3 botões, ativo = `bg-[#F97316]`)

2. **Tráfego** — grid 4 cols: Conversas Iniciadas (Users, azul), Taxa Resposta Bot (MessageSquare, ciano), Taxa Conclusão (CheckCircle, laranja), Custo/Conversa (MousePointer, roxo)

3. **Vendas** — grid 4 cols: Total Vendas (ShoppingCart, verde), Faturamento (DollarSign, verde), Ticket Médio (TrendingUp, azul), Custo/Compra (CreditCard, laranja)

4. **ROAS** — grid 3 cols: ROAS Médio (badge colorido), Taxa Conversão (10.2%), Investimento Total

5. **Funil** — Card com 4 etapas verticais, cada uma com label + valor + % + barra de progresso laranja (`div` com width dinâmico)

6. **Gráfico** — LineChart recharts, 24h, linha `#F97316`, altura 180px

7. **Tabela Campanhas** — 8 colunas com ROAS badge + linha de totais bold no rodapé

8. **Vendas Recentes** — 6 colunas, 5 linhas, badges de confiança IA + ícone Pixel ✅/❌

### Dependências
- `recharts` (já instalado) — ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
- Lucide: Users, MessageSquare, CheckCircle, MousePointer, ShoppingCart, DollarSign, TrendingUp, CreditCard, Target, Percent, Wallet, MessageCircle, UserCheck, ShoppingBag
- Componentes nativos (sem shadcn extras necessários)

### Detalhes visuais
- Cards: `bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg`
- Hover tabelas: `hover:bg-[#222]`
- Headers tabela: `text-[10px] uppercase tracking-wider text-muted-foreground`
- Funil: barras com `bg-[#F97316]` e width percentual, fundo `bg-[#2a2a2a]`
- Espaçamento: `space-y-6`, padding `p-6`

