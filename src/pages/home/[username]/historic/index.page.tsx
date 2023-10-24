/* eslint-disable camelcase */
import { GetServerSideProps } from 'next'
import { HistoryContainer, HistoryList, Status, Box } from './styles'
import { prisma } from '@/lib/prisma'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { getServerSession } from 'next-auth'
import { google, tasks_v1 } from 'googleapis'
import { getGoogleOAuthToken } from '@/lib/google'
import { Prisma } from '@prisma/client'
import { Fragment } from 'react'

interface HistoricProps {
  data: [
    {
      createdAt: string
      meals: [
        {
          weekday: any
          meal: any
          id: string
          meal_id: string
          createdAt: string
          isCompleted: boolean
          isDone: boolean
        },
      ]
    },
  ]
}

export default function Historic({ data }: HistoricProps) {
  const weekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ]

  return (
    <HistoryContainer>
      <Box>
        <h1>Histórico de refeições</h1>
      </Box>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Dia</th>
              <th>Data</th>
              <th>Refeição</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((meals) => {
              return (
                <Fragment key={meals.createdAt}>
                  <tr>
                    <td>{weekDays[new Date(meals.createdAt).getDay() + 1]}</td>
                    <td>{new Date(meals.createdAt).toLocaleDateString()}</td>
                    <td></td>
                    <td></td>
                    {/* <td>
                      {meals.meals.map((meal) => {
                        return Meals[meal.meal]
                      })}
                    </td> */}
                  </tr>
                  <tr key={'café'}>
                    <td></td>
                    <td></td>
                    <td>Café</td>
                    <td>
                      {meals.meals.find((meal) => meal.meal === '0')
                        ?.isCompleted && (
                        <Status statusColor="green">Concluída</Status>
                      )}
                      {meals.meals.find((meal) => meal.meal === '0')?.isDone &&
                        !meals.meals.find((meal) => meal.meal === '0')
                          ?.isCompleted && (
                          <Status statusColor="red">Não finalizada</Status>
                        )}
                      {!meals.meals.find((meal) => meal.meal === '0')
                        ?.isCompleted &&
                        !meals.meals.find((meal) => meal.meal === '0')
                          ?.isDone && (
                          <Status statusColor="yellow">Em andamento</Status>
                        )}
                    </td>
                  </tr>
                  <tr key={'almoço'}>
                    <td></td>
                    <td></td>
                    <td>Almoço</td>
                    <td>
                      {meals.meals.find((meal) => meal.meal === '1')
                        ?.isCompleted && (
                        <Status statusColor="green">Concluída</Status>
                      )}
                      {meals.meals.find((meal) => meal.meal === '1')?.isDone &&
                        !meals.meals.find((meal) => meal.meal === '1')
                          ?.isCompleted && (
                          <Status statusColor="red">Não finalizada</Status>
                        )}
                      {!meals.meals.find((meal) => meal.meal === '1')
                        ?.isCompleted &&
                        !meals.meals.find((meal) => meal.meal === '1')
                          ?.isDone && (
                          <Status statusColor="yellow">Em andamento</Status>
                        )}
                    </td>
                  </tr>
                  <tr key={'tarde'}>
                    <td></td>
                    <td></td>
                    <td>Café da tarde</td>
                    <td>
                      {' '}
                      {meals.meals.find((meal) => meal.meal === '2')
                        ?.isCompleted && (
                        <Status statusColor="green">Concluída</Status>
                      )}
                      {meals.meals.find((meal) => meal.meal === '2')?.isDone &&
                        !meals.meals.find((meal) => meal.meal === '2')
                          ?.isCompleted && (
                          <Status statusColor="red">Não finalizada</Status>
                        )}
                      {!meals.meals.find((meal) => meal.meal === '2')
                        ?.isCompleted &&
                        !meals.meals.find((meal) => meal.meal === '2')
                          ?.isDone && (
                          <Status statusColor="yellow">Em andamento</Status>
                        )}
                    </td>
                  </tr>
                  <tr key={'janta'}>
                    <td></td>
                    <td></td>
                    <td>Jantar</td>
                    <td>
                      {meals.meals.find((meal) => meal.meal === '3')
                        ?.isCompleted && (
                        <Status statusColor="green">Concluída</Status>
                      )}
                      {meals.meals.find((meal) => meal.meal === '3')?.isDone &&
                        !meals.meals.find((meal) => meal.meal === '3')
                          ?.isCompleted && (
                          <Status statusColor="red">Não finalizada</Status>
                        )}
                      {!meals.meals.find((meal) => meal.meal === '3')
                        ?.isCompleted &&
                        !meals.meals.find((meal) => meal.meal === '3')
                          ?.isDone && (
                          <Status statusColor="yellow">Em andamento</Status>
                        )}
                    </td>
                  </tr>
                  <tr key={'ceia'}>
                    <td></td>
                    <td></td>
                    <td>Ceia</td>
                    <td>
                      {meals.meals.find((meal) => meal.meal === '4')
                        ?.isCompleted && (
                        <Status statusColor="green">Concluída</Status>
                      )}
                      {meals.meals.find((meal) => meal.meal === '4')?.isDone &&
                        !meals.meals.find((meal) => meal.meal === '4')
                          ?.isCompleted && (
                          <Status statusColor="red">Não finalizada</Status>
                        )}
                      {!meals.meals.find((meal) => meal.meal === '4')
                        ?.isCompleted &&
                        !meals.meals.find((meal) => meal.meal === '4')
                          ?.isDone && (
                          <Status statusColor="yellow">Em andamento</Status>
                        )}
                    </td>
                  </tr>
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return {
      notFound: true,
    }
  }

  const data = await prisma.$queryRaw`
    SELECT TO_CHAR(mh."created_at", 'YYYY-MM-DD') as "createdAt",
          json_agg(json_build_object('isCompleted', mh."isCompleted",
         'isDone', mh."isDone",
         'id', mh.id,
         'meal_id', mh."meal_id",
         'weekday', m."weekday",
         'createdAt',  TO_CHAR(mh."created_at", 'YYYY-MM-DD'),
         'meal', m."meal")) as "meals"
    FROM "mealsHistoric" mh
    JOIN "meals" m ON mh."meal_id" = m."id"
    WHERE m."user_id" = ${session.token.id}
    GROUP BY "createdAt"
    ORDER BY "createdAt" DESC;
`

  const api = google.tasks({
    version: 'v1',
    auth: await getGoogleOAuthToken(session.token.id),
  })

  const tasklistIds = await prisma.meal.findMany({
    where: {
      user_id: session.token.id,
      isCurrent: true,
    },

    select: {
      tasklist_id: true,
    },

    distinct: ['tasklist_id'],
  })

  if (!tasklistIds) {
    return {
      notFound: true,
    }
  }

  const itemsToSqlArray = (items: tasks_v1.Schema$Task[]) =>
    items.map(
      (item) =>
        `('${item.id}', '${item.status}', '${item.completed}', '${item.title}')`,
    )

  tasklistIds.forEach(async ({ tasklist_id: tasklist }) => {
    const { data } = await api.tasks.list({
      tasklist,
      showCompleted: true,
      showHidden: true,
    })

    const { items } = data

    if (!items) {
      return {
        notFound: true,
      }
    }

    await prisma.$queryRaw`
  WITH tasks AS (
    SELECT *
    FROM (VALUES ${Prisma.raw(itemsToSqlArray(items).join(', '))})
      AS t ("id", "status", "completed", "title")
  )
  UPDATE "mealsHistoric" AS mh
  SET "isCompleted" = t."status" = 'completed'
  FROM tasks t
  WHERE mh."meal_id" = t."id";
`
  })

  return {
    props: {
      data,
    },
  }
}
