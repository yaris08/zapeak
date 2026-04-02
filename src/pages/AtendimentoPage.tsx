import React from "react";
import { MessageSquare } from "lucide-react";

const AtendimentoPage: React.FC = () => (
  <div className="p-6">
    <h1 className="text-xl font-bold text-foreground mb-1">Atendimento</h1>
    <p className="text-sm text-muted-foreground mb-6">Central de atendimento ao cliente</p>
    <div className="flex items-center justify-center h-64 bg-card border border-border rounded-lg">
      <div className="text-center">
        <MessageSquare size={40} className="mx-auto text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">Em breve</p>
      </div>
    </div>
  </div>
);

export default AtendimentoPage;
