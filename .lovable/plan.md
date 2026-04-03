

# Tornar o botão "Simular venda" acessível

## Problema
O botão "Simular venda" existe no dropdown do avatar, mas só aparece quando `pushEnabled === true`. Não há como ativar isso pela interface — falta um botão de ativar notificações push no dropdown.

## Solução
Adicionar um botão "Ativar notificações" / "Desativar notificações" no dropdown do avatar (antes do "Simular venda"), que chama `handleTogglePush`. Assim o usuário pode ativar as notificações push do navegador e, uma vez ativo, o botão "Simular venda" aparece.

## Arquivo
`src/components/layout/AppLayout.tsx`

## Alteração
No dropdown do avatar (linha ~231), adicionar um botão com ícone `Bell` / `BellOff`:

```tsx
<button
  onClick={() => { handleTogglePush(); setShowUserMenu(false); }}
  className="w-full flex items-center gap-2 px-4 py-2 text-xs hover:bg-[#2a2a2a] transition-colors"
  style={{ color: "#22c55e" }}
>
  {pushEnabled ? <><BellOff size={14} /> Desativar notificações</> : <><Bell size={14} /> Ativar notificações</>}
</button>
```

Adicionar `BellOff` ao import do lucide-react (Bell já está importado).

Ordem no dropdown:
1. Ativar/Desativar notificações
2. Simular venda (condicional, só se pushEnabled)
3. Sair

