

# Aba IA — Chave API com detecção de provedor + Select dinâmico

## Arquivo único
`src/pages/ConfiguracoesPage.tsx`

## Remover
- State: `iaPrompt`, `iaVendas`, `iaPix`, `iaNotify`
- Imports: `Textarea` (se não usado em outro lugar)
- Na aba IA: textarea "Persona / Prompt base" (linhas 258-261), 3 toggles (linhas 263-276), info box verde (linhas 278-280)
- No `handleSave` IA: remover `prompt`, `vendas`, `pix`, `notify` do JSON salvo
- No `useEffect` load IA: remover carregamento de `prompt`, `vendas`, `pix`, `notify`

## Adicionar

### Lógica de detecção de provedor
Função derivada (não state):
```
const detectProvider = (key: string) => {
  if (key.startsWith("sk-ant")) return "anthropic";
  if (key.startsWith("sk-")) return "openai";
  if (key.startsWith("AIza")) return "gemini";
  if (key.length > 0) return "unknown";
  return null;
};
const detectedProvider = detectProvider(iaApiKey);
```

### Badge de provedor (abaixo do input, antes do helper text)
- `anthropic` → `🟣 Anthropic detectado`
- `openai` → `🟢 OpenAI detectado`
- `gemini` → `🔵 Google Gemini detectado`
- `unknown` → `⚪ Provedor não reconhecido`
- `null` → não renderiza badge

Estilo: `text-xs px-2 py-1 rounded bg-[#2a2a2a] inline-flex`

### Label do input
Mudar de "Chave API Anthropic" para "Chave API"
Placeholder: "Cole sua chave API aqui..."

### Select de modelo — dinâmico
Substituir options fixas por mapeamento:
- **anthropic**: `claude-sonnet-4.5` "Claude Sonnet 4.5 (Recomendado)" | `claude-haiku-4.5` "Claude Haiku 4.5 (Rápido)"
- **openai**: `gpt-4o` "GPT-4o (Recomendado)" | `gpt-4o-mini` "GPT-4o Mini (Rápido)" | `gpt-4-turbo` "GPT-4 Turbo"
- **gemini**: `gemini-1.5-pro` "Gemini 1.5 Pro (Recomendado)" | `gemini-1.5-flash` "Gemini 1.5 Flash (Rápido)"
- **unknown/null**: Select desabilitado, placeholder "Detectando provedor..."

Ao mudar de provedor, resetar `iaModel` para o primeiro valor do novo provedor.

### handleSave IA
Salvar: `apiKey`, `model`, `provider` (string detectada). Remover campos removidos.

### useEffect load IA
Carregar `model`; se `apiKey` existia → `iaSaved=true`; carregar `provider` para eventual uso.

