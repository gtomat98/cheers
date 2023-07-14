import { styled } from '@/styles'

export const MainContainer = styled('main', {
  maxWidth: 572,
  margin: '60px auto 16px',
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

export const Box = styled('div', {
  maxWidth: 720,
  marginTop: 48,
  borderRadius: 4,
  background: '$baseBox',
  padding: '1rem',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 24,

  '> span': {
    color: '$text',
    fontSize: 18,
    fontFamily: '$default',
  },

  img: {
    borderRadius: '50%',
    outline: '2px solid $orange',
    outlineOffset: '5px',
  },
})

export const Title = styled('h1', {
  marginTop: '1.25rem',
  textAlign: 'center',
  color: '$textTitle',
  fontSize: 20,
  fontWeight: 'bold',
  fontFamily: '$default',
  lineHeight: '80%',

  span: {
    fontFamily: '$default',
    fontWeight: 'bold',
  },
})

export const FormContainer = styled('div', {
  marginTop: '3rem',
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

export const MealsBox = styled('ul', {
  display: 'flex',
  flexDirection: 'column',

  borderRadius: 6,
  background: '$baseBox',
})

export const MealContainer = styled('ul', {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    h3: {
      color: '$textTitle',
      fontWeight: 'bold',
      marginBottom: '12px',
    },
  },

  marginBottom: '3rem',
})

export const MealItem = styled('li', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'all 200ms',

  gap: 24,
  marginBottom: 16,

  div: {
    trasition: 'all 200ms',
    alignItems: 'center',
    width: '100%',
    display: 'flex',
    gap: 8,
  },
})

export const ItemInput = styled('input', {
  all: 'unset',

  padding: '12px 16px',
  width: '90%',
  borderRadius: 4,
  background: '$baseContent',

  cursor: 'text',

  color: '$textTitle',

  '&:focus': {
    outline: '2px solid $baseBorder',
  },
})

export const QtdInput = styled('input', {
  all: 'unset',
  width: '10%',
  padding: '12px 16px',
  borderRadius: 4,
  background: '$baseContent',

  cursor: 'text',

  color: '$textTitle',

  '&:focus': {
    outline: '2px solid $baseBorder',
  },
})

export const RemoveFoodButton = styled('button', {
  all: 'unset',

  borderRadius: 6,
  padding: '12px',

  color: '$text',
  fontWeight: 600,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,

  background: '$baseBox',
  cursor: 'pointer',

  transition: 'background 400ms, color 400ms',

  '&:not(:disabled):hover': {
    color: '$redHover',
  },

  '&:disabled': {
    display: 'none',
  },
})

export const AppendSection = styled('section', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
})

export const AddFoodButton = styled('button', {
  all: 'unset',
  marginTop: 0,

  width: '100%',

  borderRadius: 6,
  padding: '12px',

  color: '$text',
  fontWeight: 600,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,

  background: '$baseBackground',

  cursor: 'pointer',

  transition: 'color 100ms',

  '&:not(:disabled):hover': {
    color: '$white',
  },

  '&:disabled': {
    display: 'none',
  },
})

export const ButtonContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 16,
})

export const Button = styled('button', {
  all: 'unset',
  marginTop: '16px',
  width: '50%',
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
