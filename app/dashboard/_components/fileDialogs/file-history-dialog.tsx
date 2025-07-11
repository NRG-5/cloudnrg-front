'use client'

import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
import {getFileHistoryAction} from "@/actions/file/get-file-history-action";

type HistoryItem = {
    id: string
    fileId: string
    userId: string
    action: string
    message: string
}
export default function FileHistoryDialog({fileId}: { fileId: string }) {
    const [history, setHistory] = useState<HistoryItem[]>([])

    useEffect(() => {
        async function fetchHistory() {
            const res = await getFileHistoryAction(fileId);

            const data = res.data as HistoryItem[];

            setHistory(data)
        }
        fetchHistory()
    }, [fileId])

    return (
        <DialogContent className={``}>
            <DialogHeader>
                <DialogTitle>File History</DialogTitle>
                <DialogDescription>
                    View the history of changes made to this file, including previous versions and modifications.
                </DialogDescription>
            </DialogHeader>

            <div className={`rounded-xl bg-muted text-muted-foreground max-h-100 overflow-auto`}>
                {
                    history.map((item: HistoryItem) => (
                        <div key={item.id} className="p-4 border-b last:border-b-0 font-mono">
                            <span className="text-sm font-medium">{item.action} </span>
                            <span className="text-sm">{item.message}</span>
                        </div>
                    ))
                }
            </div>

        </DialogContent>
    );
}