import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface AdminNumber { id: string; name: string; phone: string; active: boolean; }
interface Props { data: any; onUpdate: (data: any) => void; }

const NotifyProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState<AdminNumber[]>([
    { id: "principal", name: "Principal", phone: "+55 11 99999-9999", active: true },
    { id: "backup", name: "Backup", phone: "+55 11 88888-8888", active: true },
  ]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("zapeak_settings_notificacoes");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.adminNumbers) setAdmins(parsed.adminNumbers);
      }
    } catch {}
  }, []);

  const selectedAdminId = data.selectedAdminId || "";
  const message = data.notifyMessage || "";

  const handleSelect = (val: string) => {
    if (val === "new") { navigate("/configuracoes"); return; }
    onUpdate({ ...data, selectedAdminId: val });
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Notificar Admin</p>
      <div>
        <Label className="text-xs text-muted-foreground">Selecionar admin</Label>
        <Select value={selectedAdminId} onValueChange={handleSelect}>
          <SelectTrigger className="mt-1 h-8 text-xs bg-background border-border">
            <SelectValue placeholder="Selecione um admin..." />
          </SelectTrigger>
          <SelectContent>
            {admins.filter(a => a.active).map(a => (
              <SelectItem key={a.id} value={a.id}>
                {a.name} — {a.phone.replace("+55 ", "(")}
              </SelectItem>
            ))}
            <SelectItem value="todos">Todos os admins</SelectItem>
            <SelectItem value="new" className="text-muted-foreground">+ Cadastrar número →</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Mensagem de notificação</Label>
        <textarea
          className="mt-1 w-full h-20 rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Mensagem para o admin..."
          value={message}
          onChange={(e) => onUpdate({ ...data, notifyMessage: e.target.value })}
        />
      </div>
    </div>
  );
};

export default NotifyProperties;
