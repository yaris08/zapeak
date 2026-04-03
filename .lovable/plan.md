

# Zerar Dados Fictícios em ConfiguracoesPage.tsx

## Arquivo
`src/pages/ConfiguracoesPage.tsx`

## Alterações

### 1. Pixels — esvaziar defaultPixels
Linha 66-69: `const defaultPixels: Pixel[] = [];`

### 2. Admin Numbers — esvaziar defaultAdmins
Linha 95-98: `const defaultAdmins: AdminNumber[] = [];`

### 3. EmptyState quando listas vazias
- Na seção de Pixels Cadastrados: se `pixels.length === 0`, mostrar EmptyState com ícone adequado, "Nenhum pixel cadastrado", "Adicione seu primeiro pixel do Facebook"
- Na seção de Números de Admin: se `adminNumbers.length === 0`, mostrar EmptyState com ícone adequado, "Nenhum número cadastrado", "Adicione um número para receber alertas"

Importar `EmptyState` de `@/components/ui/EmptyState` e ícones necessários (`Facebook`/`Activity` para pixel, `Bell`/`Phone` para admin).

### 4. Manter
- Toda lógica de CRUD (adicionar, editar, remover pixels e admins)
- Leitura do localStorage (se o usuário já salvou dados, eles aparecem)
- Desktop e mobile inalterados

