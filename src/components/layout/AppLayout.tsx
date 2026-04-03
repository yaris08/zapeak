import React, { useRef } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Home, GitBranch, MessageSquare, BarChart3, Settings, Users, Zap, Target, Smartphone, Menu, X, Bell, DollarSign, LogOut } from "lucide-react";
import zapeakLogo from "@/assets/zapeak-logo.png";

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

type Notification = {
  id: number;
  type: "sale" | "conversation" | "pixel";
  title: string;
  desc: string;
  time: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  { id: 1, type: "sale", title: "Nova venda identificada!", desc: "João Silva — R$ 97,00 (94% confiança)", time: "2 min atrás", read: false },
  { id: 2, type: "conversation", title: "Nova conversa aguardando", desc: "Maria Souza iniciou uma conversa", time: "5 min atrás", read: false },
  { id: 3, type: "pixel", title: "Evento Pixel disparado", desc: "Purchase — R$ 197,00 enviado com sucesso", time: "12 min atrás", read: true },
  { id: 4, type: "sale", title: "Nova venda identificada!", desc: "Carlos Lima — R$ 47,00 (76% confiança)", time: "18 min atrás", read: true },
];

const notifIcon = (type: Notification["type"]) => {
  switch (type) {
    case "sale": return { Icon: DollarSign, color: "#22c55e" };
    case "conversation": return { Icon: MessageSquare, color: "#3b82f6" };
    case "pixel": return { Icon: Zap, color: "#a855f7" };
  }
};

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("zapeak_user_email") || "U";
  const userInitial = userEmail.charAt(0).toUpperCase();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notification[]>(initialNotifications);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close mobile menu on navigation
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close dropdowns on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    localStorage.removeItem("zapeak_auth");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Top Header */}
      <header className="h-12 border-b border-border bg-card flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <img src={zapeakLogo} alt="ZaPeak" className="h-5" />
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
              className="relative p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ backgroundColor: "#ef4444" }}>
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-lg shadow-xl z-50" style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}>
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "#2a2a2a" }}>
                  <span className="text-sm font-bold text-foreground">Notificações</span>
                  <button onClick={markAllRead} className="text-[10px] hover:underline" style={{ color: "#22c55e" }}>
                    Marcar todas como lidas
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => {
                    const { Icon, color } = notifIcon(n.type);
                    return (
                      <div
                        key={n.id}
                        className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-[#2a2a2a]"
                        style={{ backgroundColor: n.read ? "transparent" : "#1f1f1f" }}
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: color + "20" }}>
                          <Icon size={14} style={{ color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-foreground">{n.title}</p>
                          <p className="text-[11px] text-muted-foreground">{n.desc}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="px-4 py-2.5 border-t text-center" style={{ borderColor: "#2a2a2a" }}>
                  <button className="text-xs hover:underline" style={{ color: "#22c55e" }}>Ver todas</button>
                </div>
              </div>
            )}
          </div>

          {/* Avatar + logout */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
              className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <span className="text-xs font-medium text-primary">{userInitial}</span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-lg shadow-xl z-50 py-1" style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-[#2a2a2a] transition-colors"
                >
                  <LogOut size={14} /> Sair
                </button>
              </div>
            )}
          </div>
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
                  className={`flex items-center gap-2 px-3 py-2 mx-1 rounded-md text-sm transition-colors ${
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
            className="p-3 text-muted-foreground hover:text-foreground text-xs border-t border-border"
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
              <img src={zapeakLogo} alt="ZaPeak" className="h-5" />
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
          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-400 hover:bg-[#2a2a2a] transition-colors"
            >
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto w-full min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
