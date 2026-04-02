

# Substituir bolinhas por ícones no Funil de Conversão

## Arquivo único
`src/pages/HomePage.tsx`

## Alterações

1. **Imports** — adicionar `Users`, `Bot`, `CheckCircle`, `ShoppingCart` de `lucide-react` (verificar quais já estão importados)

2. **Etapa 1** — substituir `<div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />` por `<Users size={14} color="#22c55e" style={{ flexShrink: 0 }} />`

3. **Etapa 2** — substituir bolinha por `<Bot size={14} color="#22c55e" style={{ opacity: 0.8, flexShrink: 0 }} />`

4. **Etapa 3** — substituir bolinha por `<CheckCircle size={14} color="#22c55e" style={{ opacity: 0.6, flexShrink: 0 }} />`

5. **Etapa 4** — substituir bolinha por `<ShoppingCart size={14} color="#22c55e" style={{ opacity: 0.4, flexShrink: 0 }} />`

Nenhuma outra alteração.

