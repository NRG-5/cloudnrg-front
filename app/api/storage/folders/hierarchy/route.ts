

import { cookies } from 'next/headers';

export async function GET(request: Request) {

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const res = await fetch('http://localhost:8090/api/v1/folders/hierarchy', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        return new Response(JSON.stringify({ error: 'Failed to fetch folder hierarchy' }) )
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });


}