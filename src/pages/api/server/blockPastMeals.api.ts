import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const currentDate = new Date()
  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

  const endOfWeek = new Date(currentDate)
  endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()))

  const currentWeekday = String(currentDate.getDay() - 1)

  try {
    await prisma.$queryRaw`
      UPDATE "mealsHistoric"
      SET "isDone" = true
      WHERE
        "created_at" >= ${startOfWeek} AND
        "created_at" <= ${endOfWeek} AND
        "meal_id" IN (
          SELECT id
          FROM "meals"
          WHERE "weekday"::text = ${currentWeekday}
        );
    `
    res.status(200).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  } finally {
    await prisma.$disconnect
  }
}
