/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        substrate: {
          DEFAULT: '#080c08',
          light: '#f4f1ec',
          raised: '#0e120e',
          panel: '#111611',
        },
        copper: {
          DEFAULT: '#c4a44a',
          bright: '#d4b858',
          dim: '#8a7234',
          trace: '#b8943e',
        },
        trace: {
          DEFAULT: '#00c8c8',
          bright: '#00e5ff',
          dim: '#008888',
          glow: '#00ffff',
        },
        pad: {
          DEFAULT: '#d4a843',
          hover: '#e8c464',
          active: '#ffd700',
        },
        via: {
          DEFAULT: '#a0a8b0',
          bright: '#c8d0d8',
          ring: '#6a7280',
        },
        silkscreen: {
          DEFAULT: '#d8dcd6',
          dim: '#8a9088',
          light: '#b0b4ae',
        },
        led: {
          green: '#00ff41',
          red: '#ff3344',
          amber: '#ffaa00',
        },
        plane: {
          ground: '#060a06',
          power: '#0a100a',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans: ['"Exo 2"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display-mono': ['clamp(2.5rem, 7vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'silkscreen': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: '500' }],
        'designator': ['0.75rem', { lineHeight: '1', letterSpacing: '0.08em', fontWeight: '600' }],
      },
      boxShadow: {
        'trace': '0 0 0 1px rgba(0,200,200,0.3)',
        'trace-glow': '0 0 12px rgba(0,229,255,0.15)',
        'pad': '0 2px 0 rgba(180,140,60,0.4)',
        'pad-hover': '0 0 16px rgba(212,168,67,0.3), 0 2px 0 rgba(180,140,60,0.6)',
        'component': '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,200,200,0.08)',
        'component-hover': '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,200,200,0.2), 0 0 24px rgba(0,229,255,0.08)',
      },
      borderRadius: {
        'pad': '0.125rem',
        'component': '0.25rem',
        'chip': '0.5rem',
      },
      borderWidth: {
        'trace': '1px',
        'bus': '2px',
      },
      animation: {
        'signal': 'signal-pulse 2s ease-in-out infinite',
        'trace-flow': 'trace-dash 3s linear infinite',
        'led-blink': 'led-blink 1.5s ease-in-out infinite',
        'power-on': 'power-on 0.6s ease-out forwards',
        'scan-line': 'scan-line 8s linear infinite',
      },
      keyframes: {
        'signal-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'trace-dash': {
          '0%': { strokeDashoffset: '20' },
          '100%': { strokeDashoffset: '0' },
        },
        'led-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'power-on': {
          '0%': { opacity: '0', filter: 'brightness(0.3)' },
          '100%': { opacity: '1', filter: 'brightness(1)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
