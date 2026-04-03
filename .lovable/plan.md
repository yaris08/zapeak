

# Adicionar notificações push e exposição global

## Arquivo
`src/components/layout/AppLayout.tsx`

## Alterações

### 1. Adicionar estado `pushEnabled`
Na seção de estados (após linha 58), adicionar:
```ts
const [pushEnabled, setPushEnabled] = React.useState(false);
```

### 2. Adicionar `handleTogglePush` (após `handleLogout`, linha 91)
Função completa que solicita permissão de notificação do navegador e envia uma notificação de confirmação.

### 3. Adicionar `showSaleNotification` (logo após `handleTogglePush`)
Função que dispara notificação nativa do navegador com valor de venda.

### 4. Adicionar useEffect para expor no `window` (após os useEffects existentes, ~linha 81)
```ts
React.useEffect(() => {
  (window as any).zapeak_showSaleNotification = showSaleNotification;
}, [pushEnabled]);
```

### 5. Copiar ícone PWA
Copiar `user-uploads://Favicon_512_x_512_px-2.png` → `public/zapeak-icon-512.png` (atualizar com a nova imagem enviada).

Nenhuma outra parte do arquivo será alterada.

