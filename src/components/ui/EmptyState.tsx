import React from "react";

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, subtitle, buttonLabel, onButtonClick }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3">
    <Icon size={48} style={{ color: "#22c55e", opacity: 0.5 }} />
    <h3 className="text-base font-bold text-foreground">{title}</h3>
    <p className="text-sm text-muted-foreground text-center max-w-sm">{subtitle}</p>
    {buttonLabel && onButtonClick && (
      <button
        onClick={onButtonClick}
        className="mt-2 px-4 py-2 rounded-md text-sm font-medium text-white transition-colors hover:opacity-90"
        style={{ backgroundColor: "#22c55e" }}
      >
        {buttonLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
