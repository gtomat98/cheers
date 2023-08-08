import { styled } from '@/styles'

export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  height: '100vh',
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',

  overflow: 'hidden',

  '@media (max-width:500px)': {
    all: 'unset',
    display: 'flex',
    height: '100vh',
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    div: {},

    img: {
      width: '90%',
    },
  },
})

export const MainContainer = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '20px',
})

export const Hero = styled('div', {
  width: '100%',
  maxWidth: 480,
  padding: '0 40px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex',
  alignItems: 'start',
  gap: '2rem',

  '> p': {
    fontFamily: '$default',
    fontSize: '2rem',
    color: '$textTitle',
    span: {
      fontWeight: 'bold',
      fontFamily: 'Quicksand',
    },
  },
})

export const Preview = styled('div', {
  paddingRight: '32px',
  overflow: 'hidden',

  '@media (max-width:600px)': {
    display: 'none',
  },
})
