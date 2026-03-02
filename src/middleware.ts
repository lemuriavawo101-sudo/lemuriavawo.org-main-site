import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Only protect routes starting with /admin, excluding /admin/login
    if (path.startsWith('/admin') && path !== '/admin/login') {
        const adminSession = request.cookies.get('admin_session');

        if (!adminSession) {
            // Not authenticated, redirect to login
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/admin/:path*'],
};
