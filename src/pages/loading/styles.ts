import { styled, keyframes } from '@/styles'

export const Container = styled('div', {
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 10vw',
})

export const Divisor = styled('div', {
  maxWidth: 1200,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  justifyContent: 'center',
  alignItems: 'center',

  h1: {
    fontSize: 28,
    color: '$textTitle',
    fontWeight: 'bold',
  },

  p: {
    fontSize: 14,
    color: '$text',
  },
})

const loadingAnimation = keyframes({
  '0%': {
    top: '36px',
    left: '36px',
    width: 0,
    height: 0,
    opacity: 0,
  },

  '4.9%': {
    top: '36px',
    left: '36px',
    width: 0,
    height: 0,
    opacity: 0,
  },

  '5%': {
    top: '36px',
    left: '36px',
    width: 0,
    height: 0,
    opacity: 1,
  },

  '100%': {
    top: '0px',
    left: '0px',
    width: '72px',
    height: '72px',
    opacity: 0,
  },
})

export const LdsRipple = styled('div', {
  display: 'inline-block',
  position: 'relative',
  width: '80px',
  height: '80px',

  '& div': {
    position: 'absolute',
    border: '4px solid #fff',
    opacity: 1,
    borderRadius: '50%',
    animation: `${loadingAnimation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite`,
  },

  '& div:nth-child(2)': {
    animationDelay: '-0.5s',
  },
})
