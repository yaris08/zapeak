

# Corrigir Alinhamento das Mensagens — WhatsApp Style

## Arquivo único
`src/pages/AtendimentoPage.tsx` — editar bloco de renderização de mensagens (linhas 363-398)

## Alterações

### Mensagens do sistema (linhas 365-372)
- Adicionar `mb-3` no wrapper
- Mudar texto para `text-[11px]`

### Mensagens contact/bot/agent (linhas 374-397)
Substituir toda a estrutura por:

**Contact** (esquerda):
- `flex items-start gap-2 mb-3`
- Avatar circular (inicial, bg `#2a2a2a`, 28px) à esquerda
- Label com nome do contato acima (apenas na primeira msg consecutiva do mesmo sender — verificar `prevMsg`)
- Bolha: `bg-[#2a2a2a] rounded-2xl rounded-tl-sm max-w-xs lg:max-w-md px-3 py-2`
- Horário abaixo em `text-[10px]`

**Bot** (esquerda):
- `flex items-start gap-2 mb-3`
- Sem avatar (spacer de 28px para alinhar com contact)
- Label "Bot" em verde `#22c55e` acima
- Bolha: `bg-[#1e2a1e] rounded-2xl rounded-tl-sm max-w-xs lg:max-w-md px-3 py-2`
- Horário abaixo

**Agent** (direita):
- `flex items-start justify-end gap-2 mb-3`
- `flex-col items-end`
- Bolha: `bg-[#22c55e]/20 border border-[#22c55e]/30 rounded-2xl rounded-tr-sm max-w-xs lg:max-w-md px-3 py-2`
- Horário abaixo à direita

### Lógica de label consecutivo
Antes do map, verificar índice anterior para mostrar label apenas na primeira mensagem consecutiva do mesmo sender:
```
const prevMsg = index > 0 ? currentMessages[index - 1] : null;
const showLabel = prevMsg?.sender !== msg.sender;
```

### Nenhuma outra alteração
Layout, funcionalidades, modais, inputs — tudo mantido.

