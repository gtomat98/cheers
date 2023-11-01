import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { Box, Container, Title, WeekDays } from './styles'
import { prisma } from '@/lib/prisma'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useContext } from 'react'
import { UserContext } from '@/contexts/userContext'
import Card from './components/card'
import DialogDemo from './components/access'
import { useSession } from 'next-auth/react'

interface HomeProps {
  user: {
    name: string
    avatarUrl: string
    id: string
  }
}

export default function Home({ user }: HomeProps) {
  const { cards } = useContext(UserContext)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 'auto',
      spacing: 24,
    },
  })

  const session = useSession()

  return (
    <>
      {session.data && session.data.firstAccess && (
        <DialogDemo user_id={user.id} />
      )}
      <Container>
        <Box>
          <Title>
            Olá <span>{user.name}</span>, seja bem-vindo!
          </Title>
          <span>Acesse suas Refeições</span>
        </Box>
        <WeekDays ref={sliderRef} className="keen-slider">
          {Object.values(cards).map((card) => {
            return (
              <Card
                color={card.color}
                planet={card.planet}
                weekday={card.weekday}
                key={card.weekday}
              />
            )
          })}
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

  const user = await prisma.user.findFirst({
    where: {
      username,
      isInactive: false,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  console.log(user)

  return {
    props: {
      user: {
        name: user.name,
        avatarUrl: user.avatar_url,
        id: user.id,
      },
    },
    revalidate: 60 * 60 * 12, // 1/2 day
  }
}
