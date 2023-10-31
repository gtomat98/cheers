/* eslint-disable camelcase */
import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { google } from 'googleapis'

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  try {
    await prisma.$executeRaw`BEGIN`

    const users = await prisma.user.findMany({
      where: {
        isInactive: false,
        verified: true,
        NOT: {
          age: null,
        },
        role: 'user',
      },
    })

    for (const user of users) {
      const translateDate = {
        0: 'sunday',
        1: 'monday',
        2: 'tuesday',
        3: 'wednesday',
        4: 'thursday',
        5: 'friday',
        6: 'saturday',
      }
      const weekday = new Date().getDay() - 1
      const api = google.tasks({
        version: 'v1',
        auth: await getGoogleOAuthToken(user.id),
      })

      const currentDate = new Date()
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
      startOfWeek.setHours(0, 0, 0, 0)

      const endOfWeek = new Date(currentDate)
      endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()))
      endOfWeek.setHours(0, 0, 0, 0)

      const { tasklist_id: tasklist } = await prisma.meal.findFirst({
        where: {
          weekday: translateDate[weekday],
          user_id: user.id,
          isCurrent: true,
        },

        select: {
          tasklist_id: true,
        },
      })

      const itemsToSqlArray = (items) =>
        items.map(
          (item) =>
            `('${item.id}', '${item.status}', '${item.completed}', '${item.title}')`,
        )

      const { data } = await api.tasks.list({
        tasklist,
        showHidden: true,
      })

      const { items } = data

      items &&
        (await prisma.$queryRaw`
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
  GROUP BY um.id, t."title", t."status", t."id", um."meal_id", um.created_at, um."isDone", um."isCompleted"`)

      if (data.items && data.items.length > 0) {
        const tasksToReset = data.items.filter(
          (task) => task.status === 'completed',
        )
        for (const task of tasksToReset) {
          // Rodefine a tarefa para não concluída.
          await api.tasks.update({
            task: task.id,
            tasklist,
            requestBody: {
              ...task,
              id: task.id,
              status: 'needsAction',
            },
          })
        }
      }
    }

    await prisma.$executeRaw`COMMIT`
    res.status(200).end()
  } catch (error) {
    await prisma.$executeRaw`ROLLBACK`
    res.status(500).json({
      error,
    })
  } finally {
    await prisma.$disconnect()
  }
}
