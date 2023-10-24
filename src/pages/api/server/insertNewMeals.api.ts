import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  // const currentDate = new Date()
  // const dateTime = currentDate.toLocaleString()

  // const dayOfWeek = currentDate.getDay()
  // const isStartOfWeek = dayOfWeek === 1

  try {
    await prisma.$executeRaw`BEGIN`

    await prisma.$queryRaw`
        WITH user_meals AS (
          -- CTE para buscar todos os usuários verificados com suas refeições atuais
          SELECT
            u.id AS user_id,
            m.id AS meal_id,
            m.weekday
          FROM
            "users" u
          INNER JOIN
            "meals" m ON u.id = m.user_id
          WHERE
            u.verified = true AND
            u."isInactive" = false AND
            m."isCurrent" = true
        ),
        new_meals AS (
          -- CTE para criar os registros das novas refeições com campos relevantes
          SELECT
            um.user_id AS user_id,
            um.meal_id AS meal_id,
            um.weekday AS weekday
          FROM
            user_meals um
        )
        INSERT INTO "mealsHistoric" ("id", "meal_id", "created_at", "isCompleted", "isDone")
SELECT
  gen_random_uuid(),
  nm.meal_id,
  date_trunc('day', now()) + (nm.weekday_num * interval '1 day') AS created_at,
  false AS isCompleted,
  false AS isDone
FROM (
  SELECT
    user_meals.*,
    CASE
      WHEN user_meals.weekday = '0' THEN 0
      WHEN user_meals.weekday = '1' THEN 1
      WHEN user_meals.weekday = '2' THEN 2
      WHEN user_meals.weekday = '3' THEN 3
      WHEN user_meals.weekday = '4' THEN 4
      WHEN user_meals.weekday = '5' THEN 5
      WHEN user_meals.weekday = '6' THEN 6
    END AS weekday_num
  FROM user_meals
) AS nm;
      `

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
