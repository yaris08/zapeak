

# Página de Configurações — ConfiguracoesPage.tsx

## Arquivos

| Arquivo | Ação |
|---------|------|
| `src/pages/ConfiguracoesPage.tsx` | Criar |
| `src/App.tsx` | Editar — adicionar import + rota `/configuracoes` dentro do AppLayout |

`AppLayout.tsx` já tem "Configurações" no sidebar apontando para `/configuracoes` — nenhuma alteração necessária.

## Estrutura do componente

### State
- `activeTab: "whatsapp" | "pixel" | "ia" | "notificacoes"` (default "whatsapp")
- Cada aba tem seu próprio state local carregado do `localStorage` com chave `zapeak_settings_{tab}`
- `showToken` / `showPixelToken`: boolean para toggle show/hide senha
- `pixelTestStatus`: null | "loading" | "success" | "error"

### Layout
- Header: "Configurações" h2 bold + "Gerencie suas integrações" muted
- 4 abas com underline verde `#22c55e` quando ativa (custom tab bar, não shadcn Tabs — div com botões e border-bottom)
- Conteúdo da aba ativa renderizado condicionalmente
- Botão "Salvar" verde ao final de cada aba → `localStorage.setItem` + toast sonner

### Aba 1 — WhatsApp
- Status: bolinha vermelha 8px + "Desconectado"
- Inputs: URL instância, Token (password + eye toggle)
- QR Code: div 180x180 bg `#1a1a1a` borda dashed `#2a2a2a`, ícone `QrCode` centralizado + texto
- Botões: "Reconectar" outline + "Desconectar" vermelho outline
- Info box: bg `#1a1a1a` borda `#2a2a2a`, texto ℹ️

### Aba 2 — Facebook Pixel
- Inputs: Pixel ID, Token (password + eye), Dataset ID (opcional)
- Toggle: "Ativar envio server-side" (default true)
- Botão "Testar Conexão": onClick → loading 1.5s → badge verde sucesso
- Info box: bg blue-900/20 borda blue-800/30

### Aba 3 — IA
- Select: Claude Sonnet / Claude Haiku
- Textarea: Persona/Prompt base (4 linhas)
- 3 toggles: reconhecimento vendas, analisar PIX, notificar admin
- Info box: bg green-900/20 borda green-800/30

### Aba 4 — Notificações
- 4 toggles para tipos de notificação
- Input tel: número para notificações
- Info box: bg yellow-900/20 borda yellow-800/30

### Imports
- `lucide-react`: QrCode, Eye, EyeOff, Loader2, Check, X, Settings
- `sonner`: toast
- Componentes UI: Input, Label, Switch, Select, Textarea

