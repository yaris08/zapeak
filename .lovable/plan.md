

# Simulador de Fluxo Real

## Arquivo único
`src/pages/FlowEditor.tsx`

## Alterações

### 1. Import adicional
Adicionar `RotateCcw` ao import de lucide-react.

### 2. Tipo Message expandido
Adicionar tipo `"system"` ao `from`, e campos opcionais para conteúdo rico:

```ts
type Message = {
  from: "lead" | "bot" | "system";
  text: string;
  time: string;
  imageUrl?: string;
  audioUrl?: string;
  buttons?: { label: string; value: string }[];
};
```

### 3. SimulatorPanel — receber nodes e edges como props
```ts
const SimulatorPanel: React.FC<{ 
  onClose: () => void; 
  nodes: Node[]; 
  edges: Edge[] 
}>
```

Passar `nodes={nodes} edges={edges}` no JSX (linha 337).

### 4. Funções de navegação dentro do SimulatorPanel

**getNextNode(currentId, handleId?)** — busca nas edges por `source === currentId`, filtra por `sourceHandle` se fornecido, retorna o nó target.

**processNode(node)** — switch no tipo do nó (`node.data.type` ou `node.type`):
- `start` → silencioso, avança imediatamente
- `text` / `textNode` → bolha bot com `data.message` ou "[Mensagem não configurada]"
- `delay` → mensagem sistema "⏱ Aguardando...", aguarda `Math.min(val * multiplier, 3000)`ms
- `image` → bolha bot com `<img>` ou "[Imagem não configurada]"
- `audio` → bolha bot com player WhatsApp-style ou "[Áudio não configurado]"
- `wait` → mensagem sistema + botões de keywords dos responseGroups + "Outra resposta"; **pausa execução**
- `condition` → mensagem sistema + 2 botões (Verdadeiro/Falso); **pausa execução**, segue handle `true`/`false`
- `payment` → mensagem sistema + 2 botões (Simular Pagamento/Não pagou); **pausa execução**, segue handle `paid`/`unpaid`
- `ai-respond` → bolha bot "[IA] prompt..."
- `pixel` → mensagem sistema "📊 Evento Pixel disparado: ..."
- `pix` → bolha bot com chave e tipo
- `notify` → mensagem sistema "🔔 Admin notificado: ..."
- `connect-flow` → mensagem sistema "🔗 Conectando ao fluxo: ...", encerrar
- `randomizer` → mensagem sistema "🎲 Randomizador", escolher path aleatório, seguir handle `path-N`

**runFromNode(nodeId)** — loop assíncrono:
- Processa nó atual com 800ms delay entre nós
- Se nó interativo → para e aguarda callback de botão
- Se sem próximo nó → mensagem sistema "✅ Fluxo concluído!"

### 5. startTest reescrito
- Limpa mensagens, busca nó `start`, chama `runFromNode(startNodeId)`

### 6. sendMessage reescrito
- Se aguardando resposta de nó `wait`: adiciona bolha lead, chama continuação
- Se não aguardando nada: comportamento atual mantido

### 7. Renderização de mensagens expandida
- `from === "system"` → centralizado, bg `#1a1a1a`, texto cinza, fontSize 12, italic
- Botões interativos renderizados como chips abaixo da mensagem sistema (bg `#2a2a2a`, hover `#333`, rounded-full, fontSize 12)
- `imageUrl` → `<img>` dentro da bolha bot
- `audioUrl` → mini player dentro da bolha bot

### 8. Botão Reiniciar no header
Ao lado do X, ícone `RotateCcw` (size 14) — onClick limpa messages, reseta started, reseta estado de espera.

### 9. Estado de espera interativa
```ts
const [waitingFor, setWaitingFor] = useState<{
  type: "wait" | "condition" | "payment";
  nodeId: string;
} | null>(null);
```
Quando nó interativo encontrado: seta `waitingFor`. Quando botão clicado ou mensagem enviada em modo wait: resolve a continuação com o handleId correto.

### Visual
Manter todo o visual atual (cores, bordas, layout). Mensagens de sistema são o único elemento novo visualmente — centralizadas com estilo distinto.

