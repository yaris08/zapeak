

# 3 Alterações em ConfiguracoesPage.tsx

## Arquivo único
`src/pages/ConfiguracoesPage.tsx`

## Novos states
- `pixelId`, `pixelToken`, `pixelDataset` — campos Pixel
- `showPixelToken` — toggle olho password Pixel
- `iaApiKey` — chave API Anthropic
- `showIaKey` — toggle olho password IA
- `pixelSaved`, `iaSaved` — booleans para controlar placeholder pós-save

## Imports adicionais
- `lucide-react`: `Eye, EyeOff, Save`

## 1. Aba Facebook Pixel

Remover o card informativo "As credenciais são configuradas pelo administrador..." (linhas 99-101).

Adicionar antes do toggle server-side (linha 103):
- Input "Pixel ID" — se `pixelSaved` e valor vazio, mostrar valor mascarado como placeholder
- Input password "Token de Acesso (Conversions API)" com botão Eye/EyeOff — após salvar, campo fica vazio com placeholder "Token salvo — insira novo para alterar"
- Input "Dataset ID (opcional)"

## 2. Aba IA

Adicionar antes do Select de modelo (linha 131):
- Input password "Chave API Anthropic" com botão Eye/EyeOff — mesma lógica de placeholder pós-save
- Texto helper cinza "Sua chave é armazenada de forma segura e nunca exibida."

A Textarea "Persona / Prompt base" já existe (linha 144-147) — nada a mudar.

## 3. Botão Salvar

Remover os 3 botões Salvar full-width individuais de cada aba (linhas 123, 169, 207).

Adicionar botão fixo fora das abas:
```
<button onClick={handleSave} className="fixed bottom-6 right-6 px-6 py-2 rounded-lg bg-[#22c55e] text-white text-sm font-medium hover:bg-[#22c55e]/90 transition-colors flex items-center gap-2 shadow-lg shadow-black/30 z-50">
  <Save size={14} /> Salvar configurações
</button>
```

## handleSave atualizado
- Pixel: salvar `pixelId`, `pixelToken`, `pixelDataset`, `serverSide`. Setar `pixelSaved=true`, limpar `pixelToken`
- IA: salvar `iaApiKey`, model, prompt, toggles. Setar `iaSaved=true`, limpar `iaApiKey`
- localStorage keys mantêm mesmo padrão `zapeak_settings_[aba]`

## useEffect load
- Pixel: carregar `pixelId`, `pixelDataset`, `serverSide`; se `pixelToken` existia, setar `pixelSaved=true`
- IA: se `apiKey` existia, setar `iaSaved=true`

