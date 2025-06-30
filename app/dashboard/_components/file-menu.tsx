'use client'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {EllipsisVerticalIcon} from "lucide-react";
import FolderHierarchyDialog from "@/app/dashboard/_components/folder-hierarchy-dialog";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {useState} from "react";
import FileInfoDialog from "@/app/dashboard/_components/file-info-dialog";


//file
//{
//         data: {
//             createTime: 1747349537,
//             downloadUrl: "",
//             fileId: "9f001e5a-99a1-42e1-ae76-0a3001f7ddd7",
//             md5: "ee3ceef5106721a11a64063a9ad38122",
//             mimeType: "image/png",
//             modTime: 1747349537,
//             name: "Sebastian-pfp.png",
//             parentFolder: "root",
//             size: 152056,
//             type: "file"
//         },
//         status: "ok"
//     }

export default function FileMenu(
    {
        createTime, downloadUrl, fileId, md5, mimeType,
        modTime, name, parentFolder, size, type
    } : {
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
    }
){

    enum Dialogs {
        info = 'info',
        delete = 'delete',
        rename = 'rename',
        move = 'move',
    }

    const [dialog, setDialog] = useState<Dialogs>();

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="size-8">
                        <EllipsisVerticalIcon className={`h-15 w-15`}/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">

                    <DropdownMenuGroup>

                        <DialogTrigger asChild
                                       onClick={() => {
                                           setDialog(Dialogs.info)
                                       }}
                        >
                            <DropdownMenuItem>
                                Info
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem>
                            Download
                        </DropdownMenuItem>

                        <DropdownMenuSeparator/>
                        <DialogTrigger asChild
                                       onClick={() => {
                                           setDialog(Dialogs.rename)
                                       }}>
                            <DropdownMenuItem>
                                Rename
                            </DropdownMenuItem>
                        </DialogTrigger>

                        <DropdownMenuItem>
                            See History
                            {/*TODO: refactor todo just when its a file*/}
                        </DropdownMenuItem>
                        <DialogTrigger asChild
                                       onClick={() => {
                                           setDialog(Dialogs.delete)
                                       }}
                        >
                            <DropdownMenuItem>
                                Delete
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuSeparator/>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Move To</DropdownMenuSubTrigger>

                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>

                                    <DropdownMenuItem>Root Folder</DropdownMenuItem>

                                    <DialogTrigger asChild
                                                   onClick={() => {
                                                       setDialog(Dialogs.move)
                                                   }}
                                    >
                                        <DropdownMenuItem>
                                            More...
                                        </DropdownMenuItem>
                                    </DialogTrigger>

                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>

                        </DropdownMenuSub>


                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {
                dialog === Dialogs.move && <FolderHierarchyDialog/>
            }
            {
                dialog === Dialogs.info && <FileInfoDialog
                    fileId={fileId}
                    name={name}
                    type={type}
                    createTime={createTime}
                    size={size}
                    mimeType={mimeType}
                    md5={md5}
                />
            }
</Dialog>

    );
}