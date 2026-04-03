

# Corrigir redirecionamento após login

## Arquivo único
`src/pages/LoginPage.tsx`

## Alteração
No `handleSubmit`, substituir `navigate("/")` por `window.location.href = "/"` para forçar reload da página e o App.tsx reler o localStorage.

Também remover o import de `useNavigate` e a linha `const navigate = useNavigate()` pois não serão mais usados.

