import Image from 'next/image'
import Logo from '../../assets/Logo.svg'
import previewImage from '../../assets/preview.png'
import { ClaimUserForm } from './components/ClaimUserForm'
import { Container, Hero, MainContainer, Preview } from './styles'

export default function Home() {
  return (
    <>
      <Container>
        <MainContainer>
          <Hero>
            <Image src={Logo} width={350} quality={100} priority alt="" />
            <p>
              A plataforma que te oferece a oportunidade de brindar à sua{' '}
              <span>saúde</span> da melhor forma!
            </p>
            <ClaimUserForm />
          </Hero>

          <Preview>
            <Image
              src={previewImage}
              height={450}
              quality={100}
              priority
              alt="Imagem simbolizando aplicação em funcionamento"
            />
          </Preview>
        </MainContainer>
      </Container>
    </>
  )
}
