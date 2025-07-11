'use server'

import { cookies } from 'next/headers';

export async function renameFolderAction(folderId: string, folderName: string) {
    'use server'


    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return { error: "Not authenticated" };
    }

    const res = await fetch(
        `${process.env.BASE_URL}/folders/${folderId}/name?name=${encodeURIComponent(folderName)}`,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        return { error: err.message || "Failed to rename file." };
    }

    const data = await res.json();
    return { data };

}