import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Loader2Icon} from "lucide-react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {deleteFoldersAction} from "@/actions/folder/delete-folders-action";

export default function FolderDeleteDialog({folderId}: {folderId: string}) {

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function deleteFolder(folderId: string) {
        setLoading(true);

        const response = await deleteFoldersAction([folderId]);

        if (response.error) {
            toast.error("Failed to delete folder.");
            setLoading(false);
            return;
        }

        toast.success("Folder deleted successfully.");
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
                <Button disabled={loading} onClick={() => deleteFolder(folderId)}>
                    {
                        loading && <Loader2Icon className="animate-spin" />
                    }
                    Save changes
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}