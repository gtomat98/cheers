import { styled } from '@/styles'

export const Container = styled('main', {
  maxWidth: 572,
  margin: '60px auto 16px',
  padding: '0 16px',
})

export const Header = styled('header', {
  maxWidth: 572,
  margin: '60px auto 16px',
})

export const Box = styled('div', {
  maxWidth: 572,
  marginTop: 48,
  borderRadius: 8,

  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  '> span': {
    color: '$text',
    fontSize: 18,
    fontFamily: '$default',
  },
})

export const Title = styled('h1', {
  color: '$textTitle',
  fontSize: 24,
  fontFamily: '$default',
  lineHeight: '80%',

  span: {
    fontFamily: '$default',
    fontWeight: 'bold',
  },
})

export const FormContainer = styled('form', {
  display: 'flex',
  marginTop: '4.5rem',
  width: '100%',
  alignItems: 'center',

  fieldset: {
    width: '100%',
    border: 0,
    display: 'flex',
    justifyContent: 'space-between',
    color: '$text',

    h2: {
      fontSize: '1.125rem',
    },

    span: {
      color: '$white',
      width: '1.25rem',
      height: '1.25rem',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      backgroundColor: '$baseBorder',
      borderRadius: '9999px',
      textAlign: 'center',
      lineHeight: '150%',
    },
  },
})

export const UsersList = styled('ul', {
  marginTop: '1rem',
  width: '100%',
  display: 'grid',
  justifyContent: 'center',
  gridTemplateColumns: 'repeat(auto-fit, 169px)',
  gridGap: '2rem 2rem',
})

export const User = styled('li', {
  listStyleType: 'none',
  background: '$baseContent',
  borderRadius: 3,
  transition: 'all 200ms',
  boxShadow: '0 0 4px rgba(0,0,0,0.1)',
  padding: '0rem', // adiciona um padding interno
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {},
  h3: {
    // adiciona um estilo diferente para o nome do usuário
    fontFamily: '$default',
    fontWeight: 'bold',
    fontSize: '1.125rem',
    margin: 0,
    marginBottom: '0.5rem',
    color: '$textTitle',
  },
  p: {
    // adiciona um estilo diferente para as informações de idade e gênero
    fontFamily: '$roboto',
    fontSize: '0.875rem',
    color: '$text',
    margin: 0,
  },
})

export const ImageContainer = styled('div', {
  padding: '1rem',
  height: 30,
  borderRadius: '4px 4px 0px 0px',
  display: 'flex',
  justifyContent: 'center',
  img: {
    outline: '2px solid $white',
    outlineOffset: '3px',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    objectFit: 'cover',
  },
})

export const FooterContainer = styled('footer', {
  marginTop: '5rem',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
})

export const Button = styled('button', {
  all: 'unset',
  width: '30%',
  borderRadius: 2,
  padding: '4px 0px',

  fontSize: '14px',
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
