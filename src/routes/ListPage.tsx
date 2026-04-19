import { useCallback, useEffect, useState } from 'react';
import { TopBar } from '../app/TopBar';
import { SearchBar } from '../features/filters/SearchBar';
import { FilterBar } from '../features/filters/FilterBar';
import { HouseCard } from '../features/houses/HouseCard';
import { useFilters } from '../features/filters/useFilters';
import { useHouses } from '../features/houses/useHouses';
import { useSaved } from '../features/saved/useSaved';
import { useLocation as useGeoLocation } from '../features/location/useLocation';
import { EmptyState } from '../components/EmptyState';
import { HouseListSkeleton } from '../components/LoadingSkeleton';

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export function ListPage() {
  const [filters, setFilters, clearFilters] = useFilters();
  const { isSaved, toggleSaved } = useSaved();
  const geo = useGeoLocation();
  const [loading, setLoading] = useState(true);
  const [rawQuery, setRawQuery] = useState(filters.query);
  const debouncedQuery = useDebounce(rawQuery, 280);

  useEffect(() => {
    if (debouncedQuery !== filters.query) setFilters({ query: debouncedQuery });
  }, [debouncedQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { setRawQuery(filters.query); }, [filters.query]);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(id);
  }, []);

  const activeFilters = {
    ...filters,
    query: debouncedQuery,
    useCurrentLocation: filters.useCurrentLocation && geo.permission === 'granted',
  };

  const houses = useHouses(activeFilters, geo.currentCoords);

  const handleLocationClick = useCallback(() => {
    if (geo.permission === 'granted') {
      setFilters({ useCurrentLocation: !filters.useCurrentLocation });
    } else {
      geo.requestLocation();
      setFilters({ useCurrentLocation: true });
    }
  }, [geo, filters.useCurrentLocation, setFilters]);

  return (
    <div className="flex flex-col flex-1 bg-[var(--color-surface-alt)]">
      <TopBar />

      {/* Sticky search + filter block */}
      <div className="sticky top-16 z-20 bg-white shadow-sm">
        <div className="max-w-3xl mx-auto lg:max-w-none">
          <SearchBar
            value={rawQuery}
            onChange={setRawQuery}
            onLocationClick={handleLocationClick}
            locationPermission={geo.permission}
            locationActive={filters.useCurrentLocation && geo.permission === 'granted'}
          />
          <FilterBar filters={filters} onUpdate={setFilters} onClear={clearFilters} />
        </div>
      </div>

      {/* Location denied banner */}
      {geo.permission === 'denied' && filters.useCurrentLocation && (
        <div className="max-w-3xl mx-auto w-full px-4 mt-3">
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-[12.5px] text-amber-700" role="alert">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Location access was denied. Search by city name instead, or enable location in your browser settings.
          </div>
        </div>
      )}

      {/* Results */}
      <div
        className="flex-1 overflow-y-auto pb-[calc(var(--bottom-nav-height)+1rem)] lg:pb-8"
        aria-live="polite"
        aria-label="Search results"
      >
        <div className="max-w-3xl mx-auto w-full">
          {loading ? (
            <HouseListSkeleton />
          ) : houses.length === 0 ? (
            <EmptyState
              icon="🏠"
              title="No houses found"
              description="Try adjusting your filters or searching by a different name or city."
              action={{ label: 'Clear all filters', onClick: clearFilters }}
            />
          ) : (
            <>
              {/* Count row */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <p className="text-[12.5px] text-[var(--color-text-muted)]" aria-live="polite" aria-atomic="true">
                  Showing <span className="font-semibold text-[var(--color-text-primary)]">{houses.length}</span> {houses.length === 1 ? 'result' : 'results'}
                  {filters.useCurrentLocation && geo.permission === 'granted' && ' · sorted by distance'}
                </p>
              </div>

              {/* Card list */}
              <ul className="flex flex-col gap-3 px-4 pb-4" role="list">
                {houses.map(house => (
                  <li key={house.id} role="listitem">
                    <HouseCard
                      house={house}
                      saved={isSaved(house.id)}
                      onToggleSaved={toggleSaved}
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
