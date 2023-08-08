import { MultiStep } from '@ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'
import { signIn, useSession } from 'next-auth/react'

import {
  AuthenticatedButton,
  AuthError,
  ConnectBox,
  ConnectButton,
  ConnectItem,
} from './styles'
import { useRouter } from 'next/router'
import { Container, Header } from '../register/styles'
import { GetServerSideProps } from 'next'
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api'
import { getServerSession } from 'next-auth'

export default function ConnectGoogle() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectGoogle() {
    await signIn('google')
  }

  return (
    <Container>
      <Header>
        <strong>Conecte com sua conta google!</strong>
        <p>
          Conecte com uma conta do google para que seja possível concluir a
          verificação de conta.
        </p>
        <MultiStep size={1} currentStep={1} />
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
      </ConnectBox>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (session) {
    return {
      redirect: {
        destination: `home/${session.token.username}`,
        permanent: false,
      },
    }
  }

  return { props: {} }
}
