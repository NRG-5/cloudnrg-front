"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Folders, Files} from "lucide-react";

export default function NumberFilesCard(){
    return (
        <Card className={`pt-0`}>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Number of Files</CardTitle>
                    <CardDescription>
                        Total number of files uploaded to the system by you
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className={`h-full`}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 h-full`}>
                    <div className={`bg-muted rounded-xl border flex flex-col items-center justify-center gap-2`}>
                        <div className={`bg-primary/20 w-fit rounded-2xl`}>
                            <Files className={`w-12 h-12 text-primary m-4`}/>
                        </div>
                        <span className={`text-3xl font-bold`}> 30 </span>
                        <span className={`text-muted-foreground`}> files </span>
                    </div>
                    <div className={`bg-muted rounded-xl border flex flex-col items-center justify-center gap-2`}>
                        <div className={`bg-muted-foreground/20 w-fit rounded-2xl`}>
                            <Folders className={`w-12 h-12 text-muted-foreground m-4`}/>
                        </div>
                        <span className={`text-3xl font-bold`}> 10 </span>
                        <span className={`text-muted-foreground`}> folders </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}