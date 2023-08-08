import { styled } from '@/styles'

export const Container = styled('main', {
  maxWidth: '1200px',
  margin: 'auto',
  padding: '0 10vw',
  marginLeft: 'auto',
})

export const Box = styled('div', {
  maxWidth: 1200,
  padding: 32,
  borderRadius: 4,
  background:
    'linear-gradient(19deg, rgba(62, 54, 128, 0.01), rgba(49, 43, 93, 0.5))',
  backdropFilter: 'blur(5px)',

  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  boxShadow: 'rgba(62, 54, 128, 0.3) 0px 0px 0px 1px',

  transition: 'all 200ms',

  '&:hover': {
    boxShadow:
      'rgba(62, 54, 128, 0.6) 0px 0px 0px 2px, rgba(0, 0, 0, 0.15) 0px 14px 28px, rgba(0, 0, 0, 0.15) 0px 10px 10px;',
  },

  '> span': {
    color: '$text',
    fontSize: 18,
    fontFamily: '$default',
  },
})

export const Title = styled('h1', {
  color: '$textTitle',
  fontSize: 24,
  fontFamily: '$default',

  span: {
    fontFamily: '$default',
    fontWeight: 'bold',
  },

  '@media (max-width: 500px)': {
    fontSize: 18,
  },
})

export const WeekDays = styled('main', {
  marginTop: 24,
  display: 'flex',
  width: '100%',
  backdropFilter: 'blur(3px)',
  borderRadius: 4,
})
