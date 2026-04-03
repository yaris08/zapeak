

# Mostrar notificações e perfil no mobile

## Arquivo
`src/components/layout/AppLayout.tsx`

## Alteração
Linha 127: trocar `hidden md:flex` por `flex` na div que contém as notificações e o avatar do usuário, para que apareçam também no mobile.

De: `<div className="hidden md:flex items-center gap-2">`
Para: `<div className="flex items-center gap-2">`

Nenhuma outra alteração.

