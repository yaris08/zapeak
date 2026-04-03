

# 3 Funcionalidades: Login, Notificações, Estados Vazios

## Arquivos

| Arquivo | Ação |
|---------|------|
| `src/pages/LoginPage.tsx` | Criar — tela de login simulada |
| `src/components/ui/EmptyState.tsx` | Criar — componente reutilizável |
| `src/App.tsx` | Editar — auth guard, rota /login |
| `src/components/layout/AppLayout.tsx` | Editar — sino de notificações, dropdown, logout no avatar |
| `src/pages/FlowsPage.tsx` | Editar — estado vazio |
| `src/pages/ContatosPage.tsx` | Editar — estado vazio |
| `src/pages/AtendimentoPage.tsx` | Editar — estado vazio na lista |
| `src/pages/InstanciasPage.tsx` | Editar — estado vazio |
| `src/pages/HomePage.tsx` | Editar — toggle "simular vazio" + KPIs zerados |

## 1. LoginPage.tsx (criar)

- Layout: fundo `#0a0a0a`, centralizado vertical e horizontal, sem AppLayout
- Card: `bg-[#1a1a1a]`, `border border-[#2a2a2a]`, `rounded-xl`, `p-10`, `max-w-[400px] w-full`
- Logo Zap verde + "ZaPeak", subtítulo, separador
- Inputs email + senha (com toggle show/hide via Eye/EyeOff)
- Link "Esqueci minha senha" alinhado à direita, verde
- Botão "Entrar" verde full-width
- Texto "Não tem conta? Fale conosco" com link verde
- Ao submit: `localStorage.setItem("zapeak_auth", "true")`, navegar para `/`

## 2. App.tsx — auth guard

- Estado `isAuthenticated` lido de `localStorage.getItem("zapeak_auth") === "true"`
- Listener `storage` event para sync entre abas
- Rota `/login` → `<LoginPage />`
- Todas as rotas do `AppLayout` e `/flows/:id/editor`: se não autenticado, `<Navigate to="/login" />`
- Rota `/login` com autenticado → `<Navigate to="/" />`

## 3. AppLayout.tsx — notificações + logout

### Notificações
- Estado `notifications` com array mockado (4 itens conforme especificado)
- Estado `showNotifications` para toggle dropdown
- Ícone `Bell` (18px) antes do avatar, com badge vermelho contando não-lidas
- Dropdown: `absolute right-0 top-full`, `bg-[#1a1a1a]`, `border border-[#2a2a2a]`, `rounded-lg`, `w-80`, `z-50`
- Header: "Notificações" + botão "Marcar todas como lidas"
- Lista: ícone por tipo (DollarSign/verde, MessageSquare/azul, Zap/roxo), título bold, desc cinza, time
- Não-lidas: `bg-[#1f1f1f]`, lidas: transparent
- Footer: "Ver todas"
- Fechar ao clicar fora (useEffect com click listener)

### Logout
- Avatar clicável → dropdown com "Sair"
- Ao clicar: `localStorage.removeItem("zapeak_auth")`, navegar para `/login`

### Imports adicionais
- `Bell, DollarSign, LogOut, Eye` de lucide-react
- `useNavigate` de react-router-dom

## 4. EmptyState.tsx (criar)

```tsx
interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}
```
- Centralizado, flex-col items-center, gap-3
- Ícone 48px com opacity 0.5 e cor verde
- Título bold, subtítulo cinza, texto centralizado max-w-sm
- Botão verde opcional

## 5. Estados vazios nas páginas

### FlowsPage.tsx
- Se `flows.length === 0`: `<EmptyState icon={GitBranch} title="Nenhum fluxo criado ainda" subtitle="Crie seu primeiro fluxo..." buttonLabel="Criar primeiro fluxo" onButtonClick={() => setShowNewFlow(true)} />`
- Dados mockados existem, então: adicionar estado `simulateEmpty` ou simplesmente mostrar quando array vazio (o componente está pronto para quando dados reais chegarem)
- Como os dados são hardcoded, usar lógica condicional: `const displayFlows = flows` (sem toggle aqui, empty state fica preparado)

### ContatosPage.tsx
- Se `filteredContacts.length === 0` e sem busca ativa: EmptyState com Users, "Nenhum contato ainda"
- Se com busca sem resultados: texto "Nenhum resultado para..."

### AtendimentoPage.tsx
- Na lista de conversas, se filtradas === 0: ícone MessageSquare 40px cinza + "Nenhuma conversa ainda"

### InstanciasPage.tsx
- Se `instances.length === 0`: EmptyState com Smartphone, "Nenhuma instância conectada", botão "Criar instância"

### HomePage.tsx
- Estado `simulateEmpty` (default false)
- Toggle discreto no canto: texto cinza pequeno "Simular vazio" com Switch
- Se ativo: KPIs mostram "—", funil com barras zeradas, tabelas com texto "Sem dados"

## Consideração de segurança
A autenticação via localStorage é simulada (mock) conforme solicitado. Não há validação real — qualquer email/senha funciona. Quando backend estiver pronto, substituir por autenticação real via Supabase.

