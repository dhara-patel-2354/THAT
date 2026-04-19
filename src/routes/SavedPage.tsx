import { useMemo } from 'react';
import { TopBar } from '../app/TopBar';
import { HouseCard } from '../features/houses/HouseCard';
import { useSaved } from '../features/saved/useSaved';
import { EmptyState } from '../components/EmptyState';
import { mockHouses } from '../mocks/houses';
import { useNavigate } from 'react-router-dom';

export function SavedPage() {
  const { savedIds, isSaved, toggleSaved } = useSaved();
  const navigate = useNavigate();

  const savedHouses = useMemo(
    () => mockHouses.filter(h => savedIds.includes(h.id)),
    [savedIds]
  );

  return (
    <div className="flex flex-col flex-1 bg-[var(--color-surface-alt)]">
      <TopBar />

      <div className="flex-1 overflow-y-auto pb-[calc(var(--bottom-nav-height)+1rem)] lg:pb-8">
        <div className="max-w-3xl mx-auto w-full">
          {savedHouses.length === 0 ? (
            <EmptyState
              icon="🔖"
              title="Nothing saved yet"
              description="Tap the bookmark icon on any listing to save it here for quick access."
              action={{ label: 'Browse houses', onClick: () => navigate('/list') }}
            />
          ) : (
            <>
              <div className="px-4 pt-4 pb-2">
                <p className="text-[12.5px] text-[var(--color-text-muted)]">
                  <span className="font-semibold text-[var(--color-text-primary)]">{savedHouses.length}</span> saved {savedHouses.length === 1 ? 'house' : 'houses'}
                </p>
              </div>
              <ul className="flex flex-col gap-3 px-4 pb-4" role="list">
                {savedHouses.map(house => (
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
