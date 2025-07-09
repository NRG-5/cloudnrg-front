'use server'


import { cookies } from 'next/headers';

export async function DeleteFilesAction(fileIds: string[]) {
    'use server'

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return { error: "Not authenticated" };
    }

    try{
        const fileRes = await fetch(`${process.env.BASE_URL}/files/batch`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', // Added this header
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ fileIds: fileIds }),
        });

        if (!fileRes.ok) {
            return { error:  "Failed to delete files." };
        }

        const data = await fileRes.json();
        return { data: data };
    } catch (error) {
        console.error("Error in DeleteFilesAction:", error);
        return { error: "An unexpected error occurred." };
    }
}