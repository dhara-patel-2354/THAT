import { NavLink } from 'react-router-dom';

const navItems = [
  {
    to: '/list',
    label: 'List',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <circle cx="3.5" cy="6" r="0.75" fill="currentColor" />
        <circle cx="3.5" cy="12" r="0.75" fill="currentColor" />
        <circle cx="3.5" cy="18" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  {
    to: '/map',
    label: 'Map',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    to: '/saved',
    label: 'Saved',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 2.5 : 1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export function BottomNav() {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-[var(--color-border)] safe-bottom lg:hidden"
      style={{ height: 'var(--bottom-nav-height)' }}
    >
      <ul className="flex h-full" role="list">
        {navItems.map(item => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              aria-label={item.label}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center h-full gap-1 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] rounded-none
                ${isActive
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-text-muted)]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.icon(isActive)}
                  <span className="text-[10px] font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
