
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if the request is for the admin dashboard
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Skip checking for the login page itself
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next()
        }

        const hasSession = request.cookies.has('admin_session')

        if (!hasSession) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
