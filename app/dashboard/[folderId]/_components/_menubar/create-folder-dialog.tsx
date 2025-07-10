'use client'

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {useParams, useRouter} from 'next/navigation';
import {useState} from "react";
import {Loader2Icon} from "lucide-react";
import {createFolderAction} from "@/actions/folder/create-folder-action";



const createFolderSchema = z.object({
    name: z.string().min(5, {
        message: "Folder name must be at least 5 characters long",
    }),
})

export default function CreateFolderDialog() {

    const [loading, setLoading] = useState(false);

    const params = useParams<{folderId:string}>();
    const router = useRouter();

    const form = useForm<z.infer<typeof createFolderSchema>>({
        resolver: zodResolver(createFolderSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof createFolderSchema>) {

        setLoading(true);
        const res = await createFolderAction(values,params);
        if (res.error) {
            console.error("Error creating folder:", res.error);
            form.reset();
        }


        router.push(`/dashboard/${res.data.id}`)
        form.reset();
        setLoading(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={`secondary`} size={`sm`} type="button">
                    Create Folder
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Folder</DialogTitle>
                    <DialogDescription>
                        Enter the name of the new folder you want to create.
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
                                        <Input placeholder="" {...field} />
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
                                {loading && <Loader2Icon className="animate-spin" /> }
                                Create Folder
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}