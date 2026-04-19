import type { AvailabilityStatus } from '../types';

interface Props {
  status: AvailabilityStatus;
  bedInfo?: { available: number; total: number };
  size?: 'sm' | 'md';
}

const config: Record<AvailabilityStatus, { dot: string; label: string; text: string }> = {
  open:    { dot: '#16A34A', label: 'Available',           text: '#16A34A' },
  closed:  { dot: '#DC2626', label: 'Unavailable',         text: '#DC2626' },
  limited: { dot: '#D97706', label: 'Limited availability', text: '#D97706' },
};

export function AvailabilityBadge({ status, bedInfo, size = 'md' }: Props) {
  const c = config[status];
  const textSize = size === 'sm' ? 'text-[11.5px]' : 'text-[12.5px]';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium ${textSize}`}>
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: c.dot }}
        aria-hidden="true"
      />
      <span style={{ color: c.text }}>{c.label}</span>
      {bedInfo && status !== 'closed' && (
        <span className="text-[var(--color-text-muted)] font-normal">
          · {bedInfo.available}/{bedInfo.total} beds
        </span>
      )}
    </span>
  );
}
