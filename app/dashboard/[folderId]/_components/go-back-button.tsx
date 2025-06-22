'use client'
import {Undo2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {redirect, useRouter} from "next/navigation";

export default function GoBackButton({parentFolderId} : {parentFolderId: string}) {

    const router = useRouter();

    return (
        <Button size={`icon`} variant={`secondary`} onClick={() => router.push(`/dashboard/${parentFolderId}`)}>
            <Undo2 className={`h-4 w-4`}/>
        </Button>
    );
}