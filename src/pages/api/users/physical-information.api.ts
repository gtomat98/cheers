import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { prisma } from '@/lib/prisma'

const physicalInformationFormSchema = z.object({
  weight: z.number().min(20).max(160),
  height: z.number().min(120).max(250),
  age: z.number().min(15).max(80),
  gender: z.enum(['male', 'female']),
  activityFactor: z.enum(['sedentary', 'light', 'moderate', 'high']),
})

export type physicalInformationFormData = z.infer<
  typeof physicalInformationFormSchema
>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const userDatabaseData = await prisma.user.findUnique({
    where: {
      id: session.token.id,
    },

    select: {
      age: true,
      height: true,
      weight: true,
      gender: true,
      activity_factor: true,
    },
  })

  const { age, height, weight, activityFactor, gender } =
    physicalInformationFormSchema.parse(req.body)

  if (
    userDatabaseData &&
    age === userDatabaseData.age &&
    height === userDatabaseData.height &&
    weight === userDatabaseData.weight &&
    activityFactor === userDatabaseData.activity_factor &&
    gender === userDatabaseData.gender
  ) {
    return res.status(401).end()
  }

  const actualDate = new Date(Date.now())

  await prisma.user.update({
    where: {
      id: session.token.id,
    },

    data: {
      height,
      weight,
      gender,
      age,
      activity_factor: activityFactor,
      last_update: actualDate.toISOString(),
      is_diet_updated: false,
    },
  })

  return res.status(200).json({
    username: session.token.username,
  })
}
