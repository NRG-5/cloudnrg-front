'use server'

import { cookies } from 'next/headers';


export async function getFileAction(fileId: string) {
    'use server'

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return { error: "Not authenticated" };
    }



    try {

        const fileRes = await fetch(`${process.env.BASE_URL}/files/${fileId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });


        if (!fileRes.ok) {
            return { error:"Failed to fetch file." };
        }

        // Return the file (blob) without parsing it as JSON
        const blob = await fileRes.blob();
        return { data: blob };

    } catch (error) {
        console.error("Error in getFileAction:", error);
        return { error: "An unexpected error occurred." };
    }
}