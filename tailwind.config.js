/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Work Sans"', 'sans-serif']
    },
    extend: {
      screens: {
        xs: '321px'
      },
      colors: {
        transparent: 'transparent',
        primary: {
          900: '#453DB8',
          700: '#6D66CC',
          500: '#9994DB',
          300: '#C5C2EB',
          100: '#E0E0F5',
          50: '#EAE8F8',
          DEFAULT: '#9994DB',
          light: '#E0E0F5',
          contrast: '#F9F9F8',
          highlight: '#1b5a65'
        },
        secondary: {
          900: '#324334',
          700: '#4F6953',
          500: '#608066',
          300: '#8BA790',
          100: '#AEC2B1',
          DEFAULT: '#608066',
          light: '#AEC2B1',
          contrast: '#F9F9F8'
        },
        tertiary: {
          700: '#EB9C0A',
          500: '#F6AE2D',
          300: '#F9CB76',
          100: '#FCE1B1',
          DEFAULT: '#F6AE2D',
          light: '#FCE1B1',
          contrast: '#272C26'
        },
        grey: {
          900: '#444C42',
          700: '#626D5F',
          600: '#808D7C',
          500: '#95A092',
          300: '#BFC6BE',
          100: '#E0E3DE',
          DEFAULT: '#95A092',
          light: '#E0E3DE'
        },
        black: '#272C26',
        white: '#F9F9F8',
        success: {
          700: '#286750',
          500: '#62C29F',
          300: '#D3EEE4',
          DEFAULT: '#5DB877'
        },
        warning: {
          700: '#B07507',
          500: '#F6AE2D',
          300: '#FBDA9D',
          DEFAULT: '#F6AE2D'
        },
        danger: {
          700: '#8D1401',
          500: '#F42201',
          300: '#FFCBC2',
          DEFAULT: '#F42201'
        },
        info: {
          700: '#254B55',
          500: '#55A0B4',
          300: '#C6DFE6',
          DEFAULT: '#55A0B4'
        }
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': ['0 35px 35px rgba(0, 0, 0, 0.25)', '0 45px 65px rgba(0, 0, 0, 0.15)']
      },
      borderRadius: {
        none: '0',
        DEFAULT: '6px',
        xs: '4px',
        sm: '6px',
        md: '10px',
        lg: '12px',
        xl: '16px'
      },
      transformOrigin: {
        0: '0%'
      }
    }
  },
  plugins: [],
}
