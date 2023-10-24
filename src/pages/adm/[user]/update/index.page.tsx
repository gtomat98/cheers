import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'
import {
  Form,
  Header,
  Button,
  FormContainer,
  MealsBox,
  ButtonContainer,
  Divisor,
  Container,
  TableContainer,
  BoxTwo,
  ButtonHistoric,
} from './styles'
import Link from 'next/link'
import { MultiStep } from '@ignite-ui/react'
import { ArrowLeft, ArrowRight, CaretLeft, Database } from 'phosphor-react'
import { api } from '@/lib/axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import FieldArray from '../components/array'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { ActivityFactor, Gender, Meal } from '@prisma/client'

export const weekdays = {
  sunday: 'Domingo',
  monday: 'Segunda',
  tuesday: 'Terça',
  wednesday: 'Quarta',
  thursday: 'Quinta',
  friday: 'Sexta',
  saturday: 'Sábado',
}

const activity_factor = {
  sedentary: 'Sedentário',
  light: 'Leve',
  moderate: 'Moderado',
  high: 'Alto',
}

interface DietProps {
  user: {
    id: string
    verified: boolean
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

  const {
    handleSubmit,
    control,
    register,
    getValues,
    reset,
    formState: { isSubmitting },
  } = useForm<mealDietInformationFormData>({
    resolver: zodResolver(mealDietInformationSchema),
    defaultValues: {
      data: (meals.length > 1 && meals) || [
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
          weekday: 'tuesday',
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
          weekday: 'wednesday',
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
          weekday: 'thursday',
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
          weekday: 'friday',
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
          weekday: 'saturday',
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
      ],
    },
  })

  const router = useRouter()

  async function handleCreateDiet(data: mealDietInformationFormData) {
    if (weekday > 5 && direction === 1) {
      const userId = user.id
      try {
        if (user.verified) {
          await api.post('/adm/update-diet', {
            userId,
            data,
          })
        } else {
          await api.post('/adm/create-diet', {
            userId,
            data,
            update: meals.length > 0 && true,
          })
        }
        await router.push('/adm/dashboard')
      } catch (err) {
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
      reset({ data: data.data })
    }
  }

  async function handleHistoric() {
    await router.push(`/adm/${user.username}/update/historic`)
  }

  return (
    <>
      <Header>
        <Link href="/adm/dashboard"></Link>
      </Header>
      <Container>
        <BoxTwo>
          <Divisor>
            <Link href="/adm/dashboard">
              <CaretLeft size={24} weight="bold" />
            </Link>

            <h1>Alterar dieta - {user.username}</h1>
          </Divisor>
          <ButtonHistoric
            onClick={() => {
              handleHistoric()
            }}
          >
            Histórico <Database size={16} />
          </ButtonHistoric>
        </BoxTwo>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Peso</th>
                <th>Altura</th>
                <th>Idade</th>
                <th>Gênero</th>
                <th>Custo Energético</th>
                <th>Já cadastrado?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.username}</td>
                <td>{user.weight} KG</td>
                <td>{user.height} CM</td>
                <td>{user.age} Anos</td>
                <td>{user.gender === 'male' ? 'Masculino' : 'Feminino'}</td>
                <td>{activity_factor[user.activityFactor]}</td>
                <td>{user.verified ? 'Sim' : 'Não'}</td>
              </tr>
            </tbody>
          </table>
        </TableContainer>

        <FormContainer>
          <Header>
            <strong>{weekdays[getValues(`data.${weekday}.weekday`)]}</strong>
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
                  disabled={weekday < 1 || isSubmitting}
                  onClick={() => {
                    setDirection(0)
                  }}
                >
                  <ArrowLeft />
                  {getValues(`data.${weekday - 1}.weekday`)}
                </Button>
                <Button
                  disabled={isSubmitting}
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
  const username = String(params?.user)

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

  const orderedMeals = meals.sort((mealA, mealB) => {
    const dayOrder = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    }

    return dayOrder[mealA.weekday] - dayOrder[mealB.weekday]
  })

  // Agrupar os resultados por dia da semana como você fez anteriormente
  const groupedMealsByDay = orderedMeals.reduce((acc: any, meal: any) => {
    if (!acc[meal.weekday]) {
      acc[meal.weekday] = []
    }
    acc[meal.weekday].push(meal)
    return acc
  }, {})

  // Mapear os grupos para a estrutura desejada
  const result = Object.entries(groupedMealsByDay).map(
    ([weekday, meals]: any) => {
      return {
        weekday,
        meals: meals.map((meal: any) => ({
          meal: meal.meal,
          foods: meal.foods
            ? meal.foods.map((food: any) => ({
                food: food.food,
                quantity: food.quantity,
              }))
            : [],
        })),
      }
    },
  )

  return {
    props: {
      user: {
        verified: user.verified,
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
