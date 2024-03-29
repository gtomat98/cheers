/* eslint-disable no-unused-vars */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    username: string
    avatar_url: string
    role: string
    userExists?: boolean
  }

  interface Session {
    token: {
      username: string
      id: string
      verified: boolean
    }
    username: string
    avatarUrl: string
    lastUpdate: Date
    firstAccess: boolean
  }
}
