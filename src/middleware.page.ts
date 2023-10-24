import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl
    if (pathname.startsWith('/_next')) return NextResponse.next()
    const token = req.nextauth.token
    const userIdOnCookies = req.cookies.get('@cheers:userId')

    if (userIdOnCookies && pathname !== '/register/connect-google') {
      req.nextUrl.pathname = '/register/connect-google'
      return NextResponse.redirect(req.nextUrl)
    }

    if (token !== null && token.role) {
      const whichUrlFunction: any = {
        admin() {
          if (!pathname.startsWith('/adm')) {
            req.nextUrl.pathname = 'adm/dashboard'
            return NextResponse.redirect(req.nextUrl)
          }
        },
        user() {
          if (pathname === '/register/connect-google') {
            return
          }
          if (!token.verified && token.age) {
            req.nextUrl.pathname = 'loading'
            return NextResponse.redirect(req.nextUrl)
          }
          if (!pathname.includes(`/home/${token.username}`) && token.verified) {
            req.nextUrl.pathname = `/home/${token.username}`
            return NextResponse.redirect(req.nextUrl)
          }
        },
      }

      const role = String(token.role)
      const realeseWhichUrlFunction = whichUrlFunction[role]
      const res = realeseWhichUrlFunction ? realeseWhichUrlFunction() : false
      return res
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      async authorized({ token, req }) {
        const { pathname } = req.nextUrl
        if (
          pathname === '/' ||
          pathname === '/register' ||
          pathname === '/register/physical-information' ||
          pathname === '/register/connect-google' ||
          pathname === '/login'
        ) {
          return true
        }
        return !!token
      },
    },
  },
)

export const config = {
  matcher: ['/', '/register/:path*', '/home/:path*', '/adm/:path*'],
}
