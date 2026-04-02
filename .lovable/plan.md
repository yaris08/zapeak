

# Remover aba WhatsApp das Configurações

## Arquivo único
`src/pages/ConfiguracoesPage.tsx`

## Alterações

1. **Remover "whatsapp" do type `Tab`** — fica `"pixel" | "ia" | "notificacoes"`
2. **Remover item whatsapp do array `tabs`** — ficam 3 itens
3. **Mudar default do `activeTab`** — de `"whatsapp"` para `"pixel"`
4. **Remover bloco condicional `{activeTab === "whatsapp" && (...)}`** inteiro
5. **Remover `handleSave` caso whatsapp** — a linha `if (activeTab === "whatsapp")...`
6. **Remover import `QrCode`** se não usado em outro lugar

Nenhuma outra alteração.

