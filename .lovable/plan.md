

# 2 Alterações: Remover Carrossel + Aguardar Resposta Completo

## 1. Remover Carrossel
**Arquivo:** `src/data/flowComponents.ts`
- Remover linha `{ id: "carrossel", name: "Carrossel", icon: GalleryHorizontal, ... type: "carousel" }`
- Remover `GalleryHorizontal` do import se não for usado em outro lugar

## 2. WaitResponseProperties — substituição completa
**Arquivo:** `src/components/flow/properties/WaitResponseProperties.tsx`
- Substituir todo o conteúdo pelo componente fornecido pelo usuário
- Inclui: tempo de espera, ação para não-resposta, switch salvar resposta, grupos de análise de respostas com keywords/chips

## 3. GenericNode — preview do nó "wait"
**Arquivo:** `src/components/flow/nodes/GenericNode.tsx`
- Adicionar bloco antes do "Default text preview" (antes da linha 167):
```
if (data.type === "wait") {
  const val = data.waitValue ?? 2;
  const unit = data.waitUnit || "hours";
  const unitMap = { minutes: "Min", hours: "Horas", days: "Dias" };
  const groups = data.responseGroups?.length || 1;
  return (
    <div className="space-y-1 py-1">
      <p className="text-xs text-foreground font-medium">Esperar {val} {unitMap[unit] || unit}</p>
      <p className="text-[10px] text-muted-foreground">{groups} grupo{groups > 1 ? "s" : ""} de respostas</p>
    </div>
  );
}
```

## Arquivos modificados
| Arquivo | Ação |
|---------|------|
| `src/data/flowComponents.ts` | Editar (remover carrossel) |
| `src/components/flow/properties/WaitResponseProperties.tsx` | Substituir completamente |
| `src/components/flow/nodes/GenericNode.tsx` | Editar (preview wait) |

