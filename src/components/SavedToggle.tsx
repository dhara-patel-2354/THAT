interface Props {
  saved: boolean;
  onToggle: () => void;
  className?: string;
}

export function SavedToggle({ saved, onToggle, className = '' }: Props) {
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
      aria-label={saved ? 'Remove from saved' : 'Save this house'}
      aria-pressed={saved}
      className={`p-1.5 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]
        ${saved
          ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)]'
          : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]'
        } ${className}`}
    >
      <svg
        width="17" height="17" viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}
