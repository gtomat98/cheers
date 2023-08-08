import { styled } from '@/styles'
import * as Checkbox from '@radix-ui/react-checkbox'

export const Container = styled('main', {
  maxWidth: '1200px',
  margin: 'auto',
  padding: '0 10vw',
  marginLeft: 'auto',
})

export const Box = styled('div', {
  boxSizing: 'border-box',
  overflow: 'hidden',
  maxWidth: 1200,
  marginTop: 64,
  padding: 32,
  borderRadius: 4,
  background:
    'linear-gradient(19deg, rgba(62, 54, 128, 0.01), rgba(49, 43, 93, 0.5))',
  backdropFilter: 'blur(5px)',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 24,

  boxShadow: 'rgba(62, 54, 128, 0.3) 0px 0px 0px 1px',

  transition: 'all 200ms',

  '&:hover': {
    boxShadow:
      'rgba(62, 54, 128, 0.6) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 14px 28px, rgba(0, 0, 0, 0.15) 0px 10px 10px;',
  },

  '> span': {
    color: '$text',
    fontSize: 18,
    fontFamily: '$default',
  },

  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 24,
    alignItems: 'center',
  },

  svg: {
    display: 'inline-block',
    opacity: 0.8,
    color: '$orangeLight',
    borderRadius: '9999px',
    border: '1px solid $orange',

    padding: '0.4em 0.4em',
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
    filter: 'brightness(0.8) saturate(120%)',
    borderRadius: 999999,
    transition: 'all 150ms',
    position: 'absolute',
    zIndex: -1000,
    opacity: 1,
    top: '0%',
    left: '0%',
    transform: 'translate(-50%, -50%)',
    // animation: `${rotate} 10s infinite linear`,
    boxShadow:
      '$$color 0px 0px 30px, rgba(0, 0, 0, 0.3) 0px 18px 36px, 0px 0px 60px 10px $$color',
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
})

export const MealMeter = styled('div', {
  width: 'calc(50% - 44px)',
  display: 'flex',
  flexDirection: 'column',
  background: 'transparent',
  gap: 12,
})

export const Meter = styled('div', {
  height: 24,
  borderRadius: 3,
  background: '$$color',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  outline: '0px solid $$color',
  outlineOffset: '-1px',

  '> div': {
    zIndex: 100000000,
    height: '100%',
    transition: 'width 200ms',
    width: 'calc(100% / 5 * $$meterValue)',
    borderRadius: 3,
    background: '$$tag',
  },
})

export const Counter = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  'span:first-child': {
    color: '$textTitle',
    fontSize: 14,
    fontFamily: '$default',
  },
  'span:last-child': {
    color: '$$tag',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: '$default',
    filter: 'contrast(200%)',
  },
})

export const Meals = styled('ul', {
  marginTop: 24,
  display: 'grid',
  justifyContent: 'center',
  boxSizing: 'border-box',
  gridTemplateColumns: 'repeat(auto-fit, minmax(380px, calc(50% - 12px)))',
  gridGap: '24px 24px',
})

export const Meal = styled('li', {
  width: '100%',
  minWidth: 400,
  borderRadius: 4,
  boxSizing: 'border-box',
  listStyle: 'none',
  background: 'rgba(36, 32, 58, 0.65)',
  cursor: 'pointer',
  transition: 'background 200ms, border 200ms, opacity 200ms',
  padding: 32,

  display: 'flex',
  justifyContent: 'space-between',

  h3: {
    color: '$textTitle',
    fontFamily: 'Quicksand',
  },

  img: {
    borderRadius: 10,
  },
})

export const CheckboxRoot = styled(Checkbox.Root, {
  background: 'rgba(36, 32, 58, 0)',
  cursor: 'pointer',
  border: '2px solid $$color',
  width: 32,
  height: 32,
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 100ms',

  '&:hover': {
    border: '2px solid $$tag',
  },

  '&[data-state="checked"]': {
    border: '2px solid $$tag',
  },
})

export const CheckboxIndicator = styled(Checkbox.Indicator, {
  color: '$$tag',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
