import { PrismaAdapter } from '@/lib/auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { parseCookies } from 'nookies'

export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
  return {
    session: {
      strategy: 'jwt',
    },
    pages: {
      signIn: '/login',
    },
    adapter: PrismaAdapter(req, res),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
            scope:
              'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/tasks',
          },
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            username: '',
            email: profile.email,
            avatar_url: profile.picture,
            role:
              profile.email === 'matheus.dafonseca2004@gmail.com'
                ? 'admin'
                : 'user',
          }
        },
      }),
    ],

    callbacks: {
      async signIn({ account, user }) {
        const { '@cheers:userId': userIdOnCookies } = parseCookies({ req })
        if (!user.userExists && !userIdOnCookies) {
          return '/register?username=newUser'
        }

        if (
          !account?.scope?.includes('https://www.googleapis.com/auth/tasks')
        ) {
          return '/register/connect-google/?error=permissions'
        }

        return true
      },
      async jwt({ token, user }) {
        if (user) token.role = user.role
        let userDatabase
        if (token.id) {
          userDatabase = await prisma.user.findUnique({
            where: {
              id: token.id as string,
            },
          })
          token.verified = userDatabase?.verified
        }
        return {
          ...user,
          verified: userDatabase?.verified,
          height: userDatabase?.height,
          weight: userDatabase?.weight,
          activityFactor: userDatabase?.activity_factor,
          gender: userDatabase?.gender,
          role: userDatabase?.role,
          ...token,
          age: userDatabase?.age,
        }
      },

      async session({ session, token }) {
        const user = await prisma.user.findUnique({
          where: {
            id: token.id as string,
          },
        })
        return {
          ...session,
          role: token.role,
          token,
          verified: user?.verified,
          username: user?.username,
          avatarUrl: user?.avatar_url,
          lastUpdate: user?.last_update,
        }
      },
    },
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOptions(req, res))
}
