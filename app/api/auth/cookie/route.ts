
import { cookies } from 'next/headers';

export async function GET(request: Request) {

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    //send the token as a response
    if (!token) {
        return new Response(JSON.stringify({ error: 'Token not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });


}