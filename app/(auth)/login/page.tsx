

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import LoginForm from "@/app/(auth)/login/_components/login-form";


export default function LogInPage(){
    return (
        <div className={`p-6 w-full max-w-md gap-6 mx-auto my-auto`}>
            <div className={`flex flex-col gap-6`}>
                <Card>
                    <CardHeader className={`text-center`}>
                        <CardTitle className="text-xl">Login to your account</CardTitle>
                        <CardDescription>
                            Enter your username below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm />
                    </CardContent>
                </Card>

                <div
                    className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                    By clicking continue, you agree to our <a href="/terms-of-service">Terms Of Service</a>.
                </div>
            </div>
        </div>
    );
}