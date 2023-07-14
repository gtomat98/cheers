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
  Title,
  User,
  UsersList,
} from './styles'
import Link from 'next/link'

import { prisma } from '@/lib/prisma'
import { GetStaticProps } from 'next'
import { ArrowRight } from 'phosphor-react'
import { useRouter } from 'next/router'

export default function Home({ users }: any) {
  const router = useRouter()

  async function handleRouterToUserDetails(id: any) {
    await router.push(`/adm/${id}`)
  }
  return (
    <>
      <Header>
        <Link href="/home/username">
          <Image src={Logo} width={180} quality={100} priority alt="" />
        </Link>
        <Box>
          <Title>Olá, seja bem-vindo de volta!</Title>
        </Box>
      </Header>
      <Container>
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
      verified: false,
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
