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
    background:
      'linear-gradient(180deg, rgba(6,5,14, 1), rgba(19,16,47, 1)) fixed',
  },

  '::-webkit-scrollbar': {
    background: 'rgb(38,36,51)',
    width: '6px',
    height: '6px',
    marginRight: '10px',
  },

  '::-webkit-scrollbar-corner': {
    border: 'none',
    background: 'none',
  },

  '::-webkit-scrollbar-thumb': {
    background: 'rgb(61, 60, 66)',
    borderRadius: '3px',
    cursor: 'move',
  },

  '::-webkit-scrollbar-track': {
    background: 'transparent',
    border: 'none',
  },
})
