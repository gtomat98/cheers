import { UserContextProvider } from '@/contexts/userContext'
import { UserLayout } from '@/layouts/UserLayout'
import { globalStyles } from '@/styles/global'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps }, // Rest no pageProps aqui
}: AppProps) {
  const router = useRouter()
  const isUserRoute = router.pathname.startsWith('/home')

  return (
    <SessionProvider session={session}>
      {isUserRoute ? (
        <UserContextProvider>
          <UserLayout>
            <Component {...pageProps} />
          </UserLayout>
        </UserContextProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}
