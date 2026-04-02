

# FlowZap — Plataforma de Automação WhatsApp

## Visão Geral
Editor visual de fluxos de automação WhatsApp com canvas drag-and-drop usando React Flow, tema dark com laranja como cor primária.

## Tema Visual
- Dark theme: bg `#0f0f0f`, cards `#1a1a1a`, sidebar `#141414`, bordas `#2a2a2a`
- Primária: `#F97316` (laranja), verde ativo: `#22c55e`
- Fonte Inter, ícones Lucide React

## Estrutura de Páginas

### 1. Layout Global
- **Header topo**: Logo "FlowZap" à esquerda, nav central (Home | Fluxos | Atendimento | Relatórios), avatar à direita
- **Sidebar lateral colapsável** com ícones + labels para navegação

### 2. Editor de Fluxo (`/flows/:id/editor`) — Página Principal

#### Header do Editor
- Botão "← Fluxos", nome do fluxo editável inline, badge de status (Rascunho/Ativo)
- Métricas compactas: "0 sessões | 0% finalizaram"
- Botões "Salvar" (laranja) e "Publicar" (outline)

#### Sidebar Esquerda — Componentes (220px)
- Itens arrastáveis organizados em 3 seções: **Mensagens** (10 itens), **Controle** (7 itens), **Ações** (7 itens)
- Cada item: card com ícone colorido + nome, hover effect, draggable para o canvas

#### Canvas Central (React Flow)
- Grid de pontos, zoom/pan, minimap
- 2 nós de exemplo pré-posicionados:
  - **Iniciar** (verde): gatilho com dropdowns e input de palavras-chave
  - **Texto** (azul): placeholder de mensagem
- Conexão pontilhada laranja entre os nós
- Barra de controles inferior (zoom, undo, grid, play)
- Arrastar componente da sidebar cria novo nó no canvas

#### Painel Direito — Propriedades (280px)
- Aparece ao selecionar um nó, fecha ao clicar fora
- Formulário dinâmico por tipo de nó (ex: upload de imagem, campo de texto)
- Botões "Duplicar" e "Excluir" no rodapé

#### Interações
- Drag da sidebar → cria nó no canvas
- Clique em nó → abre painel de propriedades
- Conectar nós via handles de saída/entrada
- Salvar → toast de confirmação

### 3. Páginas Placeholder
- Home, Fluxos (lista), Atendimento, Relatórios — páginas simples com layout aplicado

## Dependências
- `reactflow` para o canvas visual
- Componentes shadcn/ui existentes
- Dados mockados/estáticos

