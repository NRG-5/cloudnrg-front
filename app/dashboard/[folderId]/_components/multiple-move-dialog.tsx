'use client'


import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {updateFolderParentFolderAction} from "@/actions/folder/update-folder-parent-folder-action";
import {updateFileParentFolderAction} from "@/actions/file/update-file-parent-folder-action";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Move, Trash} from "lucide-react";

export type FolderHierarchy = {
    id: string;
    name: string;
    parentFolderId: string | null;
    userId: string;
    createTime: number;
    modTime: number;
    children: FolderHierarchy[];
}
export default function MultipleMoveDialog({folderHierarchy, selectedFolderIds, selectedFileIds}:
{
    folderHierarchy: FolderHierarchy;
    selectedFolderIds: string[];
    selectedFileIds: string[];
}){

    const router = useRouter();

    const [open, setOpen] = useState(false);

    async function handleMultipleMove(folderId: string) {

        if (selectedFolderIds.includes(folderId)) {
            toast.error('Cannot move to the same folder');
            return;
        }

        const folderResponse = await updateFolderParentFolderAction(folderId,selectedFolderIds);
        const fileResponse = await updateFileParentFolderAction(folderId,selectedFileIds);

        if (folderResponse.error || fileResponse.error) {
            toast.error('Failed to move objects');
            return;
        }

        toast.success('File moved successfully');
        router.push(`/dashboard/${folderId}`);
    }

    function renderFolders(folder: FolderHierarchy, depth = 0) {

        const indentation = '— '.repeat(depth);

        return (
            <div key={folder.id}>
                <div className="w-full p-2 border-b hover:bg-muted cursor-pointer"
                     onClick={() => handleMultipleMove(folder.id)}>

                    {indentation && <span className="text-muted-foreground">{indentation}</span>}
                    {folder.name}
                </div>
                {/* Recursively render children with increased depth */}
                {folder.children && folder.children.map((child: FolderHierarchy) => renderFolders(child, depth + 1))}
            </div>
        );
    }

    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button size={`icon`}
                        variant={`outline`}>
                    <Move className={`h-4 w-4`}/>
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Move Objects</DialogTitle>
                    <DialogDescription>
                        Select a folder to move the selected objects into. This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className="bg-muted/50 rounded-2xl overflow-hidden">
                    {renderFolders(folderHierarchy)}
                </div>
            </DialogContent>
        </Dialog>

    );
}