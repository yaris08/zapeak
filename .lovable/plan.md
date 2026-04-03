

# Corrigir botão "Ativar notificações" no dropdown

## Problemas identificados
1. **Texto em duas linhas**: O dropdown tem `w-40` (160px), muito estreito para "Ativar notificações" em uma linha
2. **Não funciona**: `setShowUserMenu(false)` é chamado junto com `handleTogglePush()` — o menu fecha antes da permissão do navegador ser processada

## Alterações — `src/components/layout/AppLayout.tsx`

### 1. Aumentar largura do dropdown
Mudar `w-40` para `w-52` (208px) para caber o texto em uma linha.

### 2. Corrigir o onClick do botão de notificações
Não fechar o menu imediatamente — só fechar após a permissão ser concedida. Mudar para:
```tsx
onClick={() => { handleTogglePush(); }}
```
E dentro de `handleTogglePush`, adicionar `setShowUserMenu(false)` após o resultado da permissão.

### 3. Adicionar `whitespace-nowrap` ao botão
Para garantir que o texto nunca quebre em duas linhas.

