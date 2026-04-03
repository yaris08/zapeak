

# Configurar PWA com ícone personalizado

O app será instalável como PWA (Add to Home Screen) usando a imagem enviada como ícone — **sem service worker**, apenas manifest + ícone.

## Arquivos

| Ação | Arquivo |
|------|---------|
| Copiar | `user-uploads://ZaPeak_Favicon.png` → `public/zapeak-icon-512.png` |
| Deletar | `public/favicon.ico` |
| Criar | `public/manifest.json` — manifest com nome "ZaPeak", cores escuras, `display: "standalone"`, ícone 512x512 |
| Editar | `index.html` — adicionar `<link rel="manifest">`, `<link rel="icon">` apontando para o PNG, e `<meta name="theme-color">` |

## Detalhes técnicos

### manifest.json
```json
{
  "name": "ZaPeak",
  "short_name": "ZaPeak",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f0f0f",
  "theme_color": "#22c55e",
  "icons": [
    { "src": "/zapeak-icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

### index.html — adicionar no `<head>`
```html
<link rel="icon" href="/zapeak-icon-512.png" type="image/png">
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#22c55e">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="apple-touch-icon" href="/zapeak-icon-512.png">
```

**Sem service worker** — apenas installabilidade via manifest. Funciona no preview publicado, não no editor.

