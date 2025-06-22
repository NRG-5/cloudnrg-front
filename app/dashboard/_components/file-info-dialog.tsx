import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator"

export default function FileInfoDialog(
    {
        name,type,createTime,fileId,size,mimeType,md5,
    }: {
        name: string;
        type: string;
        createTime: number;
        fileId: string;
        size: number;
        mimeType: string;
        md5: string;
    }){
    return (
        <DialogContent className={``}>
            <DialogHeader>
                <div className={`break-all`}>
                    <DialogTitle className={`text-xl font-semibold`}> {name} </DialogTitle>
                </div>
            </DialogHeader>
            <Separator/>
            <div>
                <span className={`text-xl font-semibold`}> General Information </span>
                <div className={`text-muted-foreground`}>
                    <p className={`text-sm`}><strong> Type: </strong> {type} </p>
                    <p className={`text-sm`}><strong> Created: </strong> {new Date(createTime * 1000).toLocaleString()} </p>
                    <p className={`text-sm`}><strong> ID: </strong> {fileId} </p>
                </div>
            </div>
            <Separator/>
            <div>
                <span className={`text-xl font-semibold`}> File Information </span>
                <div className={`text-muted-foreground`}>
                    <p className={`text-sm`}><strong> Size: </strong> {`${(size / 1024).toFixed(2)} kb`} </p>
                    <p className={`text-sm`}><strong> MIME Type: </strong> {mimeType}</p>
                    <p className={`text-sm`}><strong> MD5: </strong> {fileId} </p>
                </div>
            </div>

        </DialogContent>
    );
}