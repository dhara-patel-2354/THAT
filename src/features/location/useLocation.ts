import { useState, useCallback } from 'react';
import type { LocationState, Coordinates } from '../../types';

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    permission: 'idle',
    currentCoords: null,
    resolvedLabel: '',
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, permission: 'error', resolvedLabel: 'Geolocation not supported' }));
      return;
    }

    setState(prev => ({ ...prev, permission: 'prompting' }));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: Coordinates = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setState({
          permission: 'granted',
          currentCoords: coords,
          resolvedLabel: 'Current location',
        });
      },
      (err) => {
        const permission = err.code === GeolocationPositionError.PERMISSION_DENIED ? 'denied' : 'error';
        setState({ permission, currentCoords: null, resolvedLabel: '' });
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  const clearLocation = useCallback(() => {
    setState({ permission: 'idle', currentCoords: null, resolvedLabel: '' });
  }, []);

  return { ...state, requestLocation, clearLocation };
}

export function getDistanceKm(a: Coordinates, b: Coordinates): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lng - a.lng) * Math.PI) / 180;
  const sinLat = Math.sin(dLat / 2);
  const sinLon = Math.sin(dLon / 2);
  const chord =
    sinLat * sinLat +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * sinLon * sinLon;
  return R * 2 * Math.atan2(Math.sqrt(chord), Math.sqrt(1 - chord));
}
