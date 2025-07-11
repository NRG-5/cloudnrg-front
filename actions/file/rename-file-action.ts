// file: actions/file/rename-files-action.ts
'use server'

import { cookies } from 'next/headers';

export async function renameFileAction(fileId: string, fileName: string) {
    'use server'

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return { error: "Not authenticated" };
    }

    try {
        const res = await fetch(
            `${process.env.BASE_URL}/files/${fileId}/name?fileName=${encodeURIComponent(fileName)}`,
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
    } catch {
        return { error: "An unexpected error occurred." };
    }
}