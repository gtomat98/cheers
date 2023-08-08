import { styled } from '@/styles'
import Link from 'next/link'

export const HeaderFixed = styled('div', {
  width: '100%',
  position: 'fixed',
  top: 0,
  zIndex: 100000000000000,
})

export const HeaderContainer = styled('div', {
  background:
    'linear-gradient(19deg, rgba(62, 54, 128, 0.01), rgba(49, 43, 93, 0.5))',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  margin: 'auto',
  padding: '0 10vw',
  marginLeft: 'auto',
  justifyContent: 'center',
  alignItems: 'center',
})

export const HeaderContent = styled('header', {
  maxWidth: 1200,
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0px',

  '@media (max-width: 500px)': {
    '&>a>img': {
      width: '120px',
    },
  },

  '@media (max-width: 320px)': {
    '&>a>img': {
      width: '100px',
    },
  },
})

export const HistoricButton = styled(Link, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  width: 46,
  height: 46,
  borderRadius: 6,
  color: '$text',
  cursor: 'pointer',

  background: 'transparent',

  transition: 'color 200ms ease-out 0s, background 200ms ease-out 0s',

  '&:hover': {
    color: '$textTitle',
    background: 'rgba(62, 54, 128, 0.5)',
  },

  '@media (max-width: 500px)': {
    width: 46,
    height: 46,
  },

  '@media (max-width: 320px)': {
    width: 40,
    height: 40,
  },

  svg: {
    width: '60%',
    height: '60%',
  },
})

export const NavigationContainer = styled('nav', {
  display: 'flex',
  alignItems: 'center',
  gap: 18,
})
