

# Corrigir Responsividade Mobile — Overflow e Truncamento

## Arquivos a alterar

| Arquivo | Ação |
|---------|------|
| `src/index.css` | Editar — adicionar `box-sizing: border-box` e `width: 100%` |
| `src/pages/HomePage.tsx` | Editar — KpiCard responsivo, ROI card responsivo, funil progress bar responsivo |
| `src/pages/AtribuicaoPage.tsx` | Editar — KPI cards com min-w-0/overflow-hidden/truncate |
| `src/pages/InstanciasPage.tsx` | Editar — KPI cards responsivos |

`AppLayout.tsx` já está correto — main tem `flex-1 overflow-auto w-full min-w-0`.

## 1. index.css

Adicionar `*, *::before, *::after { box-sizing: border-box; }` e `width: 100%` ao html/body/`#root`:

```css
@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
  }
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans;
    font-family: 'Inter', sans-serif;
  }
  html, body, #root {
    overflow-x: hidden;
    max-width: 100%;
    width: 100%;
  }
}
```

## 2. HomePage.tsx

### KpiCard (linhas 39-49)
Replace with responsive version:
```tsx
const KpiCard = ({ icon: Icon, label, value, color }: ...) => (
  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 flex items-center gap-2 min-w-0 overflow-hidden">
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0"
         style={{ backgroundColor: color + "20" }}>
      <Icon size={16} style={{ color }} />
    </div>
    <div className="min-w-0 flex-1 overflow-hidden">
      <p className="text-base md:text-2xl font-bold text-foreground truncate">{value}</p>
      <p className="text-[10px] md:text-xs text-muted-foreground leading-tight">{label}</p>
    </div>
  </div>
)
```

### ROI card inline (linhas 142-150)
Apply same responsive classes: `p-3`, `gap-2`, `min-w-0 overflow-hidden`, icon `w-8 h-8 md:w-10 md:h-10 shrink-0`, value `text-base md:text-2xl truncate`, label `text-[10px] md:text-xs`.

### Funil progress bars (linhas 164-213)
Each row's progress bar wrapper: change `style={{ width: "120px" }}` to `className="w-20 md:w-[120px]"` (remove the inline width style). Add `overflow-hidden` to each funnel row's outer div. Add `shrink-0` to the number and percentage divs.

## 3. AtribuicaoPage.tsx

### KPI cards (linhas 100-106)
Add `min-w-0 overflow-hidden` to outer div, value: `text-lg md:text-xl font-bold truncate`.

## 4. InstanciasPage.tsx

### KpiCard (linhas 27-37)
Add responsive classes: `p-3`, `gap-2`, `min-w-0 overflow-hidden`, icon `w-8 h-8 md:w-10 md:h-10`, value `text-xl md:text-2xl truncate`.

## Rules
- No `md:` or `lg:` classes removed
- No business logic changed
- Desktop appearance unchanged

