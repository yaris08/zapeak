

# Substituir texto "ZaPeak" pela logo em imagem

## O que será feito
Copiar a logo enviada para o projeto e substituir o texto "ZaPeak" (ícone Zap + texto) pela imagem da logo nos 3 locais visuais onde aparece.

## Arquivo de imagem
Copiar `user-uploads://ZaPeak_1.png` → `src/assets/zapeak-logo.png`

## Arquivos a alterar

| Arquivo | Alteração |
|---------|-----------|
| `src/pages/LoginPage.tsx` | Substituir `<Zap>` + `<span>ZaPeak</span>` por `<img>` da logo (~28px altura) |
| `src/components/layout/AppLayout.tsx` | Substituir nos 2 locais (header desktop + drawer mobile) o `<Zap>` + `<span>ZaPeak</span>` por `<img>` da logo (~20px altura) |

## O que NÃO muda
- Chaves localStorage (`zapeak_auth`, `zapeak_user_email`, etc.)
- Título do `index.html`
- Metatags OG/Twitter
- Nenhuma lógica de negócio

