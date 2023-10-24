import { getGoogleOAuthToken } from '@/lib/google'
import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

interface GetUpdatedTasksProps {
  tasklist: string
}

export default async function useFetch(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  const data = req.body
  const { tasklist }: GetUpdatedTasksProps = data

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

  const meals = await api.tasks.list({
    tasklist,
    showHidden: true,
  })

  return res.status(200).json({
    meals: meals.data.items,
  })
}
