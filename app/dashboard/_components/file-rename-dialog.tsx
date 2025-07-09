'use client'


import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const renameFileSchema = z.object({
    name: z.string().min(6, {
        message: "Folder name must be at least 5 characters long",
    }),
})


export default function FileDeleteDialog({fileId , currName}: {fileId: string, currName: string}) {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof renameFileSchema>>({
        resolver: zodResolver(renameFileSchema),
        defaultValues: {
            name: currName,
        },
    })

    async function onSubmit(values: z.infer<typeof renameFileSchema>) {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

        console.log(values);

        setLoading(false);
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Rename File</DialogTitle>
                <DialogDescription>
                    give the file a new name.
                </DialogDescription>
            </DialogHeader>


        </DialogContent>
    );
}