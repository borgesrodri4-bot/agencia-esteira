import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'
import forms from '@tailwindcss/forms'

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
        'orange-xl': '0 8px 40px rgba(242,137,51,0.25)',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(242,137,51,0.4)' },
          '50%':      { boxShadow: '0 0 0 6px rgba(242,137,51,0)' },
        },
      },
      animation: {
        'fade-up':        'fadeUp 0.3s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':        'fadeIn 0.25s ease-out both',
        'slide-in-left':  'slideInLeft 0.3s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in':       'scaleIn 0.2s cubic-bezier(0.16,1,0.3,1) both',
        'shimmer':        'shimmer 2s linear infinite',
        'pulse-glow':     'pulseGlow 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [animate, forms({ strategy: 'class' })],
}

export default config
