'use server'

import {cookies} from "next/headers";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {TriangleAlert} from "lucide-react";
import LogOutButton from "@/app/(auth)/profile/_components/log-out-button";

export default async function UserPage({params,}: {
    params: Promise<{ userId: string }> }){

    const { userId } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const userName = cookieStore.get('username')?.value;




    return (
        <div className={``}>
            <div className={`mt-8`}>
                <Card className={`max-w-3xl mx-auto`}>
                    <CardContent >
                        <div className={`mb-6`}>
                            <p className={`text-muted-foreground`}>{userId}</p>
                            <h1 className={`text-5xl font-semibold`}>{userName}</h1>
                        </div>

                        <div
                            className={`p-4 bg-yellow-400/10 rounded-md text-yellow-400 font-mono flex items-center gap-2 mb-4`}>
                            <div className={`w-fit`}>
                                <TriangleAlert className={`w-4 h-4`}/>
                            </div>
                            <p>Down is your Own Personal Token. use it for developing whatever you want. do not
                                share it.</p>
                        </div>

                        <div
                            className={`bg-muted text-muted-foreground break-all font-mono p-4 rounded-2xl relative`}>
                            <span>{token}</span>
                        </div>
                    </CardContent>
                    <CardFooter className={`mx-auto`}>
                        <LogOutButton/>
                    </CardFooter>
                </Card>

            </div>

        </div>
    );
}