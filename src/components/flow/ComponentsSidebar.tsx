import React, { useMemo } from "react";
import { componentItems } from "@/data/flowComponents";

const ComponentsSidebar: React.FC = () => {
  const sections = useMemo(() => {
    const map = new Map<string, typeof componentItems>();
    componentItems.forEach((item) => {
      if (!map.has(item.section)) map.set(item.section, []);
      map.get(item.section)!.push(item);
    });
    return map;
  }, []);

  const onDragStart = (event: React.DragEvent, item: typeof componentItems[0]) => {
    event.dataTransfer.setData("application/reactflow-type", item.type);
    event.dataTransfer.setData("application/reactflow-name", item.name);
    event.dataTransfer.setData("application/reactflow-color", item.color);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-[220px] min-w-[220px] h-full border-r border-border bg-sidebar overflow-y-auto">
      <div className="p-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Componentes</h3>
        {Array.from(sections.entries()).map(([section, items]) => (
          <div key={section} className="mb-4">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">{section}</p>
            <div className="space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, item)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-grab hover:bg-accent transition-colors group"
                  >
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: item.color + "20" }}
                    >
                      <Icon size={14} style={{ color: item.color }} />
                    </div>
                    <span className="text-xs text-foreground truncate">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentsSidebar;
