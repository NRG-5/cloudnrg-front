'use client'

import {z} from "zod";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LoaderCircle} from "lucide-react";
import Link from "next/link";
import {createAccountAction} from "@/actions/auth/create-account-action";
import {toast} from "sonner";

const signUpSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string().min(3, {
        message: "Password must be at least 3 characters.",
    }),
})

export default function SignUpForm(){

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },

    });

    async function onSubmit(values: z.infer<typeof signUpSchema>) {

        setLoading(true);

        const response = await createAccountAction(values);
        if (response.error) {
            setLoading(false);
            toast.error("Error creating account");
            throw new Error(response.error);
        }

        toast.success("Account created successfully, you can now login");
        router.push('/login');
        setLoading(false);

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name={`username`}
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className={`text-md`}>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="a username u want" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`email`}
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className={`text-md`}>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="an email you wnt" {...field} />
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
                                <Input placeholder="a secure password" type={`password`} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className={`w-full mt-4 `} disabled={loading}>

                    {
                        loading && (
                            <LoaderCircle className={`animate-spin`}/>
                        )
                    }
                    Sign Up
                </Button>
                <Button className={`w-full`} variant={`outline`} disabled={loading} asChild>
                    <Link href="/login">
                        Login
                    </Link>
                </Button>
            </form>
        </Form>
);
}