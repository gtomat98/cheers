import { styled } from '@/styles'

export const Form = styled('form', {
  maxWidth: '100%',
  width: 400,
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: 16,
  padding: 16,

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

  '&:focus': {
    outline: '2px solid $baseBorder',
  },
})

export const Button = styled('button', {
  all: 'unset',
  minWidth: 120,
  borderRadius: 6,
  padding: '16px 0px',

  color: '$textTitle',
  fontWeight: 600,

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
  p: {
    color: '$text',
    opacity: 0.8,
  },
})
