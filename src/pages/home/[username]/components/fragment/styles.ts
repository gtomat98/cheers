import { styled } from '@/styles'

export const FragmentContainer = styled('div', {
  position: 'fixed',
  bottom: 0,
  right: 0,
  zIndex: 3,
  width: '100%',
  height: 75,
  display: 'block',
})

export const FragmentBackground = styled('div', {
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%',
  background:
    'linear-gradient(19deg, rgba(27, 24, 38, 0.1), rgba(49, 43, 93, 0.5))',
  transformOrigin: '0px 0px',
  transform: 'skewY(0deg)',
  overflow: 'hidden',
  zIndex: 1,
  backdropFilter: 'blur(20px)',

  '&::before, &::after': {
    display: 'block',
    position: 'absolute',
    content: '',
    width: '80%',
    height: '(100%/3)',
    opacity: 0.3,
    filter: 'blur(15px)',
  },

  '&::before': {
    background: '$colors$color1',
    right: 0,
  },

  '&::after': {
    background: '$colors$color2',
    bottom: 0,
  },
})

export const FragmentContent = styled('div', {
  textAlign: 'center',
  padding: '4rem 4rem',
  margin: '0 auto',

  '@large': {
    textAlign: 'left',
    padding: '10rem 4rem',
    maxWidth: '54rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
})
