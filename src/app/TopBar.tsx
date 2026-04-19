import { Link, NavLink, useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightSlot?: React.ReactNode;
  variant?: 'default' | 'detail';
}

export function TopBar({ title, showBack, onBack, rightSlot, variant = 'default' }: Props) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  if (variant === 'detail' || showBack) {
    return (
      <header className="sticky top-0 z-30 bg-white border-b border-[var(--color-border)] safe-top" style={{ minHeight: 'var(--topbar-height)' }}>
        <div className="flex items-center h-16 px-4 gap-3 max-w-3xl mx-auto">
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="p-2 -ml-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="flex-1 font-semibold text-[15px] text-[var(--color-text-primary)] truncate">{title}</h1>
          {rightSlot}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[var(--color-border)] safe-top shadow-topbar">
      <div className="flex items-center h-16 px-4 lg:px-8 gap-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/list"
          className="flex items-center gap-2.5 flex-shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] rounded"
          aria-label="THAT Housing — Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="white" />
              <polyline points="9 22 9 12 15 12 15 22" stroke="white" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div className="leading-tight">
            <div className="font-bold text-[var(--color-primary)] text-[15px] tracking-tight">THAT</div>
            <div className="text-[10px] font-medium text-[var(--color-text-muted)] -mt-0.5 leading-none">Transition House Availability</div>
          </div>
        </Link>

        {/* Center nav — desktop */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 ml-6">
          <NavLink
            to="/list"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-[13.5px] font-medium transition-colors
              ${isActive
                ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-[13.5px] font-medium transition-colors
              ${isActive
                ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]'
              }`
            }
          >
            Map
          </NavLink>
          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-[13.5px] font-medium transition-colors
              ${isActive
                ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]'
              }`
            }
          >
            Saved
          </NavLink>
          <a
            href="#"
            className="px-4 py-2 rounded-lg text-[13.5px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] transition-colors"
          >
            FAQ
          </a>
          <a
            href="#"
            className="px-4 py-2 rounded-lg text-[13.5px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] transition-colors"
          >
            Resources
          </a>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right: Staff CTA */}
        <div className="flex items-center gap-2">
          {rightSlot}
          <Link
            to="/staff/sign-in"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13.5px] font-semibold text-white bg-[var(--color-cta)] hover:bg-[var(--color-cta-dark)] transition-colors flex-shrink-0"
            aria-label="Transition house staff sign in"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            <span className="hidden sm:inline">Transition House Sign-in</span>
            <span className="sm:hidden">Sign in</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
