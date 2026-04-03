

# Carregar logo instantaneamente

## Problema
A logo (`src/assets/zapeak-logo.png`) tem 71KB — muito grande para uma imagem exibida com apenas 32-40px de altura. Isso causa delay no carregamento.

## Solução
Converter a logo PNG em base64 inline diretamente no código, eliminando qualquer request de rede. Para reduzir o tamanho, primeiro redimensionar a imagem para 80px de altura (2x do maior uso, suficiente para retina) antes de converter.

## Arquivos

| Arquivo | Alteração |
|---------|-----------|
| `src/assets/zapeak-logo.png` | Substituir por versão redimensionada (~2-5KB) |
| `src/components/layout/AppLayout.tsx` | Sem alteração (import continua igual) |
| `src/pages/LoginPage.tsx` | Sem alteração |

Alternativa mais agressiva: converter para base64 data URL inline, eliminando completamente o arquivo separado. Mas redimensionar o PNG já deve resolver o problema.

## Detalhes técnicos
- Usar ImageMagick para redimensionar: altura 80px (2x retina do `h-10` = 40px)
- PNG otimizado de ~80px de altura ficará com ~2-5KB vs 71KB atual
- Vite já faz inline automático de imagens < 4KB como base64 no bundle JS

