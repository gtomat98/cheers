import { styled } from '@/styles'

export const Container = styled('main', {
  maxWidth: 572,
  margin: '80px auto 16px',
  padding: '0 16px',
})

export const Header = styled('div', {
  padding: '0 0px',

  '> strong': {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    lineHeight: '200%',
    color: '$textTitle',
  },

  '> p': {
    color: '$text',
    marginBottom: 24,
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

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,

    span: {
      color: '$textTitle',
    },
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

export const FormError = styled('p', {
  marginTop: 8,
  color: '#f75a68',
})
