import { styled } from '@/styles'

export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  height: '100vh',
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',

  overflow: 'hidden',

  '@media (max-width:600px)': {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const MainContainer = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '80px',
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 40px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex',
  alignItems: 'start',
  gap: '2rem',

  '> p': {
    fontFamily: '$roboto',
    fontSize: '1.5rem',
    color: '$text',
  },
})

export const Preview = styled('div', {
  paddingRight: '32px',
  overflow: 'hidden',

  '@media (max-width:600px)': {
    display: 'none',
  },
})
