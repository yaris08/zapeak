

# Substituir Funil de Conversão por design em cascata

## Arquivo único
`src/pages/HomePage.tsx`

## Alteração

Substituir o bloco inteiro do funil (o `<div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">` que contém "Funil de Conversão" e o `space-y-4` com os steps) pelo novo layout em cascata fornecido pelo usuário.

- Manter o wrapper card (`bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4`) e o título "Funil de Conversão"
- Remover o `funnel` useMemo (já não será usado — os valores ficam inline com `Math.round(X * m)`)
- Remover imports não usados: `MessageCircle`, `UserCheck`, `ShoppingBag` (verificar se usados em outro lugar)
- `CheckCircle` — verificar se usado nos KPIs, senão remover também

Os 4 valores dinâmicos no novo layout: `500*m`, `400*m`, `272*m`, `51*m` — já escalados pelo multiplicador de período.

