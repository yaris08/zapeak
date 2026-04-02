

# 2 Alterações: Gerenciador de Pixels + Node Pixel Select

## Arquivos

| Arquivo | Ação |
|---------|------|
| `src/pages/ConfiguracoesPage.tsx` | Editar — substituir aba Pixel por gerenciador multi-pixel |
| `src/components/flow/properties/PixelProperties.tsx` | Editar — substituir campos por select de pixel cadastrado |

## 1. ConfiguracoesPage.tsx — Aba Facebook Pixel

### Remover
- States: `pixelId`, `pixelToken`, `pixelDataset`, `showPixelToken`, `pixelSaved`, `maskedPixelId`
- Campos individuais de Pixel ID, Token, Dataset ID, toggle server-side
- Lógica de save/load relacionada ao pixel individual

### Adicionar

**Imports**: `Pencil, Trash2, Plus` de lucide-react; `Dialog, DialogContent, DialogHeader, DialogTitle` de shadcn

**Interface Pixel**:
```
{ id: string; name: string; pixelId: string; token: string; datasetId: string; serverSide: boolean; active: boolean }
```

**States**:
- `pixels`: array de Pixel, inicializado com 2 mockados (Principal "1234567890" e Vendas "9876543210")
- `showPixelModal`: boolean
- `editingPixel`: Pixel | null (null = novo)
- `modalForm`: { name, pixelId, token, datasetId, serverSide, showToken }

**Renderização da aba**:
1. Header: "Pixels Cadastrados" + botão "Adicionar Pixel" (verde, pequeno, ícone Plus)
2. Lista de cards para cada pixel:
   - Nome + ID + badge "Ativo"/"Inativo" (verde/cinza)
   - Toggle ativar/desativar
   - Botões Pencil (editar) e Trash2 (excluir)
   - Estilo: `bg-[#0f0f0f] border-[#2a2a2a] rounded-lg p-3`
3. Botão "Testar Conexão" (mantido)
4. Info box azul (mantido)

**Modal Adicionar/Editar Pixel**:
- Campos: Nome, Pixel ID, Token (password + eye), Dataset ID, toggle server-side
- Botões: Cancelar | Salvar Pixel (verde)
- Ao salvar: adiciona/atualiza no array `pixels`, toast "✓ Pixel salvo com sucesso"
- Ao editar: preenche form com dados existentes (token fica vazio, placeholder "Token salvo")

**Persistência**: salvar/carregar array `pixels` em `zapeak_settings_pixels` via localStorage no handleSave global e useEffect

### handleSave
- Aba pixel: salvar array `pixels` no localStorage

## 2. PixelProperties.tsx — Select de Pixel

### Remover
- Campos "Pixel ID" e "Token de Acesso"

### Substituir por
- Select "Selecionar Pixel" com opções mockadas:
  - `"principal"` → "Pixel Principal (1234567890)"
  - `"vendas"` → "Pixel Vendas (9876543210)"
  - `"new"` → "+ Cadastrar novo pixel →"
- Ao selecionar "new": `window.location.href = "/configuracoes"` (ou `useNavigate`)
- Salva em `data.selectedPixelId`

### Manter
- Select Evento (5 opções)
- Input Valor (opcional)
- Select Moeda (BRL/USD/EUR)
- Toggle "Usar dados do contato"

### Imports adicionais
- `useNavigate` de react-router-dom

