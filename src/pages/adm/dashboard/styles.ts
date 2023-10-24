import { styled } from '@/styles'

export const Container = styled('main', {
  maxWidth: 1200,
  margin: '60px auto 16px',
  padding: '0 10vw',
})

export const HeaderFixed = styled('div', {
  width: '100%',
  position: 'fixed',
  top: 0,
  zIndex: 100000000000000,
})

export const HeaderContainer = styled('div', {
  background:
    'linear-gradient(19deg, rgba(62, 54, 128, 0.5), rgba(49, 43, 93, 0.01))',
  backdropFilter: 'blur(30px)',
  display: 'flex',
  margin: 'auto',
  padding: '0 10vw',
  marginLeft: 'auto',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Header = styled('header', {
  maxWidth: 1200,
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0px',

  '@media (max-width: 960px)': {
    '&>a>img': {
      width: '150px',
    },
    '&>div>label': {
      width: '300px',
    },
  },

  '@media (max-width: 800px)': {
    '&>a>img': {
      width: '120px',
    },
    '&>div>label': {
      width: '250px',
    },
  },

  '@media (max-width: 600px)': {
    '&>a>img': {
      width: '100px',
    },

    '&>div>label': {
      width: '180px',
    },
  },

  '@media (max-width: 450px)': {
    justifyContent: 'center',
    '&>a>img': {
      width: '0px',
    },

    '&>div>label': {
      width: '150px',
    },
  },
})

export const InputContainer = styled('label', {
  mixBlendMode: 'color-burn',

  width: 400,
  display: 'flex',
  alignItems: 'center',
  cursor: 'text',
  gap: 8,
  borderRadius: 4,
  justifyContent: 'space-between',
  padding: '6px 12px',
  backgroundColor: 'transparent',
  boxSizing: 'border-box',
  boxShadow: 'rgba(62, 54, 128, 0.3) 0px 0px 0px 1px',

  transition: 'all 200ms',
  '&:hover': {
    boxShadow: 'rgba(62, 54, 128, 0.6) 0px 0px 0px 1px',
  },

  '&:focus-within': {
    boxShadow: 'rgba(62, 54, 128, 1) 0px 0px 0px 1px',
  },

  svg: {
    color: '$text',
  },
})

export const Input = styled('input', {
  all: 'unset',
  boxSizing: 'border-box',
  padding: 8,
  width: '100%',
  minWidth: 100,
  backgroundColor: 'transparent',
  fontSize: 14,
  color: '$textTitle',
})

export const Separator = styled('div', {
  mixBlendMode: 'color-burn',
  boxSizing: 'border-box',
  paddingTop: 15,
  paddingBottom: 15,
  width: 1,
  borderRadius: '100%',
  background: 'rgba(62, 54, 128, 0.3)',
})

export const Grouper = styled('div', {
  mixBlendMode: 'color-burn',
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const Box = styled('div', {
  maxWidth: 1200,
  marginTop: 142,

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 24,

  padding: 16,
  borderRadius: 4,
  background:
    'linear-gradient(19deg, rgba(62, 54, 128, 0.1), rgba(49, 43, 93, 0.5))',
  backdropFilter: 'blur(5px)',

  transition: 'all 200ms',

  '> span': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    background: '$baseBorder',
    borderRadius: 4,
    fontWeight: 'bold',
    color: '$textTitle',
    fontSize: 12,
    fontFamily: '$roboto',
  },
})

export const TextContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  h2: {
    color: '$textTitle',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: '$roboto',

    '@media (max-width: 600px)': {
      fontSize: 16,
    },
  },
})

export const Span = styled('div', {
  marginTop: 142,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  span: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: '$roboto',
    color: '$textTitle',
  },
})

export const UsersList = styled('ul', {
  marginTop: 16,
  width: '100%',
  display: 'grid',
  justifyContent: 'start',
  gridTemplateColumns: 'repeat(auto-fit, 169px)',
  gridGap: '16px',
  height: 220,
})

export const User = styled('li', {
  height: 200,
  boxSizing: 'border-box',
  padding: 16,
  listStyleType: 'none',
  background:
    'linear-gradient(19deg, rgba(62, 54, 128, 0.01), rgba(49, 43, 93, 0.5))',
  backdropFilter: 'blur(5px)',
  borderRadius: 4,
  transition: 'all 200ms',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {},
  h3: {
    fontFamily: '$default',
    fontWeight: 'bold',
    fontSize: 14,
    margin: 0,
    marginBottom: '0.5rem',
    color: '$textTitle',
  },
  p: {
    fontFamily: '$roboto',
    fontSize: '0.875rem',
    color: '$text',
    margin: 0,
  },
})

export const ImageContainer = styled('div', {
  borderRadius: '4px 4px 0px 0px',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  img: {
    outline: '1px solid $white',
    outlineOffset: '3px',
    borderRadius: '100%',
    width: '60px',
    height: '60px',
    objectFit: 'cover',
  },
})

export const FooterContainer = styled('footer', {
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
