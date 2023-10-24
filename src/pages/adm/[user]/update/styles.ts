import { styled } from '@/styles'

export const Container = styled('main', {
  maxWidth: 800,
  margin: '60px auto 16px',
  padding: '0 10vw',
})

export const ButtonHistoric = styled('button', {
  all: 'unset',
  marginTop: '16px',
  borderRadius: 6,
  padding: '16px 14px',

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

export const BoxTwo = styled('div', {
  maxWidth: 1200,
  padding: 32,
  borderTopRightRadius: 4,
  borderTopLeftRadius: 4,
  background:
    'linear-gradient(19deg, rgba(62, 54, 128, 0.01), rgba(49, 43, 93, 0.5))',
  backdropFilter: 'blur(5px)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 24,

  a: {
    display: 'flex',
    color: 'white',
    alignItems: 'center',
    opacity: 0.8,

    '&:hover': {
      opacity: 1,
    },
  },

  '> h1': {
    color: '$text',
    fontSize: 24,
    fontFamily: '$roboto',
  },
})

export const Divisor = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 24,

  h1: {
    color: '$text',
    fontSize: 24,
    fontFamily: '$roboto',
  },
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
  marginTop: 48,
  padding: 24,
  borderRadius: 4,
  background:
    'linear-gradient(19deg, rgba(62, 54, 128, 0.1), rgba(49, 43, 93, 0.5))',
  backdropFilter: 'blur(5px)',

  img: {
    borderRadius: '100%',
    outline: '1px solid $white',
    outlineOffset: '3px',
  },
})

export const TableContainer = styled('div', {
  width: '100%',
  overflow: 'auto',

  '& table': {
    width: '100%',
    overflow: 'scroll',
    borderCollapse: 'collapse',
    minWidth: 800,

    thead: {
      background:
        'linear-gradient(19deg, rgba(62, 54, 128, 0.1), rgba(49, 43, 93, 0.5))',
      backdropFilter: 'blur(5px)',
      '& tr': {
        backdropFilter: 'blur(5px)',
        transition: 'all 200ms',
      },
    },

    '& th': {
      padding: '1rem',
      textAlign: 'left',
      fontFamily: '$default',
      fontWeight: 'bold',
      color: '$textTitle',

      fontSize: 16,
      lineHeight: 1.6,

      '&:first-child': {
        borderTopLeftRadius: 4,
        paddingLeft: '1.5rem',
      },
      '&:last-child': {
        borderTopRightRadius: 4,
        paddingRight: '1.5rem',
      },
    },

    '& td': {
      padding: '1rem',
      color: '$text',
      fontFamily: '$default',
      fontSize: 16,
      lineHeight: 1.6,

      '&:first-child': {
        paddingLeft: '1.5rem',
      },
      '&:last-child': {
        paddingRight: '1.5rem',
      },
    },
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
  maxWidth: 800,
})

export const Form = styled('form', {
  marginTop: 32,
  padding: 24,
  borderRadius: 6,
  background:
    'linear-gradient(19deg, rgba(62, 54, 128, 0.3), rgba(49, 43, 93, 0.5))',
  backdropFilter: 'blur(5px)',

  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

export const MealsBox = styled('ul', {
  display: 'flex',
  flexDirection: 'column',

  borderRadius: 6,
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
    gap: 16,
  },
})

export const ItemInput = styled('input', {
  all: 'unset',
  trasition: 'all 200ms',

  boxSizing: 'border-box',

  padding: '12px 16px',
  width: '90%',
  borderRadius: 4,
  background:
    'linear-gradient(19deg, rgba(62, 54, 128, 0.3), rgba(49, 43, 93, 0.1))',
  backdropFilter: 'blur(5px)',

  cursor: 'text',

  color: '$textTitle',

  '&:focus': {
    outline: '2px solid $baseBorder',
  },
})

export const QtdInput = styled('input', {
  all: 'unset',
  boxSizing: 'border-box',
  trasition: 'all 200ms',
  width: '10%',
  padding: '12px 16px',
  borderRadius: 4,
  background:
    'linear-gradient(19deg, rgba(62, 54, 128, 0.3), rgba(49, 43, 93, 0.1))',
  backdropFilter: 'blur(5px)',

  cursor: 'text',

  color: '$textTitle',

  '&:focus': {
    outline: '2px solid $baseBorder',
  },
})

export const RemoveFoodButton = styled('button', {
  all: 'unset',
  boxSizing: 'border-box',
  trasition: 'all 200ms',

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

  background: 'rgba(18,15,40, 1)',
  backdropFilter: 'blur(5px)',

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
