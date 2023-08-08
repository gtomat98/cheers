import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('entrou')
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const { search } = req.query

  try {
    const usersFound = await prisma.user.findMany({
      take: 5,
      where: {
        isInactive: false,
        gender: 'male' || 'female',
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
      },
    })
    return res.status(200).json({
      usersFound,
    })
  } catch (err) {
    console.log(err)
  }
}
