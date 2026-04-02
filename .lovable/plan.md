

# Criar página de Contatos

## Arquivos

| Arquivo | Ação |
|---------|------|
| `src/pages/ContatosPage.tsx` | Criar |
| `src/App.tsx` | Editar — adicionar rota `/contatos` |

## 1. App.tsx

- Importar `ContatosPage`
- Adicionar `<Route path="/contatos" element={<ContatosPage />} />` dentro do `AppLayout` (linha 33, antes do fechamento)
- Sidebar já tem o link "Contatos" apontando para `/contatos`

## 2. ContatosPage.tsx — Componente completo

### State
- `search`, `tagFilter`, `instanceFilter`, `statusFilter` — filtros
- `currentPage` — paginação
- `selectedContact` — contato para modal (null ou objeto)

### Dados mockados
Array de 8 contatos com: `id`, `name`, `initial`, `phone`, `wa`, `tags[]`, `instance`, `lastContact`, `status`, `conversations`, `firstContact`, `flows[]`

### Layout (de cima para baixo)

1. **Header**: título "Contatos" + subtítulo + botão "Exportar CSV" (outline, ícone Download)

2. **Filtros**: input busca + 3 selects (Etiqueta, Instância, Status) + botão "Limpar filtros"

3. **KPIs**: 3 cards lado a lado
   - Total de Contatos: 1.247 (Users, azul `#3b82f6`)
   - Pagaram: 312 (DollarSign, verde `#22c55e`)
   - Taxa de conversão: 25% (TrendingUp, laranja `#f97316`)

4. **Tabela**: 8 colunas — Avatar (círculo bg `#2a2a2a` + inicial), Nome, Telefone (link verde wa.me), Etiquetas (chips: pago=verde, lead=azul, suporte=amarelo, cliente=roxo), Instância, Último contato, Status (badge verde/cinza), Ações (MessageCircle + Eye)

5. **Paginação**: "Mostrando 8 de 1.247 contatos" + botões Anterior/1/2/3/.../Próximo

6. **Modal**: Dialog com avatar grande, nome, número, etiquetas, instância, status, histórico, fluxos, botões "Abrir no Atendimento" (verde) + "Fechar" (outline)

### Filtros funcionais
- Busca filtra por nome ou telefone
- Selects filtram por tag, instância, status
- "Limpar filtros" reseta tudo

### Imports
- `lucide-react`: Users, DollarSign, TrendingUp, MessageCircle, Eye, Download, Search, X
- `Dialog` de shadcn
- `Select` de shadcn
- `Input` de shadcn
- `useNavigate` para "Abrir no Atendimento"

### Estilo
- Cards `bg-[#1a1a1a]`, bordas `border-[#2a2a2a]`
- Hover tabela `hover:bg-[#222]`
- Tema dark padrão do projeto

