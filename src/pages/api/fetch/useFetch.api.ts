import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function useFetch(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  const data = req.body
  const { username, weekday } = data

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
          updatedTask.completed = false
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

    const dietPromises = updatedTasks.map(async (meal) => {
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

    return res.status(200).json({
      diet,
    })
  }
}
