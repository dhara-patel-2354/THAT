import type { CategoryTag, PopulationTag } from '../types';

const categoryLabels: Record<CategoryTag, string> = {
  'transitional-housing': 'Transitional',
  'shelter': 'Shelter',
  'sober-living': 'Sober Living',
  'mental-health': 'Mental Health',
  'addiction-recovery': 'Recovery',
  'domestic-violence': 'DV Support',
  'youth-services': 'Youth',
  'veteran-services': 'Veterans',
  'family-housing': 'Families',
};

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

interface Props {
  categories?: CategoryTag[];
  populationTags?: PopulationTag[];
  max?: number;
}

export function CategoryChips({ categories = [], populationTags = [], max = 4 }: Props) {
  const allChips = [
    ...populationTags.map(t => ({ key: t, label: populationLabels[t], kind: 'pop' as const })),
    ...categories.map(t => ({ key: t, label: categoryLabels[t], kind: 'cat' as const })),
  ];

  const visible = allChips.slice(0, max);
  const overflow = allChips.length - max;

  return (
    <div className="flex flex-wrap gap-1.5" role="list">
      {visible.map(chip => (
        <span
          key={chip.key}
          role="listitem"
          className={`text-xs px-2 py-0.5 rounded-full font-medium
            ${chip.kind === 'pop'
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}
        >
          {chip.label}
        </span>
      ))}
      {overflow > 0 && (
        <span role="listitem" className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
          +{overflow} more
        </span>
      )}
    </div>
  );
}
