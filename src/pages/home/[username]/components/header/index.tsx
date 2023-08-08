/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Avatar from '../avatar'
import Logo from '../../../../../assets/Logo.svg'
import { Calendar } from 'phosphor-react'
import {
  HeaderContainer,
  HeaderContent,
  HeaderFixed,
  HistoricButton,
  NavigationContainer,
} from './styles'

interface HeaderProps {
  avatarUrl: string
  username: string
  persistSignOut: () => void
  notifyHeaderHeightToParent: (height: number) => void
}

type HeaderRef = HTMLDivElement | null

const Header = forwardRef<HeaderRef, HeaderProps>(
  (
    {
      avatarUrl,
      persistSignOut,
      username,
      notifyHeaderHeightToParent,
    }: HeaderProps,
    forwardedRef,
  ) => {
    const localRef = useRef<HeaderRef>(null)

    useEffect(() => {
      if (localRef.current) {
        const headerHeight = localRef.current.clientHeight
        notifyHeaderHeightToParent(headerHeight)
      }
    }, [notifyHeaderHeightToParent])

    // Combine both refs
    const combineRefs = (el: HeaderRef) => {
      localRef.current = el
      if (typeof forwardedRef === 'function') {
        forwardedRef(el)
      } else if (forwardedRef) {
        forwardedRef.current = el
      }
    }

    return (
      <HeaderFixed ref={combineRefs}>
        <HeaderContainer>
          <HeaderContent>
            <Link href={`/home/${username}`}>
              <Image src={Logo} width={160} quality={100} priority alt="" />
            </Link>
            <NavigationContainer>
              {username && (
                <HistoricButton href={`/home/${username}/historic/`}>
                  <Calendar weight="fill" />
                </HistoricButton>
              )}

              <Avatar src={avatarUrl} signOut={persistSignOut} />
            </NavigationContainer>
          </HeaderContent>
        </HeaderContainer>
      </HeaderFixed>
    )
  },
)

export default Header
