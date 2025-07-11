'use client'


import {useState} from "react";
import {useRouter} from "next/navigation";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {EllipsisVerticalIcon} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import FolderInfoDialog from "@/app/dashboard/_components/folderDialogs/folder-info-dialog";
import FolderDeleteDialog from "@/app/dashboard/_components/folderDialogs/folder-delete-dialog";
import FolderRenameDialog from "@/app/dashboard/_components/folderDialogs/folder-rename-dialog";
import FolderHierarchyDialog from "@/app/dashboard/_components/folderDialogs/folder-hierarchy-dialog";

export type FolderHierarchy = {
    id: string;
    name: string;
    parentFolderId: string | null;
    userId: string;
    createTime: number;
    modTime: number;
    children: FolderHierarchy[];
}

export default function FolderMenu({folderHierarchy, folderId, folderName, createTime, modTime} :
{
    folderHierarchy:FolderHierarchy,
    folderId: string
    folderName: string,
    createTime: number,
    modTime: number

} ){

    enum Dialogs {
        info = 'info',
        delete = 'delete',
        rename = 'rename',
        move = 'move',
    }

    const [dialog, setDialog] = useState<Dialogs>();

    const router = useRouter();

    return(
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
                dialog === Dialogs.info && <FolderInfoDialog folderName={folderName} folderId={folderId} createTime={createTime} modTime={modTime}/>
            }
            {
                dialog === Dialogs.delete && <FolderDeleteDialog folderId={folderId}/>
            }
            {
                dialog === Dialogs.rename && <FolderRenameDialog folderId={folderId} folderName={folderName}/>
            }
            {
                dialog === Dialogs.move && <FolderHierarchyDialog folderHierarchy={folderHierarchy} currFolderId={folderId}/>
            }

        </Dialog>
    );
}