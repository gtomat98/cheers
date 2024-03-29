import Image from 'next/image'
import { getGoogleOAuthToken } from '@/lib/google'
// eslint-disable-next-line camelcase
import { google, tasks_v1 } from 'googleapis'

import Lunch from '../../../../assets/Meals/luch.png'
import Breakfast from '../../../../assets/Meals/breakfast.png'
import Snack from '../../../../assets/Meals/snack.png'
import Supper from '../../../../assets/Meals/ceia.png'

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
import { GetServerSideProps } from 'next'
import { prisma } from '@/lib/prisma'
import { Weekdays, Prisma } from '@prisma/client'
import { UserContext } from '@/contexts/userContext'
import Card from './components/card'
import { api } from '@/lib/axios'
import { weekdays } from '../components/card'

type Meal = {
  meal_id: string
  task_id: string
  id: string
  created_at: string
  isDone: boolean
  meal: 'Café da manhã' | 'Almoço' | 'Café da tarde' | 'Jantar' | 'Ceia'
  isCompleted: boolean
  foods: [
    {
      food: string
      quantity: string
    },
  ]
}

interface WeekdayProps {
  isTheSameDay: boolean
  weekdayMeals: Meal[]
  tasklist: string
  username: string
  weekday: Weekdays
}

export default function Weekday({
  isTheSameDay,
  weekdayMeals: Initial,
  weekday,
  tasklist,
}: WeekdayProps) {
  const [weekdayMeals, setWeekdayMeals] =
    useState<WeekdayProps['weekdayMeals']>(Initial)
  const { cards } = useContext(UserContext)
  const [isApiInProcess, setIsApiInProcess] = useState(false)
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
  }

  async function handleMealChecked(
    isChecked: boolean,
    mealId: string,
    meal: 'Café da manhã' | 'Almoço' | 'Café da tarde' | 'Jantar' | 'Ceia',
    mealHistoricId: string,
    taskId: string,
  ) {
    setIsApiInProcess(true)
    const { data } = await api.put('/fetch/updateTask', {
      mealId,
      isChecked,
      tasklist,
      title: meal,
      mealHistoricId,
      taskId,
    })
    setIsApiInProcess(false)

    if (data.reload) {
      window.location.reload()
    }
  }

  useEffect(() => {
    if (weekdayMeals.length === 5 && isTheSameDay && !isApiInProcess) {
      const interval = setInterval(async () => {
        try {
          const { data } = await api.post('/fetch/getUpdatedTasks', {
            tasklist,
          })
          const updatedMeals: WeekdayProps['weekdayMeals'] = weekdayMeals.map(
            (meal) => {
              const isChanged = data.meals.find(
                (updatedMeal: Meal) => updatedMeal.id === meal.task_id,
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
    }
  }, [tasklist, weekdayMeals, isTheSameDay, isApiInProcess])

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
            <Title>
              {`Refeições - ${
                weekdays[weekday].charAt(0).toUpperCase() +
                weekdays[weekday].slice(1)
              }`}
            </Title>
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
          {weekdayMeals.length === 5 && (
            <>
              <Card
                isCompleted={
                  weekdayMeals.find((meal) => meal.meal === 'Café da manhã')
                    ?.isCompleted!
                }
                releaseCheck={handleCheck}
                meal={
                  weekdayMeals.find((meal) => meal.meal === 'Café da manhã')!
                }
                releaseMealChecked={handleMealChecked}
                src={Breakfast}
                isTheSameDay={!isTheSameDay}
              />
              <Card
                isCompleted={
                  weekdayMeals.find((meal) => meal.meal === 'Almoço')
                    ?.isCompleted!
                }
                releaseCheck={handleCheck}
                meal={weekdayMeals.find((meal) => meal.meal === 'Almoço')!}
                releaseMealChecked={handleMealChecked}
                src={Lunch}
                isTheSameDay={!isTheSameDay}
              />
              <Card
                isCompleted={
                  weekdayMeals.find((meal) => meal.meal === 'Café da tarde')
                    ?.isCompleted!
                }
                releaseCheck={handleCheck}
                meal={
                  weekdayMeals.find((meal) => meal.meal === 'Café da tarde')!
                }
                releaseMealChecked={handleMealChecked}
                src={Snack}
                isTheSameDay={!isTheSameDay}
              />
              <Card
                isCompleted={
                  weekdayMeals.find((meal) => meal.meal === 'Jantar')
                    ?.isCompleted!
                }
                releaseCheck={handleCheck}
                meal={weekdayMeals.find((meal) => meal.meal === 'Jantar')!}
                releaseMealChecked={handleMealChecked}
                src={Lunch}
                isTheSameDay={!isTheSameDay}
              />
              <Card
                isCompleted={
                  weekdayMeals.find((meal) => meal.meal === 'Ceia')
                    ?.isCompleted!
                }
                releaseCheck={handleCheck}
                meal={weekdayMeals.find((meal) => meal.meal === 'Ceia')!}
                releaseMealChecked={handleMealChecked}
                src={Supper}
                isTheSameDay={!isTheSameDay}
              />
            </>
          )}
        </Meals>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context
  const username = String(params!.username)
  const weekday = params!.weekday as Weekdays

  const translateDate = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  }

  const isTheSameDay = translateDate[weekday] === new Date().getDay()

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

  const currentDate = new Date()
  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(currentDate)
  endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()))
  endOfWeek.setHours(0, 0, 0, 0)

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
    showHidden: true,
  })

  const { items } = data

  if (!items) {
    return {
      notFound: true,
    }
  }

  const weekdayMeals = isTheSameDay
    ? await prisma.$queryRaw`
  WITH tasks AS (
      SELECT *
      FROM (VALUES ${Prisma.raw(itemsToSqlArray(items).join(', '))})
        AS t ("id", "status", "completed", "title")
  ),
  updated_meals AS (
      UPDATE "mealsHistoric" AS mh
      SET "isCompleted" = (CASE WHEN t."status" = 'completed' THEN true ELSE false END)
      FROM tasks t
      WHERE t."id" = (
          SELECT "task_id" FROM "meals" WHERE "id" = mh."meal_id" AND "isCurrent" = true
      )
      RETURNING mh.*
  )
  SELECT
      um.*,
      TO_CHAR(um."created_at", 'YYYY-MM-DD') as "created_at",
      (
          SELECT json_agg(json_build_object('id', f.id, 'food', f.food, 'quantity', f.quantity))
          FROM "foods" as f
          WHERE um."meal_id" = f."meal_id"
      ) as "foods",
      t."title" AS "meal",
      t."id" AS "task_id",
      t."status" AS "status"
  FROM updated_meals um
  JOIN tasks t ON (
      SELECT "task_id" FROM "meals" WHERE "id" = um."meal_id" AND "isCurrent" = true
  ) = t."id"
  WHERE um."created_at" >= ${startOfWeek} AND
        um."created_at" <= ${endOfWeek}
  GROUP BY um.id, t."title", t."status", t."id", um."meal_id", um.created_at, um."isDone", um."isCompleted"`
    : await prisma.$queryRaw`
WITH tasks AS (
    SELECT *
    FROM (VALUES ${Prisma.raw(itemsToSqlArray(items).join(', '))})
      AS t ("id", "status", "completed", "title")
),
updated_meals AS (
    SELECT mh.*
    FROM "mealsHistoric" AS mh
    WHERE EXISTS (
        SELECT 1
        FROM tasks t
        WHERE t."id" = (
            SELECT "task_id" FROM "meals" WHERE mh."meal_id" = "meals"."id" AND "isCurrent" = true
        )
    )
)
SELECT
    um.*,
    TO_CHAR(um."created_at", 'YYYY-MM-DD') as "created_at",
    (
        SELECT json_agg(json_build_object('id', f.id, 'food', f.food, 'quantity', f.quantity))
        FROM "foods" as f
        WHERE um."meal_id" = f."meal_id"
    ) as "foods",
    t."title" AS "meal",
    t."id" AS "task_id",
    t."status" AS "status"
FROM updated_meals um
JOIN tasks t ON (
    SELECT "task_id" FROM "meals" WHERE "id" = um."meal_id" AND "isCurrent" = true
) = t."id"
WHERE um."created_at" >= ${startOfWeek} AND
      um."created_at" <= ${endOfWeek}
GROUP BY um.id, t."title", t."status", t."id", um."meal_id", um.created_at, um."isDone", um."isCompleted"
`

  return {
    props: {
      isTheSameDay,
      weekdayMeals,
      username,
      weekday,
      tasklist,
    },
  }
}
