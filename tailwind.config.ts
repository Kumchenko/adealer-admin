import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const { fontSize } = defaultTheme

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      blur: {
        xs: '2px',
      },
      backgroundImage: {
        'light-gradient': 'linear-gradient(95deg, rgba(196,181,253,1) 0%, rgba(245,208,254,1) 100%)',
        polygon: "url('/img/polygon.svg')",
        calendar: "url('/img/calendar.svg')",
      },
      fontSize: {
        h1: ['3.3rem', { lineHeight: '1' }],
        h2: fontSize['5xl'],
        h3: fontSize['4xl'],
        h4: fontSize['3xl'],
        h5: fontSize['2xl'],
        h6: fontSize['xl'],
      },
      backgroundPosition: {
        select: 'right .375rem center',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
