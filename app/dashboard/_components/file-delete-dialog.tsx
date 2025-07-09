'use client'

import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Loader2Icon} from "lucide-react";
import {useRouter} from "next/navigation";
import {DeleteFilesAction} from "@/actions/file/delete-files-action";
import {toast} from "sonner";


export default function FileDeleteDialog({fileId } : {fileId: string }) {

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function deleteFile(fileId: string) {
        setLoading(true);
        const response = await DeleteFilesAction([fileId]);

        if (response.error) {
            toast.error("Failed to delete file.");
            setLoading(false);
            return;
        }

        toast.success("File deleted successfully.");
        setLoading(false);


        router.refresh();

    }


    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete File</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this file? This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" disabled={loading}>Cancel</Button>
                </DialogClose>
                <Button disabled={loading} onClick={() => deleteFile(fileId)}>
                    {
                        loading && <Loader2Icon className="animate-spin" />
                    }
                    Save changes
                </Button>
            </DialogFooter>
        </DialogContent>
    );

}
