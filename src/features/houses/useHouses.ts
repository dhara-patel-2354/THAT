import { useMemo } from 'react';
import { mockHouses } from '../../mocks/houses';
import type { FilterState, HouseDetails, Coordinates } from '../../types';
import { getDistanceKm } from '../location/useLocation';

export function useHouses(filters: FilterState, currentCoords?: Coordinates | null) {
  const results = useMemo(() => {
    let list: HouseDetails[] = [...mockHouses];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      list = list.filter(h =>
        h.name.toLowerCase().includes(q) ||
        h.organization.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.shortInfo.toLowerCase().includes(q) ||
        h.address.toLowerCase().includes(q)
      );
    }

    if (filters.availability) {
      list = list.filter(h => h.availabilityStatus === filters.availability);
    }

    if (filters.populationTags.length > 0) {
      list = list.filter(h =>
        filters.populationTags.some(tag => h.populationTags.includes(tag))
      );
    }

    if (filters.categories.length > 0) {
      list = list.filter(h =>
        filters.categories.some(cat => h.categories.includes(cat))
      );
    }

    if (filters.city) {
      list = list.filter(h => h.city === filters.city);
    }

    if (filters.useCurrentLocation && currentCoords) {
      list = list
        .map(h => ({ ...h, _dist: getDistanceKm(currentCoords, h.coordinates) }))
        .sort((a, b) => (a as any)._dist - (b as any)._dist)
        .map(({ _dist: _, ...h }) => h as HouseDetails);
    }

    return list;
  }, [filters, currentCoords]);

  return results;
}

export function useHouseById(id: string): HouseDetails | undefined {
  return mockHouses.find(h => h.id === id);
}
