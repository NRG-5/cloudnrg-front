'use client';

import RootFolderDisplay from "@/app/dashboard/_components/RootFolderDisplay";
import FolderMenuBar from "@/app/dashboard/_components/FolderMenuBar";
import { Separator } from "@/components/ui/separator"
import {
    FileText,
    FileImage,
    FileVideo,
    FileAudio,
    FileBox,
    FileQuestion,
    FolderOpen
} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import FileMenu from "@/app/dashboard/_components/file-menu";
import {useEffect, useState} from "react";

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

async function fetchCurrentFolderData(folderId: string | null) {
    try {
        const res = await fetch(`api/storage/folders?folderId=${folderId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to fetch folder data');
        }

        return data;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

async function fetchFolderHierarchy () {
    try {
        const res = await fetch('api/storage/folders/hierarchy', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to fetch folder hierarchy');
        }

        return data;

    } catch (error) {
        console.error("Error fetching folder hierarchy:", error);
    }
}

async function fetchFilesInFolder(folderId : string) {
    try {
        const res = await fetch(`api/storage/files/folder/${folderId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to fetch files in folder');
        }

        return data;

    } catch (error) {
        console.error("Error fetching files in folder:", error);
    }
}

async function fetchFoldersInFolder(folderId : string) {

    const tokenRes = await fetch(`api/auth/cookie`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });

    const tokenData = await tokenRes.json();

    const res = await fetch(`http://localhost:8090/api/v1/folders/parent/${folderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`,
        },
    });

    if (res.status === 404) {
        return []; // Return empty array if no folders found
    }

    const data = await res.json();



    if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch folders in folder');
    }

    return data;

}

export default function DashboardPage() {

    const [folders, setFolders] = useState<Folder[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [folderHierarchy, setFolderHierarchy] = useState([]);
    const [currentFolder, setCurrentFolder] = useState<Folder>();


    const handleFolderDoubleClick = async (folder: Folder) => {
        // Set current folder
        setCurrentFolder(folder);

        // Reload all folder data
        if (folder?.id) {
            try {
                // Fetch files in this folder
                const filesData = await fetchFilesInFolder(folder.id);
                setFiles(filesData || []);

                // Fetch subfolders in this folder
                const foldersData = await fetchFoldersInFolder(folder.id);
                setFolders(foldersData || []);

                // Refresh folder hierarchy if needed
                const hierarchyData = await fetchFolderHierarchy();
                setFolderHierarchy(hierarchyData);
            } catch (error) {
                console.error("Error loading folder data:", error);
            }
        }
    };


    useEffect(() => {
        async function fetchData() {

            const folderData = await fetchCurrentFolderData(currentFolder?.id || null);

            setCurrentFolder( folderData );

            if (folderData?.id) {
                const filesData = await fetchFilesInFolder(folderData.id);
                setFiles(filesData);

                const foldersData = await fetchFoldersInFolder(folderData.id);
                setFolders(foldersData);
            }

            const hierarchyData = await fetchFolderHierarchy();
            setFolderHierarchy(hierarchyData);



        }


        fetchData();
    }, []);


    return (
        <div className={`p-6`}>
            <div className={`w-full`}>
                {
                    currentFolder && files && <RootFolderDisplay
                        filesLength={files.length}
                        folderName={currentFolder.name}
                        folderCreateTime={currentFolder.createTime}/>
                }
            </div>
            <div>
                <Checkbox/>
                <FolderMenuBar/>
            </div>
            <Separator className="mt-4"/>
            <div className={`flex flex-col justify-between`}>

                {
                    folders.length > 0 && folders.map((folder) => (
                        <div key={folder.id} className={`w-full`}>
                            <div className={`flex items-center min-h-20 `}>
                                <Checkbox/>

                                <div className={`w-70 flex gap-2 items-center group`}
                                     onDoubleClick={() => handleFolderDoubleClick(folder)}
                                >

                                    <div>
                                        <FolderOpen className={`h-10 w-10`}/>
                                    </div>

                                    <div>
                                        <div className={`relative`}>
                                            <span className={`text-xl font-semibold group-hover:underline`}>{folder.name}</span>
                                        </div>
                                        <span className={`text-sm text-muted-foreground`}>
                                            {new Date(folder.createTime).toLocaleString()}
                                        </span>
                                    </div>

                                </div>

                            </div>
                            <Separator className=""/>
                        </div>
                    ))
                }

                {
                    files.length > 0 && files.map(({data}, index) => (
                        <div key={index} className={`w-full`}>

                            <div className={`flex items-center min-h-20`}>
                                {/*make use their mimetype or use the unknown file type*/}

                                <Checkbox/>

                                <div className={`w-70 flex gap-2 items-center`}>
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
                                        <div className={`relative`}>
                                            <span className={`text-xl font-semibold`}>{data.name}</span>
                                        </div>
                                        <span className={`text-sm text-muted-foreground`}>
                                    {new Date(data.createTime).toLocaleString()}
                                </span>
                                    </div>
                                </div>
                                <div>
                                    <span className={`text-sm text-muted-foreground`}>
                                        {data.mimeType}
                                    </span>
                                </div>
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
            <div>

            </div>
        </div>
    );
}