import { useEffect } from 'react'
import { LdsRipple } from './styles'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home() {
  const { data: session, update } = useSession()
  const router = useRouter()

  async function handleNavigation() {
    await router.push(`/home/${session?.username}`)
  }

  // Polling the session every 30 seconds
  useEffect(() => {
    // TIP: You can also use `navigator.onLine` and some extra event handlers
    // to check if the user is online and only update the session if they are.
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
    const interval = setInterval(() => update(), 1000 * 10 * 1)
    return () => clearInterval(interval)
  }, [update])

  // Listen for when the page is visible, if the user switches tabs
  // and makes our tab visible again, re-fetch the session
  useEffect(() => {
    const visibilityHandler = () =>
      document.visibilityState === 'visible' && update()
    window.addEventListener('visibilitychange', visibilityHandler, false)
    return () =>
      window.removeEventListener('visibilitychange', visibilityHandler, false)
  }, [update])

  if (session?.token.verified) {
    handleNavigation()
  }

  return (
    <LdsRipple>
      <div />
      <div />
    </LdsRipple>
  )
}
