import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const { search } = req.query

  try {
    const usersFound = await prisma.user.findMany({
      take: 5,
      where: {
        isInactive: false,
        verified: true,
        NOT: {
          age: null,
        },
        role: 'user',
        username: {
          contains: search as string,
          mode: 'insensitive',
        },
      },

      select: {
        id: true,
        username: true,
        age: true,
        gender: true,
        avatar_url: true,
        verified: true,
      },
    })

    return res.status(200).json({
      usersFound,
    })
  } catch (err) {}
}
