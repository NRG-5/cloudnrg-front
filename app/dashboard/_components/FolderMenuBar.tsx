'use client'

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {Checkbox} from "@/components/ui/checkbox";
import CreateFolderDialog from "@/app/dashboard/[folderId]/_components/_menubar/create-folder-dialog";

const userId = "2c1405c6-43b0-4fb0-a23f-877427943382";
const folderId = "65e00d9c-6230-4a32-ae8e-8c6ecd25842e";

export default function FolderMenuBar() {
    const [file, setFile] = useState<File>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setError(undefined);

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
        } catch (e: any) {
            console.error("Upload error:", e);
            setError(e.message || "Failed to upload file");
        } finally {
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

                <Button variant={`secondary`} size={`sm`}>
                    Refresh
                </Button>
            </div>
        </div>
    );
}