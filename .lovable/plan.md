

# Chat de Atendimento ao Vivo — AtendimentoPage.tsx

## Arquivo único
`src/pages/AtendimentoPage.tsx` — substituição completa

## Layout
3 colunas `flex` com `h-full`: esquerda (280px fixa), centro (flex-1), direita (260px fixa). Bordas `#2a2a2a` entre colunas. Background `#0f0f0f`.

## State
- `selectedContact: number` (índice, default 0 = João)
- `messages: Message[]` (array do chat ativo)
- `inputValue: string`
- `activeTab: "todas" | "aguardando" | "resolvidas"`
- `searchQuery: string`

## Coluna esquerda — Lista de conversas
- Header com título "Atendimento" + Input de busca (ícone Search)
- 3 abas com underline verde na ativa
- 6 contatos mockados com avatar (inicial, bg `#2a2a2a`), nome, preview truncada, horário, badge de não lidas (bolinha verde), badge de etiqueta (pago/lead/suporte)
- Selecionado: `bg-[#1a1a1a]` + `border-l-2 border-[#22c55e]`
- Hover: `bg-[#1f1f1f]`

## Coluna central — Chat
- Header: avatar + nome + telefone + badge + botões "Transferir" (outline) e "Resolver" (verde)
- Mensagens mockadas da conversa do João (8 msgs) com 4 tipos visuais:
  - Bot: bolha `#2a2a2a`, esquerda, label "Bot" verde
  - Contato: bolha `#1a1a1a` borda `#2a2a2a`, esquerda
  - Atendente (Você): bolha `#1a2a1a` borda `#22c55e20`, direita
  - Sistema: centralizado, itálico, cinza, fundo `#1a1a1a`
- Input funcional: textarea + botões (Paperclip, Mic, Send verde). Enter adiciona bolha à direita.

## Coluna direita — Perfil
- Avatar grande centralizado
- Info: nome, telefone, status badge
- Etiquetas: chips coloridos + botão "+ Adicionar"
- Histórico: 3 conversas anteriores, primeiro contato, fluxo
- Ações: "Iniciar Fluxo" (outline) + "Marcar como Resolvido" (verde)

## Imports
- `lucide-react`: Search, Send, Paperclip, Mic, Phone, Tag, Clock, MessageSquare, ArrowRight, CheckCircle
- Componentes nativos (sem shadcn extras)

