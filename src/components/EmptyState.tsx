interface Props {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon = '🔍', title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="text-5xl mb-4" aria-hidden="true">{icon}</span>
      <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-1.5">{title}</h3>
      {description && (
        <p className="text-[13px] text-[var(--color-text-muted)] max-w-xs leading-relaxed">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-5 px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-[13.5px] font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
