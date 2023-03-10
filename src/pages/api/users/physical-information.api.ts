import { getBasalMetabolismRate } from '@/utils/getBasalMetabolismRate'
import { shouldIncreaseOrDecreaseCalories } from '@/utils/shouldIncreaseOrDecreaseCalories'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { getMeals } from '../../../utils/getMeals'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

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
    return res.status(404).end()
  }

  const { age, height, weight, activityFactor, gender } =
    physicalInformationFormSchema.parse(req.body)

  const totalCaloriesToMantain = getBasalMetabolismRate({
    gender,
    age,
    height,
    weight,
    activityFactor,
  })

  const bodyMassIndex = shouldIncreaseOrDecreaseCalories(height, weight)

  const idealWeight = {
    1() {
      // eslint-disable-next-line prettier/prettier
      return totalCaloriesToMantain - (totalCaloriesToMantain / 10)
    },
    [-1]() {
      // eslint-disable-next-line prettier/prettier
      return totalCaloriesToMantain + (totalCaloriesToMantain / 10)
    },
    0() {
      return totalCaloriesToMantain
    },
  }

  const Meals = getMeals(1000)

  return res.status(200).json({
    calories: idealWeight[bodyMassIndex](),
    Meals,
  })
}
