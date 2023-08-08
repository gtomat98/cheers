import Logo from '../../../assets/Logo.svg'
import Image from 'next/image'

import {
  Box,
  Button,
  Container,
  FooterContainer,
  FormContainer,
  Header,
  ImageContainer,
  Input,
  InputContainer,
  Title,
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

export default function Home({ users }: any) {
  const [search, setSearch] = useState('')
  const [temporaryUsersFound, setTemporaryUsersFound] = useState([])
  const [usersFound, setUsersFound] = useState([])

  console.log(usersFound)

  const router = useRouter()

  async function handleRouterToUserDetails(id: any) {
    await router.push(`/adm/${id}`)
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
      } catch (err) {
        console.log(err)
      }
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
      <Header>
        <Link href="/home/username">
          <Image src={Logo} width={180} quality={100} priority alt="" />
        </Link>
        <InputContainer htmlFor="searchInput">
          <Input
            id="searchInput"
            type="text"
            placeholder="Buscar usuários"
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
          <MagnifyingGlass size={24} />
        </InputContainer>
      </Header>
      <Container>
        <Box>
          <Title>Olá, seja bem-vindo de volta!</Title>
        </Box>
        <FormContainer>
          <fieldset>
            <h2>Usuários encontrados</h2>
            <span>{usersFound.length}</span>
          </fieldset>
        </FormContainer>
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
                    <h3>{user.username}</h3>
                    <p>
                      {user.gender}, {user.age}
                    </p>
                  </div>
                  <Button onClick={() => handleRouterToUserDetails(user.id)}>
                    <ArrowRight size={16} weight="bold" />
                  </Button>
                </FooterContainer>
              </User>
            ))}
        </UsersList>
        <FormContainer>
          <fieldset>
            <h2>Novos usuários</h2>
            <span>{users.length}</span>
          </fieldset>
        </FormContainer>
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
                  <h3>{user.username}</h3>
                  <p>
                    {user.gender}, {user.age}
                  </p>
                </div>
                <Button onClick={() => handleRouterToUserDetails(user.id)}>
                  <ArrowRight size={16} weight="bold" />
                </Button>
              </FooterContainer>
            </User>
          ))}
        </UsersList>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: 'user',
      verified: false,
      gender: 'male' || 'female',
    },
  })

  const formattedUsers = users.map((user) => ({
    id: user.id,
    username: user.username,
    age: user.age,
    gender: user.gender,
    avatarUrl: user.avatar_url,
  }))

  return {
    props: {
      users: formattedUsers,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
