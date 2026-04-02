import React from "react";
import { Zap, GitBranch, MessageSquare, BarChart3 } from "lucide-react";

const stats = [
  { label: "Fluxos Ativos", value: "3", icon: GitBranch, color: "#22c55e" },
  { label: "Sessões Hoje", value: "127", icon: MessageSquare, color: "#3b82f6" },
  { label: "Taxa de Conclusão", value: "68%", icon: BarChart3, color: "#f97316" },
  { label: "Automações", value: "12", icon: Zap, color: "#a855f7" },
];

const HomePage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-foreground mb-1">Bem-vindo ao FlowZap</h1>
      <p className="text-sm text-muted-foreground mb-6">Gerencie suas automações de WhatsApp</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + "20" }}>
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
