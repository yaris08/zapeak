

# Criar Properties para 3 nós + registrar no painel + previews

## Arquivos

| Arquivo | Ação |
|---------|------|
| `src/components/flow/properties/FigurinhaProperties.tsx` | Criar |
| `src/components/flow/properties/RandomizadorProperties.tsx` | Criar |
| `src/components/flow/properties/IdentificadorPassagemProperties.tsx` | Criar |
| `src/components/flow/PropertiesPanel.tsx` | Editar — importar + 3 cases no switch |
| `src/components/flow/nodes/GenericNode.tsx` | Editar — 3 previews no renderContent + 3 cases no getPreview |

## 1. Criar 3 componentes de propriedades

Conteúdo exatamente como fornecido pelo usuário:
- **FigurinhaProperties**: input URL WebP + preview da imagem
- **RandomizadorProperties**: lista dinâmica de caminhos com add/remove + probabilidade calculada
- **IdentificadorPassagemProperties**: input nome + tag opcional + 2 switches (contar uma vez, disparar pixel)

## 2. PropertiesPanel.tsx

- Importar os 3 componentes (linhas 20-22)
- Adicionar 3 cases no switch antes do `default` (após linha 85):
  - `case "sticker"` → `<FigurinhaProperties />`
  - `case "randomizer"` → `<RandomizadorProperties />`
  - `case "passage-id"` → `<IdentificadorPassagemProperties />`

## 3. GenericNode.tsx — getPreview (linhas 11-49)

Adicionar antes do `default`:
- `case "sticker"` → `data.stickerUrl ? "Figurinha configurada" : "Selecione uma figurinha..."`
- `case "randomizer"` → `` `${(data.randomPaths?.length ?? 2)} caminhos | ${Math.round(100 / (data.randomPaths?.length ?? 2))}% cada` ``
- `case "passage-id"` → `data.passageLabel || "Configure o identificador..."`

## 4. GenericNode.tsx — renderContent (linhas 70-182)

Adicionar antes do default text preview:

- **sticker**: se `data.stickerUrl` → `<img>` 40×40 object-contain; senão texto placeholder
- **randomizer**: mostrar `"X caminhos | Y% cada"`
- **passage-id**: mostrar `data.passageLabel` ou placeholder

