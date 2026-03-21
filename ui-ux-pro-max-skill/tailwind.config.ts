import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black:       '#1A1A1A',
          'black-soft': '#242424',
          'black-card': '#2E2E2E',
          'black-hover':'#383838',
          gold:        '#C9A84C',
          'gold-light': '#DFC278',
          'gold-dark':  '#A8862E',
          'gold-muted': 'rgba(201,168,76,0.15)',
          white:       '#FFFFFF',
          gray:        '#F8F8F8',
        },
        status: {
          ok:      '#22C55E',
          warning: '#F59E0B',
          danger:  '#EF4444',
          paused:  '#6B7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #DFC278 50%, #A8862E 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1A1A1A 0%, #242424 100%)',
      },
      boxShadow: {
        'gold': '0 0 0 1px rgba(201,168,76,0.3)',
        'gold-lg': '0 4px 24px rgba(201,168,76,0.15)',
      }
    },
  },
  plugins: [],
}

export default config
