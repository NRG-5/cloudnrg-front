'use client'


import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {updateFolderParentFolderAction} from "@/actions/folder/update-folder-parent-folder-action";

export type FolderHierarchy = {
    id: string;
    name: string;
    parentFolderId: string | null;
    userId: string;
    createTime: number;
    modTime: number;
    children: FolderHierarchy[];
}
export default function FolderHierarchyDialog({folderHierarchy , currFolderId} : {folderHierarchy : FolderHierarchy;currFolderId: string;}){

    const router = useRouter();

    async function moveFolder(folderId: string, currFolderId: string) {

        const response = await updateFolderParentFolderAction(folderId, [currFolderId]);
        if (response.error) {
            toast.error('Failed to move folder');
            console.error("Error moving file:", response.error);
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
                     onClick={() => moveFolder(folder.id, currFolderId)}>

                    {indentation && <span className="text-muted-foreground">{indentation}</span>}
                    {folder.name}
                </div>
                {/* Recursively render children with increased depth */}
                {folder.children && folder.children.map((child: FolderHierarchy) => renderFolders(child, depth + 1))}
            </div>
        );
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Move Folder</DialogTitle>
                <DialogDescription>
                    Select a folder to move the selected folder into. This action cannot be undone.
                </DialogDescription>
            </DialogHeader>

            <div className="bg-muted/50 rounded-2xl overflow-hidden">
                {renderFolders(folderHierarchy)}
            </div>


        </DialogContent>
    );
}