'use server'


import {cookies} from "next/headers";

export async function getFileHistoryAction(fileId: string) {
    'use server'

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return { error: "Not authenticated" };
    }

    const res = await fetch(
        `${process.env.BASE_URL}/history/file/${fileId}`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) {
        return { error:  "Failed to fetch file history." };
    }

    const data = await res.json();
    return { data };
    
}