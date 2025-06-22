'use client';

import {Checkbox} from "@/components/ui/checkbox";
import {FolderOpen} from "lucide-react";
import {redirect} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import { useRouter } from 'next/navigation';

export default function FolderDisplay({ folder }: { folder: {
        id: string;
        name: string;
        parentFolderId: string | null;
        userId: string;
        createTime: number;
        modTime: number;
    } }){

    const router = useRouter();

    return (
        <div className={`w-full`}>
            <div className={`flex items-center min-h-20 `}>
                <Checkbox/>

                <div className={`w-70 flex gap-2 items-center group`}
                     onDoubleClick={() => router.push(`/dashboard/${folder.id}`)}
                >

                    <div>
                        <FolderOpen className={`h-10 w-10`}/>
                    </div>

                    <div>
                        <div className={`relative`}>
                            <span className={`text-xl font-semibold group-hover:underline`}>{folder.name}</span>
                        </div>
                        <span className={`text-sm text-muted-foreground`}>
                            {new Date(folder.createTime).toLocaleString()}
                        </span>
                    </div>

                </div>

            </div>
            <Separator className=""/>
        </div>
    );
}