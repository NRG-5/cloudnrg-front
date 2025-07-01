

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


export type FolderHierarchy = {
    id: string;
    name: string;
    parentFolderId: string | null;
    userId: string;
    createTime: number;
    modTime: number;
    children: FolderHierarchy[];
}
export default function FolderHierarchyDialog({folderHierarchy} : {folderHierarchy : FolderHierarchy}){

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



function renderFolders(folder: FolderHierarchy, depth = 0) {
    // Create an indentation string based on the depth.
    // The root folder (depth 0) will have no indentation.
    const indentation = '— '.repeat(depth);

    return (
        <div key={folder.id}>
            <div className="w-full p-2 border-b hover:bg-muted cursor-pointer">
                {/* Only show indentation if it exists */}
                {indentation && <span className="text-muted-foreground">{indentation}</span>}
                {folder.name}
            </div>
            {/* Recursively render children with increased depth */}
            {folder.children && folder.children.map((child: FolderHierarchy) => renderFolders(child, depth + 1))}
        </div>
    );
}