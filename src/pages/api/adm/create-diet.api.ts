import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import { food } from '@prisma/client'
import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

type createTasks = {
  tasklistId: string
  meal: string
  notes: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const data = req.body

  const tasks = google.tasks({
    version: 'v1',
    auth: await getGoogleOAuthToken(data.data.user_id),
  })

  async function createTaskList(weekday: string) {
    if (data.update) {
      const tasklistId = await prisma.meal.findFirst({
        where: {
          isCurrent: true,
        },
        select: {
          tasklist_id: true,
        },
      })

      await prisma.meal.updateMany({
        where: {
          user_id: data.userId,
          isCurrent: true,
        },
        data: {
          isCurrent: false,
        },
      })

      return tasklistId?.tasklist_id
    }
    const tasklistRes = await tasks.tasklists.insert({
      requestBody: {
        title: `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}`,
      },
    })

    const tasklistId = tasklistRes.data.id
    return tasklistId
  }

  async function createTasks({ tasklistId, meal, notes }: createTasks) {
    if (data.update) {
      const taskId = await prisma.meal.findFirst({
        where: {
          isCurrent: true,
          tasklist_id: tasklistId,
        },
        select: {
          task_id: true,
        },
      })
      if (taskId?.task_id) {
        await tasks.tasks.update({
          task: taskId!.task_id,
          tasklist: `${tasklistId}`,
          requestBody: {
            title: `${meal}`,
            notes: `${notes} `,
          },
        })
        return taskId?.task_id
      }
    }
    const taskmeal = await tasks.tasks.insert({
      requestBody: {
        title: `${meal}`,
        notes: `${notes} `,
      },
      tasklist: `${tasklistId}`,
    })

    const taskmealId = taskmeal.data.id
    return taskmealId
  }

  for (const day of data.data.data) {
    const tasklistId = await createTaskList(day.weekday)
    const reversedMeals = day.meals.reverse()
    for (const meal of reversedMeals) {
      const foodsNotes = meal.foods.map(
        (food: food) =>
          `${food.food.charAt(0).toUpperCase() + food.food.slice(1)} ${
            food.quantity
          }`,
      )
      const combinedText = foodsNotes.join('\n')

      const taskmealId = await createTasks({
        tasklistId: tasklistId!,
        meal: meal.meal,
        notes: combinedText,
      })

      const mealData = {
        id: taskmealId!,
        tasklist_id: tasklistId!,
        isCurrent: true,
        user_id: data.userId,
        completed: false,
        weekday: day.weekday,
        meal: meal.meal,
      }

      const createdMeal = await prisma.meal.create({ data: mealData })

      const foods = meal.foods.map((item: any) => {
        return {
          meal_id: createdMeal.id,
          food: item.food,
          quantity: item.quantity,
        }
      })

      await prisma.food.createMany({ data: foods })
    }
  }

  const today = new Date().getDay().toString() // Convertendo o dia atual para string

  const meals = await prisma.$queryRaw`
  INSERT INTO "mealsHistoric" ("id", "meal_id", "created_at", "isCompleted", "isDone")
  SELECT
    gen_random_uuid(),
    m.id AS meal_id,
    date_trunc('day', now()) + (weekday_num * interval '1 day') AS created_at,
    false AS isCompleted,
    false AS isDone
  FROM (
    SELECT
      *,
      CASE
        WHEN "weekday" = '0' THEN 0
        WHEN "weekday" = '1' THEN 1
        WHEN "weekday" = '2' THEN 2
        WHEN "weekday" = '3' THEN 3
        WHEN "weekday" = '4' THEN 4
        WHEN "weekday" = '5' THEN 5
        WHEN "weekday" = '6' THEN 6
      END AS weekday_num
    FROM "meals"
    WHERE "user_id" = ${data.userId} AND "weekday"::text >= ${today}
  ) AS m;
`

  await prisma.user.update({
    where: {
      id: data.userId,
    },

    data: {
      verified: true,
    },
  })

  console.log(meals)
  return res.status(200).json({
    data,
  })
}
