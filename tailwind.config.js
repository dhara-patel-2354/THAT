/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-light': 'var(--color-primary-light)',
        'primary-mid': 'var(--color-primary-mid)',
        cta: 'var(--color-cta)',
        'cta-dark': 'var(--color-cta-dark)',
        surface: 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        border: 'var(--color-border)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'text-label': 'var(--color-text-label)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        chip: 'var(--radius-chip)',
        btn: 'var(--radius-btn)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        sheet: 'var(--shadow-sheet)',
        dropdown: 'var(--shadow-dropdown)',
        topbar: 'var(--shadow-topbar)',
      },
      screens: {
        sm: '641px',
        md: '768px',
        lg: '1025px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}
