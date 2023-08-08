import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  // 7 dias atras
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  try {
    await prisma.user.updateMany({
      where: {
        created_at: { lte: sevenDaysAgo.toISOString() }, // Convertendo para formato ISO8601
        accounts: { none: {} }, // Verifica se não há nenhuma conta relacionada
        isInactive: false,
      },
      data: { isInactive: true },
    })
    console.log('teste')

    res.status(200).end()
  } catch (error) {
    res.status(500).json({ error })
  } finally {
    await prisma.$disconnect
  }
}
