/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { violet, blackA, mauve, green } from '@radix-ui/colors'
import { CaretLeft, CaretRight } from 'phosphor-react'
import Image from 'next/image'
import Task from '../../../../../assets/Task.png'
import Account from '../../../../../assets/Account.png'
import { keyframes, styled } from '@/styles'
import { api } from '@/lib/axios'

interface DialogDemoProps {
  user_id: string
}

// eslint-disable-next-line camelcase
export default function DialogDemo({ user_id }: DialogDemoProps) {
  const [locale, setLocale] = useState(0)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  function handleNavigation(data: number) {
    setLocale(locale + data)
  }

  async function handleAccess() {
    setIsOpen(false)
    await api.put('/users/access', {
      // eslint-disable-next-line camelcase
      user_id,
    })
  }

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal style={{ overflow: 'auto' }}>
        <DialogOverlay />

        <DialogContent>
          <ButtonCaret
            disabled={locale === 0}
            onClick={() => handleNavigation(-1)}
          >
            <CaretLeft size={64} />
          </ButtonCaret>
          <Content>
            {locale === 0 && (
              <>
                <Image
                  src={Task}
                  width={400}
                  quality={100}
                  priority
                  alt=""
                  style={{ borderRadius: 4 }}
                />
                <Flex
                  css={{
                    marginTop: 25,
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'start',
                    gap: 24,
                  }}
                >
                  <DialogTitle>
                    1 - Instale o aplicativo "Google Tarefas".
                  </DialogTitle>
                </Flex>
              </>
            )}
            {locale === 1 && (
              <>
                <Image
                  src={Account}
                  width={450}
                  quality={100}
                  priority
                  alt=""
                  style={{ borderRadius: 4 }}
                />
                <br />

                <Flex
                  css={{
                    marginTop: 25,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 24,
                  }}
                >
                  <DialogTitle>
                    2 - Ao abrir o aplicativo, conecte-se com a sua conta google
                    associada à sua conta no nosso site.
                  </DialogTitle>
                  <Dialog.Close asChild>
                    <Button variant="green" onClick={() => handleAccess()}>
                      Concluir
                    </Button>
                  </Dialog.Close>
                </Flex>
              </>
            )}
            {/* <Image src={Account} width={400} quality={100} priority alt="" /> */}
          </Content>
          <ButtonCaret
            disabled={locale === 1}
            onClick={() => handleNavigation(1)}
          >
            {' '}
            <CaretRight size={64} />
          </ButtonCaret>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

const ButtonCaret = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  opacity: 0.8,
  color: 'white',

  '&:not(:disabled):hover': {
    opacity: 1,
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },
})

const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: blackA.blackA11,
  position: 'fixed',
  inset: 0,
  zIndex: 10,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  overflow: 'auto',
})

const DialogContent = styled(Dialog.Content, {
  userSelect: 'none',
  zIndex: 10,
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  boxSizing: 'border-box',
  padding: 16,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },

  '@media (max-width: 600px)': {
    padding: 12,
  },
})

const Content = styled('div', {
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  width: '80%',
  maxWidth: '450px',
  maxHeight: '100%',
  padding: 25,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background:
    'linear-gradient(19deg, rgba(14,12,31 ,1), rgba(49, 43, 93, 0.8))',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
})

const DialogTitle = styled(Dialog.Title, {
  margin: 0,
  fontWeight: 500,
  color: '$textTitle',
  fontSize: 14,

  '@media (max-width: 600px)': {
    fontSize: 12,
  },
  '@media (max-height: 600px)': {
    fontSize: 12,
  },
})

const Flex = styled('div', {
  display: 'flex',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    gap: 4,
  },
})

const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  boxSizing: 'border-box',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  cursor: 'pointer',

  '@media (max-width: 600px)': {
    width: '100%',
    padding: '0 15px',
    fontSize: 12,
  },

  variants: {
    variant: {
      violet: {
        backgroundColor: 'white',
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA4}`,
        '&:hover': { backgroundColor: mauve.mauve3 },
        '&:focus': { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        '&:hover': { backgroundColor: green.green5 },
        '&:focus': { boxShadow: `0 0 0 2px ${green.green7}` },
      },
    },
  },

  defaultVariants: {
    variant: 'violet',
  },
})
