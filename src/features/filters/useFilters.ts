import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import type { FilterState, AvailabilityStatus, PopulationTag, CategoryTag } from '../../types';

function parseArray<T extends string>(val: string | null): T[] {
  if (!val) return [];
  return val.split(',').filter(Boolean) as T[];
}

export function useFilters(): [FilterState, (patch: Partial<FilterState>) => void, () => void] {
  const [params, setParams] = useSearchParams();

  const filters: FilterState = {
    query: params.get('q') ?? '',
    availability: (params.get('avail') as AvailabilityStatus) || '',
    populationTags: parseArray<PopulationTag>(params.get('pop')),
    categories: parseArray<CategoryTag>(params.get('cat')),
    city: params.get('city') ?? '',
    useCurrentLocation: params.get('gps') === '1',
  };

  const setFilters = useCallback((patch: Partial<FilterState>) => {
    setParams(prev => {
      const next = new URLSearchParams(prev);
      const merged = { ...filters, ...patch };

      if (merged.query) next.set('q', merged.query); else next.delete('q');
      if (merged.availability) next.set('avail', merged.availability); else next.delete('avail');
      if (merged.populationTags.length) next.set('pop', merged.populationTags.join(',')); else next.delete('pop');
      if (merged.categories.length) next.set('cat', merged.categories.join(',')); else next.delete('cat');
      if (merged.city) next.set('city', merged.city); else next.delete('city');
      if (merged.useCurrentLocation) next.set('gps', '1'); else next.delete('gps');

      return next;
    }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, setParams]);

  const clearFilters = useCallback(() => {
    setParams({}, { replace: true });
  }, [setParams]);

  return [filters, setFilters, clearFilters];
}

export function activeFilterCount(f: FilterState): number {
  let n = 0;
  if (f.availability) n++;
  if (f.populationTags.length) n++;
  if (f.categories.length) n++;
  if (f.city) n++;
  if (f.useCurrentLocation) n++;
  return n;
}
