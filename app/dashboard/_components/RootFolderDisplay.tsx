import {FolderOpen, Undo2} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import GoBackButton from "@/app/dashboard/[folderId]/_components/go-back-button";

export default function RootFolderDisplay(
    {filesLength, folderName, folderCreateTime, parentFolderId} :
    {filesLength: number, folderName: string, folderCreateTime: number, parentFolderId: string | null}
){
    return (
        <>
            <div className={`flex relative flex-row items-center gap-4`}>
                {
                    (parentFolderId !== null) &&
                    <GoBackButton parentFolderId={parentFolderId}/>
                }
                <div className={`relative`}>
                    <FolderOpen className={`h-15 w-15`}/>
                    <Badge className={`absolute right-0 -bottom-1`}> {filesLength} </Badge>
                </div>
                <div className={`flex flex-col justify-between`}>
                    <span className={`text-xl font-semibold`}>{folderName}</span>
                    <span className={`text-sm text-muted-foreground`}>
                            {new Date(folderCreateTime).toLocaleString()}
                        </span>

                </div>
                {/*<FileMenu/>*/}
            </div>
        </>
    );
}