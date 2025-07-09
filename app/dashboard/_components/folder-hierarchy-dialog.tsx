'use client'

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {useRouter} from "next/navigation";
import {updateFileParentFolderAction} from "@/actions/file/update-file-parent-folder-action";
import {toast} from "sonner";


export type FolderHierarchy = {
    id: string;
    name: string;
    parentFolderId: string | null;
    userId: string;
    createTime: number;
    modTime: number;
    children: FolderHierarchy[];
}
export default function FolderHierarchyDialog({folderHierarchy , fileId} : {folderHierarchy : FolderHierarchy, fileId: string}) {

    const router = useRouter();



    async function moveFileToFolder(folderId: string, fileId: string) {

        const response = await updateFileParentFolderAction(folderId, [fileId]);
        if (response.error) {
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
                     onClick={() => moveFileToFolder(folder.id, fileId)}>

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
                <DialogTitle>Move Files</DialogTitle>
                <DialogDescription>
                    Select a folder to move the files into. This action cannot be undone.
                </DialogDescription>
            </DialogHeader>

            <div className="bg-muted/50 rounded-2xl overflow-hidden">
                {renderFolders(folderHierarchy)}
            </div>


        </DialogContent>
    );
}




