/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }
  const { user_id } = req.body

  const userExists = await prisma.user.update({
    where: {
      id: user_id,
      isInactive: false,
    },
    data: {
      first_access: false,
    },
  })

  if (!userExists) {
    return res.status(404).end()
  }

  return res.status(201).end()
}
