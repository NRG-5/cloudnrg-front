

const folderHierarchy = {
    "id": "479904c7-4d3f-4332-b186-b737eab45b85",
    "name": "root",
    "parentFolderId": null,
    "userId": "a2f82b87-2a7c-49cf-8055-8f87b43233f8",
    "createTime": 1750308871,
    "modTime": 1750308871,
    "children": [
        {
            "id": "286b0681-94fb-40fb-b7b9-8a319ef8e090",
            "name": "folder1",
            "parentFolderId": "479904c7-4d3f-4332-b186-b737eab45b85",
            "userId": "a2f82b87-2a7c-49cf-8055-8f87b43233f8",
            "createTime": 1750309866,
            "modTime": 1750309866,
            "children": [
                {
                    "id": "4bdc27ae-84bc-4a5e-9c33-e80d67cd86e5",
                    "name": "folder1.1",
                    "parentFolderId": "286b0681-94fb-40fb-b7b9-8a319ef8e090",
                    "userId": "a2f82b87-2a7c-49cf-8055-8f87b43233f8",
                    "createTime": 1750309885,
                    "modTime": 1750309885,
                    "children": []
                }
            ]
        },
        {
            "id": "baf7d209-fe6b-497b-aece-7cd5e9f5964a",
            "name": "folder2",
            "parentFolderId": "479904c7-4d3f-4332-b186-b737eab45b85",
            "userId": "a2f82b87-2a7c-49cf-8055-8f87b43233f8",
            "createTime": 1750309870,
            "modTime": 1750309870,
            "children": [
                {
                    "id": "4951a730-3cf9-4db3-8664-d13a0d3db6ec",
                    "name": "folder2.1",
                    "parentFolderId": "baf7d209-fe6b-497b-aece-7cd5e9f5964a",
                    "userId": "a2f82b87-2a7c-49cf-8055-8f87b43233f8",
                    "createTime": 1750309895,
                    "modTime": 1750309895,
                    "children": []
                }
            ]
        }
    ]
}

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"



export default function FolderHierarchyDialog(){

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


function renderFolders(folder: FolderHierarchy) {
    return (
        <div key={folder.id} className={folder.name != "root" ? "pl-4" : "" }>
            <div className="w-full p-2 border-b hover:bg-muted">
                {folder.name}
            </div>
            {folder.children && folder.children.map((child: FolderHierarchy) => renderFolders(child))}
        </div>
    );
}