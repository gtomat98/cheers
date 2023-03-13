import { styled, keyframes } from '@/styles'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as Select from '@radix-ui/react-select'

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
    width: '20%',
  },

  '100%': {
    opacity: 1,
    width: '100%',
  },
})

export const Form = styled('form', {
  marginTop: 32,
  padding: 24,
  borderRadius: 6,
  background: '$baseBox',

  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

export const InputsContainer = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, calc(33.3% - (48px/3)))',
  justifyContent: 'space-between',

  label: {
    display: 'block',
    color: '$textTitle',
    input: {
      all: 'unset',
      marginTop: 8,
      width: 'calc(100% - 32px)',
      padding: '12px 16px',
      borderRadius: 6,
      background: '$baseContent',

      cursor: 'text',

      color: '$textTitle',

      '&:focus': {
        outline: '2px solid $baseBorder',
      },
    },
  },
})

export const GenderTypeContainer = styled('div', {
  span: {
    color: '$textTitle',
  },
})

export const GenderType = styled(RadioGroup.Root, {
  width: '100%',

  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, calc(50% - (24px/2)))',
  justifyContent: 'space-between',

  marginTop: '0.5rem',
})

export const GenderTypeButton = styled(RadioGroup.Item, {
  background: '$baseContent',

  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  borderRadius: 6,
  cursor: 'pointer',
  color: '$textTitle',
  fontSize: '1rem',
  fontWeight: 'bold',
  border: '3px solid transparent',

  transition: 'background 400ms',

  "&[data-state='unchecked']:hover": {
    background: '$baseBorder',
  },

  "&[data-state='checked']": {
    border: '3px solid $baseBorder',
  },
})

export const ActivityFactorTypeContainer = styled('div', {
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  span: {
    color: '$textTitle',
  },
})

export const ActivityFactorRoot = styled(Select.Root, {})

export const ActivityFactorSelect = styled(Select.Trigger, {
  outline: 'none',
  background: '$baseContent',

  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5rem',
  borderRadius: 6,
  cursor: 'pointer',
  color: '$textTitle',
  fontSize: '1rem',
  fontWeight: 'bold',
  border: '3px solid transparent',

  transition: 'background 400ms',

  '&:hover': {
    background: '$baseBorder',
  },
})

export const ActivityFactorContent = styled(Select.Content, {
  padding: 0,
  borderRadius: 6,
  background: '$baseContentHover',
  color: '$textTitle',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',

  '&[data-state="open"]': {
    animation: `${fadeIn} 200ms cubic-bezier(0.79,0.14,0.15,0.86)`,
  },
})

export const ActivityFactorItem = styled(Select.Item, {
  all: 'unset',
  cursor: 'pointer',
  outline: 'none',
  fontSize: 14,
  lineHeight: 1,
  color: '$textTitle',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&:hover': {
    background: '$baseBorder',
  },
})

export const ActivityFactorItemText = styled(Select.ItemText, {
  color: '$textTitle',

  svg: {
    color: '$orange',
  },
})
