/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // fontFamily: {
    //   serif: ['"Lora"', 'serif'],
    //   sans: ['"Open Sans"', 'sans-serif']
    // },
    extend: {
      screens: {
        xs: '321px'
      },
      colors: {
        transparent: 'transparent',
        primary: {
          700: '#002a31',
          500: '#024854',
          400: '#1A4D56',
          300: '#067689',
          100: '#DBF9FE',
          DEFAULT: '#024854',
          light: '#44AFC1',
          contrast: '#FFFFFF',
          highlight: '#1b5a65'
        },
        secondary: {
          700: '#69C283',
          500: '#92E3A9',
          300: '#BFF0CD',
          100: '#E9FDEF',
          DEFAULT: '#92E3A9',
          light: '#E9FDEF',
          contrast: '#024854'
        },
        tertiary: {
          700: '#C00F0C',
          500: '#EB130F',
          300: '#F45552',
          100: '#FFAFAD',
          DEFAULT: '#EB130F',
          light: '#FFAFAD',
          contrast: '#FFFFFF'
        },
        grey: {
          900: '#586B71',
          700: '#8C9FA4',
          600: '#C4CFD3',
          500: '#DAE0E2',
          300: '#E7EDEF',
          200: '#efeff0',
          100: '#F4F4F4',
          DEFAULT: '#E7EDEF',
          light: '#F4F4F4'
        },
        black: '#2d2f33',
        white: '#FFFFFF',
        success: {
          700: '#327144',
          500: '#5DB877',
          300: '#D5EEDC',
          100: '#EAF5EB',
          DEFAULT: '#5DB877'
        },
        warning: {
          700: '#8A6500',
          500: '#FFCD40',
          300: '#FBF3C8',
          100: '#FEF9E8',
          DEFAULT: '#FFCD40'
        },
        danger: {
          700: '#B62C16',
          500: '#EE4B4B',
          300: '#FF9494',
          100: '#F9ECEB',
          DEFAULT: '#EB715F'
        },
        info: {
          900: '#12457b',
          700: '#144D91',
          500: '#3170BB',
          300: '#DAE5F2',
          100: '#EEF3FA',
          DEFAULT: '#3170BB'
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
