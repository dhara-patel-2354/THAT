interface Props {
  phone?: string;
  email?: string;
  website?: string;
  directionsUrl?: string;
}

export function ActionButtons({ phone, email, website, directionsUrl }: Props) {
  return (
    <div className="flex flex-col gap-2.5">
      {phone && (
        <a
          href={`tel:${phone}`}
          className="flex items-center justify-center gap-2.5 w-full py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold text-[13.5px] hover:bg-[var(--color-primary-dark)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]"
          aria-label={`Call ${phone}`}
        >
          <PhoneIcon />
          Call {phone}
        </a>
      )}

      <div className="flex gap-2.5">
        {directionsUrl && (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium text-[13px] hover:bg-[var(--color-surface-alt)] transition-colors"
          >
            <DirectionsIcon />
            Directions
          </a>
        )}

        {email ? (
          <a
            href={`mailto:${email}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium text-[13px] hover:bg-[var(--color-surface-alt)] transition-colors"
            aria-label={`Email ${email}`}
          >
            <EmailIcon />
            Email
          </a>
        ) : (
          <button
            disabled
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] font-medium text-[13px] opacity-40 cursor-not-allowed"
            aria-label="Email not available"
            aria-disabled="true"
          >
            <EmailIcon />
            Email
          </button>
        )}

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium text-[13px] hover:bg-[var(--color-surface-alt)] transition-colors"
          >
            <WebIcon />
            Website
          </a>
        )}
      </div>
    </div>
  );
}

function PhoneIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l.72-.72a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
}

function DirectionsIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>;
}

function EmailIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
}

function WebIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
}
