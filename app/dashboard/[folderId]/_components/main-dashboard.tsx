'use client';

import {Checkbox} from "@/components/ui/checkbox";
import FolderDisplay from "@/app/dashboard/[folderId]/_components/folder-display";
import {Separator} from "@/components/ui/separator";
import {Download, FileAudio, FileBox, FileImage, FileQuestion, FileText, FileVideo, Move, Trash} from "lucide-react";
import FileMenu from "@/app/dashboard/_components/file-menu";
import FolderMenuBar from "@/app/dashboard/_components/FolderMenuBar";
import { useState } from 'react';
import {Button} from "@/components/ui/button";

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

export default function MainDashboard({folders,files,folderHierarchy ,currFolderId } :
{ folders: Folder[], files: File[], folderHierarchy: FolderHierarchy, currFolderId: string }) {

    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

    const allSelected =
        (selectedFolders.length !== 0 || selectedFiles.length !== 0) &&
        (folders.length !== 0 || files.length !== 0);

    function handleSelectAll() {
        if (allSelected) {
            setSelectedFolders([]);
            setSelectedFiles([]);
        } else {
            setSelectedFolders(folders.map((f) => f.id));
            setSelectedFiles(files.map((f) => f.data.fileId));
        }
    }

    function handleCheckFolder(id: string) {
        setSelectedFolders((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    }

    function handleCheckFile(id: string) {
        setSelectedFiles((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    }

    function handlePrintSelected() {
        console.log(`Folders:`, selectedFolders);
        console.log(`Files:`, selectedFiles);
    }


    return(
        <>
            <div>
                <div className={`flex items-center justify-between mt-4`}>
                    <div className={`flex items-center gap-2`}>
                        <div className={`relative w-fit mr-4`}>
                            <Checkbox
                                checked={allSelected}
                                disabled={folders.length === 0 && files.length === 0}
                                onCheckedChange={handleSelectAll}/>
                            {
                                (selectedFiles.length > 0 || selectedFolders.length> 0) &&
                                <>
                                    <div className={`absolute -right-5 -top-2 bg-muted rounded-full w-6 h-6 text-center`}>
                                        { selectedFiles.length + selectedFolders.length}
                                    </div>
                                </>
                            }

                        </div>

                        {
                            (selectedFiles.length > 0 || selectedFolders.length> 0) &&
                            <>
                                <Button size={`icon`}
                                        variant={`outline`}
                                        onClick={() => handlePrintSelected()}>
                                    <Move className={`h-4 w-4`}/>
                                </Button>
                                <Button size={`icon`}
                                        variant={`outline`}
                                        onClick={() => handlePrintSelected()}>
                                    <Trash className={`h-4 w-4`}/>
                                </Button>
                            </>
                        }
                    </div>

                    <FolderMenuBar/>
                </div>

            </div>
            <Separator className="mt-4"/>

            <div className={`flex flex-col justify-between`}>
                {
                    folders.length > 0 && folders.map((folder) => (
                        <div className={`w-full`} key={folder.id}>
                            <div className={`flex items-center min-h-20 `}>
                                <Checkbox
                                    className="mr-4"
                                    checked={selectedFolders.includes(folder.id)}
                                    onCheckedChange={() => handleCheckFolder(folder.id)}
                                />

                                <FolderDisplay folder={folder}/>
                            </div>
                            <Separator className=""/>
                        </div>

                    ))
                }

                {
                    files.length > 0 && files.map(({data}, index) => (
                        <div key={index} className={`w-full`}>

                            <div className={`flex items-center justify-between min-h-20 w-full`}>
                                <div className={`flex items-center `}>

                                    <Checkbox
                                        className="mr-4"
                                        checked={selectedFiles.includes(data.fileId)}
                                        onCheckedChange={() => handleCheckFile(data.fileId)}
                                    />

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
                                        folderHierarchy={folderHierarchy}
                                        currFolderId={currFolderId}
                                    />
                                </div>

                            </div>


                            <Separator className=""/>
                        </div>
                    ))
                }

                {
                    files.length === 0 && folders.length === 0 &&
                    <div className={`h-full  mt-8`}>
                        <div className={`flex flex-col items-center justify-center h-full`}>
                            <FileQuestion className={`h-20 w-20 text-muted-foreground`}/>
                            <span className={`text-muted-foreground mt-4`}>No files or folders found.</span>
                        </div>
                    </div>
                }
            </div>
            </>
    );
}