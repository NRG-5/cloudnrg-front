'use client'


import {z} from "zod";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2Icon} from "lucide-react";
import {renameFileAction} from "@/actions/file/rename-file-action";
import {toast} from "sonner";
import {renameFolderAction} from "@/actions/folder/folder-rename-action";

const renameFolderSchema = z.object({
    name: z.string().min(2, {
        message: "Folder name must be at least 2 characters long",
    }),
})

export default function FolderRenameDialog({folderId, folderName} : {
    folderId: string;
    folderName: string;
}) {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof renameFolderSchema>>({
        resolver: zodResolver(renameFolderSchema),
        defaultValues: {
            name: folderName,
        },
    })

    async function onSubmit(values: z.infer<typeof renameFolderSchema>) {
        setLoading(true);

        const response = await renameFolderAction(folderId, values.name);

        if (response.error) {
            toast.error("Failed to rename file.");
            setLoading(false);
            return;
        }

        toast.success("File renamed successfully.");
        setLoading(false);
        router.refresh();
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Rename Folder</DialogTitle>
                <DialogDescription>
                    give the folder a new name.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Folder Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="enter new name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" disabled={loading}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={loading} size={`default`}>
                            {loading && <Loader2Icon className="animate-spin" />}
                            Rename Folder
                        </Button>
                    </DialogFooter>
                </form>
            </Form>


        </DialogContent>
    );
}