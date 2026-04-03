

# Adicionar botão "Simular venda" e função de simulação

## Arquivo
`src/components/layout/AppLayout.tsx`

## Alterações

### 1. Adicionar `simulateSaleNotification` (após linha 92, logo após `showSaleNotification`)
Função que escolhe aleatoriamente entre 3 vendas simuladas e dispara uma notificação nativa.

### 2. Adicionar botão no dropdown do usuário (linha 218, antes do botão "Sair")
Botão condicional `{pushEnabled && (...)}` com ícone `Zap` e texto "Simular venda", cor `#f59e0b`. Fecha o menu ao clicar.

Nenhuma outra parte do arquivo será alterada. `Zap` já está importado.

