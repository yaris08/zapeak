

# Dashboard Completo — HomePage.tsx

## O que será feito
Substituir completamente `src/pages/HomePage.tsx` por um dashboard funcional com seletor de período, 6 KPIs, gráfico de sessões (recharts), e 2 tabelas (Top Campanhas e Fluxos Ativos).

## Arquivo único a modificar
`src/pages/HomePage.tsx` — reescrita completa

## Estrutura do componente

### State
- `period`: `"today" | "7d" | "30d"` — controla o seletor de período
- Dados mockados variam por período (multiplicadores simples sobre os valores base)

### Layout (de cima para baixo)
1. **Header**: título "Dashboard" à esquerda, 3 botões de período à direita (ativo = bg `#F97316`)
2. **KPIs**: grid 3 colunas, 2 linhas — 6 cards com ícone colorido, valor e label
3. **Gráfico**: `LineChart` do recharts (já instalado), 24 pontos simulando pico comercial, linha laranja, altura 200px, fundo `#1a1a1a` com borda `#2a2a2a`
4. **Tabela Top Campanhas**: 5 colunas, 3 linhas mockadas, ROAS em badge colorido
5. **Tabela Fluxos Ativos**: 4 colunas, 3 linhas mockadas, Status em badge verde/cinza

### Detalhes visuais
- Tabelas: fundo `#1a1a1a`, bordas `#2a2a2a`, header uppercase cinza pequeno, hover sutil nas linhas
- ROAS badge: verde `>2x`, amarelo `1-2x`, vermelho `<1x`
- Ícones via Lucide: `GitBranch`, `MessageSquare`, `BarChart3`, `DollarSign`, `ShoppingCart`, `TrendingUp`
- Gráfico usa `ResponsiveContainer`, `LineChart`, `Line`, `XAxis`, `YAxis`, `Tooltip`, `CartesianGrid` do recharts

### Dependências
- `recharts` — já disponível no projeto (usado pelo componente `chart.tsx`)
- Lucide React — já instalado

