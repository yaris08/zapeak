

# Simplificar Configurações — Remover campos sensíveis

## Arquivo único
`src/pages/ConfiguracoesPage.tsx`

## Alterações

### State — remover variáveis não usadas
- Remover: `waUrl`, `setWaUrl`, `waToken`, `setWaToken`, `showWaToken`, `setShowWaToken`
- Remover: `pixelId`, `setPixelId`, `pixelToken`, `setPixelToken`, `showPixelToken`, `setShowPixelToken`, `pixelDataset`, `setPixelDataset`
- Remover imports não usados: `Eye`, `EyeOff`

### Aba WhatsApp (linhas 108-150)
- Remover campos "URL da Instância" (linhas 116-119) e "Token de Autenticação" (linhas 121-129)
- Adicionar após o status: `<p className="text-xs text-muted-foreground">A conexão é configurada pelo administrador do sistema.</p>`
- Manter: status, QR code, botões Reconectar/Desconectar, info box
- `handleSave` para whatsapp: salvar objeto vazio ou apenas status

### Aba Facebook Pixel (linhas 152-198)
- Remover campos Pixel ID, Token de Acesso, Dataset ID (linhas 156-174)
- Substituir por card informativo: `<div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 text-xs text-muted-foreground">As credenciais do Facebook Pixel são configuradas pelo administrador. Aqui você pode ativar ou desativar o envio de eventos.</div>`
- Manter: toggle server-side, botão Testar Conexão, info box

### Aba IA
- Sem API Key presente — nenhuma alteração necessária (já tem apenas Model select, Prompt textarea e toggles)

### Aba Notificações
- Nenhuma alteração

