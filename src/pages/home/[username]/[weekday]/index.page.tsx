import Image from 'next/image'
import { getGoogleOAuthToken } from '@/lib/google'
// eslint-disable-next-line camelcase
import { google, tasks_v1 } from 'googleapis'

import React, { useContext, useEffect, useState } from 'react'

import {
  Box,
  Container,
  Counter,
  MealMeter,
  Meals,
  Meter,
  Title,
} from './styles'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'
import { Weekdays, Prisma, Meals as MealsType } from '@prisma/client'
import { UserContext } from '@/contexts/userContext'
import Card from './components/card'
import { api } from '@/lib/axios'

type Meal = {
  meal_id: string
  id: string
  created_at: string
  isDone: boolean
  meal: MealsType
  isCompleted: boolean
  foods: [
    {
      food: string
      quantity: string
    },
  ]
}

interface WeekdayProps {
  weekdayMeals: Meal[]
  tasklist: string
  username: string
  weekday: Weekdays
}

export default function Weekday({
  weekdayMeals: Initial,
  weekday,
  tasklist,
}: WeekdayProps) {
  const [weekdayMeals, setWeekdayMeals] =
    useState<WeekdayProps['weekdayMeals']>(Initial)
  const { cards } = useContext(UserContext)
  const meter = weekdayMeals.filter((meal) => meal.isCompleted).length

  function handleCheck(mealId: string, isChecked: boolean) {
    const updatedMeals = weekdayMeals.filter((meal) => {
      if (meal.meal_id === mealId) {
        meal.isCompleted = isChecked
        return meal
      }

      return meal
    })
    setWeekdayMeals(updatedMeals)
    console.log(weekdayMeals)
  }

  async function handleMealChecked(
    isChecked: boolean,
    mealId: string,
    meal: MealsType,
    mealHistoricId: string,
  ) {
    const { data } = await api.put('/fetch/updateTask', {
      mealId,
      isChecked,
      tasklist,
      title: meal,
      mealHistoricId,
    })

    if (data.reload) {
      window.location.reload()
    }
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const { data } = await api.post('/fetch/getUpdatedTasks', {
          tasklist,
        })
        const updatedMeals: WeekdayProps['weekdayMeals'] = weekdayMeals.map(
          (meal) => {
            const isChanged = data.meals.find(
              (updatedMeal: Meal) => updatedMeal.id === meal.meal_id,
            )
            return isChanged
              ? {
                  ...meal,
                  isCompleted: isChanged.status === 'completed',
                }
              : meal
          },
        )
        setWeekdayMeals(updatedMeals)
      } catch (err) {}
    }, 5000)

    return () => clearInterval(interval) // Limpar o intervalo quando o componente for desmontado
  }, [tasklist, weekdayMeals])

  return (
    <>
      <Container>
        <Box
          css={{
            $$color: cards[weekday].color,
            $$tag: cards[weekday].tag,
            $$meterValue: meter,
          }}
        >
          <Image
            src={cards[weekday].planet}
            alt={`${weekday}`}
            priority
            width={100}
          />
          <header>
            <Title>{weekday.charAt(0).toUpperCase() + weekday.slice(1)}</Title>
            <MealMeter>
              <Meter>
                <div></div>
              </Meter>
              <Counter>
                <span>Refeições</span>
                <span>
                  {meter} de {weekdayMeals.length}
                </span>
              </Counter>
            </MealMeter>
          </header>
        </Box>
        <Meals
          css={{
            $$color: cards[weekday].color,
            $$tag: cards[weekday].tag,
          }}
        >
          {weekdayMeals.map((meal) => {
            return (
              <Card
                isCompleted={meal.isCompleted}
                releaseCheck={handleCheck}
                meal={meal}
                releaseMealChecked={handleMealChecked}
                key={meal.meal_id}
              />
            )
          })}
        </Meals>
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

  if (!user) {
    return {
      notFound: true,
    }
  }

  const currentDate = new Date()
  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

  const endOfWeek = new Date(currentDate)
  endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()))

  const api = google.tasks({
    version: 'v1',
    auth: await getGoogleOAuthToken(user.id),
  })

  const { tasklist_id: tasklist }: any = await prisma.meal.findFirst({
    where: {
      weekday,
      user_id: user.id,
      isCurrent: true,
    },

    select: {
      tasklist_id: true,
    },
  })

  if (!tasklist) {
    return {
      notFound: true,
    }
  }
  // eslint-disable-next-line camelcase
  const itemsToSqlArray = (items: tasks_v1.Schema$Task[]) =>
    items.map(
      (item) =>
        `('${item.id}', '${item.status}', '${item.completed}', '${item.title}')`,
    )

  const { data } = await api.tasks.list({
    tasklist,
    showCompleted: true,
    showHidden: true,
  })

  const { items } = data

  if (!items) {
    return {
      notFound: true,
    }
  }

  const weekdayMeals = await prisma.$queryRaw`
  WITH tasks AS (
    SELECT *
    FROM (VALUES ${Prisma.raw(itemsToSqlArray(items).join(', '))})
      AS t ("id", "status", "completed", "title")
  ),
  updated_meals AS (
    UPDATE "mealsHistoric" AS mh
    SET "isCompleted" = t."status" = 'completed'
    FROM tasks t
    WHERE mh."meal_id" = t."id"
    RETURNING mh.*
  )
  SELECT
    um.*,
    TO_CHAR(um."created_at", 'YYYY-MM-DD') as "created_at",
    json_agg(json_build_object('id', f.id, 'food', f.food, 'quantity', f.quantity)) as "foods",
    t."title" AS "meal"
  FROM updated_meals um
  JOIN tasks t ON um."meal_id" = t."id"
  LEFT JOIN "foods" as f ON um."meal_id" = f."meal_id"
  WHERE um."created_at" >= ${startOfWeek} AND
        um."created_at" <= ${endOfWeek}
  GROUP BY um.id, t."title", um."meal_id", f.id, f.food, f.quantity, um.created_at, um."isDone", um."isCompleted";
`
  console.log('AQUI:', weekdayMeals)

  return {
    props: {
      weekdayMeals,
      username,
      weekday,
      tasklist,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
