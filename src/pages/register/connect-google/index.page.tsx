import { MultiStep } from '@ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'
import { signIn, useSession } from 'next-auth/react'
import { Container, Header, Button } from '../styles'
import {
  AuthenticatedButton,
  AuthError,
  ConnectBox,
  ConnectButton,
  ConnectItem,
} from './styles'
import { useRouter } from 'next/router'

export default function ConnectGoogle() {
  // async function handleConnectGoogle() {}

  const session = useSession()
  const router = useRouter()

  console.log(session, session.data)

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectGoogle() {
    await signIn('google', { callbackUrl: window.location.pathname })
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/physical-information')
  }

  return (
    <Container>
      <Header>
        <strong>Conecte com sua conta google!</strong>
        <p>
          Conecte com uma conta do google para que seja possível concluir a
          verificação de conta.
        </p>
        <MultiStep size={3} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <p>Google Tasks</p>
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

        {hasAuthError && (
          <AuthError>
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso.
          </AuthError>
        )}

        <Button
          type="submit"
          disabled={!isSignedIn}
          onClick={handleNavigateToNextStep}
        >
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
