import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import { google } from 'googleapis'

export default async function handler(req, res) {
  const data = req.body

  const mealsTranslate = {
    breakfast: 'Café da manhã',
    lunch: 'Almoço',
    snack: 'Café da tarde',
    dinner: 'Jantar',
    supper: 'Ceia',
  }

  const tasks = google.tasks({
    version: 'v1',
    auth: await getGoogleOAuthToken(data.data.user_id),
  })

  async function createTasks({ tasklistId, meal, notes, taskId }) {
    await tasks.tasks.update({
      tasklist: `${tasklistId}`,
      task: `${taskId}`,
      requestBody: {
        id: `${taskId}`,
        parent: `${tasklistId}`,
        notes: `${notes}`,
        title: `${mealsTranslate[meal]}`,
      },
    })
  }

  for (const day of data.data.data) {
    const tasklistId = await prisma.meal.findFirst({
      where: {
        user_id: data.userId,
        isCurrent: true,
        weekday: day.weekday,
      },

      select: {
        tasklist_id: true,
      },
    })

    await prisma.meal.updateMany({
      where: {
        user_id: data.userId,
        isCurrent: true,
        weekday: day.weekday,
      },

      data: {
        isCurrent: false,
      },
    })
    const reversedMeals = day.meals.reverse()
    for (const meal of reversedMeals) {
      const foodsNotes = meal.foods.map(
        (food) =>
          `${food.food.charAt(0).toUpperCase() + food.food.slice(1)} ${
            food.quantity
          }`,
      )
      const combinedText = foodsNotes.join('\n')

      const taskId = await prisma.meal.findFirst({
        where: {
          weekday: day.weekday,
          meal: meal.meal,
        },

        select: {
          task_id: true,
        },
      })

      await createTasks({
        tasklistId: tasklistId.tasklist_id,
        taskId: taskId.task_id,
        meal: meal.meal,
        notes: combinedText,
      })

      const mealData = {
        task_id: taskId.task_id,
        tasklist_id: tasklistId.tasklist_id,
        isCurrent: true,
        user_id: data.userId,
        weekday: day.weekday,
        meal: meal.meal,
      }

      const createdMeal = await prisma.meal.create({ data: mealData })

      const foods = meal.foods.map((item) => {
        return {
          meal_id: createdMeal.id,
          food: item.food,
          quantity: item.quantity,
        }
      })

      await prisma.food.createMany({ data: foods })
    }
  }

  await prisma.user.update({
    where: {
      id: data.userId,
    },

    data: {
      verified: true,
      is_diet_updated: true,
    },
  })

  return res.status(200).json({
    data,
  })
}
