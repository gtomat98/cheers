import Logo from '../../../assets/Logo.svg'
import Breakfast from '../../../assets/Meals/breakfast.png'
import Image from 'next/image'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import {
  Action,
  ActionsContainer,
  Box,
  Buttons,
  ButtonStyled,
  Container,
  Header,
  Title,
  WeekDay,
  WeekDays,
} from './styles'
import Link from 'next/link'
import { CaretRight } from 'phosphor-react'
import { prisma } from '@/lib/prisma'
import { signOut, useSession } from 'next-auth/react'
import { GetStaticPaths, GetStaticProps } from 'next'

interface HomeProps {
  user: {
    name: string
  }
}

export default function Home({ user }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 24,
    },
  })

  const session = useSession()

  console.log(session)

  return (
    <>
      <Container>
        <Header>
          <Link href="/home/username">
            <Image src={Logo} width={180} quality={100} priority alt="" />
          </Link>
        </Header>
        <Box>
          <Title>
            Olá <span>{user.name}</span>, seja bem-vindo de volta!
          </Title>
          <span>Dieta e treino de hoje</span>
          <button
            onClick={() => {
              signOut()
            }}
          >
            Sair
          </button>
          <ActionsContainer>
            <Action>
              <Image
                src={Breakfast}
                width={120}
                quality={100}
                priority
                alt=""
              />
              <CaretRight size={32} weight="bold" />
            </Action>
            <Action>
              <Image
                src={Breakfast}
                width={120}
                quality={100}
                priority
                alt=""
              />
              <CaretRight size={32} weight="bold" />
            </Action>
          </ActionsContainer>
        </Box>
        <WeekDays ref={sliderRef} className="keen-slider">
          <ul>
            <WeekDay className="keen-slider__slide">
              <header>Domingo</header>
              <Buttons>
                <ButtonStyled>
                  <Image src={Breakfast} alt="" width={80} />
                  <span>
                    <strong>Café da manhã</strong>
                  </span>
                  <CaretRight size={32} weight="bold" />
                </ButtonStyled>
                <ButtonStyled>
                  <Image src={Breakfast} alt="" width={80} />
                  <span>
                    <strong>Café da manhã</strong>
                  </span>
                  <CaretRight size={32} weight="bold" />
                </ButtonStyled>
              </Buttons>
            </WeekDay>
            <WeekDay className="keen-slider__slide">
              <header>Segunda-Feira</header>
              <Buttons>
                <ButtonStyled>
                  <Image src={Breakfast} alt="" width={80} />
                  <span>
                    <strong>Café da manhã</strong>
                  </span>
                  <CaretRight size={32} weight="bold" />
                </ButtonStyled>
                <ButtonStyled>
                  <Image src={Breakfast} alt="" width={80} />
                  <span>
                    <strong>Café da manhã</strong>
                  </span>
                  <CaretRight size={32} weight="bold" />
                </ButtonStyled>
              </Buttons>
            </WeekDay>
            <WeekDay className="keen-slider__slide">
              <header>Terça-Feira</header>
              <Buttons>
                <ButtonStyled>
                  <Image src={Breakfast} alt="" width={80} />
                  <span>
                    <strong>Café da manhã</strong>
                  </span>
                  <CaretRight size={32} weight="bold" />
                </ButtonStyled>
                <ButtonStyled>
                  <Image src={Breakfast} alt="" width={80} />
                  <span>
                    <strong>Café da manhã</strong>
                  </span>
                  <CaretRight size={32} weight="bold" />
                </ButtonStyled>
              </Buttons>
            </WeekDay>
          </ul>
        </WeekDays>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
      },
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
