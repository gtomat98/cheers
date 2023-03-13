import { createStitches } from '@stitches/react'

export const {
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  css,
} = createStitches({
  theme: {
    colors: {
      orange: '#CE8D37',
      orangeLight: '#F9AA41',

      white: '#FFFFFF',
      text: '#A9A9B2',
      textTitle: '#E7EDF4',

      baseBackground: '#1B1826',
      baseBox: '#24203A',
      baseContent: '#282347',
      baseContentHover: '#312B5D',
      baseBorder: '#3E3680',
      baseHeader: '#110C39',
    },
    fonts: {
      default: 'Quicksand',
      roboto: 'Roboto',
    },
  },
})
