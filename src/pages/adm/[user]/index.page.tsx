import Image from 'next/image'

import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'
import {
  Box,
  Form,
  Header,
  MainContainer,
  Title,
  Button,
  FormContainer,
  MealsBox,
  ButtonContainer,
} from './styles'
import Link from 'next/link'
import { MultiStep } from '@ignite-ui/react'
import { ArrowLeft, ArrowRight } from 'phosphor-react'
import { api } from '@/lib/axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import FieldArray from './components/array'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { ActivityFactor, Gender, Meal } from '@prisma/client'

interface DietProps {
  user: {
    id: string
    username: string
    name: string
    email: string
    avatarUrl: string
    weight: number
    height: number
    age: number
    gender: Gender
    activityFactor: ActivityFactor
  }
  meals: Meal[]
}

const mealDietInformationSchema = z.object({
  data: z.array(
    z.object({
      weekday: z.enum([
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ]),
      meals: z.array(
        z.object({
          meal: z.enum(['breakfast', 'lunch', 'snack', 'dinner', 'supper']),
          foods: z.array(
            z.object({
              food: z.string(),
              // .regex(/^[a-zA-Z\s]+$/),
              quantity: z.string(),
              // .regex(/^[0-9]{1,5}$/),
            }),
          ),
        }),
      ),
    }),
  ),
})

type mealDietInformationFormData = z.infer<typeof mealDietInformationSchema>

