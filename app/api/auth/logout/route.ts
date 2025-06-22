// app/logout/route.ts
import { NextResponse } from 'next/server';

export function POST() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('token');
    response.cookies.delete('userId');
    response.cookies.delete('username');
    response.cookies.delete('rootId');
    return response;
}