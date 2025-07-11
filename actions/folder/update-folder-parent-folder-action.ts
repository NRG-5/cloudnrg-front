'use server'
import {cookies} from "next/headers";


export async function updateFolderParentFolderAction(newParentfolderId: string, folderIds: string[]){
    'use server'

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return { error: "Not authenticated" };
    }

    const updateFolderParentFolderReq = await fetch(`${process.env.BASE_URL}/folders/batch/parent`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            folderIds: folderIds,
            newParentFolderId: newParentfolderId
        })
    });

    if (!updateFolderParentFolderReq.ok) {
        const errorResponse = await updateFolderParentFolderReq.json();
        return { error: errorResponse.message || "Failed to update file's parent folder." };
    }

    const data = await updateFolderParentFolderReq.json();
    return { data };

}