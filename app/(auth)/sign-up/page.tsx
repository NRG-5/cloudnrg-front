import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import LoginForm from "@/app/(auth)/login/_components/login-form";
import React from "react";


export default function SignUpPage(){
    return (
        <div className={`p-6 w-full max-w-md gap-6 mx-auto my-auto`}>
            <div className={`flex flex-col gap-6`}>
                <Card>
                    <CardHeader className={`text-center`}>
                        <CardTitle className="text-xl">Create a new account</CardTitle>
                        <CardDescription>
                            Enter your details below to create a new account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

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