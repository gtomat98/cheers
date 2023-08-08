import { styled } from '@/styles'

export const HistoryContainer = styled('main', {
  maxWidth: 1200,
  margin: 'auto',
  padding: '0 10vw',
  marginLeft: 'auto',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  '& h1': {
    fontSize: '1.5rem',
    color: '$gray100',
  },
})

export const HistoryList = styled('div', {
  width: '100%',
  overflow: 'auto',
  marginTop: 64,

  '& table': {
    width: '100%',
    overflow: 'scroll',
    borderCollapse: 'separate',
    borderSpacing: '0 12px',
    minWidth: '600px',

    thead: {
      '& tr': {
        backdropFilter: 'blur(5px)',
        transition: 'all 200ms',
        background:
          'linear-gradient(19deg, rgba(62, 54, 128, 0.3), rgba(49, 43, 93, 0.3))',
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
        borderBottomLeftRadius: 4,
        paddingLeft: '1.5rem',
      },
      '&:last-child': {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        paddingRight: '1.5rem',
      },
    },

    '& td': {
      backdropFilter: 'blur(5px)',
      backgroundColor: 'rgba(36, 32, 58, 0.5)',
      borderTop: '4px solid $gray800',
      padding: '1rem',
      color: '$text',
      fontFamily: '$default',
      fontSize: 16,
      lineHeight: 1.6,

      '&:first-child': {
        width: '50%',
        paddingLeft: '1.5rem',
      },
      '&:last-child': {
        paddingRight: '1.5rem',
      },
    },
  },
})

export const Status = styled('span', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',

  variants: {
    statusColor: {
      yellow: {
        '&::before': {
          content: '',
          width: '0.5rem',
          height: '0.5rem',
          borderRadius: '50%',
          backgroundColor: '$orange',
        },
      },
      green: {
        '&::before': {
          content: '',
          width: '0.5rem',
          height: '0.5rem',
          borderRadius: '50%',
          backgroundColor: '$green',
        },
      },
      red: {
        '&::before': {
          content: '',
          width: '0.5rem',
          height: '0.5rem',
          borderRadius: '50%',
          backgroundColor: '$red',
        },
      },
    },
  },
})
