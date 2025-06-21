import { cookies } from 'next/headers';

export async function GET(request: Request) {

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const { searchParams } = new URL(request.url);
    const folderId = searchParams.get('folderId');

    const apiUrl = folderId != null ?
        'http://localhost:8090/api/v1/folders' :
        `http://localhost:8090/api/v1/folders?folderId=${folderId}`;

    //console.log(apiUrl);
    //console.log(folderId);

    const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

}