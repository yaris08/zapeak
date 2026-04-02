

# Tornar AppLayout e Páginas Responsivas para Mobile

## Arquivos a alterar

| Arquivo | Ação |
|---------|------|
| `src/components/layout/AppLayout.tsx` | Editar — menu hamburger, sidebar mobile drawer, overlay |
| `src/pages/HomePage.tsx` | Editar — padding responsivo, tabelas com scroll |
| `src/pages/FlowsPage.tsx` | Editar — botão full-width mobile, padding responsivo |
| `src/pages/AtribuicaoPage.tsx` | Editar — KPIs 2 colunas, padding responsivo |
| `src/pages/RelatoriosPage.tsx` | Editar — padding responsivo (KPIs já são 2 colunas) |
| `src/pages/ContatosPage.tsx` | Editar — colunas ocultas, padding responsivo |
| `src/pages/InstanciasPage.tsx` | Editar — padding responsivo (grid já é responsivo) |
| `src/pages/AtendimentoPage.tsx` | Editar — layout mobile com drawers |
| `src/pages/ConfiguracoesPage.tsx` | Editar — tabs scroll horizontal, padding responsivo |
| `src/pages/FlowEditor.tsx` | Editar — aviso mobile |

## 1. AppLayout.tsx — Responsivo completo

### Estado
- Adicionar `const [mobileMenuOpen, setMobileMenuOpen] = useState(false)`
- Importar `Menu, X` de lucide-react
- `useEffect` com `location.pathname` para fechar menu ao navegar
- Importar `useIsMobile` de `@/hooks/use-mobile`

### Header
- Nav central: `hidden md:flex`
- Avatar: `hidden md:flex`
- Botão hamburger: `md:hidden`, ícone `Menu`, onClick toggle mobileMenuOpen

### Sidebar desktop
- Wrapper `aside`: adicionar `hidden md:flex` para ocultar no mobile

### Sidebar mobile
- Overlay: `fixed inset-0 z-50 bg-black/60`, onClick fecha menu, visível apenas quando `mobileMenuOpen`
- Sidebar: `fixed left-0 top-0 z-50 h-screen w-[80%] max-w-[280px] bg-sidebar border-r border-border flex flex-col`
- Transição: `transition-transform duration-300`, `translate-x-0` quando aberto, `-translate-x-full` quando fechado
- Botão X no topo para fechar
- Sem botão "Recolher" no mobile
- Links iguais ao sidebarItems

### Main content
- Ocupa 100% no mobile (sidebar não ocupa espaço)

## 2. Páginas — Padding responsivo

Todas as páginas que usam `p-6` passam a usar `p-3 md:p-6`.

## 3. HomePage.tsx
- KPIs grid: já tem `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` — OK
- Tabelas Campanhas e Vendas: já têm `overflow-x-auto` — OK
- Apenas mudar `p-6` → `p-3 md:p-6`

## 4. FlowsPage.tsx
- `p-6` → `p-3 md:p-6`
- Botão "Novo Fluxo": adicionar `w-full md:w-auto` no mobile

## 5. AtribuicaoPage.tsx
- `p-6` → `p-3 md:p-6`
- KPIs: `grid-cols-4` → `grid-cols-2 md:grid-cols-4`

## 6. RelatoriosPage.tsx
- `p-6` → `p-3 md:p-6`
- KPIs já usam `grid-cols-2 md:grid-cols-4` — OK

## 7. ContatosPage.tsx
- `p-6` → `p-3 md:p-6`
- Colunas "Instância" e "Último contato": adicionar `hidden md:table-cell` no `<th>` e `<td>`

## 8. InstanciasPage.tsx
- `p-6` → `p-3 md:p-6`
- Grid de cards já tem `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — OK
- KPIs: `grid-cols-3` → `grid-cols-1 sm:grid-cols-3`

## 9. AtendimentoPage.tsx — Layout mobile com drawers
- Estado: `showMobileContacts` e `showMobileProfile`
- Mobile (< md):
  - Apenas chat visível por padrão
  - Botão menu no header do chat abre lista de conversas (drawer da esquerda, fixed, z-50, mesma lógica de overlay)
  - Botão "Ver perfil" abre perfil (drawer da direita)
  - Contact list: `hidden md:flex` no desktop wrapper; drawer mobile com overlay
  - Profile panel: `hidden md:block` no desktop wrapper; drawer mobile
- Desktop: layout 3 colunas inalterado

## 10. ConfiguracoesPage.tsx
- `p-6` → `p-3 md:p-6`
- Tabs container: `overflow-x-auto` para scroll horizontal

## 11. FlowEditor.tsx — Aviso mobile
- Importar `useIsMobile` e `Monitor`
- Estado `dismissedMobileWarning`
- Se mobile e não dismissed: tela cheia com aviso centralizado
  - Ícone Monitor grande
  - Texto "O editor de fluxos funciona melhor no desktop"
  - Botão "Continuar mesmo assim" que seta dismissed = true
- Se dismissed ou desktop: editor normal

## Regras
- Breakpoint `md` (768px) como divisor
- Nenhuma lógica de negócio alterada
- Cores e design mantidos
- Apenas classes Tailwind responsivas

