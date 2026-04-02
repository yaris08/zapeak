
# Mover botão "Salvar configurações" para dentro de cada card

## Arquivo único
`src/pages/ConfiguracoesPage.tsx`

## Alterações

### Remover
- Botão fixo `fixed bottom-6 right-6` (linhas 457-460)

### Adicionar em cada aba — dentro do card, após o último elemento e antes do `</div>` de fechamento do card:

Bloco padrão a inserir:
```html
<div className="border-t border-[#2a2a2a] pt-4 flex justify-end">
  <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-[#22c55e] text-white text-sm font-medium hover:bg-[#22c55e]/90 transition-colors flex items-center gap-2">
    <Save size={14} /> Salvar configurações
  </button>
</div>
```

### Posição exata por aba:

1. **Pixel** (após info box azul, linha 270, dentro do `<div className="bg-[#1a1a1a]...">` que fecha na linha 272)
2. **IA** (após o Select de modelo, linha 354, dentro do card que fecha na linha 355)
3. **Notificações** (após info box amarelo, linha 416, dentro do card que fecha na linha 417)
