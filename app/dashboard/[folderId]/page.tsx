'use server'

import { cookies } from 'next/headers';
import RootFolderDisplay from "@/app/dashboard/_components/RootFolderDisplay";
import {Checkbox} from "@/components/ui/checkbox";
import FolderMenuBar from "@/app/dashboard/_components/FolderMenuBar";
import {Separator} from "@/components/ui/separator";
import {FileAudio, FileBox, FileImage, FileQuestion, FileText, FileVideo, FolderOpen} from "lucide-react";
import FileMenu from "@/app/dashboard/_components/file-menu";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import FolderDisplay from "@/app/dashboard/[folderId]/_components/folder-display";
import MainDashboard from "@/app/dashboard/[folderId]/_components/main-dashboard";


export type Folder = {
    id: string;
    name: string;
    parentFolderId: string | null;
    userId: string;
    createTime: number;
    modTime: number;
}
export type File = {
    data: {
        createTime: number;
        downloadUrl: string;
        fileId: string;
        md5: string;
        mimeType: string;
        modTime: number;
        name: string;
        parentFolder: string;
        size: number;
        type: string;
    };
    status: string;
}
export type FolderHierarchy = {
    id: string;
    name: string;
    parentFolderId: string | null;
    userId: string;
    createTime: number;
    modTime: number;
    children: FolderHierarchy[];
}
export default async function DashboardPageA({params,}: {
    params: Promise<{ folderId: string }>
}){

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const { folderId } = await params;

    // API call to get current folder data
    const currFolderRes = await fetch(`http://localhost:8090/api/v1/folders?folderId=${folderId}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store' // Use 'no-store' to ensure fresh data on every request
    });
    const currFolder : Folder = await currFolderRes.json();

    //API call to get files in the current folder
    const foldersRes = await fetch(`http://localhost:8090/api/v1/folders/parent/${folderId}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const folders: Folder[] = await foldersRes.json();

    //API call to get files in the current folder
    const filesRes = await fetch(`http://localhost:8090/api/v1/files/folder/${folderId}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const files: File[] = await filesRes.json();

    const folderHierarchyRes = await fetch(`http://localhost:8090/api/v1/folders/hierarchy`,{
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    const folderHierarchy: FolderHierarchy[] = await folderHierarchyRes.json();

    console.log(folderHierarchy);

    return (
        <div className={`p-6`}>
            <div className={`w-full`}>
                {
                    currFolder && <RootFolderDisplay
                        filesLength={files.length + folders.length}
                        folderName={currFolder.name}
                        folderCreateTime={currFolder.createTime}
                        parentFolderId={currFolder.parentFolderId}
                    />
                }
            </div>

            <MainDashboard folders={folders} files={files} />

        </div>
    );
}
