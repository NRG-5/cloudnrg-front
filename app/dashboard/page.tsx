'use server'

import FolderDisplay from "@/app/dashboard/_components/FolderDisplay";
import FolderMenuBar from "@/app/dashboard/_components/FolderMenuBar";
import { Separator } from "@/components/ui/separator"
import {
    FileText,
    FileImage,
    FileVideo,
    FileAudio,
    FileBox,
    FileQuestion,
    ArrowBigDownDash
} from "lucide-react";
import {Button} from "@/components/ui/button";

const userId = "2c1405c6-43b0-4fb0-a23f-877427943382";

const folder = {
    id: "65e00d9c-6230-4a32-ae8e-8c6ecd25842e",
    name: "root",
    parentFolderId: null,
    userId: "2c1405c6-43b0-4fb0-a23f-877427943382",
    createTime: 1747349537,
    modTime: 1747399537
}

const files = [
    {
        data: {
            createTime: 1747349537,
            downloadUrl: "",
            fileId: "9f001e5a-99a1-42e1-ae76-0a3001f7ddd7",
            md5: "ee3ceef5106721a11a64063a9ad38122",
            mimeType: "image/png",
            modTime: 1747349537,
            name: "Sebastian-pfp.png",
            parentFolder: "root",
            size: 152056,
            type: "file"
        },
        status: "ok"
    },
    {
        data: {
            createTime: 1747349537,
            downloadUrl: "",
            fileId: "9f001e5a-99a1-42e1-ae76-0a3001f7ddd6",
            md5: "ee3ceef5106721a11a64063a9ad38122",
            mimeType: "image/png",
            modTime: 1747349537,
            name: "monse.png",
            parentFolder: "root",
            size: 152056,
            type: "file"
        },
        status: "ok"
    },
    {
        data: {
            createTime: 1747349537,
            downloadUrl: "",
            fileId: "9f001e5a-99a1-42e1-ae76-0a3001f7ddd6",
            md5: "ee3ceef5106721a11a64063a9ad38122",
            mimeType: "image/png",
            modTime: 1747349537,
            name: "monse.png",
            parentFolder: "root",
            size: 152056,
            type: "file"
        },
        status: "ok"
    }

]

const mimeTypesIcons = [
    {
        type: "image",
        icon: FileImage
    },
    {
        type: "text",
        icon: FileText
    },
    {
        type: "video",
        icon: FileVideo
    },
    {
        type: "audio",
        icon: FileAudio
    },
    {
        type: "application",
        icon: FileBox
    },
    {
        type: "unknown",
        icon: FileQuestion
    }
]

export default async function DashboardPage(){

    return (
        <div className={`p-6`}>
            <div className={`w-full`}>
                <FolderDisplay
                    filesLength={files.length}
                    folderName={folder.name}
                    folderCreateTime={folder.createTime}/>
            </div>
            <div>
                <FolderMenuBar/>
            </div>
            <Separator className="mt-4" />
            <div className={`flex flex-col justify-between`}>
                {
                    files.map(({data: {name, createTime, mimeType}}, index) => (
                        <div key={index} className={`w-full`}>

                            <div className={`flex items-center justify-between min-h-20`}>
                                {/*make use their mimetype or use the unknown file type*/}

                                <div className={`w-70 flex gap-2 items-center`}>
                                    <div>
                                        {
                                            (() => {
                                                const match = mimeTypesIcons.find(({type}) => mimeType.includes(type));
                                                const Icon = match ? match.icon : FileQuestion;
                                                return <Icon className={`h-10 w-10`} />;
                                            })()
                                        }
                                    </div>
                                    <div>
                                        <div className={`relative`}>
                                            <span className={`text-xl font-semibold`}>{name}</span>
                                        </div>
                                        <span className={`text-sm text-muted-foreground`}>
                                    {new Date(createTime).toLocaleString()}
                                </span>
                                    </div>
                                </div>
                                <div>
                                    <span className={`text-sm text-muted-foreground`}>
                                        {mimeType}
                                    </span>
                                </div>
                                <div>
                                <Button variant={`outline`}>
                                        <ArrowBigDownDash className={`h-4 w-4`}/>
                                        Download
                                    </Button>
                                </div>

                            </div>
                            <Separator className=""/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}