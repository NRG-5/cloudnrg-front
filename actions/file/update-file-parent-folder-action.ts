'use server'
import {cookies} from "next/headers";


export async function updateFileParentFolderAction(folderId: string, fileIds: string[]){
    'use server'

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return { error: "Not authenticated" };
    }

    try {
        const updateFileParentFolderReq = await fetch(`${process.env.BASE_URL}/files/batch/parent`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                fileIds: fileIds,
                newParentFolderId: folderId
            })
        });

        if (!updateFileParentFolderReq.ok) {
            const errorResponse = await updateFileParentFolderReq.json();
            return { error: errorResponse.message || "Failed to update file's parent folder." };
        }

        const data = await updateFileParentFolderReq.json();
        return { data: data };

    } catch (error) {
        console.error("Error in updateFileParentFolderAction:", error);
        return { error: "An unexpected error occurred." };
    }
}