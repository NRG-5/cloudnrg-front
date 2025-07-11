'use server'


import {cookies} from "next/headers";

export async function getFileHistoryAction(fileId: string) {
    'use server'

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return { error: "Not authenticated" };
    }

    

}