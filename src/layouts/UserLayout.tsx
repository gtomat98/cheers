import { UserContext } from '@/contexts/userContext'
import Footer from '@/pages/home/[username]/components/footer'
import Fragment from '@/pages/home/[username]/components/fragment'
import Header from '@/pages/home/[username]/components/header'
import Stars from '@/pages/home/[username]/components/stars'
import { ReactNode, memo, useContext, useEffect, useRef, useState } from 'react'

interface UserLayoutProps {
  children: ReactNode
}

const MemoizedStars = memo(Stars)

export function UserLayout({ children }: UserLayoutProps) {
  const { avatarUrl, handleSignOut, username } = useContext(UserContext)
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  // Obtém a altura do HeaderFixed quando ele for montado
  useEffect(() => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.clientHeight
      setHeaderHeight(headerHeight)
    }
  }, [])

  return (
    <>
      <MemoizedStars />
      <Header
        ref={headerRef}
        avatarUrl={avatarUrl}
        persistSignOut={handleSignOut}
        username={username}
        notifyHeaderHeightToParent={(height: number) => setHeaderHeight(height)}
      />
      <div
        style={{
          marginTop: `calc(${String(headerHeight)}px + 64px)`,
          marginBottom: '164px',
        }}
      >
        {children}
      </div>

      <Fragment>
        <Footer />
      </Fragment>
    </>
  )
}
