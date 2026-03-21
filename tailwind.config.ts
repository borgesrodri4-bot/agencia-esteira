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
          navy:          '#0f2f48',
          'navy-soft':   '#1a3d54',
          'navy-card':   '#235475',
          'navy-hover':  '#2a4a66',
          orange:        '#f28933',
          'orange-light':'#f5a55c',
          'orange-dark': '#c96e1a',
          'orange-muted':'rgba(242,137,51,0.15)',
          terra:         '#c79982',
          white:         '#FFFFFF',
          gray:          '#F8F8F8',
        },
        status: {
          ok:      '#22C55E',
          warning: '#F59E0B',
          danger:  '#EF4444',
          paused:  '#6B7280',
        }
      },
      fontFamily: {
        sans:    ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Cinzel', 'serif'],
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(135deg, #f28933 0%, #f5a55c 50%, #c96e1a 100%)',
        'navy-gradient':   'linear-gradient(180deg, #0f2f48 0%, #1a3d54 100%)',
      },
      boxShadow: {
        'orange':    '0 0 0 1px rgba(242,137,51,0.3)',
        'orange-lg': '0 4px 24px rgba(242,137,51,0.15)',
      }
    },
  },
  plugins: [],
}

export default config
