

# 4 Correções no Projeto

## 1. Criar PixProperties.tsx
**Novo arquivo:** `src/components/flow/properties/PixProperties.tsx`
- Formulário com Select para tipo de chave PIX (EVP, CPF, CNPJ, Telefone, E-mail)
- Input para chave PIX com botão copiar (clipboard + toast)
- Input para nome do recebedor com texto de ajuda

**Editar:** `src/components/flow/PropertiesPanel.tsx`
- Adicionar import do PixProperties
- Adicionar `case "pix"` no switch antes do default

## 2. Nó Áudio — Player estilo WhatsApp
**Editar:** `src/components/flow/nodes/GenericNode.tsx` (linhas 77-85)
- Substituir o `<audio controls>` por player customizado dark
- Botão play/pause circular laranja com ícone SVG
- Barra de progresso estilizada (fundo `#2a2a2a`, preenchimento laranja)
- Timestamp "0:00" + badge tipo áudio
- Elemento `<audio>` oculto com controle via JS

## 3. Nó Delay — Preview visual com tempo
**Editar:** `src/components/flow/nodes/GenericNode.tsx`
- Adicionar bloco no `renderContent()` para `data.type === "delay"`
- Mostrar ícone de relógio com valor e unidade abreviada (seg/min/h) centralizado
- Estilo visual destacado com texto grande

## 4. Background do Canvas
**Editar:** `src/pages/FlowEditor.tsx`
- Linha 242: mudar Background para `gap={16}`, `size={0.8}`, `color="#1a1a1a"`
- Linha 224: adicionar `style={{ backgroundColor: "#0a0a0a" }}` no div wrapper do ReactFlow

## Arquivos modificados
| Arquivo | Ação |
|---------|------|
| `src/components/flow/properties/PixProperties.tsx` | Criar |
| `src/components/flow/PropertiesPanel.tsx` | Editar (import + case) |
| `src/components/flow/nodes/GenericNode.tsx` | Editar (áudio player + delay preview) |
| `src/pages/FlowEditor.tsx` | Editar (background) |

