

# 3 Alterações no Projeto

## Arquivos

| Arquivo | Ação |
|---------|------|
| `src/data/flowComponents.ts` | Editar — remover 3 componentes |
| `src/pages/ConfiguracoesPage.tsx` | Editar — gerenciador de números admin na aba Notificações |
| `src/components/flow/properties/NotifyProperties.tsx` | Editar — substituir input por select |

## 1. flowComponents.ts — Remover itens

Remover linhas:
- `{ id: "contato", ... type: "contact" }` (linha 22)
- `{ id: "interativa", ... type: "interactive" }` (linha 23)
- `{ id: "cobranca", ... type: "billing" }` (linha 37)

Remover imports não usados: `User`, `LayoutList`, `Receipt`

## 2. ConfiguracoesPage.tsx — Aba Notificações

### Adicionar interface e dados
```
interface AdminNumber {
  id: string; name: string; phone: string; active: boolean;
}
```
Defaults mockados: `{ id: "principal", name: "Principal", phone: "+55 11 99999-9999", active: true }` e `{ id: "backup", name: "Backup", phone: "+55 11 88888-8888", active: true }`

### Novos states
- `adminNumbers: AdminNumber[]`
- `showAdminModal: boolean`
- `editingAdmin: AdminNumber | null`
- `adminForm: { name, phone, active }`

### Remover
- State `notifPhone`
- Input "Número para notificações" e texto helper (linhas 371-374)

### Substituir por (após os 4 toggles)
1. Header "Números de Admin" + botão "Adicionar Número" (verde, Plus)
2. Lista de cards (estilo `bg-[#0f0f0f] border-[#2a2a2a]`) com:
   - Nome + número + badge Ativo/Inativo
   - Botões Pencil (editar) e Trash2 (excluir)
3. Modal Dialog com campos Nome, Número WhatsApp, toggle Ativo
   - Botões Cancelar | Salvar (verde)
   - Toast "✓ Número salvo"

### Persistência
- handleSave notificações: salvar `adminNumbers` junto com toggles
- useEffect load: carregar `adminNumbers` do localStorage

## 3. NotifyProperties.tsx — Select de admin

### Substituir completamente por
- Import: `Select, SelectContent, SelectItem, SelectTrigger, SelectValue` + `useNavigate`
- Select "Selecionar admin" com opções:
  - `"principal"` → "Principal — (11) 99999-9999"
  - `"backup"` → "Backup — (11) 88888-8888"
  - `"todos"` → "Todos os admins"
  - `"new"` → "+ Cadastrar número →" (ao selecionar, `navigate("/configuracoes")`)
- Salvar em `data.selectedAdminId`
- Manter textarea "Mensagem de notificação" inalterada

