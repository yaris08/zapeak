

# Funcionalidades no AtendimentoPage.tsx

## Arquivo único
`src/pages/AtendimentoPage.tsx` — edições no componente existente

## Alterações

### Imports adicionais
- `lucide-react`: `StopCircle, Play, DollarSign, Bot`
- `sonner`: `toast`
- `Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter` de `@/components/ui/dialog`
- `AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction` de `@/components/ui/alert-dialog`

### Novos states
- `showFlowModal: boolean`
- `selectedFlow: number | null`
- `showStopModal: boolean`
- `activeFlow: string | null` (inicia com `"Boas-vindas"`)
- `showPaymentModal: boolean`
- `paymentValue: string`
- `paymentNote: string`
- `paymentCampaign: string`
- `contactTags: Record<number, {label, color}[]>` — cópia local dos tags para poder adicionar "pago"

### 1. Modal "Iniciar Fluxo"
- Usa `Dialog` do shadcn
- Lista 4 fluxos mockados como cards clicáveis (Boas-vindas, Qualificação Lead, Suporte Automático, Recuperação Carrinho)
- Card selecionado: `border-[#22c55e] bg-[#1a2a1a]`
- Botões: Cancelar (fecha) | Disparar Fluxo (verde) — ao confirmar:
  - `setActiveFlow(nome do fluxo)`
  - Toast `✓ Fluxo disparado para {nome}`
  - Adiciona mensagem sistema `🤖 Fluxo '{nome}' iniciado manualmente`
  - Fecha modal

### 2. Botão "Parar Fluxo" no header do chat
- Inserido entre "Transferir" e "Resolver"
- Outline pequeno com ícone `StopCircle` vermelho
- Só aparece quando `activeFlow !== null`
- Ao clicar: abre `AlertDialog` de confirmação
- Ao confirmar:
  - `setActiveFlow(null)`
  - Toast `✓ Fluxo pausado`
  - Mensagem sistema `⏹ Fluxo interrompido manualmente`

### 3. Botão "Marcar como Pago" no painel direito
- Inserido entre "Iniciar Fluxo" e "Marcar como Resolvido"
- Outline verde, ícone `DollarSign`, largura total
- Ao clicar: abre `Dialog` com inputs valor, observação, select campanha
- Ao confirmar:
  - Toast `✓ Pagamento de R$ X,XX registrado`
  - Adiciona badge "pago" ao contato se não tiver
  - Mensagem sistema `💰 Pagamento de R$ X,XX registrado manualmente`

### 4. Indicador de Fluxo Ativo
- Abaixo do nome/telefone no header do chat
- `activeFlow`: ícone `Bot` (12px) verde + texto `Fluxo ativo: {nome}` em cinza pequeno
- Sem fluxo: ícone `Bot` cinza + `Sem fluxo ativo`

### 5. Shift+Enter
- Já funciona — o `handleKeyDown` atual só envia em Enter sem Shift. Textarea com `resize-none` já suporta multiline. Nada a mudar aqui.

