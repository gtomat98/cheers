import { getGoogleOAuthToken } from '@/lib/google'
import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { Meals } from '@prisma/client'
import { prisma } from '@/lib/prisma'

interface updateTaskProps {
  mealId: string
  isChecked: boolean
  tasklist: string
  title: Meals
  mealHistoricId: string
}

export default async function useFetch(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }
  const data = req.body
  console.log(data)
  const {
    mealId: task,
    isChecked,
    tasklist,
    title,
    mealHistoricId,
  }: updateTaskProps = data

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const api = google.tasks({
    version: 'v1',
    auth: await getGoogleOAuthToken(session.token.id),
  })

  try {
    await prisma.mealsHistoric.update({
      where: {
        id: mealHistoricId,
        meal_id: task,
        isDone: false,
      },

      data: {
        isCompleted: isChecked,
      },
    })
  } catch (err) {
    return res.status(200).json({
      reload: true,
    })
  }

  let counter = 0

  async function TryToUpdateTaskOnGoogleApi() {
    try {
      counter++
      await api.tasks.update({
        task,
        tasklist,
        requestBody: {
          id: task,
          status: isChecked ? 'completed' : 'needsAction',
          title,
        },
      })
    } catch (err) {
      if (counter < 5) {
        setTimeout(() => {
          TryToUpdateTaskOnGoogleApi()
        }, 1000 * 10)
      }
      await prisma.mealsHistoric.update({
        where: {
          id: mealHistoricId,
          meal_id: task,
        },

        data: {
          isCompleted: !isChecked,
        },
      })
    }
  }

  TryToUpdateTaskOnGoogleApi()

  return res.status(200).end()
}
