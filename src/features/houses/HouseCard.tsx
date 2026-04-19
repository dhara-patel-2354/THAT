import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { HouseSummary } from '../../types';
import { SavedToggle } from '../../components/SavedToggle';

interface Props {
  house: HouseSummary;
  saved: boolean;
  onToggleSaved: (id: string) => void;
  compact?: boolean;
}

const statusConfig = {
  open: { dot: '#16A34A', label: 'Available', textColor: '#16A34A' },
  closed: { dot: '#DC2626', label: 'Unavailable', textColor: '#DC2626' },
  limited: { dot: '#D97706', label: 'Limited availability', textColor: '#D97706' },
};

function formatUpdated(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
    + ' ' + d.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function HouseCard({ house, saved, onToggleSaved }: Props) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[house.availabilityStatus];

  const bedInfo = house.totalBeds !== undefined && house.availableBeds !== undefined
    ? `${house.availableBeds} / ${house.totalBeds} beds available`
    : null;

  return (
    <div className="house-card overflow-hidden">
      {/* Main card row */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* House avatar */}
          <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="var(--color-primary)" opacity="0.8" />
              <polyline points="9 22 9 12 15 12 15 22" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* Title + org */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-[var(--color-text-primary)] text-[14.5px] leading-snug">
                  {house.name}
                </h3>
                <p className="text-[12.5px] text-[var(--color-text-muted)] mt-0.5 truncate">{house.organization}</p>
              </div>
              <SavedToggle saved={saved} onToggle={() => onToggleSaved(house.id)} className="-mt-1 -mr-1 flex-shrink-0" />
            </div>

            {/* Status */}
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: status.dot }}
                aria-hidden="true"
              />
              <span className="text-[12.5px] font-medium" style={{ color: status.textColor }}>
                {status.label}
              </span>
              {bedInfo && (
                <span className="text-[12px] text-[var(--color-text-muted)]">· {bedInfo}</span>
              )}
            </div>

            {/* Updated time */}
            <div className="flex items-center gap-1.5 mt-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-[11.5px] text-[var(--color-text-muted)]">
                Updated: {formatUpdated(house.lastUpdatedAt)}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 mt-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-[12px] text-[var(--color-text-muted)]">{house.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* More info expandable */}
      <div className="border-t border-[var(--color-border)]">
        <button
          onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
          className="w-full flex items-center justify-between px-4 py-3 text-[13px] font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)] transition-colors"
        >
          <span>More info</span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {expanded && (
          <div className="px-4 pb-3 text-[13px] text-[var(--color-text-secondary)] leading-relaxed space-y-2">
            <p>{house.shortInfo}</p>
            {house.address && (
              <div className="flex items-start gap-1.5 mt-1">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-[var(--color-text-muted)]">{house.address}</span>
              </div>
            )}
            <Link
              to={`/houses/${house.id}`}
              className="inline-flex items-center gap-1 text-[var(--color-primary)] text-[13px] font-medium hover:underline mt-1"
            >
              Full details
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Call + Email action bar */}
      <div className="flex border-t border-[var(--color-border)]">
        <HouseCardAction
          href={house.phone ? `tel:${house.phone}` : undefined}
          icon={<PhoneIcon />}
          label="Call"
          disabled={!house.phone}
          isPrimary
        />
        <div className="w-px bg-[var(--color-border)]" aria-hidden="true" />
        <HouseCardAction
          href={house.email ? `mailto:${house.email}` : undefined}
          icon={<EmailIcon />}
          label="Email"
          disabled={!house.email}
        />
      </div>
    </div>
  );
}

// Phone/email is on HouseDetails, not HouseSummary — we accept them as optional extras
// We'll cast via declaration merging below
declare module '../../types' {
  interface HouseSummary {
    phone?: string;
    email?: string;
  }
}

function HouseCardAction({ href, icon, label, disabled, isPrimary }: {
  href?: string;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  isPrimary?: boolean;
}) {
  const base = `flex-1 flex items-center justify-center gap-2 py-3 text-[13px] font-medium transition-colors
    ${isPrimary ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text-secondary)]'}
    ${disabled ? 'opacity-40 cursor-not-allowed' : isPrimary ? 'hover:bg-[var(--color-primary-dark)]' : 'hover:bg-[var(--color-surface-alt)]'}`;

  if (!disabled && href) {
    return (
      <a href={href} className={base} aria-label={label} onClick={e => e.stopPropagation()}>
        {icon}
        {label}
      </a>
    );
  }

  return (
    <button disabled={disabled} className={base} aria-label={label} aria-disabled={disabled}>
      {icon}
      {label}
    </button>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l.72-.72a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
