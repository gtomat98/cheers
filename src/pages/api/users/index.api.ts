import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies, setCookie } from 'nookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  const { name, username } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      username,
      isInactive: false,
    },
  })

  if (userExists) {
    return res.status(400).json({
      message: 'User already exists',
    })
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  // faça a verificação de existencia do cookie aqui
  const { '@cheers:userId': userIdOnCookies } = parseCookies({ req })
  if (userIdOnCookies) {
    // aqui esta o problema de rollback
    try {
      await prisma.user.update({
        where: {
          id: userIdOnCookies,
          accounts: { none: {} },
        },

        data: {
          isInactive: true,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  setCookie(
    {
      res,
    },
    '@cheers:userId',
    user.id,
    {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    },
  )

  return res.status(201).json(user)
}
