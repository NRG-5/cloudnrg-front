
import { cookies } from 'next/headers';

export async function GET(request: Request, { params }: { params: { folderId: string[] } } ) {

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // Get folderId from the URL params
    const {folderId} = await params;

    const res = await fetch(`http://localhost:8090/api/v1/files/folder/${folderId.join()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token || ''}`,
        },
    });

    if (!res.ok) {
        return new Response(
            JSON.stringify({ error: `Failed to fetch files: ${res.statusText}` }),
            { status: res.status, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

}
