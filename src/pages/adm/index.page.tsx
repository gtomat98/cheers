import { MultiStep } from '@ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header, Button } from '../register/styles'
import {
  AuthenticatedButton,
  AuthError,
  ConnectBox,
  ConnectButton,
  ConnectItem,
} from './styles'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function ConnectGoogle() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectGoogle() {
    await signIn('google', { callbackUrl: '/register/connect-google' })
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/physical-information')
  }

  return (
    <Container>
      <Header>
        <strong>Conecte com sua conta de ADM!</strong>
        <p>
          Conecte com uma conta do google para que seja possível concluir a
          verificação de conta.
        </p>
      </Header>

      <MultiStep size={1} currentStep={1} />
      <ConnectBox>
        <ConnectItem>
          <p>Google Account</p>
          {isSignedIn ? (
            <AuthenticatedButton disabled>
              Conectado
              <Check />
            </AuthenticatedButton>
          ) : (
            <ConnectButton onClick={handleConnectGoogle}>
              Conectar
              <ArrowRight />
            </ConnectButton>
          )}
        </ConnectItem>

        {hasAuthError && <AuthError>Falha ao se conectar ao Google</AuthError>}

        <Button
          type="submit"
          disabled={!isSignedIn}
          onClick={handleNavigateToNextStep}
        >
          Entrar
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
