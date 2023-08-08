import { styled, keyframes } from '@/styles'

const WaveAnimation = keyframes({
  '0%, 100%': {
    transform: 'rotate(0deg)',
  },

  '25%': {
    transform: 'rotate(20deg)',
  },

  '75%': {
    transform: 'rotate(-15deg)',
  },
})

export const FooterContainer = styled('footer', {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 64,
  zIndex: 5,
})

export const Ul = styled('ul', {
  maxWidth: 1200,
  width: '100%',
  padding: '0 10vw',
  display: 'flex',
  gap: '24px',
  justifyItems: 'start',
  justifyContent: 'start',
  alignItems: 'center',

  '&:hover': {
    'li:first-child': {
      animation: `${WaveAnimation} 0.3s infinite`,
    },
  },
})

export const A = styled('a', {
  color: 'white',
  textDecoration: 'none',
  boxShadow: 'inset 0 -1px 0 hsla(0, 0%, 100%, 0.4)',

  '&:hover': {
    boxShadow: 'inset 0 -1.2em 0 hsla(0, 0%, 100%, 0.4)',
  },
})

export const Li = styled('li', {
  listStyleType: 'none',
  '&:last-child': {
    gridColumn: '1 / 2',
    gridRow: '1 / 2',
  },

  '&:first-child': {
    fontSize: 24,
  },

  '&:hover ~ li p': {
    fontSize: '3rem',
    animation: `${WaveAnimation} 0.3s infinite`,
  },
})
