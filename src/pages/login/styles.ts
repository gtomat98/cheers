import { styled } from '@/styles'

export const ConnectBox = styled('div', {
  marginTop: 24,
  display: 'flex',
  flexDirection: 'column',

  borderRadius: 6,
  background: '$baseBox',
  padding: 24,
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  border: '1px solid #323238',
  padding: '16px 24px',
  borderRadius: 6,

  marginBottom: 8,

  p: {
    color: '$textTitle',
    fontWeight: 'bold',
  },
})

export const ConnectButton = styled('button', {
  all: 'unset',
  borderRadius: 6,
  minWidth: 120,
  padding: '10px 0px',

  border: '2px solid $orange',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,

  color: '$orange',

  fontWeight: 'bold',

  cursor: 'pointer',

  transition: 'all 200ms',

  '&:not(:disabled):hover': {
    backgroundColor: '$orange',
    color: '$textTitle',
  },

  '&:disabled': {
    backgroundColor: '$text',
    color: '$textTitle',
    cursor: 'not-allowed',
    border: '2px solid transparent',
  },
})

export const AuthenticatedButton = styled('button', {
  all: 'unset',
  borderRadius: 6,
  minWidth: 120,
  padding: '10px 0px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,

  fontWeight: 'bold',

  '&:disabled': {
    backgroundColor: '$text',
    color: '$textTitle',
    cursor: 'not-allowed',
    border: '2px solid transparent',
  },
})

export const AuthError = styled('p', {
  color: '#f75a68',
  marginBottom: 16,
  fontSize: 14,
})
