'use client';

import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {redirect} from "next/navigation";
import {useState} from "react";
import {Loader2Icon} from "lucide-react";


export default function LogOutButton(){

    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true);
        const res = await fetch(`/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!res.ok) {
            toast.error('Logout failed');
            throw new Error('Logout failed');
        }

        toast.success('Logout successfully');
        redirect(`/login`);
        setLoading(false);
    }

    return (
        <Button disabled={loading} onClick={()=>handleLogout()}>
            {
                loading && <Loader2Icon className="animate-spin" />
            }
            Sign Out
        </Button>
    );
}