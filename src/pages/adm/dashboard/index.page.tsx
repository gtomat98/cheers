import Logo from '../../../assets/Logo.svg'
import Image from 'next/image'

import {
  Box,
  Button,
  Container,
  FooterContainer,
  Grouper,
  Header,
  HeaderContainer,
  HeaderFixed,
  ImageContainer,
  Input,
  InputContainer,
  Separator,
  Span,
  TextContainer,
  User,
  UsersList,
} from './styles'
import Link from 'next/link'

import { prisma } from '@/lib/prisma'
import { GetStaticProps } from 'next'
import { ArrowRight, MagnifyingGlass } from 'phosphor-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import Avatar from '@/pages/home/[username]/components/avatar'
import { signOut, useSession } from 'next-auth/react'

export default function Home({ users, usersToUpdate }: any) {
  const [search, setSearch] = useState('')
  const [temporaryUsersFound, setTemporaryUsersFound] = useState([])
  const [usersFound, setUsersFound] = useState([])

  const session = useSession()

  const router = useRouter()

  async function handleRouterToUserDetails(username: any) {
    await router.push(`/adm/${username}`)
  }

  async function handleRouterToUserDetailsToUpdate(username: any) {
    await router.push(`/adm/${username}/update`)
  }

  async function handleChangeSearch(search: string) {
    setSearch(search)
  }

  useEffect(() => {
    let isMounted = true

    async function handleSearch(searchTerm: string) {
      try {
        const { data } = await api.get('/adm/getUsersSearch', {
          params: {
            search: searchTerm,
          },
        })

        if (isMounted) {
          setTemporaryUsersFound(data.usersFound)
        }
      } catch (err) {}
    }

    if (search.trim() !== '') {
      handleSearch(search)
    } else {
      setTemporaryUsersFound([])
    }

    return () => {
      isMounted = false
    }
  }, [search])

  useEffect(() => {
    setUsersFound(temporaryUsersFound)
  }, [temporaryUsersFound])

  return (
    <>
      <HeaderFixed>
        <HeaderContainer>
          <Header>
            <Link href="/home/username">
              <Image src={Logo} width={150} quality={100} priority alt="" />
            </Link>
            <Grouper>
              <InputContainer htmlFor="searchInput">
                <Input
                  id="searchInput"
                  type="text"
                  placeholder="Buscar usuários"
                  onChange={(e) => handleChangeSearch(e.target.value)}
                />
                <MagnifyingGlass size={24} />
              </InputContainer>
              <Separator />
              <Avatar
                src={session.data?.avatarUrl ? session.data?.avatarUrl : ''}
                signOut={() => {
                  signOut()
                }}
              />
            </Grouper>
          </Header>
        </HeaderContainer>
      </HeaderFixed>

      <Container>
        {usersFound.length === 0 &&
          users.length === 0 &&
          usersToUpdate.length === 0 && (
            <Span>
              <span>{'Nada por enquanto :('}</span>
            </Span>
          )}

        {usersFound.length >= 1 && (
          <>
            {' '}
            <Box>
              <TextContainer>
                <h2>Usuários encontrados</h2>
              </TextContainer>
              <span>{usersFound.length}</span>
            </Box>
            <UsersList>
              {usersFound &&
                usersFound.map((user: any) => (
                  <User key={user.id}>
                    <ImageContainer>
                      <Image
                        src={user.avatar_url}
                        width={80}
                        height={80}
                        quality={100}
                        priority
                        alt=""
                      />
                    </ImageContainer>

                    <FooterContainer>
                      <div>
                        <h3>
                          {user.username.charAt(0).toUpperCase() +
                            user.username.slice(1)}
                        </h3>
                        <p>
                          {user.gender}, {user.age}
                        </p>
                      </div>
                      <Button
                        onClick={() =>
                          user.verified
                            ? handleRouterToUserDetailsToUpdate(user.username)
                            : handleRouterToUserDetails(user.username)
                        }
                      >
                        <ArrowRight size={16} weight="bold" />
                      </Button>
                    </FooterContainer>
                  </User>
                ))}
            </UsersList>
          </>
        )}

        {users.length >= 1 && usersFound.length < 1 && (
          <>
            <Box>
              <TextContainer>
                <h2>Novos Usuários</h2>
              </TextContainer>
              <span>{users.length}</span>
            </Box>

            <UsersList>
              {users.map((user: any) => (
                <User key={user.id}>
                  <ImageContainer>
                    <Image
                      src={user.avatarUrl}
                      width={80}
                      height={80}
                      quality={100}
                      priority
                      alt=""
                    />
                  </ImageContainer>

                  <FooterContainer>
                    <div>
                      <h3>
                        {user.username.charAt(0).toUpperCase() +
                          user.username.slice(1)}
                      </h3>
                      <p>
                        {user.gender}, {user.age}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleRouterToUserDetails(user.username)}
                    >
                      <ArrowRight size={16} weight="bold" />
                    </Button>
                  </FooterContainer>
                </User>
              ))}
            </UsersList>
          </>
        )}

        {usersToUpdate.length >= 1 && usersFound.length < 1 && (
          <>
            <Box>
              <TextContainer>
                <h2>Pedidos de atualização de dieta</h2>
              </TextContainer>
              <span>{usersToUpdate.length}</span>
            </Box>

            <UsersList>
              {usersToUpdate.map((user: any) => (
                <User key={user.id}>
                  <ImageContainer>
                    <Image
                      src={user.avatarUrl}
                      width={80}
                      height={80}
                      quality={100}
                      priority
                      alt=""
                    />
                  </ImageContainer>

                  <FooterContainer>
                    <div>
                      <h3>
                        {user.username.charAt(0).toUpperCase() +
                          user.username.slice(1)}
                      </h3>
                      <p>
                        {user.gender}, {user.age}
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        handleRouterToUserDetailsToUpdate(user.username)
                      }
                    >
                      <ArrowRight size={16} weight="bold" />
                    </Button>
                  </FooterContainer>
                </User>
              ))}
            </UsersList>
          </>
        )}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: 'user',
      verified: false,
      NOT: {
        age: null,
      },
    },
  })

  const usersToUpdate = await prisma.user.findMany({
    where: {
      role: 'user',
      verified: true,
      NOT: {
        age: null,
      },
      is_diet_updated: false,
    },
  })

  const formattedUsers = users.map((user) => ({
    id: user.id,
    username: user.username,
    age: user.age,
    gender: user.gender,
    avatarUrl: user.avatar_url,
  }))

  const formattedUsersToUpdate = usersToUpdate.map((user) => ({
    id: user.id,
    username: user.username,
    age: user.age,
    gender: user.gender,
    avatarUrl: user.avatar_url,
  }))

  return {
    props: {
      users: formattedUsers,
      usersToUpdate: formattedUsersToUpdate,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
