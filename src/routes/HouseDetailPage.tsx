import { useParams, useNavigate } from 'react-router-dom';
import { TopBar } from '../app/TopBar';
import { AvailabilityBadge } from '../components/AvailabilityBadge';
import { InfoAccordion } from '../components/InfoAccordion';
import { ActionButtons } from '../components/ActionButtons';
import { SavedToggle } from '../components/SavedToggle';
import { EmptyState } from '../components/EmptyState';
import { useHouseById } from '../features/houses/useHouses';
import { useSaved } from '../features/saved/useSaved';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function HouseDetailPage() {
  const { houseId } = useParams<{ houseId: string }>();
  const navigate = useNavigate();
  const house = useHouseById(houseId ?? '');
  const { isSaved, toggleSaved } = useSaved();

  if (!house) {
    return (
      <div className="flex flex-col flex-1">
        <TopBar title="Not found" showBack />
        <EmptyState
          icon="🏚️"
          title="House not found"
          description="This listing may have been removed or the link is incorrect."
          action={{ label: 'Back to list', onClick: () => navigate('/list') }}
        />
      </div>
    );
  }

  const bedInfo = house.totalBeds !== undefined && house.availableBeds !== undefined
    ? { available: house.availableBeds, total: house.totalBeds }
    : undefined;

  const accordionSections = [
    {
      id: 'about',
      title: 'About this program',
      content: <p className="whitespace-pre-line">{house.fullInfo}</p>,
    },
    ...(house.requirements ? [{
      id: 'requirements',
      title: 'Requirements',
      content: (
        <ul className="space-y-2 list-none">
          {house.requirements.map((r, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 text-[var(--color-primary)] flex-shrink-0 font-bold text-xs">✓</span>
              {r}
            </li>
          ))}
        </ul>
      ),
    }] : []),
    ...(house.amenities ? [{
      id: 'amenities',
      title: 'Amenities',
      content: (
        <ul className="grid grid-cols-2 gap-2 list-none">
          {house.amenities.map((a, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" aria-hidden="true" />
              {a}
            </li>
          ))}
        </ul>
      ),
    }] : []),
    ...(house.applicationProcess ? [{
      id: 'apply',
      title: 'How to apply',
      content: <p>{house.applicationProcess}</p>,
    }] : []),
  ];

  return (
    <div className="flex flex-col flex-1 bg-[var(--color-surface-alt)]">
      <TopBar
        title={house.name}
        showBack
        rightSlot={
          <SavedToggle
            saved={isSaved(house.id)}
            onToggle={() => toggleSaved(house.id)}
          />
        }
      />

      <div className="flex-1 overflow-y-auto pb-[calc(var(--bottom-nav-height)+1rem)] lg:pb-8">
        <div className="max-w-2xl mx-auto">

          {/* Hero card */}
          <div className="bg-white border-b border-[var(--color-border)] lg:border lg:rounded-card lg:mx-4 lg:mt-4 lg:shadow-card">
            <div className="px-4 pt-5 pb-4">
              {/* Header row */}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="var(--color-primary)" opacity="0.85" />
                    <polyline points="9 22 9 12 15 12 15 22" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-[18px] font-bold text-[var(--color-text-primary)] leading-tight">{house.name}</h1>
                  <p className="text-[13px] text-[var(--color-text-muted)] mt-0.5">{house.organization}</p>
                </div>
              </div>

              {/* Status row */}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <AvailabilityBadge status={house.availabilityStatus} bedInfo={bedInfo} />
                <span className="flex items-center gap-1 text-[11.5px] text-[var(--color-text-muted)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  Updated {formatDate(house.lastUpdatedAt)}
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-[13.5px] text-[var(--color-text-secondary)] leading-relaxed">{house.shortInfo}</p>

              {/* Address */}
              <div className="mt-3 flex items-start gap-2 text-[13px] text-[var(--color-text-muted)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{house.address}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="border-t border-[var(--color-border)] px-4 py-4">
              <ActionButtons
                phone={house.phone}
                email={house.email}
                website={house.website}
                directionsUrl={house.directionsUrl}
              />
            </div>
          </div>

          {/* Accordion */}
          <div className="px-4 pt-4">
            <InfoAccordion sections={accordionSections} />
          </div>

          {/* Contact info */}
          {(house.phone || house.email || house.website) && (
            <div className="mx-4 mt-4 mb-2 p-4 bg-white border border-[var(--color-border)] rounded-card shadow-card">
              <h2 className="text-[13.5px] font-semibold text-[var(--color-text-primary)] mb-3">Contact information</h2>
              <dl className="space-y-2.5">
                {house.phone && (
                  <div className="flex gap-3">
                    <dt className="text-[12px] text-[var(--color-text-muted)] w-16 flex-shrink-0 pt-0.5">Phone</dt>
                    <dd><a href={`tel:${house.phone}`} className="text-[13px] text-[var(--color-primary)] hover:underline">{house.phone}</a></dd>
                  </div>
                )}
                {house.email && (
                  <div className="flex gap-3">
                    <dt className="text-[12px] text-[var(--color-text-muted)] w-16 flex-shrink-0 pt-0.5">Email</dt>
                    <dd><a href={`mailto:${house.email}`} className="text-[13px] text-[var(--color-primary)] hover:underline break-all">{house.email}</a></dd>
                  </div>
                )}
                {house.website && (
                  <div className="flex gap-3">
                    <dt className="text-[12px] text-[var(--color-text-muted)] w-16 flex-shrink-0 pt-0.5">Website</dt>
                    <dd><a href={house.website} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[var(--color-primary)] hover:underline break-all">{house.website.replace(/^https?:\/\//, '')}</a></dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
