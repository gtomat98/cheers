import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

type createTasks = {
  tasklistId: string
  taskmealId: string
  foods: [
    {
      food: string
      quantity: string
    },
  ]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const data = req.body
  console.log(data)

  const tasks = google.tasks({
    version: 'v1',
    auth: await getGoogleOAuthToken(data.data.user_id),
  })

  async function createTaskList(weekday: string) {
    // Criar uma nova lista de tarefas
    const tasklistRes = await tasks.tasklists.insert({
      requestBody: {
        title: `${weekday}`,
      },
    })

    const tasklistId = tasklistRes.data.id // Obter o identificador da nova lista de tarefas
    return tasklistId
  }

  async function createMeal({ tasklistId, meal }: any) {
    const taskmeal = await tasks.tasks.insert({
      requestBody: {
        title: `${meal}`,
      },
      tasklist: `${tasklistId}`,
    })

    const taskmealId = taskmeal.data.id
    return taskmealId
  }

  async function createTasks({ taskmealId, foods, tasklistId }: createTasks) {
    foods.forEach(async (food) => {
      await tasks.tasks.insert({
        requestBody: {
          title: `${food.food}`,
          notes: `${food.quantity}`,
        },
        parent: `${taskmealId}`,
        tasklist: `${tasklistId}`,
      })
    })
  }

  for (const day of data.data.data) {
    const tasklistId = await createTaskList(day.weekday)
    const reversedMeals = day.meals.reverse() // reverter a ordem do array para uma boa apresentacão das tasks
    for (const meal of reversedMeals) {
      const taskmealId = await createMeal({
        tasklistId: tasklistId!,
        meal: meal.meal,
      })

      const mealData = {
        id: taskmealId!,
        tasklist_id: tasklistId!,
        task_id: 'banana',
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

      await createTasks({
        foods,
        tasklistId: tasklistId!,
        taskmealId: taskmealId!,
      })
      await prisma.food.createMany({ data: foods })
    }
  }

  return res.status(200).json({
    data,
  })
}
