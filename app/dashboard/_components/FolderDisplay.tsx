import {FolderOpen} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import ObjectMenu from "@/app/dashboard/_components/object-menu";

export default function FolderDisplay(
    {filesLength, folderName, folderCreateTime} :
    {filesLength: number, folderName: string, folderCreateTime: number}
){
    return (
        <>
            <div className={`flex flex-row items-center gap-4`}>
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
                <ObjectMenu/>
            </div>
        </>
    );
}