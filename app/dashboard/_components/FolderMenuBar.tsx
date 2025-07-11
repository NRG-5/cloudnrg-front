'use client'

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CreateFolderDialog from "@/app/dashboard/[folderId]/_components/_menubar/create-folder-dialog";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";



export default function FolderMenuBar({ folderId}: { folderId: string}) {
    const [file, setFile] = useState<File>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const userId = Cookies.get("userId");

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setError(undefined);

        if (!userId) {
            setError("User ID is not available. Please log in.");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("userId", userId);
            formData.append("folderId", folderId);

            const res = await fetch(`/api/upload`, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (!res.ok) {
                // Handle both JSON and text errors
                try {
                    const errorData = await res.json();
                    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
                } catch {
                    throw new Error(await res.text());
                }
            }

            const result = await res.json();
            console.log("Upload successful:", result);
            setFile(undefined);
            setLoading(false);
            router.refresh();


        } catch (e: any) {
            console.error("Upload error:", e);
            setError(e.message || "Failed to upload file");
            setLoading(false);
        }


    };

    return (
        <div className="flex justify-between items-center">



            <div className={`flex items-center gap-4`}>



                <CreateFolderDialog/>

                <Button variant={`secondary`} size={`sm`}>
                    Search
                </Button>

                <form onSubmit={onSubmit} className="flex gap-4">
                    <Input
                        type="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files?.[0])}
                        required
                    />
                    <Button type="submit" disabled={loading || !file} size={`sm`}>
                        <Upload className="h-4 w-4 mr-2" />
                        {loading ? "Uploading..." : "Upload"}
                    </Button>
                </form>

                {error && (
                    <div className="text-red-500 mt-2">
                        {error.startsWith('<!DOCTYPE html>')
                            ? "Failed to reach the server (404 error)"
                            : error}
                    </div>
                )}
            </div>
        </div>
    );
}