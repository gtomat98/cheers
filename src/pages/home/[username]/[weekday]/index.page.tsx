import Logo from '../../../../assets/Logo.svg'
import Breakfast from '../../../../assets/Meals/breakfast.png'
import Image from 'next/image'
import { getGoogleOAuthToken } from '@/lib/google'
import { google } from 'googleapis'

import React, { useEffect, useState } from 'react'

import {
  Box,
  CheckboxIndicator,
  CheckboxRoot,
  Container,
  Counter,
  Header,
  Meal,
  MealMeter,
  Meals,
  Meter,
  Title,
} from './styles'
import Link from 'next/link'
import { CaretLeft, Check } from 'phosphor-react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'
import { Weekdays } from '@prisma/client'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

interface WeekdayProps {
  diet: [
    {
      meal: string
      isCompleted: boolean
      foods: [
        {
          food: string
          quantity: string
        },
      ]
    },
  ]
  username: string
  weekday: any
}

export default function Weekday({ diet, username, weekday }: WeekdayProps) {
  const [generic, setGeneric] = useState(diet)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const teste = await api.post('/fetch/useFetch', {
          username,
          weekday,
        })

        setGeneric(teste.data.diet)
        console.log(teste.data.diet, generic)
      } catch (err) {
        if (err instanceof AxiosError && err?.response?.data?.message) {
          alert(err.response.data.message)
        }
      }
    }, 5000)

    return () => clearInterval(interval) // Limpar o intervalo quando o componente for desmontado
  }, [username, weekday, generic])

  return (
    <>
      <Container>
        <Header>
          <Link href="/home/username">
            <Image src={Logo} width={180} quality={100} priority alt="" />
          </Link>
        </Header>
        <Box>
          <header>
            <Title>
              <button>
                <CaretLeft size={18} weight="bold" />
              </button>
              Domingo
            </Title>
            <MealMeter>
              <Meter>
                <div></div>
              </Meter>
              <Counter>
                <span>Refeições</span>
                <span>2 de 5</span>
              </Counter>
            </MealMeter>
          </header>
          <Meals>
            {generic.map((meal) => {
              return (
                <Meal key={meal.meal}>
                  <Image src={Breakfast} height={150} quality={100} alt="" />
                  <h3>{meal.meal}</h3>
                  <div>
                    <CheckboxRoot
                      defaultChecked={meal.isCompleted}
                      checked={meal.isCompleted}
                    >
                      <CheckboxIndicator>
                        <Check size={18} weight="bold" />
                      </CheckboxIndicator>
                    </CheckboxRoot>
                  </div>
                </Meal>
              )
            })}
          </Meals>
        </Box>
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
  const username = String(params!.username)
  const weekday = params!.weekday as Weekdays

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  const api = google.tasks({
    version: 'v1',
    auth: await getGoogleOAuthToken(user!.id),
  })

  const taskslist = await prisma.meal.findFirst({
    where: {
      weekday,
    },

    select: {
      tasklist_id: true,
    },
  })

  if (taskslist && taskslist.tasklist_id) {
    const tasks = await api.tasks.list({
      tasklist: taskslist.tasklist_id,
    })

    const allTasksOnMyDatabase = await prisma.meal.findMany({
      where: {
        weekday,
      },
    })

    const updatedTasks = allTasksOnMyDatabase.map((taskFromDatabase) => ({
      ...taskFromDatabase,
      completed: true,
    }))

    await prisma.meal.updateMany({
      where: {
        weekday,
        user_id: user?.id,
      },
      data: {
        completed: true,
      },
    })

    updatedTasks.forEach((updatedTask) => {
      tasks.data.items!.forEach(async (task) => {
        if (task.id === updatedTask.id) {
          await prisma.meal.update({
            where: {
              id: task.id,
            },

            data: {
              completed: false,
            },
          })
        }
      })
    })
  }

  const meals = await prisma.meal.findMany({
    where: {
      weekday,
      user_id: user?.id,
    },
  })

  if (!meals) {
    return {
      notFound: true,
    }
  }

  const dietPromises = meals.map(async (meal) => {
    const foods = await prisma.food.findMany({
      where: {
        meal_id: meal.id,
      },
    })
    return {
      meal: meal.meal,
      isCompleted: meal.completed,
      foods,
    }
  })

  const diet = await Promise.all(dietPromises.reverse())

  return {
    props: {
      diet,
      username,
      weekday,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
