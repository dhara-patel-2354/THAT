import { Link } from 'react-router-dom';

export function StaffSignInPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--color-surface-alt)]">
      {/* Header matching main app */}
      <header className="bg-white border-b border-[var(--color-border)] shadow-topbar">
        <div className="flex items-center h-16 px-4 lg:px-8 max-w-7xl mx-auto gap-4">
          <Link
            to="/list"
            className="flex items-center gap-2.5 flex-shrink-0"
            aria-label="THAT Housing — Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="white" />
                <polyline points="9 22 9 12 15 12 15 22" stroke="white" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="font-bold text-[var(--color-primary)] text-[15px] tracking-tight">THAT</div>
              <div className="text-[10px] font-medium text-[var(--color-text-muted)] -mt-0.5">Transition House Availability</div>
            </div>
          </Link>
          <div className="flex-1" />
          <Link
            to="/list"
            className="text-[13px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back to listings
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Icon + heading */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-light)] flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]">Transition House Sign-in</h1>
            <p className="text-[13.5px] text-[var(--color-text-muted)] mt-2">Manage your house's availability status</p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-card border border-[var(--color-border)] shadow-card p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-[13px] font-medium text-[var(--color-text-primary)] mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@organization.ca"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[13.5px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary-mid)] focus:ring-2 focus:ring-[var(--color-primary-light)] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-[13px] font-medium text-[var(--color-text-primary)] mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[13.5px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary-mid)] focus:ring-2 focus:ring-[var(--color-primary-light)] transition-colors"
                />
              </div>

              <button
                type="button"
                disabled
                className="w-full py-3 rounded-lg bg-[var(--color-cta)] text-white font-semibold text-[14px] opacity-60 cursor-not-allowed mt-1"
                aria-disabled="true"
              >
                Sign in — coming soon
              </button>
            </div>
          </div>

          <p className="text-center text-[12px] text-[var(--color-text-muted)] mt-5">
            Staff portal is under development.{' '}
            <Link to="/list" className="text-[var(--color-primary)] hover:underline font-medium">
              Return to public listings
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[var(--color-primary)] text-white py-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px]">
          <p className="opacity-70">© 2026 TechAlong Labs · THAT Housing</p>
          <div className="flex gap-4 opacity-70">
            <a href="#" className="hover:opacity-100 transition-opacity">About Us</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Donate</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
