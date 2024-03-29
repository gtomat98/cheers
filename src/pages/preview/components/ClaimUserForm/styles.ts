import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'block',
  width: '100%',
  maxWidth: 400,
})

export const Form = styled('form', {
  boxSizing: 'border-box',
  maxWidth: 400,
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: 16,
  padding: 10,

  background: '$baseBox',
  borderRadius: 6,

  '@media (max-width:600px)': {
    gridTemplateColumns: '1fr',
  },
})

export const Input = styled('input', {
  all: 'unset',
  borderRadius: 6,
  padding: '12px 16px',
  background: '$baseContent',

  cursor: 'text',

  color: '$textTitle',
  fontSize: 14,

  '&:focus': {
    outline: '2px solid $baseBorder',
  },
})

export const Button = styled('button', {
  all: 'unset',
  minWidth: 120,
  borderRadius: 6,
  padding: '12px 0px',

  color: '$textTitle',
  fontWeight: 600,
  fontSize: 14,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,

  background: '$orange',

  cursor: 'pointer',

  transition: 'background 200ms',

  '&:not(:disabled):hover': {
    background: '$orangeLight',
  },

  '&:disabled': {
    background: '$text',
    cursor: 'not-allowed',
  },
})

export const FormAnnotation = styled('div', {
  marginTop: 8,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: {
    fontSize: 12,
    color: '$text',
    opacity: 0.8,
  },

  a: {
    all: 'unset',
    cursor: 'pointer',
    alignItems: 'center',
  },

  span: {
    all: 'unset',
    fontSize: 12,
    color: '$text',
    opacity: 1,
    '&:hover': {
      color: '$baseBorder',
    },
  },
})
