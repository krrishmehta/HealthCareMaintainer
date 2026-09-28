/** Tailwind config - MediChain design tokens (Ripe Olive / Clary Sage / Alabaster / Accessible Beige) */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#252B21',
        paper: '#F8F7F1',

        // Ripe Olive SW 6209 — primary brand color (replaces the old "teal" scale
        // so every existing bg-teal-*/text-teal-* class in the app now renders olive)
        teal: {
          50: '#F2F3F1',
          100: '#DDE1DD',
          200: '#BCC3BB',
          300: '#9AA499',
          400: '#798677',
          500: '#576855',
          600: '#4A5848',
          700: '#3D493B',
          800: '#30392F',
        },

        // Clary Sage SW 6178 — secondary green, used for softer accents
        sage: {
          50: '#F4F6F4',
          100: '#E5E7E3',
          200: '#CAD0C7',
          300: '#B0B8AA',
          400: '#95A18E',
          500: '#7B8972',
          600: '#697461',
          700: '#566050',
        },

        // Accessible Beige SW 7036 — replaces the old "amber" accent scale
        amber: {
          50: '#EFEEEB',
          100: '#DEDDD7',
          200: '#C8C6BC',
          400: '#928D79',
          500: '#837F6D',
          600: '#6E6A5B',
        },

        // Alabaster SW 7008 as a dedicated token for surfaces that want the warm off-white directly
        alabaster: '#F3F1E5',

        danger: '#C4432B',
        success: '#4F7A4A',

        // Warm, beige-tinted neutral scale (replaces the old cool "slate" grays)
        slate: {
          50: '#EFEEEB',
          100: '#E5E3DC',
          200: '#D6D3C7',
          300: '#C1BEB0',
          400: '#ADA99A',
          500: '#8D8A7A',
          600: '#6E6A5B',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out both',
        fadeInUp: 'fadeInUp 0.55s cubic-bezier(0.16,1,0.3,1) both',
        scaleIn: 'scaleIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
        slideInRight: 'slideInRight 0.45s cubic-bezier(0.16,1,0.3,1) both',
        shimmer: 'shimmer 1.6s linear infinite',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
