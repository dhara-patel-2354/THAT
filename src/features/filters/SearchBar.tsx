import { useRef, useCallback } from 'react';
import type { LocationPermission } from '../../types';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onLocationClick: () => void;
  locationPermission: LocationPermission;
  locationActive: boolean;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  onLocationClick,
  locationPermission,
  locationActive,
  placeholder = 'Search by name, organization, or city…',
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = useCallback(() => {
    onChange('');
    inputRef.current?.focus();
  }, [onChange]);

  const isPrompting = locationPermission === 'prompting';
  const isDenied = locationPermission === 'denied';

  const locationLabel =
    isPrompting ? 'Getting location…' :
    locationActive ? 'Using current location — click to disable' :
    isDenied ? 'Location permission denied' :
    'Sort by nearest to me';

  return (
    <div className="flex items-center gap-2 px-4 py-3">
      {/* Search input */}
      <label className="flex-1 relative">
        <span className="sr-only">Search houses</span>
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search houses"
          className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[13.5px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary-mid)] focus:ring-2 focus:ring-[var(--color-primary-light)] transition-colors"
        />
        {value && (
          <button
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </label>

      {/* Location button */}
      <button
        onClick={onLocationClick}
        disabled={isPrompting || isDenied}
        aria-label={locationLabel}
        aria-pressed={locationActive}
        title={locationLabel}
        className={`p-2.5 rounded-lg border transition-all flex-shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]
          ${locationActive
            ? 'bg-[var(--color-primary-light)] border-[var(--color-primary-mid)] text-[var(--color-primary)]'
            : isDenied
            ? 'border-[var(--color-border)] text-[var(--color-text-muted)] opacity-40 cursor-not-allowed'
            : 'border-[var(--color-border)] bg-white text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary-mid)]'
          }`}
      >
        {isPrompting ? (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin" aria-hidden="true">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        ) : (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="1" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="1" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="23" y2="12" />
          </svg>
        )}
      </button>
    </div>
  );
}
