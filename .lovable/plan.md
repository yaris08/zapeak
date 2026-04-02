

# Corrigir Responsividade Mobile — Scroll Horizontal e Layout

## Arquivos a alterar

| Arquivo | Ação |
|---------|------|
| `src/index.css` | Editar — adicionar `overflow-x: hidden` no html/body |
| `src/components/layout/AppLayout.tsx` | Editar — ajustar overlay z-index, main width |
| `src/pages/HomePage.tsx` | Editar — header flex-col mobile, funil responsivo, tabelas min-width |
| `src/pages/FlowsPage.tsx` | Editar — header flex-col mobile |
| `src/pages/AtribuicaoPage.tsx` | Editar — tabelas min-width, ocultar coluna mobile |
| `src/pages/RelatoriosPage.tsx` | Editar — tabelas min-width |
| `src/pages/ContatosPage.tsx` | Editar — filtros empilháveis, tabela min-width |
| `src/pages/InstanciasPage.tsx` | OK — já responsivo |
| `src/pages/ConfiguracoesPage.tsx` | Editar — tabs whitespace-nowrap |
| `src/pages/AtendimentoPage.tsx` | OK — já com drawers mobile |
| `src/pages/FlowEditor.tsx` | OK — já com aviso mobile |

## 1. index.css — impedir scroll horizontal global

Adicionar ao final do segundo `@layer base`:
```css
html, body {
  overflow-x: hidden;
  max-width: 100vw;
}
```

## 2. AppLayout.tsx

- Linha 106: overlay z-index de `z-50` para `z-40` (abaixo do drawer)
- Linha 152: main — adicionar `w-full min-w-0` para impedir overflow

## 3. HomePage.tsx

- Header (linha 117): `flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3`
- Funil (linhas 162-214): cada etapa — adicionar `flex-wrap` e `min-w-0` no container interno; barra de progresso wrapper: `hidden sm:flex` ou largura reduzida via `w-[80px] sm:w-[120px]`
- Tabela Campanhas (linha 235): adicionar `min-w-[600px]` na `<table>`
- Tabela Vendas (linha 275): adicionar `min-w-[700px]` na `<table>`, ocultar coluna "Telefone" no mobile com `hidden sm:table-cell`

## 4. FlowsPage.tsx

- Header (linha 37): `flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6`
- O botão já tem `w-full md:w-auto` — OK

## 5. AtribuicaoPage.tsx

- Tabela campanhas (linha 120): adicionar `min-w-[650px]` na `<table>`
- Tabela vendas (linha 170): adicionar `min-w-[700px]` na `<table>`
- Ocultar coluna "Campanha" no mobile: adicionar `hidden sm:table-cell` no th e td da coluna "Campanha" na tabela de vendas

## 6. RelatoriosPage.tsx

- Tabela desempenho (linha 157): adicionar `min-w-[600px]` na `<table>`

## 7. ContatosPage.tsx

- Filtros (linha 67): garantir `flex-wrap` (já tem) e remover `min-w-[200px]` do input de busca → usar `min-w-0 w-full sm:flex-1 sm:min-w-[200px]`
- Tabela (linha 137): adicionar `min-w-[700px]` na `<table>`
- Paginação (linha 189-198): `flex flex-col sm:flex-row` para empilhar no mobile

## 8. ConfiguracoesPage.tsx

- Tabs (linha 212): adicionar `flex-nowrap whitespace-nowrap` nos botões de aba

## Regras aplicadas
- Breakpoint `md`/`sm` como divisor
- Nenhuma lógica de negócio alterada
- Desktop inalterado
- Todas as tabelas com `overflow-x-auto` + `min-width` para scroll horizontal controlado

