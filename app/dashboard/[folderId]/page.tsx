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
const mimeTypesIcons = [
    {
        type: "image",
        icon: FileImage
    },
    {
        type: "text",
        icon: FileText
    },
    {
        type: "video",
        icon: FileVideo
    },
    {
        type: "audio",
        icon: FileAudio
    },
    {
        type: "application",
        icon: FileBox
    },
    {
        type: "unknown",
        icon: FileQuestion
    }
]

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

    return (
        <div className={`p-6`}>
            <div className={`w-full`}>
                {
                    currFolder && <RootFolderDisplay
                        filesLength={files.length}
                        folderName={currFolder.name}
                        folderCreateTime={currFolder.createTime}
                        parentFolderId={currFolder.parentFolderId}
                    />
                }
            </div>
            <div>
                <div>
                    controls xd
                    <Checkbox/>
                </div>
                <FolderMenuBar/>
            </div>
            <Separator className="mt-4"/>
            <div className={`flex flex-col justify-between`}>
                {
                    folders.length > 0 && folders.map((folder) => (
                        <FolderDisplay key={folder.id} folder={folder}/>
                    ))
                }

                {
                    files.length > 0 && files.map(({data}, index) => (
                        <div key={index} className={`w-full`}>

                            <div className={`flex items-center justify-between min-h-20 w-full`}>
                                <div className={`flex items-center `}>

                                    <Checkbox className={`mr-4`}/>

                                    <div>
                                        {
                                            (() => {
                                                const match = mimeTypesIcons.find(({type}) => data.mimeType.includes(type));
                                                const Icon = match ? match.icon : FileQuestion;
                                                return <Icon className={`h-10 w-10`}/>;
                                            })()
                                        }
                                    </div>
                                    <div>
                                        <div className="w-100 " title={data.name}>
                                            <span className="text-xl font-semibold truncate block">{data.name}</span>
                                        </div>
                                        <span className={`text-sm text-muted-foreground`}>
                                            {new Date(data.createTime).toLocaleString()}
                                        </span>
                                    </div>
                                </div>


                                <span className={`text-sm text-muted-foreground`}>
                                        {data.mimeType}
                                </span>

                                <div>

                                    <FileMenu
                                        fileId={data.fileId}
                                        name={data.name}
                                        type={data.type}
                                        createTime={data.createTime}
                                        size={data.size}
                                        mimeType={data.mimeType}
                                        md5={data.md5}
                                        downloadUrl={data.downloadUrl}
                                        modTime={data.modTime}
                                        parentFolder={data.parentFolder}
                                    />
                                </div>

                            </div>


                            <Separator className=""/>
                        </div>
                    ))
                }
            </div>

        </div>
    );
}
