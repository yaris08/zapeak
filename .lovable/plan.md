

# CustomEdge — Linha pontilhada animada + área de clique melhorada

## Arquivo único
`src/components/flow/edges/CustomEdge.tsx`

## Alterações no return
1. **Path invisível** (`strokeWidth: 20`, `stroke: transparent`) para facilitar clique na edge
2. **Path visível** com `strokeDasharray: "6 4"` e animação CSS `dashdraw` (dash offset loop 0.5s)
3. **Estilo dinâmico**: cor `#ff6b35` e `strokeWidth: 3` quando selecionada, senão `#f97316` / 2
4. **Tag `<style>`** inline com `@keyframes dashdraw`
5. **Botão delete** (Trash2) mantido, exibido apenas quando `selected`

Nenhum outro arquivo alterado.

