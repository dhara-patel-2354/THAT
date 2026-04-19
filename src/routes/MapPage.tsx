import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TopBar } from '../app/TopBar';
import { SearchBar } from '../features/filters/SearchBar';
import { FilterBar } from '../features/filters/FilterBar';
import { useFilters } from '../features/filters/useFilters';
import { useHouses } from '../features/houses/useHouses';
import { useSaved } from '../features/saved/useSaved';
import { useLocation as useGeoLocation } from '../features/location/useLocation';
import { AvailabilityBadge } from '../components/AvailabilityBadge';
import { CategoryChips } from '../components/CategoryChips';
import { SavedToggle } from '../components/SavedToggle';
import type { HouseDetails } from '../types';

// Fix Leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function createMarkerIcon(status: string, selected: boolean) {
  const color = status === 'open' ? '#2E7D32' : status === 'limited' ? '#E65100' : '#C62828';
  const size = selected ? 36 : 28;
  const borderWidth = selected ? 3 : 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 8}" viewBox="0 0 ${size} ${size + 8}">
    <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="${color}" stroke="white" stroke-width="${borderWidth}"/>
    <polygon points="${size/2 - 4},${size - 2} ${size/2},${size + 6} ${size/2 + 4},${size - 2}" fill="${color}"/>
  </svg>`;

  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [size, size + 8],
    iconAnchor: [size / 2, size + 8],
    popupAnchor: [0, -(size + 8)],
  });
}

function MapBounds({ houses }: { houses: HouseDetails[] }) {
  const map = useMap();
  useEffect(() => {
    if (houses.length > 0) {
      const bounds = L.latLngBounds(houses.map(h => [h.coordinates.lat, h.coordinates.lng]));
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 13 });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export function MapPage() {
  const [filters, setFilters, clearFilters] = useFilters();
  const { isSaved, toggleSaved } = useSaved();
  const geo = useGeoLocation();
  const [selected, setSelected] = useState<HouseDetails | null>(null);

  const activeFilters = {
    ...filters,
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
    <div className="flex flex-col flex-1 bg-[var(--color-surface-alt)]" style={{ height: '100dvh' }}>
      <TopBar />

      <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] pt-2 z-10 relative">
        <SearchBar
          value={filters.query}
          onChange={q => setFilters({ query: q })}
          onLocationClick={handleLocationClick}
          locationPermission={geo.permission}
          locationActive={filters.useCurrentLocation && geo.permission === 'granted'}
        />
        <FilterBar filters={filters} onUpdate={setFilters} onClear={clearFilters} />
      </div>

      {/* Map + preview stack */}
      <div className="flex-1 relative overflow-hidden">
        <MapContainer
          center={[51.0447, -114.0719]}
          zoom={10}
          className="w-full h-full"
          zoomControl={false}
          style={{ height: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <MapBounds houses={houses} />
          {houses.map(house => (
            <Marker
              key={house.id}
              position={[house.coordinates.lat, house.coordinates.lng]}
              icon={createMarkerIcon(house.availabilityStatus, selected?.id === house.id)}
              eventHandlers={{ click: () => setSelected(house) }}
              aria-label={house.name}
            />
          ))}
        </MapContainer>

        {/* House count badge */}
        <div className="absolute top-3 left-3 z-[400] bg-[var(--color-surface)] px-3 py-1.5 rounded-full shadow-[var(--shadow-fab)] text-xs font-medium text-[var(--color-text-primary)]">
          {houses.length} {houses.length === 1 ? 'location' : 'locations'}
        </div>

        {/* Close preview */}
        {selected && (
          <button
            onClick={() => setSelected(null)}
            aria-label="Close preview"
            className="absolute top-3 right-3 z-[400] bg-[var(--color-surface)] p-2 rounded-full shadow-[var(--shadow-fab)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* Selected house preview card */}
        {selected && (
          <div className="absolute bottom-[calc(var(--bottom-nav-height)+0.75rem)] lg:bottom-4 left-3 right-3 z-[400] lg:left-4 lg:right-auto lg:w-96">
            <SelectedHousePreview
              house={selected}
              saved={isSaved(selected.id)}
              onToggleSaved={toggleSaved}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function SelectedHousePreview({ house, saved, onToggleSaved }: {
  house: HouseDetails;
  saved: boolean;
  onToggleSaved: (id: string) => void;
}) {
  const bedInfo = house.totalBeds !== undefined && house.availableBeds !== undefined
    ? { available: house.availableBeds, total: house.totalBeds }
    : undefined;

  return (
    <div className="bg-[var(--color-surface)] rounded-2xl p-4 shadow-[var(--shadow-sheet)]">
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-[var(--color-text-primary)] text-[15px] truncate">{house.name}</h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{house.organization} · {house.city}</p>
            </div>
            <SavedToggle saved={saved} onToggle={() => onToggleSaved(house.id)} className="-mt-1 -mr-1 flex-shrink-0" />
          </div>
          <div className="mt-2">
            <AvailabilityBadge status={house.availabilityStatus} bedInfo={bedInfo} />
          </div>
        </div>
      </div>
      <div className="mt-2.5">
        <CategoryChips categories={house.categories} populationTags={house.populationTags} max={3} />
      </div>
      <Link
        to={`/houses/${house.id}`}
        className="mt-3 flex items-center justify-center w-full py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
      >
        View details
      </Link>
    </div>
  );
}
