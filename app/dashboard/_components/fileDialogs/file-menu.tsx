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
import FileHierarchyDialog from "@/app/dashboard/_components/fileDialogs/file-hierarchy-dialog";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {useState} from "react";
import FileInfoDialog from "@/app/dashboard/_components/fileDialogs/file-info-dialog";
import {useRouter} from "next/navigation";
import {getFileAction} from "@/actions/file/get-file-action";
import {toast} from "sonner";
import FileDeleteDialog from "@/app/dashboard/_components/fileDialogs/file-delete-dialog";
import FileRenameDialog from "@/app/dashboard/_components/fileDialogs/file-rename-dialog";
import FileHistoryDialog from "@/app/dashboard/_components/fileDialogs/file-history-dialog";

export type FolderHierarchy = {
    id: string;
    name: string;
    parentFolderId: string | null;
    userId: string;
    createTime: number;
    modTime: number;
    children: FolderHierarchy[];
}
export default function FileMenu(
    {
        createTime, downloadUrl, fileId, md5, mimeType,
        modTime, name, parentFolder, size, type,folderHierarchy,
        currFolderId
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
        folderHierarchy: FolderHierarchy;
        currFolderId: string;
    }
){

    enum Dialogs {
        info = 'info',
        delete = 'delete',
        rename = 'rename',
        move = 'move',
        history = 'history',
    }

    const [dialog, setDialog] = useState<Dialogs>();

    const router = useRouter();

    async function handleDownload() {

        const response = await getFileAction(fileId);
        if (response.error) {
            toast.error("Failed to download file.");
            return;
        }

        const blob = response.data;
        if (!(blob instanceof Blob)) {
            toast.error("Failed to download file.");
            return;
        }
        const url = URL.createObjectURL(blob);

        const link = document.createElement(`a`);
        link.href = url;
        link.download = `${name}`;
        link.click();
        URL.revokeObjectURL(url);

    }

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

                        <DropdownMenuItem onClick={() => handleDownload()}>
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

                        <DialogTrigger asChild
                                       onClick={() => {
                                           setDialog(Dialogs.history)
                                       }}>
                            <DropdownMenuItem>
                                See History

                            </DropdownMenuItem>
                        </DialogTrigger>
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
                                    <DialogTrigger asChild
                                                   onClick={() => {
                                                       setDialog(Dialogs.move)
                                                   }}
                                    >
                                        <DropdownMenuItem>
                                            Select Folder
                                        </DropdownMenuItem>
                                    </DialogTrigger>

                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>

                        </DropdownMenuSub>


                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {
                dialog === Dialogs.move && <FileHierarchyDialog folderHierarchy={folderHierarchy} fileId={fileId}/>
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
            {
                dialog === Dialogs.delete && <FileDeleteDialog fileId={fileId} />
            }
            {
                dialog === Dialogs.rename && <FileRenameDialog fileId={fileId} currName={name}/>
            }
            {
                dialog === Dialogs.history && <FileHistoryDialog fileId={fileId}/>
            }

        </Dialog>

    );
}