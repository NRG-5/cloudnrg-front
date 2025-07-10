
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ["/","/sign-up","/login","/terms-of-service","/contact","/api"];

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Allow access to all other public routes for everyone
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

     // Protect non-public routes
     if (!token) {
         const loginUrl = new URL('/login', request.url);
         loginUrl.searchParams.set('from', pathname);
         return NextResponse.redirect(loginUrl);
     }



    return NextResponse.next();
}


export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/).*)',
    ],
};

