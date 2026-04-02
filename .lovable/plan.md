

# 3 Melhorias no Editor de Fluxo

## Arquivos

| Arquivo | Ação |
|---------|------|
| `src/pages/FlowEditor.tsx` | Editar — background, controles custom, estado do simulador, layout |

## 1. Background — linhas contínuas

- Linha 254: substituir `<Background variant={BackgroundVariant.Dots} gap={16} size={0.8} color="#1a1a1a" />` por `<Background variant={BackgroundVariant.Lines} gap={40} lineWidth={0.3} color="#1e1e1e" />`
- Manter `backgroundColor: "#0a0a0a"` no wrapper (já existe na linha 236)

## 2. Controles customizados

- Remover `<Controls ... />` (linha 255) e `Controls` do import (linha 4)
- Adicionar import: `useReactFlow` de `reactflow`; `Plus, Minus, Maximize2, Expand` de `lucide-react`
- Criar componente interno `CustomControls` que usa `useReactFlow()` para `zoomIn`, `zoomOut`, `fitView`
- Posicionar absolute bottom-16 left-16 z-10, bg `#1a1a1a`, border `#2a2a2a`, rounded-[10px], p-1.5
- 4 botões (Plus, Minus, separador, Maximize2, Expand) cada w-8 h-8 rounded-md hover:bg-[#2a2a2a]
- O componente deve ser filho do ReactFlow (dentro do `<ReactFlow>`) para ter acesso ao contexto, ou renderizado como overlay absoluto fora mas usando `reactFlowInstance` já disponível

**Nota**: `useReactFlow` só funciona dentro do `<ReactFlow>` provider. Solução: criar `CustomControls` como componente separado renderizado dentro do `<ReactFlow>`.

## 3. Simulador de Fluxo

### Estado
- `const [showSimulator, setShowSimulator] = useState(false)`

### Botão na barra de controles customizada
- Adicionar botão Play/Square abaixo dos controles de zoom (separado por divisor)
- Laranja `#f97316` quando fechado, vermelho `#ef4444` quando aberto
- Toggle `showSimulator`

### Painel simulador (320px)
- Renderizado entre o canvas e o PropertiesPanel no layout flex
- Apenas quando `showSimulator === true`

### Conteúdo do simulador
- **Header**: barra status mockada (09:41, sinal, bateria) + avatar verde + "Simulador" + "online" + botões Phone/Video/X
- **Área de mensagens**: scroll, começa com texto cinza centralizado + botão "Iniciar Teste"
- **Lógica de teste**: estado `messages` array, `started` boolean
  - Ao iniciar: push mensagem lead "Oi", após 1.5s bot "Olá! Bem-vindo ao simulador 👋", após 1s bot "Este é um preview do seu fluxo."
  - Input de texto: ao enviar push mensagem lead, após 1s bot "Mensagem recebida ✓"
- **Bolhas**: lead (direita, bg `#005c4b`, radius 8 0 8 8), bot (esquerda, bg `#1f2c34`, radius 0 8 8 8)
- **Horário**: texto 10px cinza abaixo de cada bolha (hora atual formatada)
- **Input rodapé**: bg `#1f2c34`, ícones Paperclip + Send, placeholder "Digite uma mensagem..."

### Layout final
`Canvas (flex-1) | Simulador (320px, condicional) | PropertiesPanel (280px)`

### Imports adicionais
- `Play, Square, Phone, Video, X, Paperclip, Send, Plus, Minus, Maximize2, Expand` de `lucide-react`

