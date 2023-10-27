import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import { google } from 'googleapis'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const data = req.body

  console.log(data.data.user_id)

  const weekdaysTranslate = {
    sunday: 'Domingo',
    monday: 'Segunda',
    tuesday: 'Terça',
    wednesday: 'Quarta',
    thursday: 'Quinta',
    friday: 'Sexta',
    saturday: 'Sábado',
  }

  const mealsTranslate = {
    breakfast: 'Café da manhã',
    lunch: 'Almoço',
    snack: 'Café da tarde',
    dinner: 'Jantar',
    supper: 'Ceia',
  }

  if (data.update) {
    await prisma.meal.updateMany({
      where: {
        user_id: data.userId,
        isCurrent: true,
      },
      data: {
        isCurrent: false,
      },
    })
  }

  const tasks = google.tasks({
    version: 'v1',
    auth: await getGoogleOAuthToken(data.userId),
  })

  async function createTaskList(weekday) {
    const tasklistRes = await tasks.tasklists.insert({
      requestBody: {
        title: `${weekdaysTranslate[weekday]}`,
      },
    })

    const tasklistId = tasklistRes.data.id
    return tasklistId
  }

  async function createTasks({ tasklistId, meal, notes }) {
    const taskmeal = await tasks.tasks.insert({
      requestBody: {
        title: `${mealsTranslate[meal]}`,
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
        (food) =>
          `${food.food.charAt(0).toUpperCase() + food.food.slice(1)} ${
            food.quantity
          }`,
      )
      const combinedText = foodsNotes.join('\n')

      const taskmealId = await createTasks({
        tasklistId,
        meal: meal.meal,
        notes: combinedText,
      })

      const mealData = {
        task_id: taskmealId,
        tasklist_id: tasklistId,
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

  const today = new Date().getDay().toString() // Convertendo o dia atual para string
  const weekdayNum = new Date().getDay() // Obtém o dia da semana atual (0 a 6)

  await prisma.$queryRaw`
  INSERT INTO "mealsHistoric" ("id", "meal_id", "created_at", "isCompleted", "isDone")
  SELECT
    gen_random_uuid(),
    m.id AS meal_id,
    date_trunc('day', now()) + ((weekday_num - ${weekdayNum}) * interval '1 day') AS created_at,
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

  console.log('ue')

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
