import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import { food } from '@prisma/client'
import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

type updateTasks = {
  tasklistId: string
  meal: string
  notes: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const data = req.body

  const tasks = google.tasks({
    version: 'v1',
    auth: await getGoogleOAuthToken(data.data.user_id),
  })

  async function updateTasks({ tasklistId, meal, notes }: updateTasks) {
    const taskmealId = data.taskId // Substitua pela lógica correta para obter o ID da tarefa

    await tasks.tasks.update({
      tasklist: tasklistId,
      task: taskmealId,
      requestBody: {
        title: `${meal}`,
        notes: `${notes} `,
      },
    })

    const updatedMealData = {
      id: taskmealId,
      tasklist_id: tasklistId,
      meal,
    }

    await prisma.meal.update({
      where: {
        id: taskmealId,
      },
      data: updatedMealData,
    })
  }

  // Loop para atualizar cada refeição
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

      await updateTasks({
        tasklistId: tasklistId!,
        meal: meal.meal,
        notes: combinedText,
      })
    }
  }

  return res.status(200).json({
    data,
  })
}
