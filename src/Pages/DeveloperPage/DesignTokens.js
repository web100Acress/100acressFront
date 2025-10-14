// Design tokens for Developer Page (colors, radii, shadows, spacing)
export const tokens = {
  colors: {
    brand: {
      primary: '#b8333a',
      gradientFrom: '#C13B44',
      gradientTo: '#ef4444',
    },
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
      muted: '#6b7280',
    },
    surface: {
      card: 'rgba(255,255,255,0.7)',
      glass: 'rgba(255,255,255,0.45)',
      overlay: 'rgba(2,6,23,0.55)'
    },
    borders: '#e5e7eb',
    success: '#16a34a',
    danger: '#dc2626',
    info: '#2563eb'
  },
  radii: {
    sm: '10px',
    md: '14px',
    lg: '20px',
    pill: '9999px'
  },
  shadow: {
    sm: '0 6px 16px rgba(0,0,0,0.08)',
    md: '0 12px 26px rgba(0,0,0,0.12)',
    lg: '0 18px 40px rgba(0,0,0,0.20)'
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    xl: 32
  },
  typography: {
    heading: "'Poppins','Inter',sans-serif",
    body: "'Inter','system-ui',sans-serif"
  }
};

export const gradients = {
  primary: `linear-gradient(90deg, ${'#C13B44'} 0%, ${'#ef4444'} 100%)`,
  darkOverlay: 'linear-gradient(90deg, rgba(2,6,23,0.7) 0%, rgba(2,6,23,0.3) 100%)'
};
