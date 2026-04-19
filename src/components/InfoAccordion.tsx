import { useState } from 'react';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface Props {
  sections: Section[];
}

export function InfoAccordion({ sections }: Props) {
  const [open, setOpen] = useState<string | null>(sections[0]?.id ?? null);

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-card overflow-hidden shadow-card divide-y divide-[var(--color-border)]">
      {sections.map(section => (
        <div key={section.id}>
          <button
            onClick={() => setOpen(open === section.id ? null : section.id)}
            aria-expanded={open === section.id}
            aria-controls={`acc-${section.id}`}
            className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[var(--color-surface-alt)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]"
          >
            <span className="font-medium text-[13.5px] text-[var(--color-text-primary)]">{section.title}</span>
            <svg
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              className={`flex-shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 ${open === section.id ? 'rotate-180' : ''}`}
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div
            id={`acc-${section.id}`}
            role="region"
            hidden={open !== section.id}
            className="px-4 pb-4 text-[13px] text-[var(--color-text-secondary)] leading-relaxed"
          >
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
}
