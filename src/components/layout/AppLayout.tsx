import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, GitBranch, MessageSquare, BarChart3, Settings, Users, Zap, Target, Smartphone } from "lucide-react";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Fluxos", path: "/flows", icon: GitBranch },
  { label: "Atendimento", path: "/atendimento", icon: MessageSquare },
  { label: "Relatórios", path: "/relatorios", icon: BarChart3 },
  { label: "Atribuição", path: "/atribuicao", icon: Target },
];

const sidebarItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Fluxos", path: "/flows", icon: GitBranch },
  { label: "Atendimento", path: "/atendimento", icon: MessageSquare },
  { label: "Relatórios", path: "/relatorios", icon: BarChart3 },
  { label: "Atribuição", path: "/atribuicao", icon: Target },
  { label: "Contatos", path: "/contatos", icon: Users },
  { label: "Configurações", path: "/configuracoes", icon: Settings },
];

const AppLayout: React.FC = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Header */}
      <header className="h-12 border-b border-border bg-card flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-primary" />
          <span className="text-sm font-bold text-foreground">ZaPeak</span>
        </div>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-xs font-medium text-primary">U</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`border-r border-border bg-sidebar flex flex-col transition-all duration-200 ${
            sidebarCollapsed ? "w-14" : "w-48"
          }`}
        >
          <div className="flex-1 py-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 mx-1 rounded-md text-xs transition-colors ${
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon size={16} className="flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-3 text-muted-foreground hover:text-foreground text-[10px] border-t border-border"
          >
            {sidebarCollapsed ? "→" : "← Recolher"}
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
