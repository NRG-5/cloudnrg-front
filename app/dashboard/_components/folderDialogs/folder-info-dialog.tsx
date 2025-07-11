import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function FolderInfoDialog({folderName, folderId,createTime, modTime} :{
    folderName: string;
    folderId: string;
    createTime: number;
    modTime: number;
}){
    return (
        <DialogContent className={``}>
            <DialogHeader>
                <DialogDescription>
                    Folder Information
                </DialogDescription>
                <div className={`break-all`}>
                    <DialogTitle className={`text-xl font-semibold`}> {folderName} </DialogTitle>
                </div>
            </DialogHeader>
            <Separator/>
            <div>
                <span className={`text-xl font-semibold`}> General Information </span>
                <div className={`text-muted-foreground`}>
                    <p className={`text-sm`}><strong> ID: </strong> {folderId} </p>
                    <p className={`text-sm`}><strong> Created: </strong> {new Date(createTime * 1000).toLocaleString()}
                    </p>
                    <p className={`text-sm`}><strong> Modified: </strong> {new Date(modTime * 1000).toLocaleString()}
                    </p>
                </div>
            </div>
        </DialogContent>
    );
}