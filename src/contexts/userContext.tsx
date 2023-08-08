import { signOut, useSession } from 'next-auth/react'
import { createContext, useState, ReactNode, useEffect } from 'react'

import sunday from '../assets/Planets/Sun.svg'
import monday from '../assets/Planets/Moon.svg'
import tuesday from '../assets/Planets/Mars.svg'
import wednesday from '../assets/Planets/Mercury.svg'
import thursday from '../assets/Planets/Jupiter.svg'
import friday from '../assets/Planets/Venus.svg'
import saturday from '../assets/Planets/Saturn.svg'
import { Weekdays } from '@prisma/client'

export interface CardProps {
  weekday: Weekdays
  color: string
  planet: string
  tag?: string
}

interface UserContextType {
  avatarUrl: string
  username: string
  cards: Record<Weekdays, CardProps>

  handleSignOut: () => void
}

const cards: UserContextType['cards'] = {
  sunday: {
    weekday: 'sunday',
    color: 'rgba(255, 208, 79, 0.3)',
    tag: 'rgba(255, 208, 79, 0.8)',
    planet: sunday,
  },

  monday: {
    weekday: 'monday',
    color: 'rgba(212, 212, 212, 0.3)',
    tag: 'rgba(212, 212, 212, 0.8)',
    planet: monday,
  },
  tuesday: {
    weekday: 'tuesday',
    color: 'rgba(255, 73, 83, 0.4)',
    tag: 'rgba(255, 73, 83, 0.8)',
    planet: tuesday,
  },
  wednesday: {
    weekday: 'wednesday',
    color: 'rgba(163, 174, 186, 0.4)',
    tag: 'rgba(163, 174, 186, 0.8)',
    planet: wednesday,
  },
  thursday: {
    weekday: 'thursday',
    color: 'rgba(204, 168, 153, 0.3)',
    tag: 'rgba(204, 168, 153, 0.8)',
    planet: thursday,
  },
  friday: {
    weekday: 'friday',
    color: 'rgba(204, 168, 153, 0.3)',
    tag: 'rgba(204, 168, 153, 0.8)',
    planet: friday,
  },
  saturday: {
    weekday: 'saturday',
    color: 'rgba(204, 168, 153, 0.3)',
    tag: 'rgba(204, 168, 153, 0.8)',
    planet: saturday,
  },
}

export const UserContext = createContext({} as UserContextType)

interface UserContextProviderProps {
  children: ReactNode
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const session = useSession()
  const [avatarUrl, setAvatarUrl] = useState<UserContextType['avatarUrl']>('')
  const [username, setUsername] = useState<UserContextType['username']>('')

  useEffect(() => {
    if (session.data) {
      setAvatarUrl(session.data.avatarUrl)
      setUsername(session.data.username)
    }
  }, [session])

  function handleSignOut() {
    signOut()
  }
  return (
    <UserContext.Provider
      value={{
        avatarUrl,
        username,
        handleSignOut,
        cards,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
