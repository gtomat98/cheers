import { styled } from '@/styles'
import * as Checkbox from '@radix-ui/react-checkbox'

export const Container = styled('main', {
  width: 'fit-content',
  margin: '60px auto 16px',
  padding: '0 16px',
})

export const Header = styled('header', {
  margin: '60px auto 16px',
})

export const Box = styled('div', {
  marginTop: 48,
  padding: 32,
  borderRadius: 8,
  background: '$baseBox',

  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  '> span': {
    color: '$text',
    fontSize: 18,
    fontFamily: '$default',
  },

  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 24,
  },
})

export const Title = styled('div', {
  display: 'flex',
  gap: 16,
  alignItems: 'center',
  color: '$textTitle',
  fontWeight: 'bold',
  fontSize: 24,
  fontFamily: '$default',

  button: {
    all: 'unset',
    cursor: 'pointer',
  },
})

export const MealMeter = styled('div', {
  width: 375,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const Meter = styled('div', {
  height: 24,
  borderRadius: 3,
  background: '$baseContent',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  outline: '3px solid $baseBorder',
  outlineOffset: '-3px',

  '> div': {
    zIndex: 100000000,
    boxShadow:
      'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px, rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,rgba(0, 0, 0, 0.5) 0px 18px 36px -18px inset',
    height: '100%',
    transition: 'width 200ms',
    width: 'calc(100% / 5 * 1)',
    borderRadius: 3,
    background: '$orange',
  },
})

export const Counter = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  'span:first-child': {
    color: '$text',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: '$default',
  },
  'span:last-child': {
    color: '$orange',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: '$default',
  },
})

export const Meals = styled('ul', {
  marginTop: 32,
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
})

export const Meal = styled('li', {
  borderRadius: 5,
  width: 620,
  height: 340,
  listStyle: 'none',
  background: '$baseContent',
  border: '5px solid transparent',
  cursor: 'pointer',
  opacity: 0.9,
  transition: 'background 200ms, border 200ms, opacity 200ms',
  padding: 32,

  display: 'flex',
  justifyContent: 'space-between',

  '&:hover': {
    background: '$baseContentHover',
    opacity: 1,
  },

  img: {
    borderRadius: 10,
  },
})

export const CheckboxRoot = styled(Checkbox.Root, {
  backgroundColor: '$baseBorder',
  cursor: 'pointer',
  border: '2px solid $baseBorder',
  width: 32,
  height: 32,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 200ms',

  '&:hover': {
    border: '2px solid $orange',
  },
})

export const CheckboxIndicator = styled(Checkbox.Indicator, {
  color: '$orange',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
