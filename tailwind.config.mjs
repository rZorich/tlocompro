// tailwind.config.mjs
import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue}'],
  safelist: [
    'como-funciona',          // ⚠️ nombre que da origen al CSS hash
    'text-gray-700',
    'bg-gray-100',
    'shadow-soft',
    'shadow-card',
    'font-bold',
    'text-red-600'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'ui-sans-serif', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif']
      },
      colors: {
        brand: {
          50:  '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#0EA5A8',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A'
        }
      },
      boxShadow: {
        'soft': '0 6px 24px rgba(2,6,23,0.06)',
        'card': '0 10px 30px rgba(2,6,23,0.08)'
      },
      backgroundImage: {
        'radial-dots': 'radial-gradient(circle at 1px 1px, rgba(2,6,23,0.07) 1px, transparent 0)',
        'hero-gradient': 'linear-gradient(180deg, #F0FDFA 0%, #FFFFFF 60%)'
      },
      backgroundSize: {
        'dots': '24px 24px'
      }
    }
  },
  plugins: []
})
