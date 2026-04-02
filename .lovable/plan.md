

# Adicionar coluna "Telefone" na tabela de Vendas

## Arquivo único
`src/pages/HomePage.tsx`

## Alterações

1. **Import** — adicionar `MessageCircle` ao import de `lucide-react` (linha 3-6)

2. **baseSales** — adicionar campo `phone` e `wa` a cada item:
   - João Silva → `phone: "(11) 98765-4321"`, `wa: "https://wa.me/5511987654321"`
   - Maria Souza → `phone: "(11) 91234-5678"`, `wa: "https://wa.me/5511912345678"`
   - Carlos Lima → `phone: "(11) 99876-5432"`, `wa: "https://wa.me/5511998765432"`
   - Ana Paula → `phone: "(11) 92345-6789"`, `wa: "https://wa.me/5511923456789"`
   - Pedro Costa → `phone: "(11) 98123-4567"`, `wa: "https://wa.me/5511981234567"`

3. **Header** — alterar array de `["Horário","Nome","Campanha",...]` para `["Horário","Nome","Telefone","Campanha",...]` (linha 278)

4. **Body** — após `<td>` do nome (linha 287), inserir nova `<td>`:
   ```tsx
   <td className="px-4 py-3">
     <a href={s.wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 no-underline" style={{ color: "#22c55e", fontSize: "12px" }}>
       <MessageCircle size={12} />
       {s.phone}
     </a>
   </td>
   ```

Nenhuma outra alteração.

