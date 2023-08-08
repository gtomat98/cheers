import { Check } from 'phosphor-react'
import Lunch from '../../../../../../assets/Meals/luch.png'
import Image from 'next/image'
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  CheckboxIndicator,
  CheckboxRoot,
  Container,
  FooterContainer,
  HeaderContainer,
  Li,
  StyledChevron,
} from './styles'
import { Meals } from '@prisma/client'

interface CardProps {
  isCompleted: boolean
  meal: {
    id: string
    meal_id: string
    meal: Meals
    isCompleted: boolean
    isDone: boolean
    foods: [
      {
        food: string
        quantity: string
      },
    ]
  }

  releaseMealChecked: (
    isChecked: boolean,
    mealId: string,
    meal: Meals,
    mealHistoricId: string,
  ) => void
  releaseCheck: (mealId: string, isChecked: boolean) => void
}

export default function Card({
  meal,
  releaseCheck,
  isCompleted,
  releaseMealChecked,
}: CardProps) {
  function handleReleaseMealChecked(data: boolean) {
    releaseCheck(meal.meal_id, data)
    releaseMealChecked(data, meal.meal_id, meal.meal, meal.id)
  }
  return (
    <Li>
      <AccordionRoot type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionHeader>
            <Container>
              <HeaderContainer>
                <Image src={Lunch} width={75} quality={100} alt="" priority />
                <h3>
                  {meal.meal.charAt(0).toUpperCase() + meal.meal.slice(1)}
                </h3>

                <div>
                  <CheckboxRoot
                    defaultChecked={isCompleted}
                    checked={isCompleted}
                    disabled={meal.isDone}
                    onCheckedChange={(e: boolean) =>
                      handleReleaseMealChecked(e)
                    }
                  >
                    <CheckboxIndicator>
                      <Check size={18} weight="bold" />
                    </CheckboxIndicator>
                  </CheckboxRoot>
                </div>
              </HeaderContainer>
              <AccordionContent>
                {meal.foods.map((food) => {
                  return (
                    <div key={food.food}>
                      <p>{food.food}</p>
                      <span>{food.quantity}</span>
                    </div>
                  )
                })}
              </AccordionContent>
              <FooterContainer>
                <AccordionTrigger>
                  <StyledChevron />
                </AccordionTrigger>
              </FooterContainer>
            </Container>
          </AccordionHeader>
        </AccordionItem>
      </AccordionRoot>
    </Li>
  )
}
