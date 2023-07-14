import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'

export default function Reauthenticate() {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session.status !== 'loading' && session.status !== 'unauthenticated') {
      // Se o usuário já estiver autenticado, redirecionar para a página principal
      router.replace(`/home/${session!.data!.user.username}`)
    }
  }, [session, router])

  const handleLogin = () => {
    // Chamar a função signIn para iniciar o processo de autenticação com o provedor
    signIn('google')
  }

  return (
    <div>
      <h1>Reauthenticate</h1>
      <p>Faça login novamente para continuar.</p>
      <button onClick={handleLogin}>Fazer login</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (session && session.user) {
    return {
      redirect: {
        destination: `/home/${session.user.username}`,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
