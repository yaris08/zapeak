import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, GitBranch, MessageSquare, BarChart3, Settings, Users, Zap, Target, Smartphone, Menu, X } from "lucide-react";

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
  { label: "Instâncias", path: "/instancias", icon: Smartphone },
  { label: "Relatórios", path: "/relatorios", icon: BarChart3 },
  { label: "Atribuição", path: "/atribuicao", icon: Target },
  { label: "Contatos", path: "/contatos", icon: Users },
  { label: "Configurações", path: "/configuracoes", icon: Settings },
];

const AppLayout: React.FC = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile menu on navigation
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Header */}
      <header className="h-12 border-b border-border bg-card flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-primary" />
          <span className="text-sm font-bold text-foreground">ZaPeak</span>
        </div>
        <nav className="hidden md:flex items-center gap-1">
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
        <div className="hidden md:flex w-8 h-8 rounded-full bg-primary/20 items-center justify-center">
          <span className="text-xs font-medium text-primary">U</span>
        </div>
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={20} />
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Desktop */}
        <aside
          className={`hidden md:flex border-r border-border bg-sidebar flex-col transition-all duration-200 ${
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

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Sidebar Drawer */}
        <div
          className={`md:hidden fixed left-0 top-0 z-50 h-screen w-[80%] max-w-[280px] bg-sidebar border-r border-border flex flex-col transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-primary" />
              <span className="text-sm font-bold text-foreground">ZaPeak</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 py-2 overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-3 mx-1 rounded-md text-sm transition-colors ${
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