export default function UserDetails({ user, meals }: DietProps) {
  const [weekday, setWeekday] = useState(0)
  const [direction, setDirection] = useState(0)

  const { handleSubmit, control, register, getValues, reset } =
    useForm<mealDietInformationFormData>({
      resolver: zodResolver(mealDietInformationSchema),
      defaultValues: {
        data: meals || [
          {
            weekday: 'sunday',
            meals: [
              {
                meal: 'breakfast',
                foods: [
                  {
                    food: '',
                    quantity: '',
                  },
                ],
              },
              {
                meal: 'lunch',
                foods: [
                  {
                    food: '',
                    quantity: '',
                  },
                ],
              },
              {
                meal: 'snack',
                foods: [
                  {
                    food: '',
                    quantity: '',
                  },
                ],
              },
              {
                meal: 'dinner',
                foods: [
                  {
                    food: '',
                    quantity: '',
                  },
                ],
              },
              {
                meal: 'supper',
                foods: [
                  {
                    food: '',
                    quantity: '',
                  },
                ],
              },
            ],
          },
          {
            weekday: 'monday',
            meals: [
              {
                meal: 'breakfast',
                foods: [
                  {
                    food: 'arroz',
                    quantity: '200',
                  },
                ],
              },
              {
                meal: 'lunch',
                foods: [
                  {
                    food: 'arroz',
                    quantity: '200',
                  },
                ],
              },
              {
                meal: 'snack',
                foods: [
                  {
                    food: 'arroz',
                    quantity: '200',
                  },
                ],
              },
              {
                meal: 'dinner',
                foods: [
                  {
                    food: 'arroz',
                    quantity: '200',
                  },
                ],
              },
              {
                meal: 'supper',
                foods: [
                  {
                    food: 'arroz',
                    quantity: '200',
                  },
                ],
              },
            ],
          },
          {
            weekday: 'tuesday',
            meals: [
              {
                meal: 'breakfast',
                foods: [
                  {
                    food: 'feijao',
                    quantity: '100',
                  },
                ],
              },
              {
                meal: 'lunch',
                foods: [
                  {
                    food: 'feijao',
                    quantity: '100',
                  },
                ],
              },
              {
                meal: 'snack',
                foods: [
                  {
                    food: 'feijao',
                    quantity: '100',
                  },
                ],
              },
              {
                meal: 'dinner',
                foods: [
                  {
                    food: 'feijao',
                    quantity: '100',
                  },
                ],
              },
              {
                meal: 'supper',
                foods: [
                  {
                    food: 'feijao',
                    quantity: '100',
                  },
                ],
              },
            ],
          },
          {
            weekday: 'wednesday',
            meals: [
              {
                meal: 'breakfast',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'lunch',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'snack',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'dinner',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'supper',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
            ],
          },
          {
            weekday: 'thursday',
            meals: [
              {
                meal: 'breakfast',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'lunch',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'snack',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'dinner',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'supper',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
            ],
          },
          {
            weekday: 'friday',
            meals: [
              {
                meal: 'breakfast',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'lunch',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'snack',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'dinner',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'supper',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
            ],
          },
          {
            weekday: 'saturday',
            meals: [
              {
                meal: 'breakfast',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'lunch',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'snack',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'dinner',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
              {
                meal: 'supper',
                foods: [
                  {
                    food: 'coxinha',
                    quantity: '400',
                  },
                ],
              },
            ],
          },
        ],
      },
    })

  const router = useRouter()

  async function handleCreateDiet(data: mealDietInformationFormData) {
    if (weekday > 5) {
      const userId = user.id
      try {
        await api.post('/adm/create-diet', {
          userId,
          data,
          update: !!meals,
        })
        await router.push('/adm/dashboard')
      } catch (err) {
        console.log(err)
        if (err instanceof AxiosError && err?.response?.data?.message) {
          alert(err.response.data.message)
        }
      }
    } else {
      if (direction === 0) {
        setWeekday(weekday - 1)
      } else {
        setWeekday(weekday + 1)
      }
      console.log(data)
      reset({ data: data.data })
    }
  }

  return (
    <>
      <Header>
        <Link href="/adm/dashboard"></Link>
      </Header>
      <MainContainer>
        <Box>
          <div>
            <Image
              src={user.avatarUrl}
              height={120}
              width={120}
              quality={100}
              priority
              alt=""
            />
            <Title>{user.name}</Title>
            <p>Peso: {user.weight} KG</p>
            <p>Altura: {user.height} CM</p>
            <p>Idade: {user.age} Anos</p>
            <p>Nivel de atividades: {user.activityFactor}</p>
          </div>
        </Box>
        <FormContainer>
          <Header>
            <strong>{getValues(`data.${weekday}.weekday`)}</strong>
          </Header>
          <MultiStep
            size={getValues('data').length}
            currentStep={weekday + 1}
          />
          <Form onSubmit={handleSubmit(handleCreateDiet)}>
            <MealsBox>
              <FieldArray
                control={control}
                register={register}
                weekday={weekday}
              />

              <ButtonContainer>
                <Button
                  disabled={weekday < 1}
                  type="submit"
                  onClick={() => {
                    setDirection(0)
                  }}
                >
                  <ArrowLeft />
                  {getValues(`data.${weekday - 1}.weekday`)}
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    setDirection(1)
                  }}
                >
                  {getValues(`data.${weekday + 1}.weekday`)}
                  <ArrowRight />
                </Button>
              </ButtonContainer>
            </MealsBox>
          </Form>
        </FormContainer>
      </MainContainer>
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
  const id = String(params?.user)

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  const meals = await prisma.meal.findMany({
    where: {
      user_id: user.id,
      isCurrent: true,
    },
    include: {
      foods: {
        select: {
          food: true,
          quantity: true,
        },
      },
    },
  })

  // Criar um objeto para agrupar as refeições por dia da semana
  const groupedMealsByDay = meals.reduce((acc, meal) => {
    if (!acc[meal.weekday]) {
      acc[meal.weekday] = []
    }
    acc[meal.weekday].push(meal)
    return acc
  }, {})

  // Mapear os grupos para a estrutura desejada
  const result = Object.entries(groupedMealsByDay).map(([weekday, meals]) => {
    return {
      weekday,
      meals: meals.map((meal) => ({
        meal: meal.meal,
        foods: meal.foods
          ? meal.foods.map((food) => ({
              food: food.food,
              quantity: food.quantity,
            }))
          : [],
      })),
    }
  })

  console.log(result)

  return {
    props: {
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar_url,
        weight: user.weight,
        height: user.height,
        age: user.age,
        gender: user.gender,
        activityFactor: user.activity_factor,
      },
      meals: result,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
