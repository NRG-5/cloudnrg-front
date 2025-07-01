'use server'

import {z} from "zod";
import { cookies } from 'next/headers';
const createFolderSchema = z.object({
    name: z.string().min(5, {
        message: "Folder name must be at least 5 characters long",
    }),
})

export async function createFolderAction(values: z.infer<typeof createFolderSchema>, params: { folderId: string }) {
    'use server'

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const createFolderRes = await fetch(`${process.env.BASE_URL}/folders/create?folderName=${values.name}&parentFolderId=${params.folderId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!createFolderRes.ok) {
        const errorResponse = await createFolderRes.json();
        return { error: errorResponse.message || "Failed to create folder." };
    }

    const data = await createFolderRes.json();
    return { data: data };




}