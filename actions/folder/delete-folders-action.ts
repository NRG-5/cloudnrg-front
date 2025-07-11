'use server'


import { cookies } from 'next/headers';

export async function deleteFoldersAction(folderIds: string[]) {
    'use server'

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return { error: "Not authenticated" };
    }

    const folderRes = await fetch(`${process.env.BASE_URL}/folders/batch`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', // Added this header
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ folderIds: folderIds }),
    });


    if (!folderRes.ok) {
        return { error:  "Failed to delete folders." };
    }

    const data = await folderRes.json();
    return { data };

}