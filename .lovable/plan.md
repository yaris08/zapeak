

# Corrigir espaçamento e telefones em AtribuicaoPage.tsx

## Arquivo único
`src/pages/AtribuicaoPage.tsx`

## Alterações

### 1. Import
Adicionar `MessageCircle` ao import de `lucide-react` (linha 2)

### 2. salesBase — números completos + wa links (linhas 28-34)
Substituir `phone` mascarados e adicionar campo `wa`:
- João Silva → `phone: "(11) 98765-4321"`, `wa: "https://wa.me/5511987654321"`
- Maria Souza → `phone: "(11) 91234-5678"`, `wa: "https://wa.me/5511912345678"`
- Carlos Lima → `phone: "(11) 99876-5432"`, `wa: "https://wa.me/5511998765432"`
- Ana Paula → `phone: "(11) 92345-6789"`, `wa: "https://wa.me/5511923456789"`
- Pedro Costa → `phone: "(11) 98123-4567"`, `wa: "https://wa.me/5511981234567"`

### 3. Telefone na tabela — link clicável (linha 186)
Substituir `<td className="px-4 py-2.5 text-muted-foreground">{s.phone}</td>` por:
```tsx
<td className="px-4 py-2.5">
  <a href={s.wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5" style={{ color: "#22c55e", fontSize: "12px", textDecoration: "none" }}>
    <MessageCircle size={12} />{s.phone}
  </a>
</td>
```

### 4. Espaçamento — já correto
O wrapper `<div className="p-6 space-y-6">` já aplica `space-y-6` (24px gap) entre todos os blocos filhos. O espaçamento entre header e KPIs já é consistente com as outras páginas. Nenhuma alteração necessária aqui.

