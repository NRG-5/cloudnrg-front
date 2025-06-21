'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useState} from "react";
import {LoaderCircle} from "lucide-react";
import {redirect} from "next/navigation";
import Link from "next/link";

const loginSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    password: z.string().min(3, {
        message: "Password must be at least 3 characters.",
    }),
})

export default function LoginForm(){

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },

    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setLoading(true);

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }
        else if (response.ok) {
            redirect('/dashboard');
        }

        setLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name={`username`}
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className={`text-md`}>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="your username :D" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={`password`}
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className={`text-md`}>Password</FormLabel>
                            <FormControl>
                                <Input type={`password`} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className={`w-full `} disabled={loading}>
                    Log In
                    {
                        loading && (
                            <LoaderCircle className={`animate-spin`}/>
                        )
                    }
                </Button>
                <Button className={`w-full`} variant={`secondary`} disabled={loading} asChild>
                    <Link href="/sign-up">
                        Sign Up
                    </Link>
                </Button>
            </form>
        </Form>
);
}