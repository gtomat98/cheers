import { styled } from '@/styles'

export const Container = styled('main', {
  maxWidth: 572,
  width: 'fit-content',
  margin: '60px auto 16px',
  padding: '0 16px',
})

export const Header = styled('header', {
  maxWidth: 572,
  margin: '60px auto 16px',
})

export const Box = styled('div', {
  maxWidth: 480,
  marginTop: 48,
  padding: 32,
  borderRadius: 10,
  background: '$baseBox',

  display: 'flex',
  flexDirection: 'column',
  gap: 24,

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
})

export const ActionsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 32,
  alignItems: 'center',
})

export const Action = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  background: '$baseContent',
  cursor: 'pointer',
  borderRadius: 10,
  padding: 24,

  transition: 'background 200ms',

  svg: {
    color: '$white',
    opacity: 0.8,
    transition: 'all 200ms',
  },

  img: {
    opacity: 0.8,
    transition: 'all 200ms',
  },

  '&:hover': {
    background: '$baseContentHover',

    img: {
      opacity: 1,
    },

    svg: {
      opacity: 1,
    },
  },
})

export const WeekDays = styled('div', {
  marginTop: 64,
  display: 'flex',
  flexDirection: 'column',
  ul: {
    marginTop: 24,
    display: 'flex',
    alignItems: 'center',
  },
})

export const WeekDay = styled('li', {
  listStyleType: 'none',
  maxWidth: 320,
  padding: '32px 0px 32px 32px',
  borderRadius: 6,
  background: '$baseBox',

  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  header: {
    fontFamily: '$default',
    fontSize: 24,
    color: '$textTitle',
    lineHeight: 1.6,
  },
})

export const Buttons = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

export const ButtonStyled = styled('button', {
  all: 'unset',
  display: 'flex',
  gap: 16,
  alignItems: 'center',
  width: '100%',
  padding: 8,
  borderRadius: '6px 0px 0px 6px',
  opacity: 0.6,
  cursor: 'pointer',
  color: '$white',
  background: '$baseContentHover',

  transition: 'all 200ms',

  span: {
    opacity: 0,
    fontSize: 14,
    fontFamily: '$default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  img: {
    transition: 'all 200ms',
    borderRadius: '0%',
  },

  '&:hover': {
    opacity: 1,
    borderRadius: '100px 0px 0px 100px',
    transition: 'all 500ms',
    img: {
      borderRadius: '100%',
      transition: 'all 500ms',
    },
  },
})
