
import { cookies } from 'next/headers';

export async function GET(request: Request) {

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;


    //send the token as a response

    return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });


}