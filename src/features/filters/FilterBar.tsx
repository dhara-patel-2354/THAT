import { useRef, useState } from 'react';
import type { FilterState, AvailabilityStatus, PopulationTag, CategoryTag } from '../../types';
import { cities } from '../../mocks/houses';

interface Props {
  filters: FilterState;
  onUpdate: (patch: Partial<FilterState>) => void;
  onClear: () => void;
}

// ─── label maps ────────────────────────────────────────────────────────────────
const availabilityLabels: Record<AvailabilityStatus, string> = {
  open: 'Available',
  limited: 'Limited',
  closed: 'Unavailable',
};
const availabilityOptions: AvailabilityStatus[] = ['open', 'limited', 'closed'];

const populationLabels: Record<PopulationTag, string> = {
  women: 'Women',
  men: 'Men',
  youth: 'Youth',
  families: 'Families',
  'lgbtq+': 'LGBTQ+',
  veterans: 'Veterans',
  indigenous: 'Indigenous',
  seniors: 'Seniors',
};
const populationOptions = Object.keys(populationLabels) as PopulationTag[];

const categoryLabels: Record<CategoryTag, string> = {
  'transitional-housing': 'Transitional Housing',
  'shelter': 'Shelter',
  'sober-living': 'Sober Living',
  'mental-health': 'Mental Health',
  'addiction-recovery': 'Recovery',
  'domestic-violence': 'DV Support',
  'youth-services': 'Youth Services',
  'veteran-services': 'Veteran Services',
  'family-housing': 'Family Housing',
};
const categoryOptions = Object.keys(categoryLabels) as CategoryTag[];

// ─── sort options ───────────────────────────────────────────────────────────────
type SortKey = 'nearest' | 'name' | 'updated';
const sortLabels: Record<SortKey, string> = { nearest: 'Nearest', name: 'A–Z', updated: 'Recently updated' };

// ─── Dropdown wrapper ───────────────────────────────────────────────────────────
function Dropdown({ label, active, count, children }: {
  label: string;
  active: boolean;
  count: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  const handleBlur = (e: React.FocusEvent) => {
    if (ref.current && !ref.current.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative flex-shrink-0" onBlur={handleBlur}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`filter-chip ${active ? 'active' : ''}`}
      >
        {label}
        {count > 0 && (
          <span className={`text-[11px] font-bold rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 ${active ? 'bg-white text-[var(--color-primary)]' : 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'}`}>
            {count}
          </span>
        )}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1.5 w-52 bg-white border border-[var(--color-border)] rounded-card shadow-dropdown z-50 py-1 overflow-hidden"
          role="listbox"
        >
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      role="option"
      aria-selected={selected}
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-left transition-colors
        ${selected ? 'text-[var(--color-primary)] font-medium bg-[var(--color-primary-light)]' : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]'}`}
    >
      <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${selected ? 'bg-[var(--color-primary)] border-[var(--color-primary)]' : 'border-[var(--color-border)]'}`}>
        {selected && <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><polyline points="1 6 5 10 11 2" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>}
      </span>
      {label}
    </button>
  );
}

// ─── Sort button ────────────────────────────────────────────────────────────────
function SortDropdown({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleBlur = (e: React.FocusEvent) => {
    if (ref.current && !ref.current.contains(e.relatedTarget as Node)) setOpen(false);
  };

  return (
    <div ref={ref} className="relative flex-shrink-0 ml-auto" onBlur={handleBlur}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-secondary)] font-medium hover:text-[var(--color-text-primary)] transition-colors px-1"
      >
        Sort by
        <span className="text-[var(--color-primary)] font-semibold">{sortLabels[value]}</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1.5 w-48 bg-white border border-[var(--color-border)] rounded-card shadow-dropdown z-50 py-1">
          {(Object.keys(sortLabels) as SortKey[]).map(k => (
            <button
              key={k}
              onClick={() => { onChange(k); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors
                ${value === k ? 'text-[var(--color-primary)] font-semibold bg-[var(--color-primary-light)]' : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]'}`}
            >
              {sortLabels[k]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main FilterBar ─────────────────────────────────────────────────────────────
export function FilterBar({ filters, onUpdate, onClear: _onClear }: Props) {
  const [sort, setSort] = useState<SortKey>('nearest');

  const toggleAvail = (v: AvailabilityStatus) =>
    onUpdate({ availability: filters.availability === v ? '' : v });

  const togglePop = (v: PopulationTag) => {
    const next = filters.populationTags.includes(v)
      ? filters.populationTags.filter(t => t !== v)
      : [...filters.populationTags, v];
    onUpdate({ populationTags: next });
  };

  const toggleCat = (v: CategoryTag) => {
    const next = filters.categories.includes(v)
      ? filters.categories.filter(t => t !== v)
      : [...filters.categories, v];
    onUpdate({ categories: next });
  };

  // Active filter tags
  const tags: { key: string; label: string; onRemove: () => void }[] = [
    ...(filters.availability ? [{ key: 'avail', label: availabilityLabels[filters.availability], onRemove: () => onUpdate({ availability: '' }) }] : []),
    ...filters.populationTags.map(t => ({ key: t, label: `${populationLabels[t]} only`, onRemove: () => togglePop(t) })),
    ...filters.categories.map(t => ({ key: t, label: categoryLabels[t], onRemove: () => toggleCat(t) })),
    ...(filters.city ? [{ key: 'city', label: filters.city, onRemove: () => onUpdate({ city: '' }) }] : []),
  ];

  return (
    <div className="bg-white border-b border-[var(--color-border)]">
      {/* Dropdown row */}
      <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto scrollbar-hide" role="toolbar" aria-label="Filter options">
        {/* Availability */}
        <Dropdown label="Availability" active={!!filters.availability} count={filters.availability ? 1 : 0}>
          {availabilityOptions.map(v => (
            <DropdownItem key={v} label={availabilityLabels[v]} selected={filters.availability === v} onClick={() => toggleAvail(v)} />
          ))}
        </Dropdown>

        {/* City */}
        <Dropdown label="City" active={!!filters.city} count={filters.city ? 1 : 0}>
          {cities.map(c => (
            <DropdownItem key={c} label={c} selected={filters.city === c} onClick={() => onUpdate({ city: filters.city === c ? '' : c })} />
          ))}
        </Dropdown>

        {/* Services */}
        <Dropdown label="Services" active={filters.categories.length > 0} count={filters.categories.length}>
          {categoryOptions.map(v => (
            <DropdownItem key={v} label={categoryLabels[v]} selected={filters.categories.includes(v)} onClick={() => toggleCat(v)} />
          ))}
        </Dropdown>

        {/* Population */}
        <Dropdown label="Population" active={filters.populationTags.length > 0} count={filters.populationTags.length}>
          {populationOptions.map(v => (
            <DropdownItem key={v} label={populationLabels[v]} selected={filters.populationTags.includes(v)} onClick={() => togglePop(v)} />
          ))}
        </Dropdown>

        {/* Sort — right aligned */}
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {/* Active filter tags row */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 px-4 pb-3 flex-wrap" role="list" aria-label="Active filters">
          {tags.map(tag => (
            <span key={tag.key} role="listitem" className="filter-chip-tag">
              {tag.label}
              <button
                onClick={tag.onRemove}
                aria-label={`Remove ${tag.label} filter`}
                className="ml-1 hover:opacity-70 transition-opacity"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
