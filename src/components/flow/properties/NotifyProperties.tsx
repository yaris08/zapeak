import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props { data: any; onUpdate: (data: any) => void; }

const NotifyProperties: React.FC<Props> = ({ data, onUpdate }) => {
  const phone = data.adminPhone || "";
  const message = data.notifyMessage || "";

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-foreground">Notificar Admin</p>
      <div>
        <Label className="text-xs text-muted-foreground">Número do admin</Label>
        <Input className="mt-1 h-8 text-xs bg-background" type="tel" placeholder="+55 11 99999-9999" value={phone}
          onChange={(e) => onUpdate({ ...data, adminPhone: e.target.value })} />
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
