

# Adicionar botão hamburger ao lado esquerdo da logo no header

## Arquivo
`src/components/layout/AppLayout.tsx`

## Alteração
Na div do logo no header (linha 97-99), adicionar um botão `Menu` (ícone ≡) **antes** da imagem da logo. Esse botão alterna `sidebarCollapsed` no desktop e `mobileMenuOpen` no mobile.

```
<div className="flex items-center gap-2">
  <button onClick={toggleSidebar} className="p-1.5 text-muted-foreground hover:text-foreground">
    <Menu size={20} />
  </button>
  <img src={zapeakLogo} alt="ZaPeak" className="h-8" />
</div>
```

- No desktop (`md+`): clica → alterna `sidebarCollapsed`
- No mobile: clica → alterna `mobileMenuOpen` (comportamento atual do botão mobile, que será movido para cá)

Remover o botão `Menu` separado que existe no canto direito para mobile (linha ~165) e o botão "← Recolher" no rodapé da sidebar (linha ~222), já que o hamburger no header substitui ambos.

Nenhuma outra alteração.

