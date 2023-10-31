import { Check } from 'phosphor-react'
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
  Divider,
  FooterContainer,
  HeaderContainer,
  Li,
  StyledChevron,
} from './styles'

interface CardProps {
  isTheSameDay: boolean
  isCompleted: boolean
  meal: {
    id: string
    meal_id: string
    task_id: string
    meal: 'Café da manhã' | 'Almoço' | 'Café da tarde' | 'Jantar' | 'Ceia'
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
    meal: 'Café da manhã' | 'Almoço' | 'Café da tarde' | 'Jantar' | 'Ceia',
    mealHistoricId: string,
    taskId: string,
  ) => void
  releaseCheck: (mealId: string, isChecked: boolean) => void
  src: any
}

export const meals = {
  breakfast: 'café da manhã',
  lunch: 'almoço',
  snack: 'café da tarde',
  dinner: 'jantar',
  supper: 'ceia',
}

export default function Card({
  isTheSameDay,
  meal,
  releaseCheck,
  isCompleted,
  releaseMealChecked,
  src,
}: CardProps) {
  function handleReleaseMealChecked(data: boolean) {
    releaseCheck(meal.meal_id, data)
    releaseMealChecked(data, meal.meal_id, meal.meal, meal.id, meal.task_id)
  }
  return (
    <Li>
      <AccordionRoot type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionHeader>
            <Container>
              <HeaderContainer>
                <Image
                  src={src}
                  width={75}
                  quality={100}
                  alt=""
                  priority
                  style={{ borderRadius: '9999999px' }}
                />
                <h3>{meal.meal}</h3>

                <div>
                  <CheckboxRoot
                    defaultChecked={isCompleted}
                    checked={isCompleted}
                    disabled={meal.isDone || isTheSameDay}
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
                    <Divider key={food.food}>
                      <p>{food.food}</p>
                      <span>{food.quantity}</span>
                    </Divider>
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
