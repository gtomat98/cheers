import Image from 'next/image'
import { CaretRight } from 'phosphor-react'
import { ButtonStyled, WeekDay } from './styles'
import Meal from '../../../../../assets/Meals/luch.png'
import { CardProps } from '@/contexts/userContext'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Card({ color, planet, weekday }: CardProps) {
  const router = useRouter()
  return (
    <WeekDay
      className="keen-slider__slide"
      css={{
        $$color: color,
      }}
    >
      <Image src={planet} alt="" width={80} quality={100} priority />
      <header>{weekday.charAt(0).toUpperCase() + weekday.slice(1)}</header>

      <Link href={`${router.asPath}/${weekday}?callbackUrl=${router.asPath}`}>
        <ButtonStyled>
          <Image src={Meal} alt="" width={80} />
          <CaretRight size={20} weight="bold" />
        </ButtonStyled>
      </Link>
    </WeekDay>
  )
}