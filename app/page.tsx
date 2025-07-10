
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {CloudLightning} from "lucide-react";


export default function Home() {

    return (
        <div className={`p-6`}>
            <div className={`flex items-center justify-center`}>
                <h1 className="text-8xl font-medium">Cloud<strong className={`text-primary`}>NRG</strong></h1>
                <CloudLightning className="h-60 w-60 ml-2"/>

            </div>
            <p className={`text-center text-muted-foreground font-mono mb-18`}> finally a simple cloud.</p>

            <div className={`grid grid-cols-1 max-w-xl mx-auto gap-6`}>
                <Button asChild>
                    <Link href="/login">
                        Login
                    </Link>
                </Button>

                <Button variant={`secondary`} asChild>
                    <Link href="/sign-up">
                        Sign Up
                    </Link>
                </Button>
            </div>


        </div>
    );
}
