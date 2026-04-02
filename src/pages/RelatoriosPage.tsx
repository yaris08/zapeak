import React from "react";
import { BarChart3 } from "lucide-react";

const RelatoriosPage: React.FC = () => (
  <div className="p-6">
    <h1 className="text-xl font-bold text-foreground mb-1">Relatórios</h1>
    <p className="text-sm text-muted-foreground mb-6">Análise de desempenho das automações</p>
    <div className="flex items-center justify-center h-64 bg-card border border-border rounded-lg">
      <div className="text-center">
        <BarChart3 size={40} className="mx-auto text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">Em breve</p>
      </div>
    </div>
  </div>
);

export default RelatoriosPage;
