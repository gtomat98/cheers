import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    fontWeight: 'normal',
    fontFamily: 'Roboto',
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    background: '$baseBackground',
  },
})
