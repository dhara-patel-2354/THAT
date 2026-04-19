export type AvailabilityStatus = 'open' | 'closed' | 'limited';

export type PopulationTag =
  | 'women'
  | 'men'
  | 'youth'
  | 'families'
  | 'lgbtq+'
  | 'veterans'
  | 'indigenous'
  | 'seniors';

export type CategoryTag =
  | 'transitional-housing'
  | 'shelter'
  | 'sober-living'
  | 'mental-health'
  | 'addiction-recovery'
  | 'domestic-violence'
  | 'youth-services'
  | 'veteran-services'
  | 'family-housing';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface HouseSummary {
  id: string;
  name: string;
  organization: string;
  availabilityStatus: AvailabilityStatus;
  lastUpdatedAt: string; // ISO date string
  city: string;
  address: string;
  coordinates: Coordinates;
  categories: CategoryTag[];
  populationTags: PopulationTag[];
  shortInfo: string;
  totalBeds?: number;
  availableBeds?: number;
}

export interface HouseDetails extends HouseSummary {
  phone?: string;
  email?: string;
  website?: string;
  directionsUrl?: string;
  fullInfo: string;
  requirements?: string[];
  amenities?: string[];
  applicationProcess?: string;
}

export interface FilterState {
  query: string;
  availability: AvailabilityStatus | '';
  populationTags: PopulationTag[];
  categories: CategoryTag[];
  city: string;
  useCurrentLocation: boolean;
}

export type LocationPermission = 'idle' | 'prompting' | 'granted' | 'denied' | 'error';

export interface LocationState {
  permission: LocationPermission;
  currentCoords: Coordinates | null;
  resolvedLabel: string;
}

export interface SavedState {
  savedIds: string[];
}
