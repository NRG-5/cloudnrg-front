// app/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { username, password } = await request.json();

    // Call your authentication API
    const res = await fetch(`${process.env.BASE_URL}/authentication/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) return new Response('Login failed', { status: 401 });

    const data = await res.json();

    // Set HTTP-only cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set({
        name: 'token',
        value: data.token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 day
        path: '/',
    });

    //set the userId in the cookie
    response.cookies.set({
        name: 'userId',
        value: data.id,
    })

    //set the username in the cookie
    response.cookies.set({
        name: 'username',
        value: data.username,
    });

    return response;
}