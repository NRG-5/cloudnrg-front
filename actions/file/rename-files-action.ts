'use server'


import {cookies} from "next/headers";

export async function renameFileAction(fileId : string, name: string){
    'use server'

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return { error: "Not authenticated" };
    }

    try{
        const fileRes = await fetch(`${process.env.BASE_URL}/files/${fileId}/name?=${name}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
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