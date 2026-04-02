

# 2 Alterações: Filtro de Instância + Página de Instâncias

## Arquivos

| Arquivo | Ação |
|---------|------|
| `src/pages/AtendimentoPage.tsx` | Editar — adicionar filtro de instância |
| `src/pages/InstanciasPage.tsx` | Criar |
| `src/App.tsx` | Editar — adicionar rota `/instancias` |
| `src/components/layout/AppLayout.tsx` | Editar — adicionar "Instâncias" no sidebar/nav |

## 1. Filtro de Instância no Atendimento

### Dados
Definir array de instâncias e campo `instance` em cada contato:
```
instances = [
  { id: "all", name: "Todas as instâncias", number: "", status: "" },
  { id: "principal", name: "Principal", number: "(11) 99999-0001", status: "active" },
  { id: "vendas", name: "Vendas", number: "(11) 99999-0002", status: "active" },
  { id: "suporte", name: "Suporte", number: "(11) 99999-0003", status: "standby" },
]
```
Adicionar `instance: string` à interface Contact. Atribuir:
- João e Maria → "principal"
- Carlos e Ana → "vendas"
- Pedro e Fernanda → "suporte"

### UI
- State `selectedInstance: "all" | "principal" | "vendas" | "suporte"` (default "all")
- Select nativo estilizado abaixo do input de busca, acima das abas
- Cada opção mostra emoji 📱 + número + nome, com indicador verde/amarelo
- Filtrar `contacts` pelo `instance` selecionado (além do filtro de busca existente)
- Badge pequeno na lista de conversas: `<span className="text-[9px] text-muted-foreground bg-[#1a1a1a] px-1.5 py-0.5 rounded">Principal</span>`

## 2. Página de Instâncias

### Estrutura
- Header: título + subtítulo + botão "Nova Instância" verde
- 3 KpiCards: Total (Smartphone, azul), Conectadas (Wifi, verde), Standby (WifiOff, amarelo)
- Grid 3 colunas com cards de instância

### Card de Instância
- Badge status (verde "Conectada" / amarelo "Standby")
- Ícone MessageSquare grande (verde se conectada, cinza se standby)
- Nome, número, stats, última atividade
- Botões: "Ver Conversas" (outline, navega para `/atendimento`) | "Desconectar"/"Conectar" | "Excluir"
- Menu dropdown "..." com: Renomear, Ver QR Code, Reiniciar, Excluir

### Modal Nova Instância
- Dialog com campos: nome, descrição (opcional), tipo de uso (Select)
- Info box com instrução sobre QR Code
- Botões Cancelar / Criar Instância → toast sucesso

### Modal QR Code
- Dialog com título "Conectar [nome]"
- Área 200x200 bg `#1a1a1a` borda dashed, ícone QrCode
- Instruções de conexão
- Badge piscando "Aguardando leitura..." com `animate-pulse`

### Navegação
- `AppLayout.tsx`: adicionar `{ label: "Instâncias", path: "/instancias", icon: Smartphone }` em `sidebarItems` entre "Atendimento" e "Relatórios" (índice 3)
- `App.tsx`: importar e adicionar rota `/instancias` dentro do AppLayout

### Imports
- `lucide-react`: Smartphone, Wifi, WifiOff, QrCode, Plus, MoreVertical, MessageSquare, RefreshCw, Trash2, Edit, Eye
- `sonner`: toast
- Dialog, DropdownMenu de shadcn
- `useNavigate` de react-router-dom para "Ver Conversas"

### Estilo
- Bg cards `#1a1a1a`, bordas `#2a2a2a`, hover `#222`
- Tema dark padrão do projeto

