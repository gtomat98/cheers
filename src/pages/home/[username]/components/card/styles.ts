import { styled, keyframes } from '@/styles'

const rotate = keyframes({
  '0%': {
    transition: 'all 200ms',
    transform: 'rotate(0deg)',
  },

  '50%': {
    transition: 'all 200ms',
    transform: 'rotate(180deg)',
  },

  '100%': {
    transition: 'all 200ms',
    transform: 'rotate(360deg)',
  },
})

export const WeekDay = styled('div', {
  minWidth: '225px',
  maxWidth: '225px',
  listStyleType: 'none',
  padding: '32px 0px 32px 32px',
  borderRadius: 4,
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
  opacity: 0.9,

  borderBottom: '4px solid transparent',

  background: 'rgba(15,12,33, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: 48,
  transition: 'border 50ms, opacity 50ms',

  '&:hover': {
    borderBottom: '4px solid $$color',
    cursor: 'grab',
    transition: 'border 200ms, opacity 200ms',
    opacity: 1,
  },

  '&:active': {
    cursor: 'grabbing',
    '&>img': {
      width: 90,
      height: 90,
      transition: ' all 100ms',
    },
  },

  '&>img': {
    filter: 'contrast(120%) brightness(0.8) saturate(120%)',
    transition: 'all 150ms',
    position: 'absolute',
    top: '-12%',
    right: '-12%',
    borderRadius: 999,
    animation: `${rotate} 10s infinite linear`,
    boxShadow:
      '$$color 0px 0px 30px, rgba(0, 0, 0, 0.3) 0px 18px 36px, 0px 0px 60px 10px $$color',
  },

  header: {
    fontFamily: '$default',
    fontSize: 24,
    color: '$textTitle',
    lineHeight: 1.6,
  },
})

export const ButtonStyled = styled('button', {
  all: 'unset',
  boxSizing: 'border-box',
  width: '100%',
  minWidth: '200px',
  display: 'flex',
  gap: 16,
  alignItems: 'center',
  padding: 8,
  borderRadius: '6px 0px 0px 6px',
  opacity: 0.6,
  cursor: 'pointer',
  justifyContent: 'space-between',
  color: '$white',
  background: '$baseContentHover',

  transition: 'all 200ms',

  span: {
    fontSize: 14,
    fontFamily: '$default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    strong: {
      color: '$textTitle',
      fontFamily: '$default',
      fontWeight: 'bold',
    },
  },

  img: {
    transition: 'all 200ms',
    borderRadius: '0%',
  },

  '&:hover': {
    opacity: 1,
    // borderRadius: '100px 0px 0px 100px',
    transition: 'all 400ms',
    img: {
      // borderRadius: '100%',
      transition: 'all 400ms',
    },
  },
})
