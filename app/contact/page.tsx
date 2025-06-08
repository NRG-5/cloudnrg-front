"use client"

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
import {Card, CardContent} from "@/components/ui/card";
import {CloudLightning, Mail} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";

const contactFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    subject: z.string().min(2, {
        message: "Subject must be at least 2 characters.",
    }),
    message: z.string().min(1, {
        message: "Message cannot be empty.",
    })
})

export default function ContactPage(){

    const contactForm = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    })

    function onSubmit(values: z.infer<typeof contactFormSchema>) {
        console.log(values)
    }

    return (
        <div className={`flex justify-center p-6`}>
            <div className={` space-y-8 max-w-3xl`}>
                <h1 className={`text-center text-4xl font-medium mb-4`}>
                    Contact Us
                </h1>
                <p className={`text-center`}>
                    If you have any questions or need further information, please fill out the form below.
                    We will get back to you as soon as possible.
                </p>
                <Card className={`w-full`}>
                    <CardContent>
                        <Form {...contactForm}>
                            <form onSubmit={contactForm.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={contactForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={contactForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={contactForm.control}
                                    name="subject"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subject</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={contactForm.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className={`w-full`}>Submit</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
);
}