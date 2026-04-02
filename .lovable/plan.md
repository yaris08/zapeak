

# Relatórios Page — Complete Dashboard

## Arquivo principal
`src/pages/RelatoriosPage.tsx` — reescrita completa (o arquivo atual é um placeholder com "Em breve")

## Estrutura

### State & dados
- `period: "today" | "7d" | "30d"` com multiplicadores `{today: 1, "7d": 5.2, "30d": 18}`
- KpiCard inline component (mesmo padrão da HomePage)
- Dados mockados para gráfico de barras, funil, tabelas

### Blocos
1. **KPIs** — grid 4 colunas: Sessões (Activity, azul), Conclusão (CheckCircle, verde), Msgs Enviadas (MessageSquare, ciano), Tempo Médio (Clock, laranja)
2. **BarChart** (recharts) — 7 dias, barras verdes `#22c55e`, altura 220px, grid `#2a2a2a`
3. **Funil** — 4 barras horizontais proporcionais (127→98→86→13), estilo igual HomePage
4. **Tabela Desempenho** — 5 fluxos, badge conclusão colorido (>=70 verde, 50-69 amarelo, <50 vermelho), botão "Exportar CSV"
5. **Tabela Pico Mensagens** — 5 horários com barras proporcionais verdes

### Imports
- `recharts`: BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
- `lucide-react`: Activity, CheckCircle, MessageSquare, Clock, Download
- `toast` de sonner para exportar CSV

## Arquivos modificados

| Arquivo | Ação |
|---------|------|
| `src/pages/RelatoriosPage.tsx` | Reescrever completamente |

`App.tsx` e `AppLayout.tsx` já têm a rota `/relatorios` e o link "Relatórios" registrados — nenhuma alteração necessária nesses arquivos.

